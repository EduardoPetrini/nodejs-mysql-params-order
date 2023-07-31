This is a NodeJS module that ensures the order of the parameters according to the query with annotated parameters name.

## Installation

```
npm install nodejs-mysql-params-order
```

## Usage

```
import ensureOrderFromObject from 'nodejs-mysql-params-order';

const sqlText = 'id = @id and name = @name';
const objectParams = { id: 1, name: 'Eduardo' };

const correctOrderParams = ensureOrderFromObject(sqlText, objectParams);

console.log(correctOrderParams); // [1, 'Eduardo']
```

## License

This project is licensed under the ISC License.
