//#region dist/.types-work/odf-source-E0FWi1P5.d.ts
type ModelSourceTarget = 'docx' | 'xlsx' | 'pptx';
type ModelSourceConfigValue = string | number | boolean | null;
type ModelSourceConfig = Readonly<Record<string, ModelSourceConfigValue>>;
declare const MODEL_SOURCE_MODULE_PROTOCOL = "ooxml-model-source-module/v2";
interface ModelSourceModuleDescriptor {
  readonly protocol: typeof MODEL_SOURCE_MODULE_PROTOCOL;
  readonly target: ModelSourceTarget;
  readonly moduleUrl: string;
  readonly config: ModelSourceConfig;
}
interface ModelSourceLoad {
  readonly module: ModelSourceModuleDescriptor;
  readonly transfer?: readonly Transferable[];
  release(): void;
}
interface ModelSource<T extends ModelSourceTarget = ModelSourceTarget> {
  readonly target: T;
  claim(bytes: Uint8Array): boolean;
  beginLoad(): ModelSourceLoad;
}
interface OpenDocumentSourceOptions {
  readonly wasmUrl?: string;
  readonly moduleUrl?: string;
}
//#endregion
//#region dist/.types-work/odt.d.ts
type OdtOptions = OpenDocumentSourceOptions;
declare function createOdt(options?: OdtOptions): ModelSource<'docx'>;
declare const odt: ModelSource<'docx'>;
//#endregion
export { OdtOptions, createOdt, odt };