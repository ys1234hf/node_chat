/**
 * Created by Administrator on 2015/4/22.
 */
$(function(){
    var T = setInterval(function(){
        var date = new Date();
        var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        $(".tip span").html(time);
    },1000);


    /**生成表情框，当有点击事件时显示表情框*/
    $('#face-btn').qqFace({
        id : 'facebox',
        assign:'chatContent',
        path:'/images/arclist/'	//表情存放的路径
    });
    //$('#face-btn').click(function(){
    //    var str = $("#saytext").val();
    //   // alert(str);
    //    var chatVal = $('#chatContent').val(""+str+"");
    //    //alert(chatVal);
    //    if(chatVal!=null && chatVal!="") {
    //        $('#sendBtn').attr("disabled", false);
    //    }else{
    //        $('#sendBtn').attr("disabled", true);
    //    }
    //});
});
    function replace_em(str){
        str = str.replace(/\</g,'&lt;');
        str = str.replace(/\>/g,'&gt;');
        str = str.replace(/\n/g,'<br/>');
        str = str.replace(/\[em_([0-9]*)\]/g,'<img src="images/arclist/$1.gif" border="0" />');
        return str;
    }