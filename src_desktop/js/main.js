"use strict";

$(function(){
	new WOW().init();

	$(document).ready(function(e){

		$(window).on('resize', function() {
			if (screen.width <= 800) {
				document.location = "/mobile/" + document.location.search; 
			}
		});

		setTimeout(function() {
			$('body').addClass('pre-loaded');
		}, 2000);


		// слайдер на главной
		var sect4_slider = $('.sect4__slider').owlCarousel({
			loop: true,
			nav: false,
			items: 1
		});
		$('.sect4__next').on('click', function () {
			sect4_slider.trigger('next.owl.carousel');
		});
		$('.sect4__prev').on('click', function () {
			sect4_slider.trigger('prev.owl.carousel');
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
		

		//исправление бага ArcticModal в Firefox
		$('.arcticmodal-close').click(function() {
			$('body').css({'overflow-y': 'scroll'});
		});
		$("body").click(function(){$(this).css('overflow-y','visible')});

		// POPUP VIDEO
		$('.sect5__video-knopka').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

		$('.popup-image').magnificPopup({
			type: 'image'
		});

		var rellax = new Rellax('.parallax');


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
				beforeSend: function(){
					// if($(this).find('input[type="tel"]').val() == '' || $(this).find('input[type="tel"]').val().length < 15) {
					// 	$('#error_thank').arcticmodal();
					// 	$(this).find('input[type="tel"]').css('borderColor', '#EF4135');
					// }
				},
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

