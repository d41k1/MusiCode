import abcjs from "abcjs";

export const downloadImage = (elementId: string, filename: string) => {
  const container = document.getElementById(elementId);
  if (!container) return;

  const svg = container.querySelector("svg");
  if (!svg) return;

  // Get the bounding box of the SVG content to ensure we capture everything
  const bbox = svg.getBBox();
  const padding = 20; // Add some padding
  const contentWidth = bbox.width + bbox.x;
  const contentHeight = bbox.height + bbox.y;

  const width = contentWidth > 0 ? contentWidth + padding : padding;
  const height = contentHeight > 0 ? contentHeight + padding : padding;

  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  // Scale for better quality (2x)
  const scale = 2;
  canvas.width = width * scale;
  canvas.height = height * scale;

  img.onload = () => {
    if (ctx) {
      // Fill white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.scale(scale, scale);

      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/png", 0.9);

      const date = new Date();
      const timestamp = date.toISOString().replace(/[:.]/g, "-").slice(0, 19);

      const link = document.createElement("a");
      link.download = `${filename}-${timestamp}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  // Temporarily set width/height on the SVG element to the bbox size to ensure Image loads it correctly
  const originalWidth = svg.getAttribute("width");
  const originalHeight = svg.getAttribute("height");
  const originalViewBox = svg.getAttribute("viewBox");

  svg.setAttribute("width", width.toString());
  svg.setAttribute("height", height.toString());
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const adjustedSvgData = new XMLSerializer().serializeToString(svg);

  // Restore original attributes
  if (originalWidth) svg.setAttribute("width", originalWidth);
  else svg.removeAttribute("width");
  if (originalHeight) svg.setAttribute("height", originalHeight);
  else svg.removeAttribute("height");
  if (originalViewBox) svg.setAttribute("viewBox", originalViewBox);
  else svg.removeAttribute("viewBox");

  img.src =
    "data:image/svg+xml;base64," +
    btoa(unescape(encodeURIComponent(adjustedSvgData)));
};

export const downloadAudio = async (abcContent: string, filename: string) => {
  try {
    // Create a temporary synth to get duration
    const tempSynth = new abcjs.synth.CreateSynth();
    const visualObj = abcjs.renderAbc("audio-calc", abcContent)[0];

    await tempSynth.init({ visualObj: visualObj });
    await tempSynth.prime();

    // Duration in seconds (add a small buffer)
    const duration = (tempSynth as any).duration + 1.0;

    // Create OfflineAudioContext
    const sampleRate = 44100;
    const offlineCtx = new OfflineAudioContext(
      2,
      duration * sampleRate,
      sampleRate
    );

    // Create synth for offline rendering
    const synth = new abcjs.synth.CreateSynth();

    // Initialize with offline context
    await synth.init({
      visualObj: visualObj,
      audioContext: offlineCtx as unknown as AudioContext,
      millisecondsPerMeasure: visualObj.millisecondsPerMeasure(),
    });

    await synth.prime();

    // Start rendering
    synth.start();

    // Render audio
    const renderedBuffer = await offlineCtx.startRendering();

    // Convert to WAV
    const wavBlob = bufferToWav(renderedBuffer);

    // Download
    const url = window.URL.createObjectURL(wavBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.wav`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("WAV export failed:", error);
    alert("WAV export failed. Please try again.");
  }
};

// Helper to convert AudioBuffer to WAV Blob
function bufferToWav(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const bufferArr = new ArrayBuffer(length);
  const view = new DataView(bufferArr);
  const channels = [];
  let i;
  let sample;
  let offset = 0;
  let pos = 0;

  // write WAVE header
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(buffer.sampleRate);
  setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit (hardcoded in this example)

  setUint32(0x61746164); // "data" - chunk
  setUint32(length - pos - 4); // chunk length

  // write interleaved data
  for (i = 0; i < buffer.numberOfChannels; i++)
    channels.push(buffer.getChannelData(i));

  while (pos < buffer.length) {
    for (i = 0; i < numOfChan; i++) {
      // interleave channels
      sample = Math.max(-1, Math.min(1, channels[i][pos])); // clamp
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
      view.setInt16(offset, sample, true); // write 16-bit sample
      offset += 2;
    }
    pos++;
  }

  return new Blob([bufferArr], { type: "audio/wav" });

  function setUint16(data: number) {
    view.setUint16(offset, data, true);
    offset += 2;
  }

  function setUint32(data: number) {
    view.setUint32(offset, data, true);
    offset += 4;
  }
}
