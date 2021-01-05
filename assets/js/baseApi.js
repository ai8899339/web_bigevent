//每次调用$.get()或$.POST()或$.ajax()的时候会先调用ajaxPrefilter这个函数
//options中有ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options.url);
    //再发起正真的ajax之前同一拼接的请求的根路径
    options.url ='http://api-breakingnews-web.itheima.net' + options.url
    //同一为有权线的接口，设置headers请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }   
    } 
    options.complete = function(res){
        // console.log('执行了 complete 会调');
        // console.log(res);
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1强制清空 token
            localStorage.removeItem('token')
            // 2.强制跳转登陆页面
            // location.href = '/login.html'
            location.href = '/login.html' 
        }
       
    }
})
