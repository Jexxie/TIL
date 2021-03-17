/** 
 * https://stackoverflow.com/questions/52881589/memoize-any-given-recursive-function-in-javascript
 */
function memoize(func) {
  const memo = {};
  const slice = Array.prototype.slice;

  return function() {
    const args = slice.call(arguments);

    if (args in memo)
      return memo[args];
    else
      return (memo[args] = func.apply(this, args));

  };
}

function fib(n) {
  if (n <= 1) return 1;
  return fib(n - 1) + fib(n - 2);
}

fib = memoize(fib);

console.log(fib(100));
