/**
 * Main JS file for Ampsper behaviours. Using Casper's original file
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        /* Important section that ampifies img tags! This needs lots more work! 
        Classes are not inherited anyway, as you cannot specify classes per image
        FUTURE: Replace jQuery with pure JavaScript */

        $("img").each(function()
        {
            $(this).replaceWith( ampifyImageTags( this.getAttribute('src') ) );
        });

        /* FUTURE: Replace jQuery with pure JavaScript */
        function ampifyImageTags(gotSrc, gotAlt) {
            if (gotAlt != null) {
                return ('<amp-img src="' + gotSrc + '" alt="' + gotAlt + '"></amp-img>');
            }
            return ('<amp-img src="' + gotSrc + '"></amp-img>'); 
        }

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
