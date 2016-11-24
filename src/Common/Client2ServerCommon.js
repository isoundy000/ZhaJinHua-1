/**
 * Func:客户端-->服务器的消息
 */
//发送登录请求，获取AppID
//@callback 登陆成功之后的回调函数
function sendWEBCHAT_LOGIN(callback){
    var nmBaseMessage= new NMBaseMessage();
    //现在仅仅只是测试，不需要设置消息ID
    nmBaseMessage.setMessageType(Base_ID+ BaseID_Login);
    nmBaseMessage.writeStart();//准备写消息

    /*********Body为空*********/

    nmBaseMessage.writeOver();//写完

    //写结束，同时设置对应的回调函数(如果需要处理的话)
    Network.getInstance().sendMessage(nmBaseMessage, callback);

    nmBaseMessage= null;
}

//一键注册
function sendBASEID_REGISTER(callback){

}

//Todo:在onmessage中，获取MsgType,根据