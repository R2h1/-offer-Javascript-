import { isIterable } from '.';

console.log(isIterable([]));
console.log(isIterable({}));
console.log(isIterable(''));
console.log(isIterable(new Set()));
console.log(isIterable(new Map()));
console.log(isIterable(undefined));
console.log(isIterable(null));
console.log(isIterable(true));