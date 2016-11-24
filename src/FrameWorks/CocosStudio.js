var CocosStudio= {
    /**
     * @Func:获取使用的CocosStudio版本号
     * @param jsonFile:要加载的json文件
     * @return 使用的CocosStudio版本号
     * @private
     */
    _getJsonVersion:function(jsonFile){
        var json = cc.loader.getRes(jsonFile);//加载Json文件
        return (json.version || json.Version);
    },
    getRooNode:function(jsonFile){
        //加载Cocos Studio导出的Json文件，获取版本号。根据版本不同，使用不同的加载方式
        var version = this._getJsonVersion(jsonFile);
        var rootNode;

        if (version[0] == 1) {
            rootNode = ccs.uiReader.widgetFromJsonFile(jsonFile);
        } else if (version[0] == 2){
            rootNode = ccs.csLoader.createNode(jsonFile);
        }

        if (!rootNode) {
            console.error("Load json file failed:"+ jsonFile);
            return;
        }
        return rootNode;
    },
    /**
     * 递归对rootWidget下的子节点进行成员绑定,绑定到Target上，
     * 称为Target的成员属性，可以使用target.a或者target.b的方式访问
     * @param rootWidget
     * @param target
     */
    bindMembers: function(rootWidget, target) {
        var widgetName,
            children = rootWidget.getChildren();

        var self = this;

        children.forEach(function(widget) {
            widgetName = widget.getName();
            //根据目前现有的UI工程，截取字符串
            var index= widgetName.indexOf("#");
            widgetName= ((index== -1)?widgetName:widgetName.substring(0, index));

            target[widgetName] = widget;

            //绑定子控件,可以实现: a._b._c._d 访问子控件
            if (!rootWidget[widgetName]) {
                rootWidget[widgetName] = widget;
            }

            //如果还有子节点，递归进去
            if (widget.getChildrenCount()) {
                self.bindMembers(widget, target);
            }
        });
    }
};
