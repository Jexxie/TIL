/**
 *  rewrite some javascript built-in array methods in functional programming style
 */
// array for testing
const wholes =  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// array helpers
const concat = (array1, array2) => {
  return array1.concat(array2);
}

const length = (array) => {
  return array.length
}

const head = (array) => {
  return array[0]
}

const tail = (array) => {
  return array.slice(1)
}

// implement filter, map and reduce
const filter = (filterFn, array) => {
  if (length(array) === 0) return [];
  const firstItem = head(array);
  const filteredFirst = filterFn(firstItem) ? [firstItem] : [];
  return concat(filteredFirst, filter(filterFn, tail(array)));
}

const map = (fn, array) => {
  if (length(array) === 0) return [];
  return concat([fn(head(array))],map(fn, tail(array)))
}

const reduce = (reducerFn, initialValue, array) => {
  if (length(array) === 0) return initialValue;
  const newInitialValue = reducerFn(initialValue, head(array));
  return reduce(reducerFn, newInitialValue, tail(array));
}

// test filter funcition
greaterThanFour = filter(n => n > 4, wholes)

// 求质数
const isPrime = (n) => {
  if (n <= 1) return false;
  const wholes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const possibleFactors = filter(m => m > 1 && m < n, wholes);
  const factors = filter(m => n % m === 0, possibleFactors);
  return factors.length === 0 ? true : false;
}

primes = filter(isPrime, wholes) // [2,3,5,7]

// test map function
doubled = map(n => n * 2, wholes) // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// test reduce function
sum = reduce(
  (accumulator, value) => {
    return accumulator + value
  },
  0,
  wholes
) // 55

max = reduce(
  (acc, val) => {
    return val > acc ? val : acc;
  },
  0,
  [7, 1, 3, 5, 6, 2, 8, 10, 0, 4, 9] // 顺序打乱
) // 10
