/*
 params:
    --url: 请求地址的url
    --opts: {
        param: 与后端约定请求的字段名称，默认是callback
        prefix: 指定回调函数params的回调句柄前缀，默认为__jp
        name: 指定回调函数的句柄 默认是__jp+数字
        timeout: 设定一个响应时间，默认为60000ms，如果在设定设计内没有响应，则会提交error
    
    }
    --fn: 请求事件的回调函数，负责接收 data 响应数据和请求失败的error信息
*/

var debug = require('debug')('jsonp')
//准备的空函数
function noop() {}

function jsonp(url, opts, fn) {
    //只传了两个参数且第二个参数是function
    if (typeof opts === 'function') {
        fn = opts
        opts = {}
    }
    //只传递了一个参数
    if (!opts) {
        opts = {}
    }
    var prefix = opts.prefix || '__jp'
    var id = opts.name || (prefix + (count++))
    var param = opts.param || 'callback'
    var timeout = null != opts.timeout ? opts.timeout : 6000
    var enc = encodeURIComponent
    // head节点或者第一个<script>节点
    var target = document.getElementsByTagName('script')[0] || document.head
    var script = null
    var timer = null

    window[id] = function(data) {
        debug('jsonp got', data)
        //恢复初始值
        cleanup()
        //返回数据
        if (fn) {
            fn(null, data)
        }
    }

    // 超时后
    if (timeout) {
        timer = setTimeout(() => {
            cleanup()
            if (fn) {
                fn(new Error('Timeout'))
            }
        }, timeout)
    }

    //恢复初始值
    function cleanup() {
        if (script.parentNode) {
            script.parentNode.removeChild(script)
        }
        window[id] = noop
        if (timer) {
            clearTimeout(timer)
        }
    }


    //返回取消对jsonp模块的使用的函数
    function cancel() {
        if (window[id]) {
            cleanup();
        }
    }

    

    //url拼接,param默认是callback,拼接到url后面，而后面的enc(id)值就是key:value索要解析到的值
    // 服务端**params.opts.param**进行解析调用下面这句id的方法
    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id)
    // 防止拼接错误出现"？&",然后进行替换
    url = url.replace('?&', '?')
    // 调试url
    debug('jsonp req "%s"', url)

    //生成script标签
    script = document.createElement('script')
    script.src = url
    //插入到head节点或者第一个<script>节点的前面（c.insertBefore(a,b) 是将a插入c中b的前面）
    target.parentNode.insertBefore(script, target)

    return cancel
}

function JsonpPromise(url, data, option) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + paramHandler(data)
    // 防止拼接错误
    url = url.replace('?&', '?')
    return new Promise((resolve, reject) => {
        jsonp(url, option, (err, data) => {
            !err ? resolve(data) : reject(err)
      })
    })
}

function paramHandler(data) {
    let url = ''
    for (let k in data) {
      let value = data[k] !== undefined ? data[k] : ''
      url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}

module.exports = JsonpPromise