	function initMap() {
		var mapOptions = {
			zoom: 17,
			scrollwheel: false,
			streetViewControl: false,
			panControl: true,
			panControlOptions: {position: google.maps.ControlPosition.TOP_RIGHT},
			mapTypeControl: false,
			zoomControl: true,
			zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_BOTTOM},
			center: {lat: 55.753502, lng: 37.660565},
			styles: [
			{
				"featureType": "all",
				"stylers": [
				{
					"saturation": 0
				},
				{
					"hue": "#e7ecf0"
				}
				]
			},
			{
				"featureType": "road",
				"stylers": [
				{
					"saturation": -70
				}
				]
			},
			{
				"featureType": "transit",
				"stylers": [
				{
					"visibility": "off"
				}
				]
			},
			{
				"featureType": "poi",
				"stylers": [
				{
					"visibility": "off"
				}
				]
			},
			{
				"featureType": "water",
				"stylers": [
				{
					"visibility": "simplified"
				},
				{
					"saturation": -60
				}
				]
			}
			]
		};

		var mapElement = document.getElementById('main-map');
		var map = new google.maps.Map(mapElement, mapOptions);
		var loc = {lat: 55.7535, lng: 37.659065};
		// 55.753462, 37.659005

		var marker = new google.maps.Marker({
			position: loc,
			map: map,
			icon: {
				url: 'img/map-marker.png'
			},
			title: 'Штамп'
		});

		var infowindow = new google.maps.InfoWindow({
				content: 'м. Курская или Чкаловская, Мельницкий пер., д. 6, офис 42'
			});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
	}

	