
/** 
 *  tco目前只有Safari的js引擎支持，Chrome和Nodejs以前支持过
     function foo(x) {
       return x
     }

      // 尾调用
     function bar(y) {
       return foo(y + 1)
     }

      // 非尾调用
     function baz() {
       return 1 + bar(40)
     }

     baz()   // 输出42
 *  如果支持TCO的引擎能够意识到foo(y+1) 调用位于尾部，这意味着 bar(...) 基本上已经完成了，
 *  那么在调用foo(...)时，它就不需要创建一个新的帧栈，而是可以重用已有的 bar(...) 的帧栈。这样不仅速度快，而且节省内存。
 *  
 *  在简单的代码片段中，这类优化算不了什么，但是在处理递归时，这就解决了大问题，特别是如果递归可能会导致成千上百个栈帧的时候。
 *  有了TCO，引擎可以用同一个栈帧执行所有的这类调用。
 *
 *  tco缺点是缺失了调用栈信息导致debug困难
 */ 

// 实现一个阶乘函数

// 用循环实现
const factorial = (n) => {
  if (n < 2) return 1
  let res = 1 
  for (let i = n; i > 1; i--) {
    res *= i
  }
  return res
}
// factorial(4) = 24

// 用递归实现 
const factorial = (n) => {
  if (n < 2) return 1 // base case
  return factorial(n - 1) * n
}
// factorial(4) = 24

// 用尾递归实现 
const tco_factorial = (n) => {  //1.写一个wrapper函数包住原来的递归函数
  function factorial(n, res) {  //2.添加一个参数记录上一次递归计算的结果
    if (n < 2) return res 
    return factorial(n - 1, res * n) // 改成尾调用
  }
  return factorial(n, 1) // 3.添加的参数的初始值为原来递归函数的base case
}
// tco_factorial(4) -> factorial(4, 1) = 24

