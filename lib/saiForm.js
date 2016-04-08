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
                inputSelect.closest(".input_wrapper").next().append("<li data-value='" + $(options[i]).val() + "'>" + $(options[i]).text() + "</li>");
                if ($(options[i]).attr("selected") != undefined) {
                    $(inputSelect).next().text($(options[i]).text());
                    $(inputSelect).val($(options[i]).val());
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
            $(this).parent().prev().find("input").val($(this).attr("data-value"));
            $(this).parent().prev().find("p").text($(this).text());
            for (i = 0; i < firstClick.length; i++) {
                $(document).unbind('click.select' + i + '');
                firstClick[i] = false;
            }
        });

        /* end */
    };
})(jQuery);