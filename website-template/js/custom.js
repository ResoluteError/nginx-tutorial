(function ($) {
  "use strict";

  // PRE LOADER
  $(window).load(function () {
    $(".preloader").fadeOut(1000); // set duration in brackets

    fetch("https://nginx.douglas-reiser.com/api/greeting")
      .then((data) => data.json())
      .then((json) => {
        document.getElementById("title").innerHTML = json.data;
      })
      .catch((err) => {
        console.log("Error fetching greeting:", err);
      });

    fetch("https://nginx.douglas-reiser.com/api/service")
      .then((data) => data.json())
      .then((json) => {
        document.getElementById("subtitle").innerHTML = json.data;
      })
      .catch((err) => {
        console.log("Error fetching greeting:", err);
      });
  });

  // CUSTOM LINK
  $(".custom-link").click(function () {
    var el = $(this).attr("href");
    var elWrapped = $(el);
    var header_height = $(".navbar").height() + 10;

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $("body,html").animate(
        {
          scrollTop: totalScroll,
        },
        300
      );
    }
  });
})(window.jQuery);
