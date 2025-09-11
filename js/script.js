$(function () {
  //스와이퍼 팝업
  /* let bgColors=["#15181e","#15181e","#f5fcff"] */
  var swiper = new Swiper(".popupSwiper", {
    spaceBetween: 30,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button_next",
      prevEl: ".swiper-button_prev",
    },
    loop: true,
    on: {
      slideChange: function () {
        var activeSlide = this.slides[this.activeIndex];
        var bgColor = $(activeSlide).data("bg");
        $(".popupSwiper .swiper-slide").css("background-color", bgColor);
      },
    },
  });

  // 초기 배경색 세팅
  var firstBg = $(".swiper-slide").eq(0).data("bg");
  $(".popupSwiper .swiper-slide").css("background-color", firstBg);

  $('.closeBtn').click(function () {
    $('.popup').css('display', "none")
  });


  //모바인 메뉴 Moblienav

  $('#Moblienav>ul>li>a').click(function (e) {
    e.preventDefault();
    let $this = $(this);
    let submenu = $this.next("ul");
    if (submenu.is(":visible")) {  //보이는 서브메뉴가 있음
      submenu.slideUp();  //서브메뉴 닫기
      $this.removeClass('active'); //화살표 원상태
    } else {
      $('#Moblienav>ul ul').slideUp();  //모두 닫기
      submenu.slideDown(); //클릭한거만 열리기
      $('#Moblienav>ul>li>a').removeClass("active"); //모든 화살표 원래대로
      $this.addClass('active');  //선택한 화살표 위로
    }

  });




  //햄버거메뉴
  $('.moblieMenu').click(function (e) {
    e.preventDefault();
    $('#Moblienav').addClass('open');
    //$('#Movienav').css('left', '-100%').stop().animate({left:0}, 500);
  });
  $('.closeBtn').click(function () {
    $('#Moblienav').removeClass('open');
  });



  //팝업 24시간 보지않기
  const KEY = 'popupHideUntil';
  const now = Date.now();
  /* console.log(hideUntil); */

  const hideUntil = parseInt(localStorage.getItem(KEY), 10);

  //24시간 안지났을때 팝업 숨김
  if (hideUntil && now < hideUntil) {
    $('.popup').hide();
  }


  //팝업 버튼 클릭하면 닺기
  $('.popup>.closeBtn').click(function () {
    const oneDayMs = 24 * 60 * 60 * 1000;
    localStorage.setItem(KEY, (Date.now() + oneDayMs).toString());
    $('.popup').fadeOut(200);
  });





  //section1 텍스트 에니메이션
  const phrases = [
    "글자로 쇼핑몰을 만들어주세요",
    "브랜드를 시작해 보세요",
    "아이디어를 현실로 만드세요",
    "비지니스를 시작해 보세요"
  ]
  const fadeInTime = 700;
  const visibleTime = 2000;
  const fadeOutTime = 700;

  const textani = $('.animated-text .accent');
  let idx = 0;

  function showNext() {
    textani.text(phrases[idx]);

    textani.stop(true, true).css("opacity", 0).fadeTo(fadeInTime, 1).delay(visibleTime).fadeTo(fadeOutTime, 0, function () {
      idx = (idx + 1) % phrases.length;
      showNext()//재귀함수
    });
  }


  showNext();

  $('.animated-text').on("mouseenter", function () {
    textani.stop(true, true)
  }).on("mouseleave", function () {
    showNext();
  });



  //모바일 영상 플레이
  $(".mobileplay").on("click", function () {
    const $btn = $(this);
    const $video = $btn.siblings(".video-container").find("video").get(0);
    const $title = $btn.siblings(".mobile-text-title");
    const $desc = $btn.siblings(".mobile-text-desc");

    
      $video.play();
      $video.muted=false;
      $btn.hide();
      $title.hide();
      $desc.hide();
    
  });

  $('#carouselInner1 .carousel-item video').on('click', function(){
    const $video = $(this).get(0);
    const $btn = $(this).closest('.carousel-item').find(".mobileplay");
    const $title = $(this).closest('.carousel-item').find(".mobile-text-title");
    const $desc = $(this).closest('.carousel-item').find(".mobile-text-desc");

    if($video.paused){
      $video.play();
      $btn.hide();
      $title.hide();
      $desc.hide();
    }else{
      $video.pause();
      $btn.show();
      $title.show();
      $desc.show();
    }
  });

});