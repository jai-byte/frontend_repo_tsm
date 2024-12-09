// show whole box while click on box area started here
$(document).ready(function () {
    $(".icon").click(function () {
        $(".pop-up-description").toggle();
    });
});
// show whole box while click on box area ended here
// cross area started here 
$(document).ready(function () {
    $('.icon').click(function () {
        $(".cross-icon").show();
        $(".icon").hide();
    });
    $('.cross-icon').click(function () {
        $(".pop-up-description").hide();
        $(".icon").show();
        $('.cross-icon').hide();
    });
});
// cross area ended here
