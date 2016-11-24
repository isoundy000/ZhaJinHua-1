/**
 * Created by Administrator on 2016/11/16.
 */
//同意用户协议
var webViewURL= "http://f.99sai.com/lord/ServiceTerm.html";

var UserAgreementLogic= cc.Layer.extend({
    m_view:null,//视图
    m_bEnabled:false,//是否可用
    Panel_webview:null,//WebView
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
        this.m_view= CocosStudio.getRooNode("res/UserAgreement.json");
        this.addChild(this.m_view);
    },

    initLayer:function(){
        CocosStudio.bindMembers(this.m_view, this);//绑定数据成员成员

        this.createWebView();
    },

    createWebView:function(){
        var webView = new ccui.WebView(webViewURL);
        //console.log(webView.RenderCmd._div.style["background"]);
        var size= this.Panel_webview.getContentSize();
        webView.setContentSize(size);
        webView.setAnchorPoint(cc.p(0, 0.5));
        webView.setPosition(cc.p(this.Panel.getContentSize().width* 0.055, this.Panel.getContentSize().height* 0.58));

        //移除原有的webView
        this.Panel_webview.removeFromParentAndCleanup(true);
        this.Panel_webview= webView;
        //获取bgColor(this.Panel_webview._color)
        //设置背景色
        webView._renderCmd._div.style["background"]= "rgb(56, 0, 38)";

        this.Panel.addChild(this.Panel_webview);
    },
    //设置编辑框是否可使用
    setLogicEnabled:function(bEnabled){
        this.m_bEnabled= ((bEnabled== undefined)?false:bEnabled);
    },
    //Ok按钮
    onBtn_OkEvent:function(pSender, Type){
        var self= this.getParent();//原因监听的是m_view
        if(!self.m_bEnabled) return;
        if(ccui.Widget.TOUCH_ENDED== Type){
            //销毁
            MvcEngine.getInstance().destroyModule(GUI_USERAGREEMENT);
        }
    }
});

UserAgreementLogic= new UserAgreementLogic();