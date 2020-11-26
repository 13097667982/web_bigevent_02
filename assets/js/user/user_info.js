$(function () {
    // 自定义校验规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    })

    // 用户渲染
    initUserInfo()
    var layer = layui.layer;
    // 封装渲染函数
    function initUserInfo() {
        // 请求ajax
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                // 判断状态码
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功后 渲染
                form.val("formUserInfo", res.data)
            }
        })
    }

    // 点击重置按钮 重置表单
    $("#btnReset").on("click", function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 重置不是清空 而是重置回获取到的数据
        initUserInfo()
    })

    // 点击修改用户信息
    $(".layui-form").on("submit", function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 发送ajsx请求
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                // 判断状态码
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败")
                }
                // 成功
                layer.msg("恭喜您！用户信息修改成功")
                // 调用父页面的属性渲染头像
                window.parent.getUserInfo()
            }
        })
    })
})