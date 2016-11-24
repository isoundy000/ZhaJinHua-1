/**
 * Created by Administrator on 2016/11/16.
 */
/*
	Func:
		非模态对话框【其他对话框可以使用，可以创建多个】
*/
var DeleteUserLogic= cc.Layer.extend({
    m_view:null,//视图
    m_bEnabled:false,//是否可用
    m_willDeleteUserName:0,//将要删除的文件名
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
    },
    initView:function(){
        //使用自动添加事件，已经将UI工程中，导出的控件，添加到该对象中
        this.m_view= CocosStudio.getRooNode("res/DeleteUser.json");
        this.addChild(this.m_view);

        this.m_view.setPosition(cc.winSize.width* 0.5- this.m_view.getContentSize().width* 0.5, cc.winSize.height* 0.5- this.m_view.getContentSize().height* 0.5);
    },

    initLayer:function(){
        CocosStudio.bindMembers(this.m_view, this);//绑定数据成员成员

        this.setData();
    },

    //设置编辑框是否可使用
    setLogicEnabled:function(bEnabled){
        this.m_bEnabled= ((bEnabled== undefined)?false:bEnabled);
    },
    //设置要删除的账户名
    setDeleteUserName:function(userName){
        this.m_willDeleteUserName= userName;
    },
    //设置要更新的数据
    setData:function(){
        this.lab_text.setText("您确定要删除账号‘" +this.m_willDeleteUserName+ "’吗?");
    },
    //取消按钮
    onBtn_CancelEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            MvcEngine.getInstance().destroyModule(GUI_DELETEUSER);
        }
    },
    //确定按钮
    onBtn_OkEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;

        if(ccui.Widget.TOUCH_ENDED== Type){
            //从Map中，移除
            g_userLists.removeByKey(self.m_willDeleteUserName);
            MvcEngine.getInstance().destroyModule(GUI_DELETEUSER);
        }
    }
});


DeleteUserLogic= new DeleteUserLogic();

