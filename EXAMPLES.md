# Quick Start Examples

## Installation

```bash
npm install @retts/frontend-helper
```

## Example 1: Form Validation

```typescript
import { isString, isEmail, isNumber, hasValue } from '@retts/frontend-helper';

interface FormData {
  name: string;
  email: string;
  age: number;
}

function validateForm(data: FormData): string[] {
  const errors: string[] = [];

  if (!isString(data.name) || !hasValue(data.name)) {
    errors.push('Name is required');
  }

  if (!isString(data.email) || !hasValue(data.email)) {
    errors.push('Email is required');
  }

  if (!isNumber(data.age)) {
    errors.push('Age must be a number');
  }

  return errors;
}
```

## Example 2: Working with Nested Data

```typescript
import { 
  flatenNestedArray, 
  getPath, 
  searchNestedArray 
} from '@retts/frontend-helper';

// Sample nested menu structure
const menuData = [
  {
    id: 1,
    name: 'Dashboard',
    children: [
      {
        id: 2,
        name: 'Analytics',
        children: [
          { id: 3, name: 'Reports' },
          { id: 4, name: 'Charts' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Settings',
    children: [
      { id: 6, name: 'Profile' },
      { id: 7, name: 'Security' }
    ]
  }
];

// Flatten the entire structure
const flatMenu = flatenNestedArray(menuData, 'children');
console.log(flatMenu);
// [{ id: 1, name: 'Dashboard' }, { id: 2, name: 'Analytics' }, ...]

// Find path to a specific item
const path = getPath(menuData, 'id', 3, 'children');
console.log(path);
// ['Dashboard', 'Analytics', 'Reports']

// Search for items
const results = searchNestedArray(menuData, 'name', 'Report', 'children');
console.log(results);
// [{ id: 3, name: 'Reports' }]
```

## Example 3: Working with Objects

```typescript
import { 
  getObjByKeyValFromArray,
  getObjValByKeyFromObj,
  generateDatasetObj 
} from '@retts/frontend-helper';

// Find user by ID
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'user' }
];

const user = getObjByKeyValFromArray(users, 'id', 2);
console.log(user);
// { id: 2, name: 'Bob', role: 'user' }

// Get nested value
const userData = {
  user: {
    profile: {
      name: 'Alice',
      age: 30
    }
  }
};

const name = getObjValByKeyFromObj(userData, 'user.profile.name');
console.log(name); // 'Alice'

// Generate HTML dataset attributes
const dataset = generateDatasetObj({
  userId: 123,
  userName: 'Alice',
  isActive: true
});
console.log(dataset);
// {
//   'data-userId': '123',
//   'data-userName': 'Alice',
//   'data-isActive': 'true'
// }

// Use in JSX/HTML
// <div {...dataset}>User Card</div>
// Results in: <div data-userId="123" data-userName="Alice" data-isActive="true">
```

## Example 4: Random Numbers and Colors

```typescript
import { 
  randomNumber,
  generateRandomColor,
  generateRandomColorClass 
} from '@retts/frontend-helper';

// Generate random number for dice roll
const diceRoll = randomNumber(1, 6);
console.log(`You rolled: ${diceRoll}`);

// Generate random number for pagination
const randomPage = randomNumber(1, 100);

// Generate random color for UI elements
const color = generateRandomColor('500');
console.log(color); // 'var(--blue-500)'

// Generate random Tailwind classes
const [textClass, bgClass] = generateRandomColorClass();
console.log(`Text: ${textClass}, Background: ${bgClass}`);
// Text: text-purple-50, Background: bg-purple-500

// Use in JSX
function RandomBadge({ text }: { text: string }) {
  const [textClass, bgClass] = generateRandomColorClass();
  return <span className={`${textClass} ${bgClass} px-3 py-1 rounded`}>{text}</span>;
}
```

## Example 5: Async Operations with Debouncing

```typescript
import { debounceTime } from '@retts/frontend-helper';

// Debounce API calls
async function searchWithDebounce(query: string) {
  console.log('User is typing...');
  
  // Wait for user to stop typing
  await debounceTime(500);
  
  console.log('Searching for:', query);
  const results = await fetch(`/api/search?q=${query}`);
  return results.json();
}

// Sequential actions with delays
async function processSteps() {
  console.log('Step 1');
  await debounceTime(1000);
  
  console.log('Step 2');
  await debounceTime(1000);
  
  console.log('Step 3 - Complete!');
}

// Polling with delay
async function pollData() {
  while (true) {
    const data = await fetch('/api/status');
    console.log('Status:', data);
    
    await debounceTime(5000); // Poll every 5 seconds
  }
}
```

