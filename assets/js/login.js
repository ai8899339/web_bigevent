$(function () {
    //点击去注册的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide().siblings('.reg-box').show()
    })
    //点击去登陆的链接
    $('#link_login').on('click', function () {
        $('.login-box').show().siblings('.reg-box').hide()
    })

    // 从layUI中获得from对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数之定义效验规则。from身上提供一个方法verify()
    form.verify({
        pwd: [
            //自定义一个校验规则
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function (value) {
            //通过形参拿到得是确认密码框的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于判断
            //如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //监听表单注册提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [ name=username]').val(), password: $('#form_reg [ name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click()
        })
    })
    //监听登陆表单的登陆事件
    $('#form_login').submit(function (e) {
      
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                console.log(res);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
                //跳转后台主页
                location.href ='/index.html'
            }
        })
    })

})