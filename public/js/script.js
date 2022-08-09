document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("unicornProject JS imported successfully!");
  },
  false
);

$(document).ready(function() {
  $('.js-example-basic-multiple').select2();
});

$(function(){
  $("select").multiselect(); 
});
