$(function () {
    var layer = layui.layer
    var form = layui.form
    // 文章类别列表展示
    initArtCateList()

    // 封装函数
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取成功
                // layer.msg(res.message)
                // 渲染数据
                var htmlStr = template("tpl-table", res)
                $("tbody").html(htmlStr)
            }
        })
    }
    var indexAdd = null
    // 点击添加类别
    $("#btnAdd").on("click", function () {
        // 弹框
        indexAdd = layer.open({
            type: 1,      // 代表页面层
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $("#dialog-add").html()
        });
    })

    // 弹框中点击确认按钮 添加类别  事件代理
    $("body").on("submit", "#form_add", function (e) {
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: {
                name: $("[name=name]").val(),
                alias: $("[name=alias]").val()
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您！添加成功")

                // 渲染页面
                initArtCateList()
                // 关闭弹框  layui封装方法
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    // 点击编辑按钮 弹框    事件委托
    $("tbody").on("click", ".btn-edit", function () {
        indexEdit = layer.open({
            type: 1,      // 代表页面层
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $("#dialog-edit").html()
        });

        // console.log($(this).attr("data-Id"));
        //  拿到对应编辑按钮的id
        var Id = $(this).attr("data-Id")
        // 发送请求 渲染表单数据
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + Id,
            success: function (res) {
                form.val("form-edit", res.data)
            }
        })
    })

    // 点击确定修改 修改对应数据
    $("body").on("submit", "#form_edit", function (e) {
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 修改成功 渲染页面
                initArtCateList()
                // 关闭弹框
                layer.close(indexEdit)
            }
        })
    })

    // 点击删除功能
    $("body").on("click", ".btn-delete", function () {
        var Id = $(this).attr("data-Id")
        // 弹出询问框
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            // 发送请求 删除对应id的数据
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("删除成功！")
                    // 渲染页面
                    initArtCateList()
                }
            })

            layer.close(index);
        });

    })
})