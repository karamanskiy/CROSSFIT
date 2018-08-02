"use strict";

$(function(){

	$(document).ready(function(e){

		$(window).on('resize', function() {
			if (screen.width > 800) {
				document.location = "../" + document.location.search; 
			}
		});


		// слайдер на главной
		var sect5_slider = $('.sect5__slider').owlCarousel({
			loop: true,
			nav: false,
			dots: true,
			items: 1
		});
		$('.sect5__next').on('click', function () {
			sect5_slider.trigger('next.owl.carousel');
		});
		$('.sect5__prev').on('click', function () {
			sect5_slider.trigger('prev.owl.carousel');
		});

		//отмена перетаскивания картинок
		$("img, a").on("dragstart", function(event) { event.preventDefault(); });

		// вызов всплывающего окна
		$('.callback_modal').click(function(e) {
			e.preventDefault();
			$('#callback-modal').arcticmodal();
		});
		$('.inform-send').click(function(e) {
			e.preventDefault();
			$('#info-send').arcticmodal();
		});
		$('.footer__conf').click(function(e) {
			e.preventDefault();
			$('#conf-politic').arcticmodal();
		});

		$('.sect4__item1').click(function(e) {e.preventDefault();$('#sect4_i1').arcticmodal();});
		$('.sect4__item2').click(function(e) {e.preventDefault();$('#sect4_i2').arcticmodal();});
		$('.sect4__item3').click(function(e) {e.preventDefault();$('#sect4_i3').arcticmodal();});
		$('.sect4__item4').click(function(e) {e.preventDefault();$('#sect4_i4').arcticmodal();});
		

		//исправление бага ArcticModal в Firefox
		$('.arcticmodal-close').click(function() {
			$('body').css({'overflow-y': 'scroll'});
		});
		$("body").click(function(){$(this).css('overflow-y','visible')});

		// POPUP VIDEO
		$('.sect6__video-knopka').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

		// $('.popup-image').magnificPopup({
		// 	type: 'image'
		// });

		// var rellax = new Rellax('.parallax');


		// проверка инпута
		$('button[type=submit], input[type=submit]').on('click', function(e) {
			var tel_input = $(this).parent().parent().find('input[type=tel]');
			if(tel_input.val() == '' || tel_input.val().length < 17) {
				e.preventDefault();
				$('#modal_error').arcticmodal();
				tel_input.addClass('error-input');
			}
		});

		$('form input').focus(function() {
			if($(this).hasClass('error-input')) {
				$(this).removeClass('error-input');
			}
		});

		var $phoneInput = $('input[type="tel"]');
		$phoneInput.mask("+7 (999) 999-99-99");
		$phoneInput.focus(function() {
			if ( $(this).val() == '' ) { $(this).val('+7 ('); }
		});

		//AJAX email send
		$('.ajax_send').submit(function(event) {
			event.preventDefault();
			var data = $(this).serialize();

			$.ajax({
				url				: '/emailOrder.php',
				data			: data,
				type			: 'post',
				success		: function() {
					$('input, textarea').val('');
					$.arcticmodal('close');
					$('#modal_thank').arcticmodal();
					},
					error			: function(){
						$.arcticmodal('close');
						alert('Ошибка! Что-то пошло не так...');
					}
				});
		});





	//==========EoF==============
});
});

