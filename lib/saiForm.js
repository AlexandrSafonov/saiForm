(function ($) {
    jQuery.fn.saiForm = function () {

        /* Select */

        var firstClick = [];
        var newSelect;
        $(".saiForm").find("select").each(function (index) {
            firstClick[index] = true;
            var select = $(this);

            select.before("<input type='hidden' name='select" + (index + 1) + "'/>");
            var inputSelect = select.prev();
            if ($(select).attr("required") != undefined) {
                inputSelect.addClass("required");
            }
            var options = select.find("option");

            inputSelect.wrap("<div class='select_wrapper select_" + (index + 1) + " '></div>").wrap("<div class='input_wrapper'></div>");

            if (inputSelect.attr("placeholder") != undefined) {
                inputSelect.after("<p class='layer'>" + inputSelect.attr("placeholder") + "</p>");
            } else {
                inputSelect.after("<p class='layer'></p>");
            }
            if (inputSelect.attr("required") != undefined) {
                inputSelect.addClass("required");
            }

            inputSelect.closest(".input_wrapper").after("<ul class='select'></ul>");

            for (i = 0; i < options.length; i++) {
                if ($(options[i]).attr("selected") != undefined) {
                    inputSelect.closest(".input_wrapper").next().append("<li class='selected' data-value='" + $(options[i]).val() + "'>" + $(options[i]).text() + "</li>");
                    $(inputSelect).next().text($(options[i]).text());
                } else {
                    inputSelect.closest(".input_wrapper").next().append("<li data-value='" + $(options[i]).val() + "'>" + $(options[i]).text() + "</li>");
                }
            }

            inputSelect.next().data("index", index);
            newSelect = inputSelect.closest(".input_wrapper").next();
            $(select).remove();
        });
        $(".input_wrapper .layer").on("click", function (e) {
            var ind = $(this).data("index");
            var thisSelect = $(this).parent().next(".select");
            var ths = $(this);

            if (thisSelect.css('display') != 'block') {
                thisSelect.fadeIn();
                ths.addClass("active");
                firstClick[ind] = true;
                $(document).bind('click.select' + ind + '', function () {
                    if (!firstClick[ind]) {
                        thisSelect.fadeOut();
                        ths.removeClass("active");
                        $(document).unbind('click.select' + ind + '');
                    }
                    firstClick[ind] = false;
                });
            }
            e.preventDefault();
        });

        $(".saiForm .select li").on("click", function () {
            $(this).parent().fadeOut();
            $(this).parent().parent().find(".layer").removeClass("active");
            $(this).parent().prev().find("input").removeAttr("value");
            if (!$(this).hasClass("selected")) {
                $(this).parent().prev().find("input").val($(this).attr("data-value"));
            }
            $(this).parent().prev().find("p").text($(this).text());
            for (i = 0; i < firstClick.length; i++) {
                $(document).unbind('click.select' + i + '');
                firstClick[i] = false;
            }
        });

        /* end */

        /* All input */

        $(".saiForm").find("input[required], select[required]").removeAttr("required").addClass("required");

        /* End */

        /* E-Mail */

        if ($(".saiForm").find("input[type='email']").length != false) {

            $(".saiForm").find("input[type='email']").each(function () {
                $(this).attr("type", "text").addClass("email");
            });
        }

        /* End */

        /* Phone */

        if ($(".saiForm").find("input[type='tel']").length != false) {

            $(".saiForm").find("input[type='tel']").each(function () {
                $(this).attr("type", "text").addClass("phone");
            });
        }

        /* End */

        /* Radio */

        if ($(".saiForm").find("input[type='radio']").length != false) {
            
            $(".saiForm").find("input[type='radio']").each(function (index) {
                index = index+1;
                
                $(this).wrap("<div class='radio'></div>");
                if ($(this).attr("id") != undefined) {
                    $(this).attr("id", $(this).attr("id") + " radio" + index + "");
                } else {
                    $(this).attr("id", "radio" + index + "");
                }
                $(this).after("<label for='radio"+ index +"'></label>");

            });
        }

        /* End */
        
        /* CheckBox */

        if ($(".saiForm").find("input[type='checkbox']").length != false) {

            $(".saiForm").find("input[type='checkbox']").each(function (index) {
                index = index+1;
                $(this).wrap("<div class='checkbox'></div>");
                if ($(this).attr("id") != undefined) {
                    $(this).attr("id", $(this).attr("id") + " checkbox" + index++ + "");
                } else {
                    $(this).attr("id", "checkbox" + index + "");
                }
                $(this).after("<label for='checkbox"+ index +"'></label>");

            });
        }

        /* End */
        
        /* File */

        if ($(".saiForm").find("input[type='file']").length != false) {

            $(".saiForm").find("input[type='file']").each(function (index) {
                index = index+1;
                $(this).wrap("<div class='file'></div>");
                if ($(this).attr("id") != undefined) {
                    $(this).attr("id", $(this).attr("id") + " file" + index++ + "");
                } else {
                    $(this).attr("id", "file" + index + "");
                }
                $(this).after("<label for='file"+ index +"'>Browse...</label>");
                $(this).parent().append("<span></span>");
                $(this).on("change", function(){
                    $(this).parent().find("span").text($(this).val());
                });
            });
        }

        /* End */
    };
})(jQuery);