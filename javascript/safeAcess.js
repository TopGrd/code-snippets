/**
 * @安全访问对象属性
 * @param {*} value
 * @param {*} access
 * @param {*} defaultValue
 * @returns
 */
const safeAccess = (value, access, defaultValue) => {
  const arr = access.split ? access.split('.') : access;
  return arr.reduce((prev, cur) => prev && prev[cur], value) || defaultValue;
};

// example
// const exp = {
//   a: {
//     c: 1
//   }
// }

// safeAccess(exp, 'b', 'noValue') // log: noValue
// safeAccess(exp, 'a.c') // 1
