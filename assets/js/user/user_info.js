$(function () {
    // var form = layui.form
    // var layer = layui.layer
    var form = layui.form
    var layer = layui.layer

    form.verify({
        //    nickname: function(value) {
        //     if(value.length > 6){
        //         return '昵称长度必须在1 ~ 6 个字符之间！'
        //     }
        //    }
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()

    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
            }

        })
    }

    //重置表单的提交事件
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
       $.ajax({
           method:'POST',
           url:'/my/userinfo',
           data:$(this).serialize(),
           success:function(res){
            if(res.status !== 0){
                return layer.msg('更新用户信息成功！')
            }
            
            layer.msg('更新用户信息成功')
            console.log(window);
            console.log( window.parent);
            window.parent.getUserInfo()
           }
          
       })
    })
   
})
