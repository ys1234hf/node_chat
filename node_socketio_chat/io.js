/**
 * Created by Administrator on 2015/4/17.
 */
var io = require('socket.io')();

var nickname_list=[];//服务器保存上线的用户

function HasNickname(_nickname) {
    console.log("HasNickNameLength:"+nickname_list.length);
    for (var i = 0; i < nickname_list.length; i++) {
        if (nickname_list[i] == _nickname) {
            return true;
        }
    }
    return false;
}

function RemoveNickname(_nickname) {
    for (var i = 0; i < nickname_list.length; i++) {
        if (nickname_list[i] == _nickname)
            nickname_list.splice(i, 1);
    }
}


io.on('connection', function(socket){
    console.log(socket.id + ': connection');
    //进入聊天室欢迎语 TODO：音乐怎么播放
    socket.emit('serverMessage','欢迎进入聊天室');
    //进入聊天室后先进行用户信息昵称填写，这边需要client端判断如果该用户在cookie时间内存在则不显示信息填写框
    socket.emit('need_nickname');
    socket.emit('userList',nickname_list);
    socket.on('chat message', function(msg){
        io.emit('chat message',msg);
    });
    socket.on('change_nickname',function(name){
        var name_len = name.replace(/[^\u0000-\u00ff]/g, "tt").length;
        console.log('name_len:'+name_len);
        if(name_len<4 || name_len>12){
            return socket.emit('change_nickname_error','昵称字符数应大于4小于12。');
        }
        if(socket.nick_name==name){
            return socket.emit('change_nickname_error','这是你原来的昵称');
        }
        if(HasNickname(name)){
            return socket.emit('change_nickname_error','该昵称已经存在');
        }
        var oldname = "";
        if(socket.nickname!=null && socket.nickname!=""){
            oldname = socket.nickname;
            RemoveNickname(oldname);
        }

        nickname_list.push(name);
        socket.nickname = name;
        var len = nickname_list.length;
        socket.emit('change_nickname_done',oldname,name,len);
        console.log('oldname:'+oldname);
        if(oldname==""){
            return socket.broadcast.emit('user_join',name,len);
        }else{
            return socket.broadcast.emit('user_change',oldname,name);
        }
    });

    socket.on('disconnect',function(){
        if(socket.nickname!=null && socket.nickname!=""){
            RemoveNickname(socket.nickname);
            var len = nickname_list.length;
            socket.broadcast.emit('user_quit',socket.nickname,len);
        }
    });
    socket.on('say',function(content){
        if ("" == socket.nickname || null == socket.nickname) {
            return socket.emit('need_nickname');
        }
        content = content.trim();
        socket.broadcast.emit('user_say', socket.nickname,content);
        socket.emit('self_show',socket.nickname,content);
    });
});


exports.listen = function(server){
    return io.listen(server);
}
