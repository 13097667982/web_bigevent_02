$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss

    }

    // 时间补零函数
    function padZero(n) {
        return n > 9 ? n : "0" + n
    }
    // 1.定义提交参数
    var q = {
        pagenum: 1, // 页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: "", // 文章分类的id
        state: "", // 文章的状态，可选值有已发布或草稿
    }
    // 2.渲染内容区域
    initTable()
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                // 获取成功 渲染
                var htmlStr = template("tpl_table", res)
                $("tbody").html(htmlStr)

                randerPage(res.total)
            }
        })
    }
    initCate()
    // 3.渲染下拉菜单
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                // 渲染
                var htmlStr = template("tpl-cate", res)
                $("[name=cate_id]").html(htmlStr)
                form.render()
            }
        })
    }

    // 4.筛选功能
    $("#form-search").on("submit", function (e) {
        e.preventDefault()
        var cate_id = $("[name=cate_id]").val()
        var state = $("[name=state]").val()
        // 将这两个值提交给 q
        q.cate_id = cate_id
        q.state = state
        // 初始化内容区域
        initTable()
    })
    // 5.分页功能
    function randerPage(total) {
        // console.log(total);
        laypage.render({
            elem: "pageBox",   // 放分页符的容器直接写就可以
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,

            // 分页模块显示那些子模块
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
                jump: function (obj, first) {
                q.pagenum = obj.curr
                if (!first) {
                    // 初始化文章列表
                    initTable()
                }
            }
        })
    }
})  