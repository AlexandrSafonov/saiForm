jQuery(document).ready(function ($) {

    /* Add body class */
    var ua = navigator.userAgent;
    if (getInternetExplorerVersion() > 0) {
        $("body").addClass("ie");
        $("body").addClass("ie" + getInternetExplorerVersion());
    }
    if (ua.search(/Firefox/) > -1)
        $("body").addClass("firefox");
    if (ua.search(/Opera/) > -1)
        $("body").addClass("opera");
    if (ua.search(/Chrome/) > -1)
        $("body").addClass("chrome");
    else if (ua.search(/Safari/) > -1)
        $("body").addClass("safari");
    /* end */

    Array.prototype.postArrayToObject = function () {
        var obj = {};
        for (var i = 0; i < this.length; i++) {
            obj[this[i].name] = this[i].value;
        }
        return obj;
    };
    
    $('input, textarea').placeholder();


    $(".saiForm2").saiForm({
        numberLenght: 10,
//        callbackSubmit: function (thisForm) {
//            console.log($(thisForm).serializeArray().postArrayToObject());
//        }
    });
    $("#otherForm").saiForm({
        callbackSubmit: function (thisForm) {
            console.log($(thisForm).serializeArray().postArrayToObject());
        }
    });
});

function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}