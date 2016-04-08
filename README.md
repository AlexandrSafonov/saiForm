#saiSelect 

##Installation

###Step 1.
```html
<!-- jQuery library -->
<script src="lib/jquery-1.11.3.min.js" type="text/javascript"></script>
<!--file Javascript -->
<script src="lib/saiSelect.js" type="text/javascript"></script>
<!-- file of styles -->
<link href="css/style.css" rel="stylesheet" type="text/css"/>
```

###Step 2.
```html
<form>
    <input type="text" name="anrede" />
    <ul class="saiselect">
        <li>Herr</li>
        <li>Frau</li>                             
    </ul>
</form>
```
###Step 3.
Call the saiSelect
```javascript
  jQuery(document).ready(function($){
    $(".saiselect").saiSelect();
  });
```
