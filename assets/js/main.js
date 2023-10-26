!function(){"use strict";let e=(e,t=!1)=>(e=e.trim(),t)?[...document.querySelectorAll(e)]:document.querySelector(e),t=(t,s,i,l=!1)=>{let a=e(s,l);a&&(l?a.forEach(e=>e.addEventListener(t,i)):a.addEventListener(t,i))},s=(e,t)=>{e.addEventListener("scroll",t)},i=e("#navbar .scrollto",!0),l=()=>{let t=window.scrollY+200;i.forEach(s=>{if(!s.hash)return;let i=e(s.hash);i&&(t>=i.offsetTop&&t<=i.offsetTop+i.offsetHeight?s.classList.add("active"):s.classList.remove("active"))})};window.addEventListener("load",l),s(document,l);let a=t=>{let s=e("#header"),i=s.offsetHeight;s.classList.contains("header-scrolled")||(i-=16);let l=e(t).offsetTop;window.scrollTo({top:l-i,behavior:"smooth"})},o=e("#header");if(o){let r=o.offsetTop,n=o.nextElementSibling,c=()=>{r-window.scrollY<=0?(o.classList.add("fixed-top"),n.classList.add("scrolled-offset")):(o.classList.remove("fixed-top"),n.classList.remove("scrolled-offset"))};window.addEventListener("load",c),s(document,c)}let d=e(".back-to-top");if(d){let f=()=>{window.scrollY>100?d.classList.add("active"):d.classList.remove("active")};window.addEventListener("load",f),s(document,f)}t("click",".mobile-nav-toggle",function(t){e("#navbar").classList.toggle("navbar-mobile"),this.classList.toggle("bi-list"),this.classList.toggle("bi-x")}),t("click",".navbar .dropdown > a",function(t){e("#navbar").classList.contains("navbar-mobile")&&(t.preventDefault(),this.nextElementSibling.classList.toggle("dropdown-active"))},!0),t("click",".scrollto",function(t){if(e(this.hash)){t.preventDefault();let s=e("#navbar");if(s.classList.contains("navbar-mobile")){s.classList.remove("navbar-mobile");let i=e(".mobile-nav-toggle");i.classList.toggle("bi-list"),i.classList.toggle("bi-x")}a(this.hash)}},!0),window.addEventListener("load",()=>{window.location.hash&&e(window.location.hash)&&a(window.location.hash)});let h=e("#preloader");h&&window.addEventListener("load",()=>{h.remove()}),GLightbox({selector:".glightbox"});let p=e(".skills-content");p&&new Waypoint({element:p,offset:"80%",handler:function(t){e(".progress .progress-bar",!0).forEach(e=>{e.style.width=e.getAttribute("aria-valuenow")+"%"})}}),new Swiper(".testimonials-slider",{speed:600,loop:!0,autoplay:{delay:5e3,disableOnInteraction:!1},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},slidesPerView:"auto",pagination:{el:".swiper-pagination",type:"bullets",clickable:!0}}),window.addEventListener("load",()=>{let s=e(".portfolio-container");if(s){let i=new Isotope(s,{itemSelector:".portfolio-item"}),l=e("#portfolio-flters li",!0);t("click","#portfolio-flters li",function(e){e.preventDefault(),l.forEach(function(e){e.classList.remove("filter-active")}),this.classList.add("filter-active"),i.arrange({filter:this.getAttribute("data-filter")}),i.on("arrangeComplete",function(){AOS.refresh()})},!0)}}),GLightbox({selector:".portfolio-lightbox"}),new Swiper(".portfolio-details-slider",{speed:400,loop:!0,autoplay:{delay:5e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination",type:"bullets",clickable:!0}}),window.addEventListener("load",()=>{AOS.init({duration:1e3,easing:"ease-in-out",once:!0,mirror:!1})}),$("#formButton").click(function(){var e;let t={"/de/":2,"/fr/":3,"/it/":4},s=1,i=$("#inputEmail").val(),l=$(location).attr("href");(Object.keys(t).some(function(e){if(l.includes(e))return s=t[e],!0}),!0==(e=i,/\S+@\S+\.\S+/.test(e)))?$.ajax({url:`https://www.eg-software.com/api_egsdb/api/subscribe/cmc//${i}/${s}`,method:"post",async:!1,success:function(e){1==s?(console.log(e),"CMC, Emaill already exist."==e?alert("Thank you. You were already subscribed."):alert("Thank you. You are now subscribed to our newsletter.")):2==s?(console.log(e),"CMC, Emaill already exist."==e?alert("Danke sch\xf6n. Sie waren bereits abonniert."):alert("Danke sch\xf6n. Sie sind jetzt f\xfcr unseren Newsletter abonniert.")):3==s?(console.log(e),"CMC, Emaill already exist."==e?alert("Merci. Vous \xe9tiez d\xe9j\xe0 abonn\xe9."):alert("Merci. Vous \xeates d\xe9sormais abonn\xe9 \xe0 notre newsletter.")):4==s&&(console.log(e),"CMC, Emaill already exist."==e?alert("Grazie. Eri gi\xe0 iscritto."):alert("Grazie. Ora sei iscritto alla nostra newsletter."))},error:function(e){console.error(e)}}):1==s?alert("Please enter a valid email address."):2==s?alert("Bitte geben Sie eine g\xfcltige E-Mail-Adresse ein."):3==s?alert("S'il vous pla\xeet, mettez une adresse email valide."):4==s&&alert("Si prega di inserire un indirizzo email valido.")}),!function e(){if(window.location.href.toString().includes("keytitle")){let t=new URL(window.location.href);t.searchParams.delete("keytitle"),history.replaceState(null,"",t)}}(),jQuery(document).ready(function(){let e={"/de/":2,"/fr/":3,"/it/":4},t=1,s=$(location).attr("href");Object.keys(e).some(function(i){if(s.includes(i))return t=e[i],!0});var i="",l="";1==t?(i="Show more >",l="Show less"):2==t?(i="Mehr lesen >",l="Weniger lesen"):3==t?(i="Afficher plus >",l="Afficher moins"):4==t&&(i="Mostra di pi\xf9 >",l="Mostra meno"),jQuery(".description").each(function(){var e=jQuery(this).html();if(e.length>80){var t,s=e.substr(0,80)+'<span class="moreellipses">...&nbsp;</span><span class="morecontent"><span>'+e.substr(80,e.length-80)+'</span>&nbsp;&nbsp;<a href=""  class="morelink">'+i+"</a></span>";jQuery(this).html(s)}}),jQuery(".morelink").click(function(){return jQuery(this).hasClass("less")?(jQuery(this).removeClass("less"),jQuery(this).html(i)):(jQuery(this).addClass("less"),jQuery(this).html(l)),jQuery(this).parent().prev().toggle(),jQuery(this).prev().toggle(),!1})})}();