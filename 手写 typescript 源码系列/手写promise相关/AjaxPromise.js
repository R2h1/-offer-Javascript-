// 默认参数
var optionsDefalut = {
    url: '#',
    method:  'GET',
    async: true,
    timeout: 0, 
    data: null,
    dataType: 'text',
    headers: {},
    onprogress: function (){},
    ouploadprogress: function() {},
    xhr: null   //允许在函数外部创建xhr传入
}

const AjaxPromise1 = function(optionsOverride) {
    //参数合并
    let options = Object.assign({}, optionsDefalut, optionsOveride)
    options.xhr = options.xhr || new XMLHttpRequest()
    let xhr = options.xhr
    const promise = new Promise((resolve, reject) => {
        xhr.open(options.method, options.url, options.async)
        xhr.timeout = options.timeout
        for (let i in options.headers) {
            xhr.setRequestHeader(i, options.headers[k])
        }
        xhr.onprogress = options.onprogress
        xhr.upload.onprogress = options.onuploadprogress
        xhr.responseType = options.dataType
        xhr.onabort = () => {
            reject(new Error({
                errorType: 'abort_error',
                xhr: xhr
            }))
        }
        xhr.ontimeout = () => {
            reject({
                errorType: 'timeout_error',
                xhr: xhr
            })
        }
        xhr.onerror = () => {
            reject({
                errorType: 'onerror',
                xhr: xhr
            })
        }
        xhr.onloadend = () => {
            if ((xhr.status >= 200) && xhr.status < 300) {
                resolve(xhr)
            } else {
                reject({
                    errorType: 'stauts_error',
                    xhr: xhr
                })
            }
        }
        try {
            xhr.send(options.data)
        } catch (err) {
            reject({
                errorType: 'send_error',
                xhr: xhr
            })
        }
    })
    return promise
}

//简易版
const AjaxPromise2 = function(url) {
    return new Promise((resolve, reject) => {
        const handler = function() {
            if (this.readyState !== 4) return
            this.status === 200 ? resolve(this.response) : reject(new Error(this.statusText))
        }
        xhr.open('GET', url)
        xhr.onreadystatechange = handler
        xhr.responseType = 'json'
        xhr.setRequestHeader('Accept', 'application/json')
        try {
            xhr.send()
        } catch (err) {
            reject({
                errorType: 'send_error',
            })
        }
    })
}