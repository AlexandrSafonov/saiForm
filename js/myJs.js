jQuery(document).ready(function ($) {
    Array.prototype.postArrayToObject = function () {
        var obj = {};
        for (var i = 0; i < this.length; i++) {
            obj[this[i].name] = this[i].value;
        }
        return obj;
    };
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