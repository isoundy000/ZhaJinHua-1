/**
 * Created by Administrator on 2016/11/16.
 */
var ResetPasswordLogic= cc.Layer.extend({
    m_view:null,//视图
    m_bEnabled:false,//是否可用
    m_index:0,
    ctor:function(){
        this._super();
    },
    /**
     * func:创建视图
     */
    createView:function(){
        this.initView();
        this.initLayer();

        this.m_view.setTouchEnabled(false);

        //初始化时，默认显示不可用，为了迎合以后可能有的延时动画
        this.setLogicEnabled(false);

        this.setNickName();
    },
    initView:function(){
        //使用自动添加事件，已经将UI工程中，导出的控件，添加到该对象中
        this.m_view= CocosStudio.getRooNode("res/ResetPassword.json");
        this.addChild(this.m_view);
    },

    initLayer:function(){
        CocosStudio.bindMembers(this.m_view, this);//绑定数据成员成员
    },

    //设置账户名
    setNickName:function(){
        if(!LoginLogic) return;

        //TextFiled设置文本
        //EditBox获取文本
        if(LoginLogic.edit_username.getText()!= "输入账户"){
            this.txt_username.setString(LoginLogic.edit_username.getText());
        }else{
            //输入账号
            this.txt_username.setPlaceHolder("输入昵称！");
        }
        this.txt_phonenum.setPlaceHolder("输入手机号！");
    },

    //设置编辑框是否可使用
    setLogicEnabled:function(bEnabled){
        this.m_bEnabled= ((bEnabled== undefined)?false:bEnabled);
    },
    //关闭按钮
    onBtn_cancelEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            MvcEngine.getInstance().destroyModule(GUI_RESETPASSWORD);
        }
    },
    //登录按钮
    onBtn_commitEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            console.log("提交！");
        }
    },
    //Login-->Close(销毁)
    destroyMoreModule:function(){
        this.btn_more.setRotation(0);
        MvcEngine.getInstance().destroyModule(GUI_MORE);
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
                        var panelSize= self.Panel.getContentSize();
                        var panelPos= self.Panel.getPosition();
                        moreLogic.setCurActiveLogic(self);
                        moreLogic.setPanelPosition(cc.pAdd(panelPos, cc.p(panelSize.width* 0.26, panelSize.height* 0.36)));
                        self.more_logic= moreLogic;
                        //Button换图
                        pSender.setRotation(180);
                    });
                }
            }

        }
    },
    setUserName:function(userName){
        this.txt_username.setText(userName);
        this.btn_more.setRotation(0);
    }
    /*,
    onTxt_usernameEvent:function(pSender, Type){
        var self= this.getParent();
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_BEGAN== Type){
            if(self.txt_username.setString()== "输入昵称！"){
                self.txt_username.setString("");
            }
        }
    },
    onTxt_phonenumEvent:function(pSender, Type){

        var self= this.getParent();
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_BEGAN== Type){
            console.log("手机号");
            if(self.txt_phonenum.getString()== "输入手机号！"){
                self.txt_phonenum.setString("");
            }
        }
    }
    */
});

//实现单例模式
ResetPasswordLogic= new ResetPasswordLogic();
