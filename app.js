var toggle_btn;
var big_wrapper;
var hamburger_menu;

function declare() {
  toggle_btn = document.querySelector(".toggle-btn");
  big_wrapper = document.querySelector(".big-wrapper");
  hamburger_menu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

let dark = false;

function toggleAnimation() {
  // Clone the wrapper
  dark = !dark;
  let clone = big_wrapper.cloneNode(true);
  if (dark) {
    clone.classList.remove("light");
    clone.classList.add("dark");
  } else {
    clone.classList.remove("dark");
    clone.classList.add("light");
  }
  clone.classList.add("copy");
  main.appendChild(clone);

  document.body.classList.add("stop-scrolling");

  clone.addEventListener("animationend", () => {
    document.body.classList.remove("stop-scrolling");
    big_wrapper.remove();
    clone.classList.remove("copy");
    // Reset Variables
    declare();
    events();
  });
}

function events() {
  // toggle_btn.addEventListener("click", toggleAnimation);
  hamburger_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
  });
}

events();


$(document).ready(function(){

  var $sm = 480;
  var $md = 768;

  function resizeThis() {
     $imgH = $('.middle img').width();
     if ($(window).width() >= $sm) {
        $('.left,.right,.section').css('height', $imgH);
     } else {
        $('.left,.right,.section').css('height', 'auto');
     }
  }

  resizeThis();

  $(window).resize(function(){
     resizeThis();
  });

  $(window).scroll(function() {
     $('.section').each(function(){
        var $elementPos = $(this).offset().top;
        var $scrollPos = $(window).scrollTop();

        var $sectionH = $(this).height();
        var $h = $(window).height();
        var $sectionVert = (($h/2)-($sectionH/4));


        if (($elementPos - $sectionVert) <= $scrollPos && ($elementPos - $sectionVert) + $sectionH > $scrollPos) {
           $(this).addClass('animate');
        } else {
           $(this).removeClass('animate');
        }
     });
  });

  $('.btn-primary').click(function(){
     alert('I lied');
  });
});

$(function() {
 $('a[href*="#"]:not([href="#"])').click(function() {
   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
     var target = $(this.hash);
     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
     if (target.length) {
       $('html, body').animate({
         scrollTop: target.offset().top
       }, 1000);
       return false;
     }
   }
 });
});

const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const cardWidth = slider.querySelector('.card').offsetWidth;
let currentIndex = 0;

function moveSlider(direction) {
    currentIndex = currentIndex + direction;
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > slider.children.length - 0.5) {
        currentIndex = slider.children.length - 0.5;
    }

    const position = -currentIndex * cardWidth;
    slider.style.transform = `translateX(${position}px)`;
}

prevButton.addEventListener('click', () => moveSlider(-0.5));
nextButton.addEventListener('click', () => moveSlider(0.5));


// Higher number = more zoom
let scaleAmount = 0.5;

function scrollZoom() {
  const images = document.querySelectorAll("[data-scroll-zoom]");
  let scrollPosY = 0;
  scaleAmount = scaleAmount / 100;

  const observerConfig = {
    rootMargin: "0% 0% 0% 0%",
    threshold: 0
  };

  images.forEach(image => {
    let isVisible = false;
    const observer = new IntersectionObserver((elements, self) => {
      elements.forEach(element => {
        isVisible = element.isIntersecting;
      });
    }, observerConfig);

    observer.observe(image);

    image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

    window.addEventListener("scroll", () => {
      if (isVisible) {
        scrollPosY = window.pageYOffset;
        image.style.transform = `scale(${1 +
          scaleAmount * percentageSeen(image)})`;
      }
    });
  });

  function percentageSeen(element) {
    const parent = element.parentNode;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const elPosY = parent.getBoundingClientRect().top + scrollY;
    const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));
    const elHeight = parent.offsetHeight + borderHeight;

    if (elPosY > scrollY + viewportHeight) {

      return 0;
    } else if (elPosY + elHeight < scrollY) {

      return 100;
    } else {

      const distance = scrollY + viewportHeight - elPosY;
      let percentage = distance / ((viewportHeight + elHeight) / 100);
      percentage = Math.round(percentage);

      return percentage;
    }
  }
}

scrollZoom();