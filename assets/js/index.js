$(function () {
    // 获取用户信息
    getUserInfo()
    // 退出功能
    $("#btnLogout").on("click", function () {
        // 框架提供的询问框
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地token
            localStorage.removeItem("token")
            // 2.进行页面跳转
            location.href = "/login.html"
            // 3.关闭询问框
            layer.close(index);
        });
    })
})
// 获取用户信息封装函数  多次用到 所以要写到入口函数外面 当做全局方法
function getUserInfo() {
    // 发起ajax请求
    $.ajax({
        url: '/my/userinfo',
        // 请求头部属性直接封装到了baseURI函数里 这里不需要了
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            // console.log(res);
            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染用户头像信息
            renderAvatar(res.data)
        }
    })
    function renderAvatar(user) {
        // 1.用户名 优先使用昵称
        var name = user.nickname || user.username
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
        // 2.用户头像渲染
        if (user.user_pic !== null) {
            // 2.1有头像
            $(".layui-nav-img").show().attr("src", user.user_pic)
            $(".text-avatar").hide()
        } else {
            // 2.2没有头像
            $(".layui-nav-img").hide()
            var text = name[0].toUpperCase()
            $(".text-avatar").show().html(text)
        }
    }
}
