import util from 'ser/util'

var URL_PATTERN = /((http(s)?:\/\/|www\.|WWW\.)([/\w-./@?_!~$%&=:#;+\-()]*)?)/g;
var STORE_PATTERN = /(store:\/\/)/g;

function getImageUrl(resourceUrl, accessToken) {
    var resourceAtUrl = '';
    var storeFileId;
    var storeGetFile = window.env.storeUri + '/store/getFile?fileId=';
    if (resourceUrl.match(STORE_PATTERN)) {
        if (resourceUrl.length > 20) {
            storeFileId = resourceUrl.replace(STORE_PATTERN, "");
            resourceAtUrl = storeGetFile + storeFileId + '&access_token=' + accessToken;
        }
    } else if (resourceUrl.match(URL_PATTERN)) {
        resourceAtUrl = resourceUrl;
    } else {
        storeFileId = resourceUrl.replace(/(^.+fileId=)/g, "");
        resourceAtUrl = storeGetFile + storeFileId + '&access_token=' + accessToken;
    }
    return resourceAtUrl;
}

module.exports = {
    getCarouselList(success, error){
        app.linkplugin.ajax({
            url: window.env.comwidgetsUri + '/carousel?limit=5&offset=0',
            success: function(res){
                app.linkplugin.getAccessToken(function(at){
                    var datas = res.data;
                    util.each(datas, function(item){
                        try{
                            var url = JSON.parse(item.action).web;
                        } catch(e){}
                        item.url = url;
                        item.img = getImageUrl(item.image, at);
                    })
                    if(datas.length > 0)
                        success(datas);
                    else 
                        error(i18n.ErrorData);
                })
            },
            error: function(err){
                var m = '';
                try{
                    m = JSON.parse(err.responseText).message;
                }catch(e){}
                error(m || i18n.ErrorLoadData);
            }
        }) 
    },
    appendStyle(){
        var style = document.createElement('style'),
            styleString = "",
            h = document.getElementsByTagName("head")[0];
        styleString += '.el-carousel__indicators--outside button{background: ' + window.env.themeColor + '}'
        style.innerText = styleString;
        h.appendChild(style);
    }
}
