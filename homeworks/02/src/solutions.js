module.exports = {
    /**
     * Returns an empty object without prototype. There is object creation type that creates object without prototype
     */
    createPrototypelessObject() {
        return Object.create(null)
    },

    /**
     * Returns an object with prototype set to given `proto`.
     * @param {Object} proto Prototype object
     */
    createObjectWithPrototype(proto) {
        return Object.create(proto)
    },

    /**
     * Returns an object with `value` property set to the given `value` and `getValue` method.
     * Be careful, if `value` changes, `getValue` should return changed `value`.
     * @param {any} value
     */
    createObjectWithMethod(value) {
        return {
            value,
            // We need function declaration here (not arrow function) to have access to `this` keyword
            getValue: function () {
                return this.value
            }
        }
    },

    /**
     * Returns an object with the `getValue` and `setValue` methods, having `value` hidden from the outside.
     */
    createEncapsulatedObject() {
        // Closure
        let value = null
        return {
            getValue: function () {
                return value
            },
            setValue: function (newValue) {
                value = newValue
            }
        }
    },

    /**
     * Returns the shallow copy of the given `obj`. HINT: This **operator** will be used later.
     * @param {Object} obj
     */
    shallowCopy(obj) {
        return { ...obj } // Shallow copy: A copy of the objects and its immediate properties, but not nested objects (they are still references to the same objects as in the original object)
    },

    /**
     * Returns the deep copy of the given `obj`.
     * @param {Object} obj
     */
    deepCopy(obj) {
        return structuredClone(obj) // Deep copy: A copy of the object and all its nested objects
    },

    /**
     * Returns an array containing 2 elements which are
     * loosely equal, but strictly unequal.
     */
    looselyTrue() {
        return [1, true] // loose equality: ==, strict equality: ===
    },

    /**
     * Returns a string that is loosely equal to boolean `true`. This one is tricky :)
     */
    stringLooselyEqualToTrue() {
        return '1' // When comparing different types with ==, JS converts them to numbers: '1' is converted to number 1, and boolean true is also converted to number 1, so they are loosely equal
    },

    /**
     * Returns correct sum of a and b.
     */
    safeSum(a, b) {
        return Number(a) + Number(b) // Unary plus operator also converts its operand to a number
    },

    /**
     * Returns formatted string for the given date.
     * Format should be `{day}-{month}-{fullYear}` (all numbers).
     * @param {Date} date
     */
    formatDate(date) {
        const day = date.getDate()
        const month = date.getMonth() + 1 // Month is zero-based
        const fullYear = date.getFullYear()
        return `${day}-${month}-${fullYear}`
    },

    /**
     * Sorts the given `numberArray` in ascending order.
     * Use array `.sort` method. Sort is done in place so there is no need to return anything.
     * @param {number[]} numberArray
     */
    sortNumberArray(numberArray) {
        numberArray.sort((a, b) => a - b) // By default .sort() sorts elements as strings, so we need to provide a compare function to sort numbers
    },

    /**
     * Multiplies all the elements in the array by 2 _in place_
     * (edits the given array) and returns it.
     * @param {number[]} numberArray
     */
    multiplyArrayByTwo(numberArray) {
        numberArray.forEach((element, index) => {
            numberArray[index] = element * 2
        })
        return numberArray
    },

    /**
     * Multiplies all the elements in the array by 2 and returns them
     * in a new array.
     * @param numberArray
     */
    multiplyArrayByTwoNew(numberArray) {
        return numberArray.map(element => element * 2)
    },

    /**
     * Returns first `n` Fibonacci numbers in an array. https://en.wikipedia.org/wiki/Fibonacci_sequence
     * If the n is <= 0, return `undefined`
     * @param n
     */
    fibonacciNumbers(n) {
        if (n <= 0) return undefined
        if (n === 1) return [0]
        const fibonacci = [0, 1]
        for (let i = 2; i < n; i++) {
            fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]
        }
        return fibonacci
    },

    /**
     *
     * EXTRA CREDIT TASK (no points):
     *
     * Create two classes: `Person` and `Programmer`. `Programmer` class extends `Person`.
     * Person class has `name` property (set via constructor) and `getName` method (calls `callGetName` with name`).
     * Programmer class has `language` property provided to constructor (and `name` inherited from `Person`) and `getLanguage` method (calls `callGetLanguage` with `language`)
     * Return object with created classes, `return { Person, Programmer }`.
     *
     * NOTE: class methods should use `bind`, function expression syntax might not work here because code isn't transpiled.
     *
     * @param {Function} callGetName
     * @param {Function} callGetLanguage
     */
    classInheritance(callGetName, callGetLanguage) {
        class Person {
            constructor(name) {
                this.name = name
                this.getName = this.getName.bind(this)
            }

            getName() {
                return callGetName(this.name)
            }
        }

        class Programmer extends Person {
            constructor(name, language) {
                super(name)
                this.language = language
                this.getLanguage = this.getLanguage.bind(this)
            }

            getLanguage() {
                return callGetLanguage(this.language)
            }
        }

        return { Person, Programmer }
    },

    /**
     * **This is variant of probably most common "big firm" interview question with closures.**
     *
     * If you can't find a solution yourself, you can Google and paste it, and try to understand why it works like that.
     * We will also explain it in the nearest lecture.
     *
     * This task has easier solutions (e.g. using `let` instead of `var`), but desired solutions included Closures.
     *
     * Call the `consumer` function once every second three times giving it loop iterator as argument.
     * Use the provided for loop, do not change for loop, but feel free to modify setTimeout.
     * @param {Function} consumer
     */
    timeoutIncrement(consumer) {
        for (var i = 1; i <= 3; i += 1) {
            setTimeout(
                (function () {
                    let j = i
                    return function () {
                        consumer(j)
                    }
                })(),
                1000 * i
            )
        }
    }
}
