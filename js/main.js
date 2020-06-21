window.onload = (function ($) {
  "use strict";






  (function () {
    "use strict";

    var cookieAlert = document.querySelector(".cookiealert");
    var acceptCookies = document.querySelector(".acceptcookies");

    if (!cookieAlert) {
      return;
    }

    cookieAlert.offsetHeight; // Force browser to trigger reflow (https://stackoverflow.com/a/39451131)

    // Show the alert if we cant find the "acceptCookies" cookie
    if (!getCookie("saleskenCookies")) {
      cookieAlert.classList.add("show");
    }

    // When clicking on the agree button, create a 1 year
    // cookie to remember user's choice and close the banner
    acceptCookies.addEventListener("click", function () {
      setCookie("saleskenCookies", true, 365);
      cookieAlert.classList.remove("show");
    });

    // Cookie functions from w3schools
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  })();


  // Preloader (if the #preloader div exists)
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });


  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });






  // Initiate the wowjs animation library
  new WOW().init();

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 50) {
    $('#header').addClass('header-scrolled');
  }

  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $('.ftco_navbar'),
        sd = $('.js-scroll-wrap');

      if (st > 50) {
        if (!navbar.hasClass('scrolled')) {
          navbar.addClass('scrolled');
        }
      }
      if (st < 50) {
        if (navbar.hasClass('scrolled')) {
          navbar.removeClass('scrolled sleep');
        }
      }
      if (st > 50) {
        if (!navbar.hasClass('awake')) {
          navbar.addClass('awake');
        }

        if (sd.length > 0) {
          sd.addClass('sleep');
        }
      }
      if (st < 50) {
        if (navbar.hasClass('awake')) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
        if (sd.length > 0) {
          sd.removeClass('sleep');
        }
      }
    });
  };
  scrollWindow();

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.navbar, .mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function () {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {

        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
    });
  });



  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });
    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
  });




  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: false,
    dots: true,
    loop: true,
    items: 1,








    responsive: {
      0: {
        items: 1,

      },
      600: {
        items: 1,

      },
      1000: {
        items: 2,

      }
    }




  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: false,

    loop: true,


    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    slideTransition: 'linear',

    autoplayHoverPause: false,


    responsive: {
      0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });
  $(".index-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,

    item: 1,



  });

  $('.image:first').show();

  $('.title').click(function () {
    $('.image').hide();
    var itemID = $(this).attr('itemID');
    $('.image[itemID="' + itemID + '"]').fadeIn('fast');
  });

  setInterval(function () {
    var $cur = $('a.active');
    var i = $cur.closest('li').index();

    $('.image:visible').hide();

    $cur.removeClass('active');
    if ($cur.closest('li').is(':last-child')) {
      $('.image').eq(0).fadeIn('fast');
      $cur.closest('ul').find('li:first-child').find('a.title').addClass('active');
    }

    else {
      $('.image').eq(i + 1).fadeIn('fast');
      $cur.closest('li').next().find('a.title').addClass("active");
    }
  }, 2000);








})(jQuery);


$('[data-widget="tab-slider"]').each(function (i, el) {

  const $container = $(this);
  const $sliderLinks = $container.find('.nav-link');
  const panelCount = $sliderLinks.length;
  const delay = 3000; // milleseconds
  let index = 0;

  function nextTabSliderPanel() {

    $sliderLinks.eq(index++ % panelCount).trigger('click');
    setTimeout(nextTabSliderPanel, delay);

  }

  nextTabSliderPanel(); // Start the slider.

});


$("#signup").click(function () {
  var Serialized = $("#userForm").serialize();
  $.ajax({
    type: "POST",
    url: "contact.php",
    data: Serialized,

    success: function (data) {


      //var obj = jQuery.parseJSON(data); if the dataType is not specified as json uncomment this
      // do what ever you want with the server response
    },
    error: function () {
      alert('error handing here');
    }
  });
});
