(function ($) {
    window.saiForm = {
        counter: 1
    };
    jQuery.fn.saiForm = function (options) {
        var formOptions = $.extend({
            numberLength: 10,
            numberLengthFalseMessage: "The minimum number of digits 10",
            callbackSubmit: function (thisForm) {
                $(thisForm).submit();
            }
        }, options);
        var ValidateForm = {
            endValue: true,
            select: function (thisForm) {
                var inputs = $(thisForm).find(".select_wrapper.required input");
                for (i = 0; i < inputs.length; i++) {
                    if (!$(inputs[i]).val()) {
                        $(inputs[i]).next().addClass("false_required");
                        $(inputs[i]).closest(".select_wrapper").next(".message_false").text($(inputs[i]).attr("data-false-message")).fadeIn();
                        this.endValue = false;
                    } else {
                        $(inputs[i]).next().removeClass("false_required");
                        $(inputs[i]).closest(".select_wrapper").next(".message_false").text("");
                    }
                }
            },
            text: function (thisForm) {
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
                if (!end) {
                    this.endValue = end;
                }
            },
            email: function (thisForm) {
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
                    } else if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test($(inputs[i]).val())) {
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
                if (!end) {
                    this.endValue = end;
                }
            },
            number: function (thisForm) {
                var inputs = $(thisForm).find(".number .required");
                var end = true;
                for (i = 0; i < inputs.length; i++) {
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
                if (!end) {
                    this.endValue = end;
                }
            },
            phone: function (thisForm) {
                var inputs = $(thisForm).find(".phone.required");
                for (i = 0; i < inputs.length; i++) {
                    if (!$(inputs[i]).val()) {
                        $(inputs[i]).addClass("false_required").next(".message_false").text("Enter phone number").fadeIn();
                        this.endValue = false;
                    } else if (!/^\+/i.test($(inputs[i]).val())) {
                        $(inputs[i]).addClass("false_required").next(".message_false").text("At the beginning to be '+'").fadeIn();
                        this.endValue = false;
                    } else if (!/^\+[0-9\s()-]+$/i.test($(inputs[i]).val())) {
                        $(inputs[i]).addClass("false_required").next(".message_false").text("Available characters '0-9 ( ) - ' ").fadeIn();
                        this.endValue = false;
                    } else if ($(inputs[i]).val().match(/[0-9]/gi).length < formOptions.numberLenght) {
                        $(inputs[i]).addClass("false_required").next(".message_false").text(formOptions.numberLengthFalseMessage).fadeIn();
                        this.endValue = false;
                    } else {
                        $(inputs[i]).removeClass("false_required");
                        $(inputs[i]).next(".message_false").text("");
                    }
                }
            },
            radio: function (thisForm) {
                var groups = $(thisForm).find(".radio_group");
                var end = true;
                $(groups).each(function (index) {
                    if ($(this).find(".required").length) {
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
                    }
                });
                if (!end) {
                    this.endValue = end;
                }
            },
            checkbox: function (thisForm) {
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
                if (!end) {
                    this.endValue = end;
                }
            },
            file: function (thisForm) {
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
                if (!end) {
                    this.endValue = end;
                }
            },
            password: function (thisForm) {
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
                if (!end) {
                    this.endValue = end;
                }
            },
            submit: function (thisForm) {
                this.endValue = true;
                if (thisForm.find(".select_wrapper input.required")) {
                    this.select(thisForm);
                }
                if (thisForm.find(".required.input_text")) {
                    this.text(thisForm);
                }
                if (thisForm.find(".required.email")) {
                    this.email(thisForm);
                }
                if (thisForm.find(".number input.required")) {
                    this.number(thisForm);
                }
                if (thisForm.find(".required.phone")) {
                    this.phone(thisForm);
                }
                if (thisForm.find(".radio_group")) {
                    this.radio(thisForm);
                }
                if (thisForm.find(".checkbox input.required")) {
                    this.checkbox(thisForm);
                }
                if (thisForm.find(".file input.required")) {
                    this.file(thisForm);
                }

                console.log(this.endValue);
                if (this.endValue) {
                    formOptions.callbackSubmit(thisForm);
                }
            }
        };
        var FormCreator = {
            select: function (form) {
                var firstClick = [];
                var newSelect;
                form.find("select").each(function () {
                    firstClick[saiForm.counter] = true;
                    var select = $(this);
                    if (!select.attr("data-false-message"))
                        select.attr("data-false-message", "Select sex");
                    if (select.attr("name")) {
                        select.before("<input type='hidden' name='"
                                + select.attr("name")
                                + "' data-false-message='"
                                + select.attr("data-false-message") + "'/>");
                    } else {
                        select.before("<input type='hidden' name='select"
                                + (saiForm.counter)
                                + "' data-false-message='"
                                + select.attr("data-false-message") + "'/>");
                    }
                    var inputSelect = select.prev();
                    if ($(select).attr("required") != undefined)
                        inputSelect.addClass("required");

                    var options = select.find("option");

                    inputSelect
                            .wrap("<div class='select_wrapper'></div>")
                            .wrap("<div class='input_wrapper'></div>");
                    inputSelect
                            .closest(".select_wrapper")
                            .after("<p class='message_false'></p>");

                    inputSelect
                            .closest(".select_wrapper")
                            .addClass(select.attr("class"))
                            .attr("id", select.attr("id"));

                    if (inputSelect.attr("placeholder") != undefined)
                        inputSelect.after("<p class='layer'>" + inputSelect.attr("placeholder") + "</p>");
                    else
                        inputSelect.after("<p class='layer'></p>");

                    if (inputSelect.attr("required") != undefined)
                        inputSelect.addClass("required");


                    inputSelect
                            .closest(".input_wrapper")
                            .after("<ul class='select'></ul>");

                    for (i = 0; i < options.length; i++) {
                        if ($(options[i]).attr("selected") != undefined) {
                            inputSelect
                                    .closest(".input_wrapper")
                                    .next().append("<li class='selected' data-value='"
                                    + $(options[i]).val()
                                    + "'>"
                                    + $(options[i]).text() + "</li>");
                            $(inputSelect).next().text($(options[i]).text());
                        } else {
                            inputSelect
                                    .closest(".input_wrapper")
                                    .next().append("<li data-value='"
                                    + $(options[i]).val()
                                    + "'>" + $(options[i]).text() + "</li>");
                        }
                    }

                    inputSelect.next().data("index", saiForm.counter);
                    newSelect = inputSelect.closest(".input_wrapper").next();
                    $(select).remove();
                    saiForm.counter++;
                });
                $(".input_wrapper .layer").on("click", function (e) {
                    var ind = $(this).data("index");
                    var thisSelect = $(this).parent().next(".select");
                    var ths = $(this);

                    if (thisSelect.css('display') != 'block') {
                        thisSelect.css('top', $(this).height());
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
                form.find(".select li").on("click", function () {
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
            },
            text: function (form) {
                form.find("input[type='text'], textarea, input[type='password']").addClass("input_text");
            },
            email: function (form) {
                form.find("input[type='email']").each(function () {
                    $(this).attr("type", "text").addClass("email");
                });
            },
            number: function (form) {
                form.find("input[type='number']").each(function () {
                    $(this).attr("type", "text").attr("readonly", "").wrap("<div class='number'></div>");
                    $(this).parent()
                            .addClass($(this).attr("class"))
                            .attr("id", $(this).attr("id"));
                    $(this).parent().prepend("<i class='fa fa-angle-up up' aria-hidden='true'></i>");
                    $(this).parent().append("<i class='fa fa-angle-down down' aria-hidden='true'></i>");
                });
                form.find(".number").on("click", ".up", function () {
                    var val = Number($(this).parent().find("input").val());
                    if ($(this).parent().find("input").val() == false) {
                        $(this).parent().find("input").val(1);
                    } else {
                        val++;
                        $(this).parent().find("input").val(val);
                    }
                });
                form.find(".number").on("click", ".down", function () {
                    var val = Number($(this).parent().find("input").val());
                    if (val == false) {
                        $(this).parent().find("input").val(1);
                    } else if (val > 1) {
                        val--;
                        $(this).parent().find("input").val(val);
                    }
                });
            },
            phone: function (form) {
                form.find("input[type='tel']").each(function () {
                    $(this).attr("type", "text").addClass("phone");
                    $(this).after("<p class='message_false'></p>");
                });
            },
            radio: function (form) {
                form.find("input[type='radio']").each(function (index) {
                    index = index + 1;
                    $(this).wrap("<div class='radio'></div>");
                    if ($(this).attr("id") != undefined) {
                        $(this).attr("id", $(this).attr("id") + " radio" + index + "");
                    } else {
                        $(this).attr("id", "radio" + index + "");
                    }
                    $(this).after("<label for='radio" + index + "'></label>");

                });
            },
            checkbox: function (form) {
                form.find("input[type='checkbox']").each(function (index) {
                    index = index + 1;
                    $(this).wrap("<div class='checkbox'></div>");
                    if ($(this).attr("id") != undefined) {
                        $(this).attr("id", $(this).attr("id") + " checkbox" + index++ + "");
                    } else {
                        $(this).attr("id", "checkbox" + index + "");
                    }
                    $(this).after("<label for='checkbox" + index + "'></label>");

                });
            },
            file: function (form) {
                form.find("input[type='file']").each(function (index) {
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
        };

        /* Submit */
        $(this).find("button[type='submit'] , input[type='submit']").on("click", function (e) {
            e.preventDefault();
            ValidateForm.submit($(this).closest("form"));
        });
        /* All input */
        $(this).find("input[required], select[required], textarea[required]").removeAttr("required").addClass("required");
        /* Select */
        if ($(this).find("select").length)
            FormCreator.select($(this));
        /* Input text */
        if ($(this).find("input[type='text'], textarea, input[type='password']").length)
            FormCreator.text($(this));
        /* E-Mail */
        if ($(this).find("input[type='email']").length)
            FormCreator.email($(this));
        /* Number */
        if ($(this).find("input[type='number']").length)
            FormCreator.number($(this));
        /* Phone */
        if ($(this).find("input[type='tel']").length)
            FormCreator.phone($(this));
        /* Radio */
        if ($(this).find("input[type='radio']").length)
            FormCreator.radio($(this));
        /* CheckBox */
        if ($(this).find("input[type='checkbox']").length)
            FormCreator.checkbox($(this));
        /* File */
        if ($(this).find("input[type='file']").length)
            FormCreator.file($(this));
    };
})(jQuery);