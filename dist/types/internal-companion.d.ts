//#region dist/.types-work/model-source-lVIwBKHF.d.ts
declare const MODEL_SOURCE_MODULE_PROTOCOL = "ooxml-model-source-module/v2";
//#endregion
//#region dist/.types-work/internal-companion.d.ts
declare class CompanionRuntimeMismatchError extends Error {
  readonly code = "companion-runtime-mismatch";
  constructor(expectedVersion: string, expectedProtocol: string);
}
declare function assertCompanionRuntime(version: string, protocol: string): void;
//#endregion
export { CompanionRuntimeMismatchError, MODEL_SOURCE_MODULE_PROTOCOL, assertCompanionRuntime };