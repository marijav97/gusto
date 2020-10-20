window.onload=function(){
  document.getElementById("register").addEventListener("click", function() {
        
    var validno = true;

    var podaci = [];

    var ime = document.getElementById("firstName").value.trim();
    var prezime = document.getElementById("lastName").value.trim();
    var email=document.getElementById("email").value.trim();
    var phone=document.getElementById("phone-number").value.trim();

    var imeError = document.getElementById("first-name-error");
    var prezimeError = document.getElementById("last-name-error");
    var emailError=document.getElementById("email-error");
    var phoneError=document.getElementById("phone-number-error");

    var reIme = /^[A-Z][a-z]{2,11}$/;
    var rePrezime = /^[A-Z][a-z]{2,15}$/;
    var reEmail=/^[\w]+\.[\w]+[\d]{2}\.[\d]{2}(@ict.edu.rs)$/;
    var rePhone = /^06[\d]\-[\d]{3}\-[\d]{3,4}$/;

    if(ime == "") {
       imeError.innerHTML = "Required."; 
       validno = false;  
    } else if(!reIme.test(ime)) {
        imeError.innerHTML = "Name isn't in a good format.";
        validno = false;
    } else {
        podaci.push(ime);
        imeError.innerHTML = "";   
    }

    if(prezime == "") {
        prezimeError.innerHTML = "Required"; 
        validno = false;  
     } else if(!rePrezime.test(prezime)) {
         prezimeError.innerHTML = "Last name isn't in a good format.";
         validno = false;
        } else {
         podaci.push(prezime);
         prezimeError.innerHTML = "";   
     }
 
  if(email == ""){
  emailError.innerHTML="";
  validno=true;
 } else if (!reEmail.test(email)){
  validno=false;
  emailError.innerHTML="Email isn't in a good format.";
 }	else {
  podaci.push(email);
  emailError="";
 }	 
    if(phone == "") {
        phoneError.innerHTML = "Required.";
        validno = false;   
     } else if(!rePhone.test(phone)) {
        validno = false;
         phoneError.innerHTML = "Phone number isn't in a good format";
     } else {
         podaci.push(phone);
         phoneError.innerHTML = "";   
     }
 var chbs = document.getElementsByName("gender");

     var odabrano = false;

     for(var i = 0; i < chbs.length; i++) {
         if(chbs[i].checked) {
             odabrano = true;
             break;
         }
     }

     if(odabrano) {
        document.getElementById("gender-error").innerHTML = "";
     } else {
        validno = false;
        document.getElementById("gender-error").innerHTML = "Select something.";
    }
});
}

function main() {

(function () {
   'use strict';
   
  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });

	
    // Show Menu on Book
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 600;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    });

	// Hide nav on click
  $(".navbar-nav li a").click(function (event) {
    // check if window is small enough so dropdown is created
    var toggle = $(".navbar-toggle").is(":visible");
    if (toggle) {
      $(".navbar-collapse").collapse('hide');
    }
  });

}());
}
main();

  $('.listMenu').bind('mouseover.colorize', function() {
    $(this).css('background-color', '#fd8888') 
  })
  .bind('mouseout.colorize', function() { 
    $(this).css('background-color', '');
  }) 
  .click(function() {
    $(this)
      .trigger('mouseout.colorize')
      .unbind('.colorize');
  });

function first(){
	document.getElementById("picOne").setAttribute("src", "img/gallery/food.jpg");
}
function second(){
	document.getElementById("picOne").setAttribute("src", "img/gallery/01.jpg");
}
function three(){
	document.getElementById("picTwo").setAttribute("src", "img/gallery/bread.jpg");
}
function four(){
	document.getElementById("picTwo").setAttribute("src", "img/gallery/02.jpg");
}
function five(){
	document.getElementById("picThree").setAttribute("src", "img/gallery/pasta-salad.jpg");
}
function six(){
	document.getElementById("picThree").setAttribute("src", "img/gallery/03.jpg");
}
function seven(){
	document.getElementById("picFour").setAttribute("src", "img/gallery/fries.jpg");
}
function eight(){
	document.getElementById("picFour").setAttribute("src", "img/gallery/04.jpg");
}
document.getElementById("stuff").innerHTML="<h2>Meet Our Stuff</h2>";
document.getElementById("stuffDesc").innerHTML="Born in Perpignan France, Chef Paul Pairet runs three restaurants of different natures in Shanghai: Mr & Mrs Bund, The Chop Chop Club, and Ultraviolet - received three Michelin stars in 2017 and ranked among The World’s 50 Best Restaurants since 2015.";