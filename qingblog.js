$(document).ready(function(){
    $(".like-button").click(function(){
        alert("Thank you!");
    });

    $(".light-switch").click(function(){
        $("body").toggleClass("night-mode");
    });
});
