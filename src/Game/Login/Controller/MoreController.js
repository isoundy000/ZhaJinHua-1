var MoreController = BaseController.extend({

    /*****************Base类(继承CC.Layer的原因，有时候需要监听该Layer)******************/
    m_logic:null,//逻辑类

    reset:function(){
        this.m_logic.view= null;
    },

    getLayer:function(){
        return this.m_logic.view;
    },

    createView:function(){
        this.m_logic= new MoreLogic();
        this.m_logic.createView();
        this.addChild(this.m_logic);

        //添加按钮响应事件
        this.addCallback();
    },

    //休眠
    sleepModule:function(){
        console.log("休眠");
        this.m_logic.m_view.setTouchEnabled(false);
        this.m_logic.setLogicEnabled(false);
    },

    //唤醒
    wakeModule:function(){
        console.log("唤醒");
        this.m_logic.m_view.setTouchEnabled(true);
        this.m_logic.refreshUserLists();
//        this.m_logic.setLogicEnabled(true);
    },

    //销毁
    destroyModule:function(){
        console.log("销毁");
        this.destroy();

        this.m_logic.m_view.removeFromParent(true);
        this.m_logic.destroySelf();
        this.releaseData();
    },

    addCallback:function(){
        this.addEvent("Img_TopUser", this.m_logic.m_view, this.m_logic.onImg_TopUserEvent);
        this.addEvent("Img_MiddleUser", this.m_logic.m_view, this.m_logic.onImg_MiddleUserEvent);
        this.addEvent("Image_BottomUser", this.m_logic.m_view, this.m_logic.onImage_BottomUserEvent);
        this.addEvent("Img_DeleteTopUser", this.m_logic.m_view, this.m_logic.onImg_DeleteTopUserEvent);
        this.addEvent("Img_DeleteMiddleUser", this.m_logic.m_view, this.m_logic.onImg_DeleteMiddleUserEvent);
        this.addEvent("Img_DeleteBottomUser", this.m_logic.m_view, this.m_logic.onImage_DeleteBottomUserEvent);
    },
    /***************以上可以封装为基类，函数或者成员不需要改变**********************/

    /***************以下方法，可以在派生类中，根据游戏逻辑自己重写****************************/

    //销毁数据
    releaseData:function(){
        this.m_logic= null;
    }
});
