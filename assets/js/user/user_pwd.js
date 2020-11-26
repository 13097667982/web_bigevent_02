$(function () {
    // 自定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "新旧密码不能相同"
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次输入的密码不一致"
            }
        }
    })
    // 表单提交  修改用户密码信息
    var layer = layui.layer
    $(".layui-form").on("submit", function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 发起请求
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改密码失败")
                }
                // 成功
                layer.msg("恭喜您！修改密码成功")
                // 清空表单
                $(".layui-form")[0].reset()
            }
        })
    })
})