# CustomError

CustomError is a simple JavaScript class that extends the built-in Error class to provide custom error handling with optional details.

```javascript
const error = new CustomError('An error occurred', { code: 500, reason: 'Internal Server Error' });

try {
  throw error;
} catch (exception) {
  console.error(exception.message); // Output: An error occurred
  console.error(exception.details); // Output: { code: 500, reason: 'Internal Server Error' }
}
```
