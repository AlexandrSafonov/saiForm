jQuery(document).ready(function($){
    (function setPlaceHolders(){
        var input = $("input, textarea"); // get all text fields
        var cls = "placeholdr"; // set name of the class

        if (input) { // if fields found
                for (var i=0; i < input.length; i++) { 
                        var t = input[i]; 
                        var txt = t.getAttribute("placeholder");
                        if ($(t).attr("type") == "hidden" || $(t).attr("type") == "submit" ){
                            continue;
                        }
                        console.log(t);
                        if (txt.length > 0) { // if placeholder found
                                t.className = t.value.length == 0 ? t.className+" "+cls : t.className; // add class
                                t.value = t.value.length > 0 ? t.value : txt; // if no value found

                                t.onfocus = function() { // on focus
                                        this.className = this.className.replace(cls);
                                        this.value = this.value == this.getAttribute("placeholder") ? "" : this.value;
                                }

                                t.onblur = function() { // on focus out 
                                        if (this.value.length == 0) {
                                                this.value = this.getAttribute("placeholder");
                                                this.className = this.className+" "+cls; // add class
                                        }
                                }
                        }  
                }
        }
        })();
});


