const fp = require('lodash/fp')

class Functor {
    constructor(value) {
        this._value = value
    }
    static of(value) {
        return new this.prototype.constructor(value)
    }
    map(fn) {
        return this.of(fn(this._value))
    }
}

class MayBe extends Functor {
    isNothing() {
        return this._value === null || this._value === undefined
    }
    map(fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
    }
}


let r = MayBe.of('hello')
            .map(x => x.toUpperCase())

console.log(r)

let t = MayBe.of(null)
            .map(x => x.toUpperCase())

console.log(t)


class IO extends Functor {
    static of(value) {
        return new IO(function() {
            return value
        })
    }
    map(fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
}

let x = IO.of(process).map(p => p.execPath)

console.log(x._value())