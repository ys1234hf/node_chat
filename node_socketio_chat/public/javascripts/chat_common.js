/**
 * Created by Administrator on 2015/4/28.
 */
function submitNickName(){
    var nickname_edit = $('#nickname-edit');
    var nickname_error = $("#nickname-error");
    var name = nickname_edit.val();

    if ("" == name) {
        nickname_error.text("请填写昵称。");
        nickname_error.show();
        nickname_edit.focus();
        return;
    }

    var name_len = name.replace(/[^\u0000-\u00ff]/g, "tt").length;
    if(name_len<4 || name_len>12){
        nickname_error.text("昵称字符数应大于4小于12。");
        nickname_error.show();
        nickname_edit.focus();
        return;
    }
    //if(name== $.cookie(chat_nickname)){
    //    nickname_error.text("该名字是你原来的名字。");
    //    nickname_error.show();
    //}
    changeNickName(name);
}

function onClickChangeNickname() {
    $('#chat-modal').modal('show');
}

function controlSendBtn(){
    if($('#chatContent').val()!=""){
        $('#sendBtn').attr("disabled",false);
    }else{
        $('#sendBtn').attr("disabled",true);
    }
}

function adduserToList(name){
    console.log('addUser:'+name);
    $(".list-table").append('<tr><td>' + name + '</td></tr>');
}

function updateListToPane(oldname,newname){
    $('.list-table tr').each(function(){
        if(oldname== $(this).find('td').text()){
            $(this).find('td').text(newname);
        }
    });
}

function RemoveUserPane(name){
    $('.list-table tr').each(function(){
        if(name== $(this).find('td').text()){
            $(this).remove();
        }
    });
}

function onClickSendMessage(){
    if ('' == $.cookie('chat_nickname') || null == $.cookie('chat_nickname')) {
        return $('#login-modal').modal('show');
    }
    var edit = $("#chatContent");
    var content = edit.val();
    if ("" == content) {
        return;
    }
    say(content);
    edit.val("");
}
function addMessage(name,content) {
    var msg_list = $(".msg-list-body");
    content = replace_em(content);
    var date = new Date();
    var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    msg_list.append('<div>'+
        name+'['+time+']'+
       '<div class="msg-content2">' + content + '</div><div>'
    );
    //chatBodyToBottom();
}
function useUserlist(_user_list) {
    $(".list-table").html("");
    for (var i = 0; i < _user_list.length; i++) {
        adduserToList(_user_list[i]);
    }
    updateListCount();
}

