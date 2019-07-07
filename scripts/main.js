'use strict'; 

let $carouselStart = ('#myCarousel');
let $searchForm = $('#search-form');
let $content = $('.content-side');
let arrVideos = [];
let a = {};
let $videoContainer = $('.video-container');



$searchForm.on("submit", function(event){
	event.preventDefault();
	let query = $(this).find("[name = 'srch-term']").val().replace(/\s/g, "+");
	getVideos(query);
});

function getVideos(query){ 
	var server = 'https://itunes.apple.com/search';

	$.ajax({
		url: server,
		method: "GET",
		data: `limit=10&entity=musicVideo&term=${query}`
	}).done(function (response){
		a = JSON.parse(response);
		arrVideos = a.results;
		console.log(arrVideos);
		$videoContainer.empty();
		
		arrVideos.forEach(function (video, index){
			if (index == 0){
				$('<div />').addClass('carousel-item active')
				.append($('<video />').attr("src", video.previewUrl)
				.addClass('w-100')
				.attr('controls',"controls")
				.attr('autoplay', true)		
				.appendTo($videoContainer))
				.attr('align', 'center')
				.appendTo($videoContainer);		
			}else{
				$('<div />').addClass('carousel-item')
				.append($('<video />').attr("src", video.previewUrl)
				.addClass('w-100')
				.attr('controls',"controls")	
				.appendTo($videoContainer))
				.attr('align', 'center')
				.appendTo($videoContainer);	
			}	
		})
	}).fail(function (error) {
		console.log(error);
	})
}