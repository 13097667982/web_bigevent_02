$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取文章分类 封装函数 初始化文章分类
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取成功 渲染
                var htmlStr = template("tpl-cate", res)
                $("[name=cate-id]").html(htmlStr)
                // 调用layui内置方法渲染  lyui内部是用dl+dd做的下拉菜单
                form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()
    // 实现基本裁剪效果
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 点击按钮 提交图片
    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click()
    })

    // 设置图片
    $("#coverFile").on("change", function (e) {
        // console.log(e);
        var file = e.target.files[0]
        // 非空校验
        if (file === undefined) {
            return layer("请选择要上传的图片")
        }
        // 根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 设置状态
    var state = "已发布"
    $("#btnSave2").on("click", function (e) {
        state = "存为草稿"
    })

    // 发布
    $("#form-pub").on("submit", function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append("state", state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob)
                publishArticle(fd)
            })

    })

    // 发布文章函数
    function publishArticle(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.massage)
                }
                layer.msg("恭喜您！文章发表成功")
                // 将页面跳转至文章列表页
                location.href = "/article/art_list.html"
            }
        })
    }
})