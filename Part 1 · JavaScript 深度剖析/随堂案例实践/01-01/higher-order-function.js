// forEach
const forEach = (array, fn) => {
    for (let t of array) {
        fn(t)
    }
}

// filter
const filter = (array, fn) => {
    let result = []
    for (let t of array) {
        fn(t) && result.push(t)
    }
    return result;
}

// once
const once = (fn) => {
    let done = false
    return (...args) => {
        if (!done) {
            done = true
            return fn.apply(this, args)
        }
    }
}

// map
const map = (array, fn) => {
    let result = []
    for (let t of array) {
        result.push(fn(t))
    }
    return result
}

// every
const every = (array, fn) => {
    for (let t of array) {
        if(!fn(t)) {
            return false
        }
    }
    return true
}

// some
const some = (array, fn) => {
    for (let t of array) {
        if(fn(t)) {
            return true
        }
    }
    return false
}


// test
let a = [1, 3, 4, 8, 9]

forEach(a, function (item) {
    console.log(item)
})

let t = filter(a, function (item) {
    return item % 2 === 0;
})

console.log(t)

let pay = once(function(n) {
    console.log(n)
})

pay(1)
pay(1)
pay(1)
pay(1)


console.log(map(a, v => v ** 2))

console.log(every(a, t => t < 8))