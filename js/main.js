
$(function () {
  $('.slider').slick({
    dots: true,
    infinite: false,
    arrows: true,
    slidesToShow: 1,
    adaptiveHeight: false,
    edgeFriction: 0.25,
    responsive: [
      {
        breakpoint: 860,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
        }
      }
    ],
    prevArrow: '<i class="fa reviews__arrows fa-angle-left fa" aria-hidden="true"></i>',
    nextArrow: '<i class="fa reviews__arrows fa-angle-right fa" aria-hidden="true"></i>'
  });



  $("a.scrollto").click(function () {
    var elementClick = '#' + $(this).attr("href").split("#")[1];
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 1700);
    return false;
  });

  $(".bar").click(function () {
    $(".gamburger-box").slideToggle("slow")
  }),
    $(".gamburger-box").click(function () {
      $(this).fadeOut()
    }),

    $(document).ready(function () {
      // Кешируем объект окна
      $window = $(window);

      $('[data-type="background"]').each(function () {
        var $bgobj = $(this);
        // Назначаем объект

        $(window).scroll(function () {

          // Прокручиваем фон со скоростью var.
          // Значение yPos отрицательное, так как прокручивание осуществляется вверх!
          var yPos = -($window.scrollTop() / $bgobj.data('speed'));

          // Размещаем все вместе в конечной точке
          var coords = '50% ' + yPos + 'px';

          // Смещаем фон
          $bgobj.css({
            backgroundPosition: coords
          });

        });

      });

    });
});
$(document).ready(function () {
  $('[data-submit]').on('click', function (e) {
    e.preventDefault();
    $(this).parent('form').submit();
  })
  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Please check your input."
  );
  function valEl(el) {

    el.validate({
      rules: {
        tel: {
          required: true,
          regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
        },
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        tel: {
          required: 'Поле обязательно для заполнения',
          regex: 'Телефон может содержать символы + - ()'
        },
        name: {
          required: 'Поле обязательно для заполнения',
        },
        email: {
          required: 'Поле обязательно для заполнения',
          email: 'Неверный формат E-mail'
        }
      },
      submitHandler: function (form) {
        $('#loader').fadeIn();
        var $form = $(form);
        var $formId = $(form).attr('id');
        switch ($formId) {
          case 'goToNewPage':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize(),
            })
              .always(function (response) {
                //ссылка на страницу "спасибо" - редирект
                location.href = 'https://wayup.in/lm/landing-page-marathon/success';
                //отправка целей в Я.Метрику и Google Analytics
                ga('send', 'event', 'masterklass7', 'register');
                yaCounter27714603.reachGoal('lm17lead');
              });
            break;
          case 'popupResult':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize(),
            })
              .always(function (response) {
                setTimeout(function () {
                  $('#loader').fadeOut();
                }, 800);
                setTimeout(function () {
                  $('#overlay').fadeIn();
                  $('form').fadeOut();
                  $form.trigger('reset');
                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                }, 1100);
                $('#overlay').on('click', function (e) {
                  $('#overlay').fadeOut();
                });

              });
            break;
        }
        return false;
      }
    })
  }

  $('.main-form').each(function () {
    valEl($(this));
  });
  $('[data-scroll]').on('click', function () {
    $('html, body').animate({
      scrollTop: $($.attr(this, 'data-scroll')).offset().top
    }, 2000);
    event.preventDefault();
  })
})

