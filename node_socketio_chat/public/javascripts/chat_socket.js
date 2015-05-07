/**
 * Created by Administrator on 2015/4/24.
 */

var chatServer = 'http://' + location.hostname + ':3000';
console.log('server: ' + chatServer);
var socket = io.connect(chatServer);

socket.on('serverMessage',function(message){
    console.log(message);
    addServerMessage(message);
});

function addServerMessage(message){
    var msg_list = $(".msg-list-body");
    //var T = setInterval(function(){
        var date = new Date();
        var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
   // },1000);

    msg_list.append(
        '<div class="clearfix msg-wrap"><div class="msg-head">' +
        '<span class="msg-name label label-danger pull-left">' +
        '<span class="glyphicon glyphicon-info-sign"></span>&nbsp;&nbsp;系统消息</span>' +
        '<span class="msg-time label label-default pull-left">' +
        '<span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;' + time + '</span>' +
        '</div><div class="msg-content">' + message + '</div></div>'
    );
    //chatBodyToBottom();
}
function chatBodyToBottom() {
    var chat_body = $('.chat-body');
    var height = chat_body.prop("scrollHeight");
    chat_body.prop('scrollTop', height);
}

socket.on('need_nickname',function(){
    //先判断cookie中是否存在
   // $.cookie('chat_nickname', '', { expires: -1 });
    if(null == $.cookie('chat_nickname')){
        $('#chat-modal').modal('show');
    } else {
        changeNickName($.cookie('chat_nickname'));
    }
});

socket.on('userList',function(userlist){
    console.log('userlist:'+userlist);
    useUserlist(userlist);
})

$("div[role='dialog']").on("show.bs.modal", function () {
    // 具体css样式调整 在调用show方法后出发
    $(this).css({
        "display": "block",
        "margin-top": function () {
            return ($(this).height() / 3);
        }
    });
});


function changeNickName(name){
    socket.emit('change_nickname',name);
}

socket.on('change_nickname_error',function(msg){
    $('#chat-modal').modal('show');
    $("#nickname-error").text(msg);
    $("#nickname-error").show();
    $("#nickname-error").focus();
})

socket.on('change_nickname_done',function(oldname,newname,len){
    $.cookie('chat_nickname',newname);
    console.log('newname:'+newname);
    $('#chat-modal').modal('hide');
    $('#nick_name').html('昵称：' + newname);
    if (oldname != null && oldname != "") {
        addServerMessage( '[' + oldname + '] 改名为 [' + newname + ']');
    }
    updateListCount(len);
});

function updateListCount(len){
    $('#list-count').text('当前在线：'+len+'人');
}

socket.on('user_join',function(name,len){
    adduserToList(name);
    updateListCount(len);
    addServerMessage( '欢迎'+name+'进入');
})

socket.on('user_change',function(oldname,newname){
    updateListToPane(oldname,newname);
    addServerMessage( '[' + _old_nick_name + '] 改名为 [' + _new_nick_name + ']');
})

socket.on('user_quit',function(name,len){
    RemoveUserPane(name);
    updateListCount(len);
    addServerMessage( name+'离开了聊天室');
})

function say(content){
    socket.emit('say',content);
}

socket.on('user_say',function(name,content){
    addMessage(name, content);
    })
socket.on('self_show',function(name,content){
    addMessage(name,content);
})