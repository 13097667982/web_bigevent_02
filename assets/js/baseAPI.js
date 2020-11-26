// 开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";

// 处理参数：
// jq在发起ajax请求时 都会先运行ajaxPrefilter函数
$.ajaxPrefilter(function (value) {
    // 拼接对应函数的url地址
    value.url = baseURL + value.url

    // 对需要权限的借口配置头部信息
    // 必须以my开头才行   请求头部也会多次用到
    if (value.url.indexOf("/my/") !== -1) {
        value.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    // 3.防止用户在未登录的时候直接访问index.html，
    // 这时可以使用jq在发起ajax请求时不论成功与否都会执行的templete函数，可以获取到用户的登录状态码和秒睡信息
    value.complete = function (res) {
        // console.log("complete函数被执行了");
        // console.log(res);
        var obj = res.responseJSON
        // 判断
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 强制清空token  并且返回到登录页面
            localStorage.removeItem("token")
            location.href = "/login.html"
        }
    }
})
