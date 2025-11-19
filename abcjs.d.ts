declare module "abcjs" {
  export function renderAbc(output: string, abc: string, params?: any): any;
  export namespace synth {
    class CreateSynth {
      init(params: any): Promise<void>;
      prime(): Promise<void>;
      start(): Promise<void>;
      stop(): void;
      pause(): void;
      resume(): void;
    }
  }
}
