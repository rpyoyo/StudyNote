// lodash memoize

function memoize (fn) {
    let cache = {}
    return function () {
        const key = JSON.stringify(arguments)
        cache[key] = cache[key] || fn(...arguments)
        return cache[key]        
    }
}

function hello (t) {
    console.log('hello', t)
    return t ** 2
}

const h = memoize(hello)

console.log(h(3))
console.log(h(3))
console.log(h(3))
console.log(h(3))