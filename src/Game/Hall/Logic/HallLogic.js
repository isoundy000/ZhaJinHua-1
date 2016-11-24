/**
 * Created by Administrator on 2016/11/16.
 */
var HallLogic= cc.Layer.extend({
    m_view:null,//视图
    m_bEnabled:false,//是否可用
    ctor:function(){
        this._super();
        cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.SHOW_ALL);
    },
    /**
     * func:创建视图
     */
    createView:function(){
        this.initView();
        this.initLayer();

        this.m_view.setTouchEnabled(false);

        //初始化时，默认显示不可用，为了迎合以后可能有的延时动画
        this.setEditorEnable(false);
    },
    initView:function(){
        //使用自动添加事件，已经将UI工程中，导出的控件，添加到该对象中
        this.m_view= CocosStudio.getRooNode("res/Hall.json");
        this.addChild(this.m_view);

        this.m_view.setPosition(cc.winSize.width* 0.5- this.m_view.getContentSize().width* 0.5, cc.winSize.height* 0.5- this.m_view.getContentSize().height* 0.5);
    },

    initLayer:function(){
        CocosStudio.bindMembers(this.m_view, this);//绑定数据成员成员
    },

    //设置编辑框是否可使用
    setEditorEnable:function(bEnabled){
        this.m_bEnabled= ((bEnabled== undefined)?false:bEnabled);
    }
//    ,
//    //关闭按钮
//    onBtn_CloseEvent:function(pSender, Type){
//        var self= this.getParent();//原因监听的是m_view
//        if(!self.m_bEnabled) return;
//
//        if(ccui.Widget.TOUCH_ENDED== Type){
//            MvcEngine.getInstance().destroyModule(GUI_MORE);
//        }
//    }
});

