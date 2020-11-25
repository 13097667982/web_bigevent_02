$(function () {
  // 给两个链接绑定点击事件
  $("#link_reg").on('click', function () {
    $(".login-box").hide()
    $(".reg-box").show()
  })
  $("#link_login").on('click', function () {
    $(".login-box").show()
    $(".reg-box").hide()
  })

  // 从layui中先拿到form这个属性
  var form = layui.form;
  // 自定义校验规则
  form.verify({
    pwd: [
      // 密码规则
      /^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格'
    ],
    // 自定义确认密码规则
    repwd: function (value) {
      // 先拿到输入的密码
      // 属性选择器
      var pwd = $(".reg-box input[name=password]").val()
      if (pwd !== value) {
        return "两次输入的密码不一致"
      }
    }
  });
  // 注册功能
  var layer = layui.layer
  $("#form_reg").on("submit", function (e) {
    // 阻止默认行为
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: {
        username: $(".reg-box input[name=username]").val(),
        password: $(".reg-box input[name=password]").val()
      },
      success: function (res) {
        // console.log(res);
        // 判断状态码
        if (res.status !== 0) {
          return layer.msg(res.message, { icon: 5 })
        }
        // 注册成功
        layer.msg("恭喜您注册成功，可以去登录啦", { icon: 6 })
        // 手动切换到登录表单
        $("#link_login").click()
        // 清空注册表单
        $("#form_reg")[0].reset()
      }
    })
  })
  // 登录功能
  $("#form_login").submit(function (e) {
    // 阻止默认行为
    e.preventDefault()
    // 发起请求
    $.ajax({
      method: "POST",
      url: "/api/login",
      // 参数
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        // 判断状态码
        if (res.status !== 0) {
          return layer.msg(res.message, { icon: 5 })
        }
        // 登录成功
        layer.msg("恭喜您登录成功！", { icon: 6 })
        // 保存token到本地 之后要用
        localStorage.setItem("token",res.token)
        // 跳转页面至后台主页
        location.href="/index.html"
      }
    })
  })
})