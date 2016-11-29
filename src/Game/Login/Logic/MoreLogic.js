/**
 * Created by Administrator on 2016/11/16.
 */
var MoreLogic= cc.Layer.extend({
    m_view:null,//视图
    m_bEnabled:false,//是否可用
    m_nickNameInfoUITable:[],//昵称头像列表
    m_deleteButtonTable:[],//删除按钮列表
    m_nickNameLableTable:[],//昵称列表
    m_curActiveLogic:null,//设置当前页面中，活动的另一个Logic
    ctor:function(){
        this._super();

    },
    //设置当前页面中，活动的另一个Logic
    setCurActiveLogic:function(activeLogic){
        this.m_curActiveLogic= activeLogic== undefined?null:activeLogic;
    },
    /**
     * func:创建视图
     */
    createView:function(){
        this.initView();
        this.initLayer();

        this.m_view.setTouchEnabled(false);

        //初始化时，默认显示不可用，为了迎合以后可能有的延时动画
        this.setLogicEnabled(true);

        this.refreshUserLists();
    },
    initView:function(){
        //使用自动添加事件，已经将UI工程中，导出的控件，添加到该对象中
        this.m_view= CocosStudio.getRooNode("res/More.json");
        this.addChild(this.m_view, 1);
    },

    initLayer:function(){
        CocosStudio.bindMembers(this.m_view, this);//绑定数据成员成员

        //清空数据
        this.m_nickNameInfoUITable= [];
        this.m_nickNameLableTable= [];
        this.m_deleteButtonTable= [];

        this.m_nickNameInfoUITable.push(this.Img_TopUser);
        this.m_deleteButtonTable.push(this.Img_DeleteTopUser);
        this.m_nickNameLableTable.push(this.Label_TopUserName);

        this.m_nickNameInfoUITable.push(this.Img_MiddleUser);
        this.m_deleteButtonTable.push(this.Img_DeleteMiddleUser);
        this.m_nickNameLableTable.push(this.Label_MiddleUserName);

        this.m_nickNameInfoUITable.push(this.Image_BottomUser);
        this.m_deleteButtonTable.push(this.Img_DeleteBottomUser);
        this.m_nickNameLableTable.push(this.Label_BottomUserName);
    },

    //设置编辑框是否可使用
    setLogicEnabled:function(bEnabled){
        this.m_bEnabled= ((bEnabled== undefined)?false:bEnabled);
    },
    //设置Panel的位置
    setPanelPosition:function(pos){
        this.Panel.setAnchorPoint(cc.p(0, 0.5));
        this.Panel.setPosition(pos);
    },
    //设置某一栏是否显示
    setUserListVisible:function(id, isVisible){
        this.m_nickNameInfoUITable[id].setVisible(isVisible);
        this.m_deleteButtonTable[id].setVisible(isVisible);
        this.m_nickNameLableTable[id].setVisible(isVisible);
    },
    //填充用户列表
    refreshUserLists:function(){
        //根据要使用显示的数量
        for(var i=0; i< 3; ++i){
            if(i< g_userLists.getSize()){
                this.setUserListVisible(i, true);
                this.m_nickNameLableTable[i].setString(g_userLists.elements[i].key);
            }else{
                this.setUserListVisible(i, false);
            }
        }
    },
    //第一个按钮
    onImg_TopUserEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            self.touchUserFotLogin(0);
        }
    },
    //第二个按钮
    onImg_MiddleUserEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            self.touchUserFotLogin(1);
        }
    },
    //第三个按钮
    onImage_BottomUserEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            self.touchUserFotLogin(2);
        }
    },
    //删除账户-第一个按钮
    onImg_DeleteTopUserEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            self.deleteUser(0);
        }
    },
    //第二个按钮
    onImg_DeleteMiddleUserEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            self.deleteUser(1);
        }
    },
    //第三个按钮
    onImage_DeleteBottomUserEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            self.deleteUser(2);
        }
    },
    //删除用户
    deleteUser:function(id){
        DeleteUserLogic.setDeleteUserName(g_userLists.elements[id].key);
        MvcEngine.getInstance().destroyModule(GUI_MORE);
        MvcEngine.getInstance().setNeedCreateModuleName(GUI_DELETEUSER);
    },
    touchUserFotLogin:function(id){
        if(this.m_curActiveLogic){
            //判断变量是否定义
            if((typeof LoginLogic!= "undefined")&&(LoginLogic.m_bEnabled)){
                //设置账号
                LoginLogic.edit_username.setString(g_userLists.elements[id].key);
                //设置对应账号的密码
                LoginLogic.edit_password.setString(g_userLists.elements[id].value);
            }
            //判断是否已经定义
            if((typeof ResetPasswordLogic!= "undefined")&&(ResetPasswordLogic.m_bEnabled)){
                //设置账号
                ResetPasswordLogic.setUserName(g_userLists.elements[id].key);
            }
        }
        MvcEngine.getInstance().destroyModule(GUI_MORE);
    },
    //销毁时，确保Login页面 也是正确的。
    destroySelf:function(){
        if(this.m_curActiveLogic){
            this.m_curActiveLogic.more_logic= null;
            if(this.m_curActiveLogic.btn_more._className== "Button"){
                this.m_curActiveLogic.btn_more.setRotation(0);
            }else{
                this.m_curActiveLogic.btn_more.loadTexture("res/btn_zhankai.png");
            }
        }
    }
});