/**
 * 深拷贝-简单对象/一维对象
 * var obj = { "a": 1, "b": 2 };
 */
var objDeepCopy_simple = function(source){
    var sourceCopy = {};
    for (var item in source) sourceCopy[item] = source[item];
    return sourceCopy;
}

/**
 * 深拷贝-复杂对象/多维对象
 * var obj = { "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }; 
 */
var objDeepCopy = function (source) {
    var sourceCopy = {};
    for (var item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    return sourceCopy;
}
/**
 * 深拷贝-复杂对象/多维数组_对象
 * 
 * var obj = [{ "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 5 }]];
 */
var objArrDeepCopy = function (source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}