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

        function valid_select() {
            var inputs = $(".saiForm").find(".select_wrapper .required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).next().addClass("false_required");
                    if (!$(inputs[i]).closest(".select_wrapper").next(".message_false").length) {
                        $(inputs[i]).closest(".select_wrapper").after("<p class='message_false'>Выберите пол</p>");
                    } else {
                        $(inputs[i]).closest(".select_wrapper").next().text("Выберите пол");
                    }
                    $(inputs[i]).closest(".select_wrapper").next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).next().removeClass("false_required");
                    $(inputs[i]).closest(".select_wrapper").next(".message_false").remove();
                }
            }
        }
        /* end */

        /* All input */

        $(".saiForm").find("input[required], select[required]").removeAttr("required").addClass("required");

        /* Input text */
        $(".saiForm").find("input[type='text']").addClass("input_text");
        
        function valid_text() {
            var inputs = $(".saiForm").find(".input_text.required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Введите " + $(inputs[i]).attr("placeholder") + "</p>");
                    } else {
                        $(inputs[i]).next().text("Введите " + $(inputs[i]).attr("placeholder") + "");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).removeClass("false_required");
                    $(inputs[i]).next(".message_false").remove();
                }
            }
        }
        /* End */

        /* End */

        /* E-Mail */

        if ($(".saiForm").find("input[type='email']").length != false) {

            $(".saiForm").find("input[type='email']").each(function () {
                $(this).attr("type", "text").addClass("email");
            });

        }

        function valid_email() {
            var inputs = $(".saiForm").find(".email.required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Введите Email</p>");
                    } else {
                        $(inputs[i]).next().text("Введите Email");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else if (!/^\w+\.?\-?\_?\w+@\w+\.\w{2,4}$/i.test($(inputs[i]).val())) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Проверте правильность ввода , допустимые символы ' . ' , ' - ' , ' _ '</p>");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).removeClass("false_required");
                    $(inputs[i]).next(".message_false").remove();
                }
            }
            console.log("email = " + end);
            return end;
        }
        /* End */

        /* Number */
        if ($(".saiForm").find("input[type='number']").length != false) {
            var numberCount = 0;
            $(".saiForm").find("input[type='number']").each(function () {
                $(this).attr("type", "text").attr("readonly", "").wrap("<div class='number'></div>");
                $(this).parent().prepend("<i class='fa fa-angle-up up' aria-hidden='true'></i>");
                $(this).parent().append("<i class='fa fa-angle-down down' aria-hidden='true'></i>");
                $(".number").on("click", ".up", function () {
                    numberCount++;
                    $(this).parent().find("input").val(numberCount);
                });
                $(".number").on("click", ".down", function () {
                    if ($(this).parent().find("input").val() != 0) {
                        numberCount--;
                        $(this).parent().find("input").val(numberCount);
                    }
                });
            });

        }
        /* End */

        /* Phone */

        if ($(".saiForm").find("input[type='tel']").length != false) {

            $(".saiForm").find("input[type='tel']").each(function () {
                $(this).attr("type", "text").addClass("phone");
            });
        }

        function valid_tel() {
            var inputs = $(".saiForm").find(".phone.required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Введите номер телефона</p>");
                    } else {
                        $(inputs[i]).next().text("Введите номер телефона");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else if (!/^\+/i.test($(inputs[i]).val())) {
                    console.log("tue");
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>В начале должен быть '+'</p>");
                    } else {
                        $(inputs[i]).next().text("В начале должен быть '+'");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else if (!/^\+[0-9\s()-]+$/i.test($(inputs[i]).val())) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Допустимые символы '0-9 ( ) - ' </p>");
                    } else {
                        $(inputs[i]).next().text("Допустимые символы '0-9 ( ) - ' ");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else if ($(inputs[i]).val().match(/[0-9]/gi).length < 10) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Минимальное число 10</p>");
                    } else {
                        $(inputs[i]).next().text("Минимальное число 10");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).removeClass("false_required");
                    $(inputs[i]).next(".message_false").remove();
                }
            }
            console.log("tel = " + end);
            return end;
        }
        /* End */

        /* Radio */

        if ($(".saiForm").find("input[type='radio']").length != false) {

            $(".saiForm").find("input[type='radio']").each(function (index) {
                index = index + 1;

                $(this).wrap("<div class='radio'></div>");
                if ($(this).attr("id") != undefined) {
                    $(this).attr("id", $(this).attr("id") + " radio" + index + "");
                } else {
                    $(this).attr("id", "radio" + index + "");
                }
                $(this).after("<label for='radio" + index + "'></label>");

            });
        }

        /* End */

        /* CheckBox */

        if ($(".saiForm").find("input[type='checkbox']").length != false) {

            $(".saiForm").find("input[type='checkbox']").each(function (index) {
                index = index + 1;
                $(this).wrap("<div class='checkbox'></div>");
                if ($(this).attr("id") != undefined) {
                    $(this).attr("id", $(this).attr("id") + " checkbox" + index++ + "");
                } else {
                    $(this).attr("id", "checkbox" + index + "");
                }
                $(this).after("<label for='checkbox" + index + "'></label>");

            });
        }

        /* End */

        /* File */

        if ($(".saiForm").find("input[type='file']").length != false) {

            $(".saiForm").find("input[type='file']").each(function (index) {
                index = index + 1;
                $(this).wrap("<div class='file'></div>");
                if ($(this).attr("id") != undefined) {
                    $(this).attr("id", $(this).attr("id") + " file" + index++ + "");
                } else {
                    $(this).attr("id", "file" + index + "");
                }
                $(this).after("<label for='file" + index + "'>Browse...</label>");
                $(this).parent().append("<span></span>");
                $(this).on("change", function () {
                    $(this).parent().find("span").text($(this).val());
                });
            });
        }

        /* End */

        /* Submit */
        $(".saiForm").on("submit", function () {
            var valid = true;
            valid_email();
            valid_tel();
            valid_select();
            valid_text();
            return false;
        });
        /* End */
    };
})(jQuery);