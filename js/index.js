 jQuery(function ($) {
     $('#filter_game').click(function () {
         if ($(this).hasClass('active')) {
             $(this).removeClass('active');
             $('.calendar_games').fadeOut(100);
         }
         else {
             $(this).toggleClass('active');
             $('.calendar_games').fadeIn(100);
         }
     });
     $('#lang').click(function () {
         if ($(this).hasClass('active')) {
             $(this).removeClass('active');
             $('#profile').removeClass('active');
         }
         else {
             $(this).toggleClass('active');
             $('#profile').removeClass('active');
         }
     });
     $('#profile').click(function () {
         if ($(this).hasClass('active')) {
             $(this).removeClass('active');
             $('#lang').removeClass('active');
         }
         else {
             $(this).addClass('active');
             $('#lang').removeClass('active');
         }
     });
     $('inputs').click(function () {
         if ($(this).parent().hasClass('focused')) {
             $(this).parent().removeClass('focused');
         }
         else {
             $(this).parent().addClass('focused');
         }
     });
     let input = document.getElementsByClassName('form-control')
     for (var i = 0; i < input.length; i++) {
         input[i].addEventListener('focus', show);
         input[i].addEventListener('focusout', hide);
     }

     function show() {
         this.parentNode.classList.add('focused')
     }

     function hide() {
         // Check first that
         // there any input exist or not in input field 
         if (this.value.length == 0) this.parentNode.classList.remove('focused')
     }
     $(".btn_resetpass").click(function () {
         $('#modal').modal('hide');
         let recoveryForm = document.getElementById('passRec');
         recoveryForm.addEventListener('submit', (e) => {
             e.preventDefault();
             fetch(`${eSports.siteurl}password-recovery`, {
                 method: 'POST'
                 , body: new FormData(recoveryForm)
             }).then(response => {
                 return response.json();
             }).then(result => {
                 if (result.statusCode === 200) {
                     $('#recover-email').removeClass('error');
                     $('#passRedErr').removeClass('error');
                     $('#passRedErr').addClass('done');
                     $('#passRedErr').html(eSports.translations.LANG_YOU_WILL_RECEIVE_EMAIL);
                     setTimeout(function () {
                         window.location = `${eSports.siteurl}login`;
                     }, 2000);
                 }
                 else {
                     $('#recover-email').addClass('error');
                     $('#passRedErr').text(result.errors.email);
                 }
             }).catch(e => {
                 console.log(e);
             });
         });
     });
     var swiper = new Swiper('.swiper-banner', {
         navigation: {
             nextEl: '.swiper-ban-button-next'
             , prevEl: '.swiper-ban-button-prev'
         , }
         , pagination: {
             el: '.swiper-ban-pagination'
             , clickable: true
         , }
     , });
     $('#login').click(function () {
         $('.md1').fadeIn(0);
         $('.md_login').addClass('active');
         $('.md_header #md_register').removeClass('active');
         $('.md_header #md_login').addClass('active');
         $('.md_register').fadeOut('fast');
         $('body').css('overflow', 'hidden');
     });
     $('#register').click(function () {
         $('.md_login').removeClass('active');
         $('.md1').fadeIn(0);
         $('.md_register').addClass('active');
         $('.md_header #md_login').removeClass('active');
         $('.md_header #md_register').addClass('active');
         $('body').css('overflow', 'hidden');
     });
     $('#md_login').click(function () {
         $('.md_register').removeClass('active');
         $('.md_header #md_register').removeClass('active');
         $('.md_header #md_login').addClass('active');
         $('.md_login').addClass('active');
         $('.md_register').fadeOut('fast');
     });
     $('#md_register').click(function () {
         $('.md_login').removeClass('active');
         $('.md_header #md_login').removeClass('active');
         $('.md_header #md_register').addClass('active');
         $('.md_register').addClass('active');
         $('.md_login').fadeOut('fast');
     });
     $('.add_result').click(function () {
         $('.md2').fadeIn(0);
         $('body').css('overflow', 'hidden');
     });
     $('.close').click(function () {
         $('.md').fadeOut(0);
         $('body').css('overflow', 'visible');
     });
     $('.btn-create').click(function () {
         if ($(this).parent().parent().children('.team_body').hasClass('active')) {
             $('.team_body').removeClass('active');
           
             $('.team_body').hide(300);
         }
         else {
             $('.team_body').toggleClass('active');
             $('.team_body.active').show(300);
             
         }
     });
     
      $('#enter_price_btn').click(function () {
         $('.balance_cards').fadeOut(0);
         $('#enter_price').fadeIn(0);
     });
      $('#choose_price_btn').click(function () {
         $('#enter_price').css('display', 'none');
         $('.balance_cards').fadeIn(0);
     });
     var x, i, j, selElmnt, a, b, c;
     /*look for any elements with the class "custom-select":*/
     x = document.getElementsByClassName("custom-select");
     for (i = 0; i < x.length; i++) {
         selElmnt = x[i].getElementsByTagName("select")[0];
         /*for each element, create a new DIV that will act as the selected item:*/
         a = document.createElement("DIV");
         a.setAttribute("class", "select-selected");
         a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
         x[i].appendChild(a);
         /*for each element, create a new DIV that will contain the option list:*/
         b = document.createElement("DIV");
         b.setAttribute("class", "select-items select-hide");
         for (j = 0; j < selElmnt.length; j++) {
             /*for each option in the original select element,
             create a new DIV that will act as an option item:*/
             c = document.createElement("DIV");
             c.innerHTML = selElmnt.options[j].innerHTML;
             c.addEventListener("click", function (e) {
                 /*when an item is clicked, update the original select box,
                 and the selected item:*/
                 var y, i, k, s, h;
                 s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                 h = this.parentNode.previousSibling;
                 for (i = 0; i < s.length; i++) {
                     if (s.options[i].innerHTML == this.innerHTML) {
                         s.selectedIndex = i;
                         h.innerHTML = this.innerHTML;
                         y = this.parentNode.getElementsByClassName("same-as-selected");
                         for (k = 0; k < y.length; k++) {
                             y[k].removeAttribute("class");
                         }
                         this.setAttribute("class", "same-as-selected");
                         break;
                     }
                 }
                 h.click();
             });
             b.appendChild(c);
         }
         x[i].appendChild(b);
         a.addEventListener("click", function (e) {
             /*when the select box is clicked, close any other select boxes,
             and open/close the current select box:*/
             e.stopPropagation();
             closeAllSelect(this);
             this.nextSibling.classList.toggle("select-hide");
             this.classList.toggle("select-arrow-active");
         });
     }

     function closeAllSelect(elmnt) {
         /*a function that will close all select boxes in the document,
         except the current select box:*/
         var x, y, i, arrNo = [];
         x = document.getElementsByClassName("select-items");
         y = document.getElementsByClassName("select-selected");
         for (i = 0; i < y.length; i++) {
             if (elmnt == y[i]) {
                 arrNo.push(i)
             }
             else {
                 y[i].classList.remove("select-arrow-active");
             }
         }
         for (i = 0; i < x.length; i++) {
             if (arrNo.indexOf(i)) {
                 x[i].classList.add("select-hide");
             }
         }
     }
     /*if the user clicks anywhere outside the select box,
     then close all select boxes:*/
     document.addEventListener("click", closeAllSelect);
 });
 document.addEventListener('DOMContentLoaded', function () {
     var navListItems = $('ul.nav-list li a')
         , navHeadItems = $('.options_head a')
         , cont = $('.profile_content-info');
     cont.hide();
     navListItems.click(function (e) {
         e.preventDefault();
         var $target = $($(this).attr('href'))
             , $item = $(this).closest('li');
         if (!$item.hasClass('disabled')) {
             navListItems.closest('li').removeClass('active');
             $item.addClass('active');
             cont.hide();
             $target.show();
         }
     });
     navHeadItems.click(function (e) {
         e.preventDefault();
         var $target = $($(this).attr('href'))
             , $item = $(this);
         if (!$item.hasClass('disabled')) {
             cont.hide();
             $target.show();
         }
     });
     $('ul.nav-list li.active a').trigger('click');
 });