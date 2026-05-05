$(document).ready(function () {

    // Show first tab by default
    $("#tab1").show();

    $(".tab-btn").click(function () {

        let target = $(this).data("target");

        // Remove active class from all buttons
        $(".tab-btn").removeClass("active");
        $(this).addClass("active");

        // Hide all tab content
        $(".tab-content").fadeOut(300);

        // Show selected tab content with animation
        $(target)
            .delay(300)
            .fadeIn(400);

        // Smooth scroll to content
        $("html, body").animate({
            scrollTop: $(target).offset().top - 20
        }, 600);

    });

});