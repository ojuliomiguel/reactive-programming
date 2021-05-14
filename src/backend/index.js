const { ipcMain } = require("electron");

const fn = require('./functions')
const _ = require('lodash')
const { toArray, map, groupBy, mergeMap } = require('rxjs/operators')


const simbols = [
    '.', '?', '-', ',', '"', '♪',
    '_', '<i>', '</i>', '\r', '[', ']',
    '(', ')', '!', ':'
]

ipcMain.on("process-subtitles", async function(event, paths) {
  fn.readDir(paths)
    .pipe(
        fn.filesEndingWith('.srt'),
        fn.readFile(),
        fn.splitTextBy('\n'),
        fn.removeElementsIfEmpty(),
        fn.removeElementsIfOnlyNumber(),
        fn.removeSimbols(simbols),
        fn.splitTextBy(' '),
        fn.removeElementsIfEmpty(),
        fn.removeElementsIfOnlyNumber(),
        groupBy(el => el),
        mergeMap(grupo => grupo.pipe(toArray())),
        map(palavras => ({ name: palavras[0], amount: palavras.length })),
        toArray(),
        map(array => _.sortBy(array, el => -el.qtde))
    )
    .subscribe(res => event.reply("process-subtitles", res))   
});


