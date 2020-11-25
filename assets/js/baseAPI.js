// 开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";

    // 处理参数：
    // jq在发起ajax请求时 都会先运行ajaxPrefilter函数
    $.ajaxPrefilter(function (value) {
        value.url = baseURL + value.url
    })