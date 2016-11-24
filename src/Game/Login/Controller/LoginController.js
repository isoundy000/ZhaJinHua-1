var LoginController = BaseController.extend({
    /*****************Base类(继承CC.Layer的原因，有时候需要监听该Layer)******************/
    m_logic:null,//逻辑类

    reset:function(){
        this.m_logic.view= null;
    },
    getLayer:function(){
        return this.m_logic.view;
    },

    createView:function(){
        this.m_logic= LoginLogic;
        this.m_logic.createView();
        this.addChild(this.m_logic);

        //添加按钮的监听事件
        this.addCallback();
    },

    //休眠
    sleepModule:function(){
        console.log("休眠");
        this.m_logic.m_view.setTouchEnabled(false);
        this.m_logic.setLogicEnabled(false);
        this.m_logic.setEditorEnabled(false);
    },

    //唤醒
    wakeModule:function(){
        console.log("唤醒");
        this.m_logic.m_view.setTouchEnabled(true);
        this.m_logic.setLogicEnabled(true);
        this.m_logic.setEditorEnabled(true);
    },

    //销毁
    destroyModule:function(){
        this.destroy();

        this.m_logic.m_view.removeFromParentAndCleanup(true);
        LoginLogic.removeFromParentAndCleanup(true);

        this.releaseData();
    },
    //按钮监听事件
    addCallback:function(){
        this.addEvent("btn_reg", this.m_logic.m_view, this.m_logic.onBtn_RegEvent);
        this.addEvent("btn_weixin_login", this.m_logic.m_view, this.m_logic.onBtn_Weixin_LoginEvent);
        this.addEvent("btn_olduser_login", this.m_logic.m_view, this.m_logic.onBtn_OldUser_LoginEvent);
        this.addEvent("text_login", this.m_logic.m_view, this.m_logic.onText_loginEvent);
        //Panel_login中的按钮事件
        this.addEvent("btn_more", this.m_logic.m_view, this.m_logic.onBtn_moreEvent);
        this.addEvent("btn_login", this.m_logic.m_view, this.m_logic.onBtn_loginEvent);
        this.addEvent("Button_login_close", this.m_logic.m_view, this.m_logic.onButton_login_closeEvent);
        this.addEvent("text_resetpass", this.m_logic.m_view, this.m_logic.onText_resetpassEvent);
    },

    /***************以上可以封装为基类，函数或者成员不需要改变**********************/

    /***************以下方法，可以在派生类中，根据游戏逻辑自己重写****************************/

    //销毁数据
    releaseData:function(){
        this.m_logic= null;
    }
});