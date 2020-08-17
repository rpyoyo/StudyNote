### 函数一等公民 (First-class Function)
+ 函数可以存储在变量中
+ 函数可以作为参数
+ 函数可以作为返回值

###  高阶函数（Higher-order Function）
+ 可以把函数作为参数传递给另一个函数
+ 可以把函数作为另一个函数的返回结果

### 常用的高阶函数及模拟实现
+ forEach
```javascript
// forEach
const forEach = (array, fn) => {
    for (let t of array) {
        fn(t)
    }
}
```
+ filter
```javascript
// filter
const filter = (array, fn) => {
    let result = []
    for (let t of array) {
        fn(t) && result.push(t)
    }
    return result;
}
```
+ map
```javascript
// map
const map = (array, fn) => {
    let result = []
    for (let t of array) {
        result.push(fn(t))
    }
    return result
}
```
+ some
```javascript
// some
const some = (array, fn) => {
    for (let t of array) {
        if(fn(t)) {
            return true
        }
    }
    return false
}
```
+ every
```javascript
// every
const every = (array, fn) => {
    for (let t of array) {
        if(!fn(t)) {
            return false
        }
    }
    return true
}
```
+ once
```javascript
// once
const once = (fn) => {
    let done = false
    return (...args) => {
        if (!done) {
            done = true
            return fn.apply(this, args)
        }
    }
}
```

### 闭包 （Closure）
+ 函数及其周围的状态的引用捆绑在一起，组成闭包
    + 可以在另一个作用域中调用一个函数的内部函数，并访问到该函数的作用域中的成员
+ 闭包的本质：函数在执行时会放到一个执行栈上，当执行完成后会从执行栈上移除，**但是堆上的作用域成员因为被外部引用而不能被释放**，因此内部函数依然可以访问外部函数的成员

+ 箭头函数，闭包中this指向undefined，因为外层函数调用栈被释放?


### 纯函数
+ **相同的输入永远得到相同的输出**，且没有任何可观察的**副作用**
+ 数组的slice和splice分别是纯函数和不纯函数
    + slice返回数组指定部分，不会改变原数组
    + splice从原数组中移除的元素，并返回移除元素集合，会改变原数组
+ 函数式编程不会保留计算中间的结果，所以变量是不可变的（无状态的）

### Lodash
具体参见Lodash官网

### 纯函数的好处
+ 可缓存
     + 模拟实现lodash memoize
  
  ```javascript
  function memoize (fn) {
      let cache = {}
      return function () {
          const key = JSON.stringify(arguments)
          cache[key] = cache[key] || fn(...arguments)
          return cache[key]        
      }
  }
  ```


+ 可测试
+ 并行处理

      + 纯函数不需要访问共享内存数据

### 副作用
+ 使纯函数变得不纯
+ 副作用来源：外部数据依赖（接口、数据库、配置文件、全局变量等）
+ 副作用不可能完全禁止，尽可能控制在可控范围内

### 柯里化（Currying）
+ 当一个函数包含多个参数的时候先传递部分参数去调用他（这部分参数以后永远不变）
+ 然后返回一个新的函数接收剩余参数，并返回结果
+ 柯里化模拟实现
```javascript
// curry
function curry (fn) {
    return function (...args) {
        if (args.length < fn.length) {
            return function() {
                return fn(...args, ...arguments)
            }
        }
        return fn(...args)
    }
}
```

+ 柯里化总结
    + 柯里化可以使我们给一个函数传递较少的参数，生成一个记住了某些参数的新函数
    + 是一种对函数的缓存
    + 使函数的粒度更小
    + 可以将多元（多参数）函数转化为一元（单参数）函数

### 函数组合(compose)
+ 函数组合可以把细粒度的函数重新组合成新的函数

+ 如果一个函数需要多个函数处理才能得到最终值，我们可以将中间过程的函数合并成一个函数

+ 函数组合默认**从右向左**执行

+ compose函数模拟实现

  ```javascript
  // compose
  const compose = (...fns) => (...args) => fns.reduceRight((fn1, fn2) => ()=> fn2(fn1(...args)))()
  ```

+ lodash中的组合函数

  + flow() 从左向右组合执行
  + flowRight() 从右向左组合执行

+ lodash/fp模块

  + 提供了对函数式编程友好的方法
  + fp模块中提供的方法（例如：map、filter、split等）都是被柯里化的
  + 多个参数的方法函数优先，数据滞后（默认为数据优先、函数滞后，例如map(array, func))

+ lodash-map方法的小问题：parseInt参数问题

  + map(array, func(item, index, array))
  + parseInt(string, radix)
    + string 待parse字符串
    + radix 进制
  + map传递给parseInt 3个参数，将index当成了radix，由此引发问题
  + fp.map柯里化后的func只接收一个参数，因此没有此问题

+ 函数组合只能组合**单参数函数**？

+ PointFree

  + 不需要指明处理的数据
  + 只需要合成运算过程
  + 需要定义一些辅助的基本运算函数

### 函子（Functor）

+ 容器：包含值和值的变形关系（变形关系即函数）

+ 函子：是一个特殊的容器，通过一个普通对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行变形处理

+ 函子用来处理副作用、异步操作、异常处理等

+ 函子对象class实现

  ```javascript
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
  ```

+ 总结

  + 函数式编程的运算不直接操作值，而由函子完成
  + 函子就是一个实现了map契约的对象
  + 函子中封装了一个值，想要操作值，就给map传递一个处理值的函数（纯函数）
  + 最终返回一个新的函子

+ 函子介绍

  + MayBe函子

    + 用于处理空值（null、undefined）

    ```javascript
    class MayBe extends Functor {
        isNothing() {
            return this._value === null || this._value === undefined
        }
        map(fn) {
            return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
        }
    }
    ```

  + Either函子

    + 用于处理异常

    + 类似于if...else
    + Left函子 + Right函子

  + IO函子

    + IO函子的value是一个函数，将函数作为值来处理
    + IO函子可以把不纯的动作存储到_value中，延迟执行（惰性执行）

    ```javascript
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
    ```

  + Task函子

    + 用于处理异步任务

    ```javascript
    const { task } = require('folktale/concurrency/task')
    const { split, find } = require('lodash/fp')
    const fs = require('fs')
    
    function readFile(filename) {
        return task(resolver => {
            fs.readFile(filename, 'utf-8', (err, data) => {
                if(err) {
                    resolver.reject(err)
                }
                resolver.resolve(data)
            })
        })
    }
    
    readFile('package.json')
        .map(split('\n'))
        .map(find(x => x.includes('version')))
        .run()
        .listen({
            onRejected: e => console.log(e),
            onResolved: d => console.log(d),
        })
    ```

  + Pointed函子

    + 实现了of静态方法的函子
    + of静态方法避免了使用new 来创建对象
    + 更深层的含义是of方法用来把值放到上下文Context（把值放到容器中，使用map来处理）

  + Monad函子

    + 一个函子具有join和of两个方法，并遵守一定规律，就是Monad函子
    + 可以变扁的Pointed函子

+ folktale 一个标准的函数式编程库

  + 提供了compose、curry等函数
  + 提供了Task、Maybe、Either等函子

  + 用法自行百度

### 总结

