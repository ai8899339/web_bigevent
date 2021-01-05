$(function(){
    //调用getUserinfo获取用户信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function(){
        // 提示用户是否退出
        layer.confirm('确定退出登陆?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储中的taken
            localStorage.removeItem('token')
            // 重新跳转道登录页面
            location.href = '/login.html'
            layer.close(index);
          }); 
    })
})



//获取用户的基本信息
function getUserInfo() {
    $.ajax ({
        method:'GET',
        url:'/my/userinfo',
      //headers就是请求头在登陆的时候登陆成功了还的吧请求的头储存到本地不然会身份认证失败
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res)
            if(res.status !== 0) {
               return layui.layer.msg('获取用户信息失败') 
            }
           renderAvatar(res.data) 
        }
        //不论成功还是失败，最终都会调用complete 回调函数
        // complete: function(res){
        //     // console.log('执行了 complete 会调');
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1强制清空 token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转登陆页面
        //         // location.href = '/login.html'
        //         location.href = '/login.html' 
        //     }
           
        // }
    })
}


//渲染用户头像
function renderAvatar(user){
    // 1.获取用户的名称
    var name  = user.nickname || user.username
    //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
    //3.按需渲染用户头像
    if(user.user_pic !== null){
       $('.layui-nav-img').attr('src', user.user_pic).show() 
       $('.text-avatar').hide()
    } else{
    //    3.2渲染文本头像 
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show
    }
}
