// curry
function curry (fn) {
    return function (...args) {
        if (args.length < fn.length) {
            return function() {
                return fn(...args, ...arguments)
            }
        }
        return fn(...args)
    }
}

// test

function getSum (a, b, c) {
    return a + b + c
}

const curried = curry(getSum)
console.log(curried(1,2,3))
console.log(curried(1)(2,3))
console.log(curried(1,2)(3))