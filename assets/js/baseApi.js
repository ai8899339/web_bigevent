//每次调用$.get()或$.POST()或$.ajax()的时候会先调用ajaxPrefilter这个函数
//options中有ajax提供的配置对象
$.ajaxPrefilter(function(options){
    console.log(options.url);
    //再发起正真的ajax之前同一拼接的请求的根路径
    options.url ='http://api-breakingnews-web.itheima.net' + options.url
})