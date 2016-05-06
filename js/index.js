$(document).ready(function() {
	//get api information
	var apiUrl = 'https://api.twitch.tv/kraken/streams/'
	var callbackUrl = '?callback=?';
	//array of streamers to grab
	var arrOfStreamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "streamerhouse", "asdfasdfkjeoj"];

	//go through array and append html
	$.each(arrOfStreamers, function() {
		var nameHolder = this;

		$.ajax({
			dataType: "json",
			url: apiUrl + this,
			statusCode: {
				404: function() {
					$('#streamList').append(
						'<a href ="http://www.twitch.tv/' + nameHolder + '">' +
						'<div class="row text-center" id="' + nameHolder + '">' +
						'<div class="col-xs-2 section1">' +
						'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Gray_-_replace_this_image_male.svg/2000px-Gray_-_replace_this_image_male.svg.png" class="img-circle img-responsive"/>' +
						'</div>' +
						'<div class="col-xs-2 section2">' +
						'<h4>' + nameHolder + '</h4>' +
						'</div>' +
						'<div class="col-xs-7 section3">' +
						'<h4><i>Account doesn\'t exist or is banned.</i></h4>' +
						'</div>' +
						'<div class="col-xs-1 section4">' +
						'<h5><span class="fa fa-circle notHere" aria-hidden="true"></span></h5>' +
						'</div>' +
						'</div>' +
						'</a>');
					return true;
				}
			},
			success: function(data) {
				if (data.stream === null) {
					//console.log(nameHolder + ' is offline');
					$.getJSON('https://api.twitch.tv/kraken/channels/' + nameHolder, function(data) {
						console.log(data.logo);
						if (data.logo == null) {
							data.logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Gray_-_replace_this_image_male.svg/2000px-Gray_-_replace_this_image_male.svg.png";
						}
						$('#streamList').append(
							'<a href ="http://www.twitch.tv/' + nameHolder + '">' +
							'<div class="row text-center" id="' + nameHolder + '">' +
							'<div class="col-xs-2 section1">' +
							'<img src="' + data.logo + '" class="img-circle img-responsive"/>' +
							'</div>' +
							'<div class="col-xs-2 section2">' +
							'<h4>' + nameHolder + '</h4>' +
							'</div>' +
							'<div class="col-xs-7 section3">' +
							'<h4><i>offline</i></h4>' +
							'</div>' +
							'<div class="col-xs-1 section4">' +
							'<h5><span class="fa fa-circle glowRed" aria-hidden="true"></span></h5>' +
							'</div>' +
							'</div>' +
							'</a>');
					});
				} else {
					console.log(data.stream.channel.display_name + ' is online');
					if (data.stream.channel.logo == null) {
						data.stream.channel.logo == "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Gray_-_replace_this_image_male.svg/2000px-Gray_-_replace_this_image_male.svg.png";
					}
					$('#streamList').append(
						'<a href ="http://www.twitch.tv/' + nameHolder + '">' +
						'<div class="row text-center" id="' + nameHolder + '">' +
						'<div class="col-xs-2 section1">' +
						'<img src="' + data.stream.channel.logo + '" class="img-circle img-responsive"/>' +
						'</div>' +
						'<div class="col-xs-2 section2">' +
						'<h4>' + nameHolder + '</h4>' +
						'</div>' +
						'<div class="col-xs-7 section3">' +
						'<h4>' + data.stream.channel.status + '</h4>' +
						'</div>' +
						'<div class="col-xs-1 section4">' +
						'<h5><span class="fa fa-circle glowGreen" aria-hidden="true"></span></h5>' +
						'</div>' +
						'</div>' +
						'</a>');
				}
			},
			/*
			error: function(jqXHR, textStatus, error) {
				console.log('account doesn\'t exist or is banned');
			}*/
		}); //end of $.ajax

	}); //end of $.each

	//show all
	$('#allStreamers').on('click', function() {
		$('#streamList').children().children().show();
		$('h3').removeClass('activeButton');
		$('#allStreamers').addClass('activeButton');
	});

	//show only online
	$('#onlyOnline').on('click', function() {
		$('.glowGreen').parent().parent().parent().show();
		$('.glowRed').parent().parent().parent().hide();
		$('.notHere').parent().parent().parent().hide();
		$('h3').removeClass('activeButton');
		$('#onlyOnline').addClass('activeButton');
	});

	//show only offline
	$('#onlyOffline').on('click', function() {
		$('.glowRed').parent().parent().parent().show();
		$('.glowGreen').parent().parent().parent().hide();
		$('.notHere').parent().parent().parent().hide();
		$('h3').removeClass('activeButton');
		$('#onlyOffline').addClass('activeButton');
	});

});