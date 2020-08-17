// compose
const compose = (...fns) => (...args) => fns.reduceRight((fn1, fn2) => ()=> fn2(fn1(...args)))()
// const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value)

// test
const  a = [1, 2, 3, 4]

function first(a) {
    return a[0]
}
function reverse(a) {
    return a.reverse()
}
function hello(a) {
    return a * a
}

function toArray(a, b, c, d) {
    return [a, b, c, d]
}

function log(a) {
    console.log(a)
    return a
}

// 从右向左执行
console.log(compose(hello, first, reverse)(a))

console.log(compose(hello, first, reverse, toArray)(1, 2, 3, 4))


console.log(compose(compose(hello, first), reverse, toArray)(1, 2, 3, 4))


console.log(compose(hello, log, first, log, reverse)(a))
