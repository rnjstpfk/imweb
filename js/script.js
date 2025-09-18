$(function(){
   //스와이퍼 팝업
    var swiper = new Swiper(".popupSwiper", {
      spaceBetween: 30,
      effect: "fade",

      navigation: {
        nextEl: ".swiper-button_next",
        prevEl: ".swiper-button_prev",
      },
      loop:true,
      autoplay:true,
       on: {
      slideChange: function () {
         var bgColor = $(".popupSwiper .swiper-slide-active").data("bg");
         $(".popupSwiper .swiper-slide").css("background-color", bgColor);
      },
    },
  });

  //모바일 메뉴
  $('#Mobienav>ul>li>a').click(function(e){
    e.preventDefault();
    let $this=$(this);
    let submenu=$this.next("ul");
    if(submenu.is(":visible")){//보이는 서브메뉴가 있으면
      submenu.slideUp();//서브메뉴를 닫아
      $this.removeClass('active');//화살표 원상태
    }else{
      $('#Mobienav>ul ul').slideUp();//일단 모두 닫아
       submenu.slideDown();//내가 클릭한 친구만 열려
       $('#Mobienav>ul>li>a').removeClass("active");//모든 화살표 원래되로
       $this.addClass('active')//선택한 화살표 위로
    }
    
  });
  
  //햄버거 메뉴
  $('.mobileMenu').click(function(e){
    e.preventDefault();
    $('#Mobienav').addClass('open');
    //$('#Movienav').css('left', '-100%').stop().animate({left:0}, 500);
  });
  $('.closeBtn').click(function(){
    $('#Mobienav').removeClass('open');
  });


  //팝업 24시간 보지않기
  const KEY='popupHideUntil';
  const now=Date.now();
  const hideUntil=parseInt(localStorage.getItem(KEY),10);

  //24시간 안지났을때 팝업 숨김
  if(hideUntil && now < hideUntil){
     $('.popup').hide();
  }

  //팝업 버튼 클릭하면 닫기
  $('.popup .closeBtn').click(function(){
    const oneDayMs=24*60*60*1000;
    localStorage.setItem(KEY, (Date.now() + oneDayMs).toString());
    $('.popup').fadeOut(200)
  });
 


  //section1 text-animation
  const phrases=[
    "글자로 쇼핑몰을 만들어주세요",
    "브랜드를 시작해보세요",
    "아이디어를 현실로 만들어보세요",
    "쇼핑몰을 만들어보세요"
  ]
  const fadeInTime=700;
  const visibleTime=2000;
  const fadeOutTime=700;

  const textani=$('.animated-text .accent');
  let idx=0;

  function showNext(){
    textani.text(phrases[idx]);

    textani.stop(true, true).css("opacity",0).fadeTo(fadeInTime, 1).delay(visibleTime).fadeTo(fadeOutTime, 0, function(){
      idx=(idx+1) % phrases.length;
      showNext();//재귀함수
    })
  }

  showNext();


  $('.animated-text').on("mouseenter",function(){
    console.log("멈춰")
     textani.stop(true, true)
  }).on("mouseleave",function(){
    showNext();
  })

  //모바일 영상 플레이
  $(".mobileplay").on('click',function(){
     const $btn=$(this);
     const $video=$btn.siblings(".video-container").find("video").get(0);
     const $title=$btn.siblings(".mobie-text-title");
     const $desc=$btn.siblings(".mobie-text-desc");

     $video.play();
     $video.muted=false;
     $btn.hide();
     $title.hide();
     $desc.hide();

  });

  $('#carouselInner1 .carousel-item video').on('click', function(){
    const $video=$(this).get(0);
    const $btn = $(this).closest(".carousel-item").find(".mobileplay");
    const $title = $(this).closest(".carousel-item").find(".mobie-text-title");
    const $desc = $(this).closest(".carousel-item").find(".mobie-text-desc");

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

   let isExpanded= false;

  $('#carouselInner .video-container').on("click", function(){
    const $item=$(this).closest("#carouselInner .carousel-item");
    const $carousel=$item.closest("#carouselInner.carousel");
    console.log("carousel 클릭")
    if(!isExpanded){
      $carousel.addClass("expanded")
      $item.addClass("expanded");

      $carousel.find(".carousel-item").not($item).addClass("hidden");
      $item.css("cursor", "url('./img/cursor-close.png'), auto");
      const $video=$item.find("video").get(0);
      $video.muted=false;
      $video.play();
      isExpanded= true;
    }else{
     
      $carousel.removeClass("expanded");
      $carousel.find(".carousel-item").removeClass("hidden expanded");
      $item.css("cursor", "url('./img/mobile-play-button.png'), auto");
      const $video=$item.find("video").get(0);
      $video.muted=true;
      
      isExpanded= false;
    }

  });

  //양쪽 버튼 클릭식 슬라이드
  const _carousel=$("#carouselInner");
  let _items=_carousel.find('.carousel-item');
  let centerIndex=2; //가운데 인덱스
  let animating=false;
  let textposition=_items.find('.text-container')

  //활성화 업데이트
  function updateActive(){
    _items=_carousel.find(".carousel-item");
    _items.removeClass("active");
    _items.eq(centerIndex).addClass("active")
  }

  updateActive();
  function slide(direction){
    if(animating) return;
    animating=true;
    const itemWidth=_items.eq(centerIndex).outerWidth(false);
    if(direction==="prev"){
      //마지막에 있는 아이템을 맨 앞에 붙임
      _carousel.prepend(_carousel.find('.carousel-item').last());

      _carousel.css({
        transition:"none",
        transform:`translateX(-${itemWidth}px)`
      });
      requestAnimationFrame(()=>{
        _carousel.css({
          transition: "transform .6s ease",
          transform:"translateX(0)"
        })
      })


      setTimeout(()=>{
        _carousel.css({transition:"none",transform:"translateX(0)"});
        updateActive();
        animating=false;

      }, 100)
      textposition.css({bottom:'-70px', left:"600px"}).animate({bottom:'-10px', left:0}, 200)
    }else{

      _carousel.css({
        transition: "transform .3s ease",
        transform:`translateX(-${itemWidth}px)`
      });

       setTimeout(()=>{
        _carousel.css({transition:"none",transform:"translateX(0)"});
        _carousel.append(_carousel.find(".carousel-item").first())
        updateActive();
        animating=false;

      }, 100)
     /*  textposition.css({bottom:'70px', left:"600px"}).animate({bottom:'-10px', left:0}, 600) */

    }
  }



  $('#nextBtn').on("click", function(){slide("next")});
  $('#prevBtn').on("click", function(){slide("prev")});


//section3
$(window).on("scroll", function(){

  let scrollTop=$(window).scrollTop();
  let section3=$('.section3');
  let section3Top=section3.offset().top;
  let innerHeight=section3.find(".inner").height();
  let windowH=$(window).height();
  
  let fixText=$('.fixTextCenter');
  let fixTitle=$('.section3Title');

  //섹션시작~섹션 끝 사이일때는 fixed유지 
  if(scrollTop >= section3Top && scrollTop < section3Top+ innerHeight - windowH){
    fixText.css({opacity:1, position:"fixed", top: 0});
    fixTitle.css({opacity:1, position:"fixed",bottom: "100px"});

  }else if(scrollTop >= section3Top+ innerHeight - windowH){ //inner 끝나면  absolute로 변환해서 스크롤 되게
    fixText.css({ position:"absolute", top: 0});
    fixTitle.css({ position:"absolute",bottom: "100px"});
  }else{ //섹션 위에 있을 때는 숨김 처리
    fixText.css({ position:"absolute", top: 0});
    fixTitle.css({ position:"absolute",bottom: "100px"});
  }


  
});


//section4


  
});

$(function(){
  const $win = $(window);
  const $section4 = $(".section4");
  const $inline = $(".section4 .inlineflex");
  const $items = $(".inlineflex .css-0");

  let winW, winH, totalWidth, totalScrollX, itemWidth, gap;

  function recalc(){
    winW = $win.width();
    winH = $win.height();
    itemWidth = winW * 0.325; // 아이템 폭 (조정 가능)
    gap=winW *0.02;
    totalWidth =($items.length* itemWidth) + (($items.length - 1) * gap); // 마지막 여백
    totalScrollX = totalWidth - winW;

    // 섹션 높이 = 가로 스크롤 거리 + 화면 높이
    $section4.css("height", (totalScrollX + winH) + "px");

    $items.css({"flex": `0 0 ${itemWidth}px`, "margin-right": `${gap}px`});
  }

  recalc();
  $win.on("resize", recalc);

/*   let currentX = 0;
  let targetX = 0; */

  $win.on("scroll", function(){
    const scrollTop = $win.scrollTop();
    const sectionTop = $section4.offset().top;
    const sectionHeight = $section4.outerHeight();

    if(scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight - winH){
      let progress = (scrollTop - sectionTop) / (sectionHeight - winH);
      progress = Math.min(progress, 1);

     let targetX = (progress * totalScrollX) + 500;

      // inlineflex 이동 (오른쪽에서 왼쪽으로)
      $inline.css("transform", `translateX(-${targetX}px)`);

      // sectionTitle 60% 지나면 사라지기
      $('.sectionTitle').css("opacity", progress > 0.6 ? 0:1);
      // active 처리
      let index=Math.floor(targetX / (itemWidth+gap));
      index=Math.max(0, Math.min(index, $items.length + 2));
      $items.removeClass("active").eq(index).addClass("active")
    }
  });

  // 비디오 자동재생
  function handleVideoPlay(){
    let windowWidth = $(window).width();
    if(windowWidth > 992){
      $(".flexSlide video").each(function(){
        if($(this).closest("a").hasClass("active")){
          this.play();
        }else{
          this.pause();
        }
      });
    }else{
      $(".flexSlide video").each(function(){
        this.play();
      });
    }
  }

  handleVideoPlay();
  $win.on("resize", handleVideoPlay);

  // active 변경 감지
  $win.on("scroll", handleVideoPlay);
});


