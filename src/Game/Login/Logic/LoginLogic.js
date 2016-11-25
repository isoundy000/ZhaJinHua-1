/**
 * Created by Administrator on 2016/11/16.
 */

var LoginLogic= cc.Layer.extend({
    m_view:null,//视图
    m_bEnabled:false,//是否可用
    check_agree:null,//同意(CheckBox)
    Panel_login:null,//登录(Panel)
    btn_weixin_login:null,//微信登录(Button)
    btn_olduser_login:null,//已有微信账号(Button)
    btn_reg:null,//一键注册
    edit_username:null,//输入账户
    edit_password:null,//输入密码
    more_logic:null,//更多用户名(Module)
    btn_more:null,//更多用户名(Button)
    ctor:function(){
        this._super();
    },
    /**
     * func:创建视图
     */
    createView:function(){
        this.initView();

        this.initLayer();

        this.createUserNameEditor();

        this.m_view.setTouchEnabled(false);

        this.setLogicEnabled(false);
        this.setPanelLoginVisible(false);
    },
    initView:function(){
        //使用自动添加事件，已经将UI工程中，导出的控件，添加到该对象中
        this.m_view= CocosStudio.getRooNode("res/Login.json");
        this.addChild(this.m_view);
        this.m_view.setPosition(cc.winSize.width* 0.5- this.m_view.getContentSize().width* 0.5, cc.winSize.height* 0.5- this.m_view.getContentSize().height* 0.5);
    },
    initLayer:function(){
        CocosStudio.bindMembers(this.m_view, this);//绑定数据成员成员

        //同意用户协议,默认同意[CheckBox控件]
        this.check_agree.setSelectedState(true);
    },
    createUserNameEditor:function(){
        this.edit_username= cc.EditBox.create(cc.size(356, 53), cc.Scale9Sprite.create("#ui_opacity_1-1.png"));
        var panelLoginSize= this.Panel_login.getContentSize();
        this.edit_username.setAnchorPoint(cc.p(0, 0.5));
        this.edit_username.setPosition(panelLoginSize.width* 0.2, panelLoginSize.height* 0.63);

        this.edit_username.setPlaceHolder("输入账户");
        this.edit_username.setPlaceholderFont("微软雅黑", 40);

        //设置输入框
        this.edit_username.setFont("微软雅黑", 40);
        this.edit_username.setFontColor(cc.color(0, 0, 0));
        this.edit_username.setMaxLength(32);//设置输入框长度32
        this.edit_username.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);//
        this.edit_username.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);//用户可输入除换行符外的任何文本

        this.Panel_login.addChild(this.edit_username);

        this.edit_username.setEnabled(false);
        this.edit_username.setVisible(false);


        this.edit_password= cc.EditBox.create(cc.size(356, 53), cc.Scale9Sprite.create("#ui_opacity_1-1.png"));
        this.edit_password.setAnchorPoint(cc.p(0, 0.5));
        this.edit_password.setPosition(panelLoginSize.width* 0.2, panelLoginSize.height* 0.42);

        this.edit_password.setPlaceHolder("输入密码");
        this.edit_password.setPlaceholderFont("微软雅黑", 40);

        //设置输入框
        this.edit_password.setFont("微软雅黑", 40);
        this.edit_password.setFontColor(cc.color(0, 0, 0));
        this.edit_password.setMaxLength(32);//设置输入框长度32
        this.edit_password.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);//
        this.edit_password.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);//用户可输入除换行符外的任何文本

        this.Panel_login.addChild(this.edit_password);

        this.edit_password.setEnabled(false);
        this.edit_password.setVisible(false);

        //设置监听事件
        this.edit_username.setDelegate(this);
    },
    //账户名输入的监听事件
    editBoxEditingDidBegin: function (editBox) {
        if(this.more_logic){
            this.destroyMoreModule();
        }
    },

    //设置该逻辑是否可使用
    setLogicEnabled:function(bEnabled){
        this.m_bEnabled= ((bEnabled== undefined)?false:bEnabled);
    },
    //设置自定义添加的EditBox是否可使用
    setEditorEnabled:function(bEnabled){
        this.edit_username.setVisible(bEnabled);
        this.edit_password.setVisible(bEnabled);
    },
    //设置Panel_Login的隐藏或显示
    setPanelLoginVisible:function(isVisible){
        this.Panel_login.setVisible(isVisible);
        this.edit_username.setEnabled(isVisible);
        this.edit_username.setVisible(isVisible);
        this.edit_password.setEnabled(isVisible);
        this.edit_password.setVisible(isVisible);
    },
    //设置LoginChoose的隐藏或显示
    setLoginChooseVisible:function(isVisible){
        this.btn_weixin_login.setVisible(isVisible);
        this.btn_olduser_login.setVisible(isVisible);
        this.btn_reg.setVisible(isVisible);
    },
    //微信登录
    responseByWebChatLogin:function(nmBaseMessage){
        //拼接字符串，转换为函数名
        var funcName= "read"+ nmBaseMessage.getMsgType();
        alert("读取"+ funcName);
        //调用在Global.js中自定义的函数，用于读取不同消息中的用户数据
        var dataMap= eval(funcName)(nmBaseMessage);
        //目前是显性授权
        //window.location.href= 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ dataMap.get("appID")+'&redirect_uri=http%3a%2f%2fh5.tongqutongqu.cn%2ftest.html&response_type=code&scope=snsapi_userinfo&state=STATE%23wechat_redirect';
    },
    //一键注册
    onBtn_RegEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_ENDED== Type){
            MvcEngine.getInstance().setNeedCreateModuleName(GUI_HALL);
        }
    },
    //微信登录
    onBtn_Weixin_LoginEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            if(!self.check_agree.isSelected()) {
                alert("请先同意用户协议！");
                return;
            }else{
                //首先，先不判断是否为微信浏览器
                sendWEBCHAT_LOGIN(self.responseByWebChatLogin);
//                if(isWebChatBrowser()){
//                    sendWEBCHAT_LOGIN(self.responseByWebChatLogin);
//                }else{
//                    alert("请在微信浏览器中打开！");
//                }
        }
        }
    },
    //已有账户
    onBtn_OldUser_LoginEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_ENDED== Type){
            self.setPanelLoginVisible(true);
            self.setLoginChooseVisible(false);
        }
    },
    //同意用户协议
    onText_loginEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_ENDED== Type){
            MvcEngine.getInstance().setNeedCreateModuleName(GUI_USERAGREEMENT);
        }
    },


    //忘记密码
    onText_resetpassEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_ENDED== Type){
            MvcEngine.getInstance().destroyModule(GUI_MORE);
            MvcEngine.getInstance().setNeedCreateModuleName(GUI_RESETPASSWORD);
        }
    },
    //Login-->Close(销毁)
    destroyMoreModule:function(){
        MvcEngine.getInstance().destroyModule(GUI_MORE);
        this.btn_more.loadTexture("res/btn_zhankai.png");
        this.more_logic= null;
    },
    //更多
    onBtn_moreEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_ENDED== Type){
            if(self.more_logic){
                self.destroyMoreModule();
            }else{
                if(g_userLists.getSize()){
                    //创建
                    MvcEngine.getInstance().createModule(GUI_MORE, function(moreLogic){
                        //设置MorePanel中的位置
                        var panelSize= self.Panel_login.getContentSize();
                        var panelPos= self.Panel_login.getPosition();
                        moreLogic.setCurActiveLogic(self);
                        moreLogic.setPanelPosition(cc.pAdd(panelPos, cc.p(panelSize.width* 0.26, panelSize.height* 0.36)));
                        self.more_logic= moreLogic;
                        self.edit_password.setVisible(false);
                        //ccui.ImageView换图
                        pSender.loadTexture("res/btn_shouqi.png");
                    });
                }
            }

        }
    },
    //登录
    onBtn_loginEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            if(!self.check_agree.isSelected()) {
                alert("请先同意用户协议！");
                return;
            }else{
                sendWEBCHAT_LOGIN(self.responseByWebChatLogin);
//                if(isWebChatBrowser()){
//                    sendWEBCHAT_LOGIN(self.responseByWebChatLogin);
//                }else{
//                    alert("请在微信浏览器中打开！");
//                }
            }
        }
    },
    //关闭
    onButton_login_closeEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_ENDED== Type){
            self.setPanelLoginVisible(false);
            self.setLoginChooseVisible(true);
            //如果账户下拉列表，已经打开，此时点击关闭
            self.destroyMoreModule();
        }
    }
});

//单例模式
LoginLogic= new LoginLogic();