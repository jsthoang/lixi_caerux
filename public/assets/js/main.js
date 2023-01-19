(function ($) {
    var _duration = 1000,
        _easing = "easeOutCubic",
        _width = $(window).width(),
        _spmode = 750;

    if (_width <= _spmode) {
    }
    // loading after
    window.onload = function () {
        $("#header .dot_nav").on("click", function (e) {
            e.preventDefault();
            $("#header .dot_nav").toggleClass("active");
            $(".menu_sp").toggleClass("visibility");
            $("#header").toggleClass("active_sp");
        });
        $(".thumb_volume").on("click", function () {
            $(this).hide();
            $(".thumb_mute").show();
            $("#audio_main")[0].pause();
        });
        $(".thumb_mute").on("click", function () {
            $(this).hide();
            $(".thumb_volume").show();
            $("#audio_main")[0].play();
        });
    };
    //resize after
    window.onresize = function () {
        _width = $(window).width();
        if (_width <= _spmode) {
        } else {
        }
    };
    //scroll after
    window.onscroll = function () {};
    $(document).ready(function () {});
})(jQuery);
