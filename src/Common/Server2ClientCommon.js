/**
 * Func:服务器-->客户端的消息
 */
//读取微信登录
function read458753(nmBaseMessage){
    var dataMap= new Map();
    //存放消息类型和消息名
    dataMap.put("messageType", Base_ID+ BaseID_Login);
    dataMap.put("messageName", "WebChatLogin");

    dataMap.put("appID", nmBaseMessage.readUTF16());//公众号ID


    return dataMap;
}