//const WebSocketURL= "ws://10.10.0.66:65031";//WebSocket连接路径
const WebSocketURL= "ws://10.10.0.188:65031";//WebSocket连接路径

//以二进制传递方式，传输数据
var Network  = (function(){
    var instance = null;
    function getNetworkInstance (){
        var networkInstance = {
            socket:null,
            isConnect:false,
            callback:null,
            //初始化网络配置
            initNetwork:function(){
                console.log('Network initSocket...');
                this.initWebSocket();
            },

            //初始化WebSocket
            initWebSocket:function(){
                var self= this;
                this.host = WebSocketURL;//目标WebSocket服务器
                this.socket = new WebSocket(this.host);//创建
                this.socket.binaryType="arraybuffer";//以二进制传递方式传输数据

                //连接成功之后，会自动打开onopen方法
                this.socket.onopen = function(evt){
                    console.log('Network onOpen...');
                    this.isConnect = true;
                };

                //连接成功之后，前台获取后台的信息
                this.socket.onmessage = function(evt){
                    var buffer= evt.data;
                    //回调读取消息体
                    if(self.callback!= null){
                        var nmBassMessage= new NMBaseMessage(buffer);
                        nmBassMessage.readStart();
                        self.callback(nmBassMessage);
                    }
                };

                //Socket连接失败时，会自动调用该函数
                this.socket.onerror = function(evt){
                    console.log('Network onError...');
                };

                //Socket关闭时，自动调用该函数
                this.socket.onclose = function(evt){
                    console.log('Network onClose...');
                    this.isConnect = false;
                };
            },

            //手动发送信息，以文本的方式传送
            send:function(data){
                if (this.isConnect){
                    console.log('Network is not inited...');
                }else if(this.socket.readyState == WebSocket.OPEN){
                    console.log('Network send:'+data);
                    if(((Object.prototype.toString.call(data) == "[object ArrayBuffer]"))){
                        this.socket.send(data);
                    }else{//Text文本格式传输
                        alert("Send失败:数据不是ArrayBuffer类型！");
                    }
                }else{
                    console.log('Network WebSocket readState:'+this.socket.readyState);
                }
            },

            //手动关闭Socket
            close:function(){
                if (this.socket){
                    if(!this.closeWebSocket()){
                        var self= this;
                        var timer= setInterval(function(){
                            if(self.socket.bufferedAmount== 0&&self.closeWebSocket()){
                                clearInterval(timer);
                            }
                        }, 100);
                    }
                }
            },
            //关闭WebSocket
            closeWebSocket:function(){
                if(this.socket.bufferedAmount== 0){
                    this.socket.close();
                    this.socket = null;
                    this.isConnect= false;
                    console.log("Network close...");
                    return true;
                }else{
                    return false;
                }
            },
            //结束读写
            sendMessage:function(nmBassMessage, callback){
                if(typeof nmBassMessage!= "object") return;
                this.callback= callback== undefined?null:callback;
                //Todo:发送数据时，必须要首先判断连接是否断开
                this.send(nmBassMessage.getArrayBuffer());
            }
        };
        return networkInstance;
    };


    //单例模式
    return {
        getInstance:function(){
            if(instance === null){
                instance = getNetworkInstance();
            }
            return instance;
        }
    };
})();