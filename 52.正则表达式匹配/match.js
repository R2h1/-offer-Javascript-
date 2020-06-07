/*
请实现一个函数用来匹配包括'.'和'*'的正则表达式。
模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。
在本题中，匹配是指字符串的所有字符匹配整个模式。
例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配
*/

function match1(s,pattern) {
    return new RegExp("^" + pattern + "$", "g").test(s);
}

function match2(s, pattern) {
    if(!pattern) return !s;
    if(pattern[1] == '*'){
        return match2(s, pattern.substr(2)) || (s && (s[0] == pattern[0] || pattern[0] == '.')) && match2(s.substr(1), pattern);
    } else {
        return s && (s[0] == pattern[0] || pattern[0] == '.') && (match2(s.substr(1), pattern.substr(1)));
    }
}

var s = 'aaa',
    pattern = 'ab*ac*a'
console.log(match1(s,pattern))
console.log(match2(s,pattern))