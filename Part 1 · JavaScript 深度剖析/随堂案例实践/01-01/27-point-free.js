const _ = require('lodash')
const fp = require('lodash/fp')

// Hello World -> hello_world
const f = fp.flowRight(fp.replace(/\s+/g, '_') ,fp.toLower)

console.log(f('Hello World'))


// world wide web -> W.W.W
const ff = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.toUpper, fp.first)) ,fp.split(' '))

console.log(ff('world wide web'))