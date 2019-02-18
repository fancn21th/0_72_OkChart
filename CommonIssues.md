# Common Issues In Dev

## Mutator

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Mutator_methods

- mutator method cause unexpected behavior since the original object has been silently altered

```javascript
var top10 = collection
  .reverse()
  .slice(0, 10)
  .map(item => ({
    item: item[0],
    count: parseInt(item[1], 10),
    percent: parseInt(item[1], 10) / totalCount,
  }))
```
