# @retts/frontend-helper

A collection of utility functions for modern JavaScript/TypeScript applications.

## Features

- ✅ **ES Module Support** - Native ESM with CommonJS fallback
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Tree-shakeable** - Import only what you need
- ✅ **Zero Dependencies** - Pure utility functions (for core exports)
- ✅ **Modern Build** - Built with tsup for optimal bundle size

## Installation

```bash
npm install @retts/frontend-helper
```

## Usage

### ES Modules (Recommended)

```typescript
import { isString, randomNumber, debounceTime } from '@retts/frontend-helper';

// Type checking
if (isString(value)) {
  console.log('It\'s a string!');
}

// Generate random number
const random = randomNumber(1, 100);

// Debounce with promise
await debounceTime(1000);
```

### CommonJS

```javascript
const { isString, randomNumber } = require('@retts/frontend-helper');
```

## API Reference

### Type Checking Utilities

```typescript
import {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isNull,
  isUndefined,
  isNil,
  hasValue,
  isJson,
  // ... and more
} from '@retts/frontend-helper';
```

**Available Functions:**
- `isString(val)` - Check if value is a string
- `isStringFull(val)` - Check if value is a non-empty string
- `isNumber(val)` - Check if value is a valid number
- `isBoolean(val)` - Check if value is a boolean
- `isArray(val)` - Check if value is an array
- `isArrayFull(val)` - Check if value is a non-empty array
- `isObject(val)` - Check if value is an object
- `isObjectFull(val)` - Check if value is a non-empty object
- `isNull(val)` - Check if value is null
- `isUndefined(val)` - Check if value is undefined
- `isNil(val)` - Check if value is null or undefined
- `isJson(val)` - Check if string is valid JSON
- `hasValue(val)` - Check if value has a meaningful value

### Array Utilities

```typescript
import {
  flatenNestedArray,
  getPath,
  searchNestedArray
} from '@retts/frontend-helper';

// Flatten nested array structure
const flat = flatenNestedArray(nestedData, 'children');

// Find path to an element in nested structure
const path = getPath(tree, 'id', 123, 'children');

// Search in nested array
const results = searchNestedArray(tree, 'name', 'search term', 'children');
```

### Object Utilities

```typescript
import {
  getObjByKeyValFromArray,
  getObjValByKeyFromObj,
  generateDatasetObj
} from '@retts/frontend-helper';

// Find object in array by key-value pair
const user = getObjByKeyValFromArray(users, 'id', 123);

// Get nested object value by path string
const value = getObjValByKeyFromObj(obj, 'user.profile.name');

// Generate dataset attributes for HTML elements
const dataset = generateDatasetObj({ userId: 123, active: true });
// Returns: { 'data-userId': '123', 'data-active': 'true' }
```

### Number Utilities

```typescript
import { randomNumber } from '@retts/frontend-helper';

// Generate random number between min and max (inclusive)
const random = randomNumber(1, 100);
```

### Color Utilities

```typescript
import {
  generateRandomColorClass,
  generateRandomColor
} from '@retts/frontend-helper';

// Generate random Tailwind color classes
const [textClass, bgClass] = generateRandomColorClass();
// Returns: ['text-blue-50', 'bg-blue-500']

// Generate random CSS color variable
const color = generateRandomColor('500');
// Returns: 'var(--blue-500)'
```

### Promise Utilities

```typescript
import { debounceTime } from '@retts/frontend-helper';

// Wait for specified milliseconds
await debounceTime(1000); // Wait 1 second

// Use in async functions
async function delayedAction() {
  console.log('Starting...');
  await debounceTime(2000);
  console.log('Completed after 2 seconds');
}
```

### HTTP Methods

```typescript
import { HTTP_METHODS } from '@retts/frontend-helper';

const method = HTTP_METHODS.GET; // 'GET'
const postMethod = HTTP_METHODS.POST; // 'POST'
```

### Type Utilities

```typescript
import { unionTypeToArray } from '@retts/frontend-helper';

// Create type-safe array from union type
type Status = 'active' | 'inactive' | 'pending';
const statusArray = unionTypeToArray<Status>();
const statuses = statusArray('active', 'inactive', 'pending');
```

### Monads

#### Either Monad

```typescript
import { Either } from '@retts/frontend-helper';

// Handle success/error cases functionally
const result = Either.right(42);
const error = Either.left('Something went wrong');

result.fold(
  (err) => console.error(err),
  (val) => console.log(val) // Logs: 42
);
```

#### EitherAsync Monad

```typescript
import { EitherAsync } from '@retts/frontend-helper';

// Handle async operations with Either
const asyncResult = EitherAsync.fromPromise(
  fetch('/api/data').then(r => r.json())
);

await asyncResult.fold(
  (err) => console.error('Failed:', err),
  (data) => console.log('Success:', data)
);
```

#### UseCase Base Class

```typescript
import { UseCase } from '@retts/frontend-helper';

// Create use case classes for business logic
class GetUserUseCase extends UseCase<{ userId: string }, User> {
  async execute(params: { userId: string }) {
    // Your implementation
  }
}
```

## Build Commands

```bash
# Build the package (ESM + CJS + types)
npm run build

# Build in watch mode (for development)
npm run dev

# Clean build artifacts
npm run clean
```

## Package Structure

After building, the package includes:

```
dist/
├── index.js          # ES Module
├── index.cjs         # CommonJS
├── index.d.ts        # TypeScript declarations (ESM)
├── index.d.cts       # TypeScript declarations (CJS)
└── *.map             # Source maps
```

## TypeScript Configuration

The package is built with strict TypeScript settings and includes:

- Full type definitions (`.d.ts` files)
- Source maps for debugging
- ES2020 target for modern JavaScript features
- Bundler module resolution

## Browser Support

This package targets ES2020, which is supported by:

- Chrome 80+
- Firefox 72+
- Safari 13.1+
- Edge 80+
- Node.js 14+

## Contributing

1. Make changes in `src/` directory
2. Run `npm run build` to verify
3. Ensure TypeScript types are correct
4. Test the build output

## License

ISC

## Notes

Some modules with external dependencies are not exported by default:

- **Crypto** - Requires Vite environment variables
- **Date** - Requires moment.js and config
- **JsonConvert** - Requires json2typescript
- **Utils** - Requires html-to-text and juice

To use these, you'll need to import them directly and install peer dependencies.
