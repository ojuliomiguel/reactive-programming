const fs = require('fs')
const path = require('path')
const { Observable } = require('rxjs')

function readDir(filesPath) {
    return new Observable(subscriber => {
        try {
            filesPath.forEach(file => {
                subscriber.next(file)
            })
            subscriber.complete()
        } catch (e) {
            subscriber.error(e)
        }
    })
}

function readFile() {
    return createPipeableOperator(subscriber => ({
        next(path) {
            try {
                const content = fs.readFileSync(path, {
                    encoding: 'utf-8'
                })
                subscriber.next(content.toString())
            } catch (e) {
                subscriber.error()
            }
        }
    }))
}

function filesEndingWith(extension) {
    return createPipeableOperator(subscriber => ({
        next(file) {
            if (file.endsWith(extension)) {
                subscriber.next(file)
            }
        }
    }))
}

function removeElementsIfEmpty() {
    return createPipeableOperator(subscriber => ({
        next(text) {
            if (text.trim()) {
                subscriber.next(text)
            }
        }
    }))
}

function removeElementsIfOnlyNumber() {
    return createPipeableOperator(subscriber => ({
        next(text) {
            const num = parseInt(text.trim())
            if (num !== num) {
                subscriber.next(text)
            }
        }
    }))
}


function removeSimbols(simbols) {
    return createPipeableOperator(subscriber => ({
        next(text) {
            const textWithoutSimbols = simbols.reduce(
                (acc, simbols) => {
                    return acc.split(simbols).join('')
                }
                , text)
            subscriber.next(textWithoutSimbols)
        }
    }))
}

function splitTextBy(simbol) {
    return createPipeableOperator(subscriber => ({
        next(text) {
            text.split(simbol).forEach(part => {
                subscriber.next(part)
            })
        }
    }))
}

function groupElements() {
    return createPipeableOperator(subscriber => ({
        next(words) {
            const gruped = Object.values(
                words.reduce((acc, word) => {
                    const el = word.toLowerCase()
                    const qtde = acc[el] ? acc[el].qtde + 1 : 1
                    acc[el] = { element: el, qtde }
                    return acc
                }, {}))
            subscriber.next(gruped)
        }
    }))
}

function createPipeableOperator(operatorFn) {
    return function (source) {
        return Observable.create(subscriber => {
            const sub = operatorFn(subscriber)
            source.subscribe({
                next: sub.next,
                error: sub.error || (e => subscriber.error(e)),
                complete: sub.complete || (e => subscriber.complete(e)),
            })
        })
    }
}

module.exports = {
    readDir,
    readFile,
    filesEndingWith,
    removeElementsIfEmpty,
    removeElementsIfOnlyNumber,
    removeSimbols,
    splitTextBy,
    groupElements,
}