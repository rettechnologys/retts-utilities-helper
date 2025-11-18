/**
 * @retts-packages/utilities-helper
 * A collection of utility functions for modern JavaScript/TypeScript applications
 */

// ============================================================================
//  Utility exports 
// ============================================================================

// Array utilities
export {
  flatenNestedArray,
  getPath,
  searchNestedArray
} from './Array.js';

// Type checking utilities
export {
  objKeys,
  getOwnPropNames,
  isUndefined,
  isNull,
  isNil,
  isString,
  hasLength,
  isStringFull,
  isArrayFull,
  isArrayStrings,
  isObject,
  isObjectFull,
  isNumber,
  isEqual,
  isFalse,
  isTrue,
  isIn,
  isBoolean,
  isNumeric,
  isDateString,
  isDate,
  isValue,
  hasValue,
  isFunction,
  isType,
  isJson
} from './CheckType.js';

// Color utilities
export {
  generateRandomColorClass,
  generateRandomColor
} from './Color.js';

// Crypto utilities
export { encryptCrypto, decryptCrypto } from './Crypto.js';
export type { CryptoConfig } from './Crypto.js';

// Date utilities
export {
  isValidDate,
  formatMomentDate,
  objStrDateToDate,
  objDateToStrDate
} from './Date.js';

// Either monad
export { Either } from './Either.js';

// EitherAsync monad
export { EitherAsync } from './EitherAsync.js';

// HTTP methods enum
export { HTTP_METHODS } from './HttpMethods.js';

// JSON utilities
export { jsonConvert } from './JsonConvert.js';
export { DateConverter, DateTimeConverter } from './JsonDateConverter.js';

// Number utilities
export { randomNumber } from './Number.js';

// Object utilities
export {
  getObjByKeyValFromArray,
  getObjValByKeyFromObj,
  generateDatasetObj
} from './Object.js';

// Promise utilities
export { debounceTime } from './Promise.js';

// String utilities
export {
  replaceBracketStr,
  formatMessageStr,
  capitalCaseStr,
  limitWordStr,
  limitCharStr,
  replaceSpace,
  replaceNewlineWithWhiteSpace,
  formatCurrency,
  snakeLowerCase,
  kebabLowerCase,
  snakeUpperCase,
  formatPhoneNumber,
  getInitialName,
  isValidUrl
} from './String.js';

// Re-export String types
export type { IMessage, IFormatMessage } from './String.js';

// Secure storage utilities (Browser only)
export { createSecureStorage, secureStorage } from './SecureLS.js';

// Type utilities
export { unionTypeToArray } from './Type.js';

// UseCase utilities
export { UseCase } from './UseCase.js';

// Utils (Email & HTML utilities)
import UtilsDefault from './Utils.js';
export const Utils = UtilsDefault;
export default Utils;

// ============================================================================
// Note: The following modules have external dependencies and are NOT exported:
// - Form (requires @/types/Form)
// - Menu (requires @/composables, @/modules, @/types)
// - Peruri (requires @/types)
// - Ploc (requires @/types, Pinia - architectural pattern, keep project-specific)
// - Renderer (requires @/helpers)
// - Shortlink (requires @/config and @/modules)
// - User (requires @/assets, @/modules, @/stores, @/types)
// 
// Dependencies included:
// - @supercharge/strings (for String utilities)
// - html-to-text (for Utils)
// - juice (for Utils)
// - secure-ls (for SecureLS - Browser only)
// - json2typescript (for JsonConvert and JsonDateConverter)
// - luxon (for JsonDateConverter - DateTime handling)
// - moment (for Date utilities - formatting, validation, conversions)
// 
// Node.js built-in modules used:
// - crypto (for Crypto encryption/decryption utilities)
// 
// Browser-only modules:
// - SecureLS: Requires browser environment with localStorage/sessionStorage
//   Will throw descriptive errors if used in Node.js/SSR
// 
// To use excluded modules, you'll need to:
// 1. Install peer dependencies
// 2. Configure environment variables
// 3. Provide the required type definitions
// ============================================================================
