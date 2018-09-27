/**
 * 一串英文排序
 * @param {*} params
 */
function sortEnglishWord(a, b) {
  return +(a.length > b.length) || +(a === b) - 1
}