## Example 6: Type-Safe Arrays

```typescript
import { unionTypeToArray } from '@retts/frontend-helper';

// Define union type
type UserRole = 'admin' | 'editor' | 'viewer';

// Create type-safe array
const createRoles = unionTypeToArray<UserRole>();

// TypeScript ensures all values are included
const roles = createRoles('admin', 'editor', 'viewer');
// ✅ Correct

// This would cause a TypeScript error:
// const incomplete = createRoles('admin', 'editor'); // ❌ Missing 'viewer'
// const invalid = createRoles('admin', 'editor', 'viewer', 'hacker'); // ❌ Invalid type

// Use in dropdown/select
function RoleSelect() {
  return (
    <select>
      {roles.map(role => (
        <option key={role} value={role}>{role}</option>
      ))}
    </select>
  );
}
```

## Example 7: Either Monad for Error Handling

```typescript
import { Either } from '@retts/frontend-helper';

// Function that might fail
function divide(a: number, b: number): Either<string, number> {
  if (b === 0) {
    return Either.left('Cannot divide by zero');
  }
  return Either.right(a / b);
}

// Use the result
const result = divide(10, 2);

result.fold(
  (error) => console.error('Error:', error),
  (value) => console.log('Result:', value)
);

// Chain operations
const calculation = Either.right(10)
  .map(x => x * 2)      // 20
  .map(x => x + 5)      // 25
  .map(x => x / 5);     // 5

calculation.fold(
  (err) => console.error(err),
  (val) => console.log(val) // 5
);
```

## Example 8: Comprehensive Type Checking

```typescript
import {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isArrayFull,
  isObject,
  isObjectFull,
  isNil,
  hasValue,
  isJson
} from '@retts/frontend-helper';

function processData(data: unknown) {
  if (isNil(data)) {
    return 'No data provided';
  }

  if (isString(data)) {
    if (isJson(data)) {
      return JSON.parse(data);
    }
    return data.toUpperCase();
  }

  if (isNumber(data)) {
    return data * 2;
  }

  if (isBoolean(data)) {
    return !data;
  }

  if (isArrayFull(data)) {
    return data.map(item => processData(item));
  }

  if (isObjectFull(data)) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = processData(value);
      return acc;
    }, {} as any);
  }

  return data;
}

// Test the function
console.log(processData('hello'));        // 'HELLO'
console.log(processData(42));             // 84
console.log(processData(true));           // false
console.log(processData([1, 2, 3]));      // [2, 4, 6]
console.log(processData({ a: 1, b: 2 })); // { a: 2, b: 4 }
```

## Example 9: Building a Data Grid

```typescript
import {
  isArrayFull,
  getObjValByKeyFromObj,
  generateDatasetObj
} from '@retts/frontend-helper';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataGridProps {
  data: any[];
  columns: Column[];
}

function DataGrid({ data, columns }: DataGridProps) {
  if (!isArrayFull(data)) {
    return <div>No data available</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} {...generateDatasetObj({ sortable: col.sortable })}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map(col => (
              <td key={col.key}>
                {getObjValByKeyFromObj(row, col.key)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage
const users = [
  { id: 1, profile: { name: 'Alice', email: 'alice@example.com' } },
  { id: 2, profile: { name: 'Bob', email: 'bob@example.com' } }
];

const columns: Column[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'profile.name', label: 'Name', sortable: true },
  { key: 'profile.email', label: 'Email' }
];

<DataGrid data={users} columns={columns} />
```

## Example 10: HTTP Methods Enum

```typescript
import { HTTP_METHODS } from '@retts/frontend-helper';

async function apiRequest(
  url: string, 
  method: HTTP_METHODS, 
  body?: any
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== HTTP_METHODS.GET) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  return response.json();
}

// Usage
apiRequest('/api/users', HTTP_METHODS.GET);
apiRequest('/api/users', HTTP_METHODS.POST, { name: 'Alice' });
apiRequest('/api/users/1', HTTP_METHODS.PUT, { name: 'Alice Updated' });
apiRequest('/api/users/1', HTTP_METHODS.DELETE);
```
