//#region dist/.types-work/model-source-B17wVipl.d.ts
type ModelSourceTarget = 'docx' | 'xlsx' | 'pptx';
type ModelSourceConfigValue = string | number | boolean | null;
type ModelSourceConfig = Readonly<Record<string, ModelSourceConfigValue>>;
declare const MODEL_SOURCE_MODULE_PROTOCOL = "ooxml-model-source-module/v1";
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
//#endregion
//#region dist/.types-work/legacy-source-CC69Xivg.d.ts
interface LegacySourceOptions {
  readonly wasmUrl?: string;
  readonly moduleUrl?: string;
  readonly maxInputBytes?: number;
}
//#endregion
//#region dist/.types-work/legacy-xls.d.ts
type LegacyXlsSourceOptions = LegacySourceOptions;
declare function legacyXlsSource(options?: LegacyXlsSourceOptions): ModelSource<'xlsx'>;
//#endregion
export { type LegacyXlsSourceOptions, legacyXlsSource };