(function ($) {
    jQuery.fn.saiForm = function () {
        console.log($(this));
        /* Select */
        var firstClick = [];
        var newSelect;
        $(this).find("select").each(function (index) {
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

        $(this).find(".select li").on("click", function () {
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

        function valid_select(thisForm) {
            var inputs = $(thisForm).find(".select_wrapper .required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).next().addClass("false_required");
                    if (!$(inputs[i]).closest(".select_wrapper").next(".message_false").length) {
                        $(inputs[i]).closest(".select_wrapper").after("<p class='message_false'>Select sex</p>");
                    } else {
                        $(inputs[i]).closest(".select_wrapper").next().text("Select sex");
                    }
                    $(inputs[i]).closest(".select_wrapper").next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).next().removeClass("false_required");
                    $(inputs[i]).closest(".select_wrapper").next(".message_false").remove();
                }
            }
            return end;
        }

        /* end */

        /* All input */

        $(this).find("input[required], select[required], textarea[required]").removeAttr("required").addClass("required");

        /* Input text */
        $(this).find("input[type='text'], textarea, input[type='password']").addClass("input_text");

        function valid_text(thisForm) {
            var inputs = $(thisForm).find(".input_text.required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Enter " + $(inputs[i]).attr("placeholder") + "</p>");
                    } else {
                        $(inputs[i]).next().text("Enter " + $(inputs[i]).attr("placeholder") + "");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).removeClass("false_required");
                    $(inputs[i]).next(".message_false").remove();
                }
            }
            return end;
        }

        /* End */

        /* E-Mail */

        if ($(this).find("input[type='email']").length != false) {

            $(this).find("input[type='email']").each(function () {
                $(this).attr("type", "text").addClass("email");
            });

        }

        function valid_email(thisForm) {
            var inputs = $(thisForm).find(".email.required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Enter Email</p>");
                    } else {
                        $(inputs[i]).next().text("Enter Email");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else if (!/^\w+\.?\-?\_?\w+\.?\-?\_?\w+@\w+\.\w{2,4}$/i.test($(inputs[i]).val())) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Make sure you entered is correct, valid characters ' . ' , ' - ' , ' _ '</p>");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).removeClass("false_required");
                    $(inputs[i]).next(".message_false").remove();
                }
            }
            return end;
        }

        /* End */

        /* Number */
        if ($(this).find("input[type='number']").length != false) {
            $(this).find("input[type='number']").each(function () {
                $(this).attr("type", "text").attr("readonly", "").wrap("<div class='number'></div>");
                $(this).parent().prepend("<i class='fa fa-angle-up up' aria-hidden='true'></i>");
                $(this).parent().append("<i class='fa fa-angle-down down' aria-hidden='true'></i>");

            });
            $(this).on("click", ".up", function () {
                var val = Number($(this).parent().find("input").val());
                if ($(this).parent().find("input").val() == false) {
                    $(this).parent().find("input").val(1);
                } else {
                    val++;
                    $(this).parent().find("input").val(val);
                }
            });
            $(".number").on("click", ".down", function () {
                var val = Number($(this).parent().find("input").val());
                if (val == false) {
                    $(this).parent().find("input").val(1);
                } else if (val > 1) {
                    val--;
                    $(this).parent().find("input").val(val);
                }
            });
        }

        function valid_number(thisForm) {
            var inputs = $(thisForm).find(".number .required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                console.log("f");
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).parent().next(".message_false").length) {
                        $(inputs[i]).parent().after("<p class='message_false'>Select " + $(inputs[i]).attr("placeholder") + "</p>");
                    } else {
                        $(inputs[i]).parent().next().text("Select " + $(inputs[i]).attr("placeholder") + "");
                    }
                    $(inputs[i]).parent().next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).removeClass("false_required");
                    $(inputs[i]).parent().next(".message_false").remove();
                }
            }
            return end;
        }

        /* End */

        /* Phone */

        if ($(this).find("input[type='tel']").length != false) {

            $(this).find("input[type='tel']").each(function () {
                $(this).attr("type", "text").addClass("phone");
            });
        }

        function valid_tel(thisForm) {
            var inputs = $(thisForm).find(".phone.required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Enter phone number</p>");
                    } else {
                        $(inputs[i]).next().text("Enter phone number");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else if (!/^\+/i.test($(inputs[i]).val())) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>At the beginning to be '+'</p>");
                    } else {
                        $(inputs[i]).next().text("At the beginning to be '+'");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else if (!/^\+[0-9\s()-]+$/i.test($(inputs[i]).val())) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>Available characters '0-9 ( ) - ' </p>");
                    } else {
                        $(inputs[i]).next().text("Available characters '0-9 ( ) - ' ");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else if ($(inputs[i]).val().match(/[0-9]/gi).length < 10) {
                    $(inputs[i]).addClass("false_required");
                    if (!$(inputs[i]).next(".message_false").length) {
                        $(inputs[i]).after("<p class='message_false'>The minimum number of 10</p>");
                    } else {
                        $(inputs[i]).next().text("The minimum number of 10");
                    }
                    $(inputs[i]).next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).removeClass("false_required");
                    $(inputs[i]).next(".message_false").remove();
                }
            }
            return end;
        }

        /* End */

        /* Radio */

        if ($(this).find("input[type='radio']").length != false) {

            $(this).find("input[type='radio']").each(function (index) {
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

        function valid_radio(thisForm) {
            var groups = $(thisForm).find(".radio_group");
            var end = true;

            $(this).find(".radio_group").each(function (index) {
                var end2 = false;

                $(this).find(".required").each(function () {
                    if ($(this).is(":checked")) {
                        end2 = true;
                    }
                });

                if (!end2) {
                    $(this).find(".required").each(function () {
                        $(this).parent().addClass("false_required");
                    });
                    if (!$(this).next(".message_false").length) {
                        $(this).after("<p class='message_false'>Checked</p>");
                    } else {
                        $(this).next().text("Checked");
                    }
                    $(this).next(".message_false").fadeIn();

                    end = false;
                } else {
                    $(this).find(".radio").removeClass("false_required");
                    $(this).next(".message_false").remove();
                }
            });

            return end;
        }

        /* End */

        /* CheckBox */

        if ($(this).find("input[type='checkbox']").length != false) {

            $(this).find("input[type='checkbox']").each(function (index) {
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

        function valid_checkbox(thisForm) {
            var inputs = $(thisForm).find(".checkbox .required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if (!$(inputs[i]).is(":checked")) {
                    $(inputs[i]).parent().find("label").addClass("false_required");
                    if (!$(inputs[i]).parent().next(".message_false").length) {
                        $(inputs[i]).parent().after("<p class='message_false'>Checked</p>");
                    } else {
                        $(inputs[i]).parent().next().text("Checked");
                    }
                    $(inputs[i]).parent().next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).parent().find("label").removeClass("false_required");
                    $(inputs[i]).parent().next(".message_false").remove();
                }
            }
            return end;
        }

        /* End */

        /* File */

        if ($(this).find("input[type='file']").length != false) {

            $(this).find("input[type='file']").each(function (index) {
                index = index + 1;
                $(this).wrap("<div class='file'></div>");
                if ($(this).attr("id") != undefined) {
                    $(this).attr("id", $(this).attr("id") + " file" + index++ + "");
                } else {
                    $(this).attr("id", "file" + index + "");
                }
                $(this).after("<label for='file" + index + "'>Browse...</label>");
                var val;
                if ($(this).val() == false) {
                    val = "Select file";
                } else {
                    val = $(this).val();
                }
                $(this).parent().append("<span>" + val + "</span>");
                $(this).on("change", function () {
                    $(this).parent().find("span").text($(this).val());
                });
            });
        }

        function valid_file(thisForm) {
            var inputs = $(thisForm).find(".file .required");
            var end = true;
            for (i = 0; i < inputs.length; i++) {
                if ($(inputs[i]).val() == false) {
                    $(inputs[i]).parent().find("label").addClass("false_required");
                    if (!$(inputs[i]).parent().next(".message_false").length) {
                        $(inputs[i]).parent().after("<p class='message_false'>Select file</p>");
                    } else {
                        $(inputs[i]).parent().next().text("Select file");
                    }
                    $(inputs[i]).parent().next(".message_false").fadeIn();
                    end = false;
                } else {
                    $(inputs[i]).parent().find("label").removeClass("false_required");
                    $(inputs[i]).parent().next(".message_false").remove();
                }
            }
            return end;
        }

        /* End */

        /* Password */

        function valid_password(thisForm) {
            var end = true;

            if ($(thisForm).find(".pass1").val() !== $(thisForm).find(".pass2").val()) {
                end = false;
                if (!$(thisForm).find(".pass2").next(".message_false").length) {
                    $(thisForm).find(".pass2").addClass("false_required");
                    $(thisForm).find(".pass2").after("<p class='message_false'>Password does not match</p>");
                } else {
                    $(thisForm).find(".pass2").next(".message_false").text("Password does not match");
                }
                $(thisForm).find(".pass2").next(".message_false").fadeIn();
            } else {
                $(thisForm).find(".pass2").next(".message_false").remove();
                $(thisForm).find(".pass2").removeClass("false_required");
            }
            return end;
        }

        /* End */

        /* Submit */

        $(this).find("button , input[type='submit']").on("click", function (e) {
            e.preventDefault();
            var thisForm = $(this).closest(".saiForm");
            var end = true;
            if (valid_email(thisForm) == false) {
                end = valid_email(thisForm);
            }
            if (valid_tel(thisForm) == false) {
                end = valid_tel(thisForm);
            }
            if (valid_select(thisForm) == false) {
                end = valid_select(thisForm);
            }
            if (valid_text(thisForm) == false) {
                end = valid_text(thisForm);
            }
            if (valid_number(thisForm) == false) {
                end = valid_number(thisForm);
            }
            if (valid_checkbox(thisForm) == false) {
                end = valid_checkbox(thisForm);
            }
            if (valid_file(thisForm) == false) {
                end = valid_file(thisForm);
            }
            if (valid_radio(thisForm) == false) {
                end = valid_radio(thisForm);
            }
            if ($(thisForm).find(".pass2").length != false) {
                if (valid_password(thisForm) == false) {
                    end = valid_password(thisForm);
                }
            }
            console.log(end);
            if (end) {
                $(this).closest(".saiForm").submit();
            }
        });

        /* End */
    };
})(jQuery);