(function () {
	'use strict';
	const osdprefixUrl = "/viewer/openseadragon-bin-2.4.2/images/";
	// https://dpath.s3.amazonaws.com/1017064.dzi

	// const imgBase = "/server/images/";
	// const imgBase = "https://dpath.s3.amazonaws.com/";

	const DEV = false;
	let imageURL;
	if (DEV) {
		imageURL = "http://localhost/image/";
	} else {
		imageURL = "http://dpath-web.stanford.edu/image/";
	}

	const getUrlParameter = function (sParam) {
	    let sPageURL = window.location.search.substring(1),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
	        }
	    }
	};

	const buildPage = function (data) {
		console.log(data);
		// let builder = slideDeck.find(elm => elm.id === id);
		// let tileSource = builder.slides[imgNum].imgSrc;
		// if (!isNaN(stain)) {
		// 	tileSource = builder.slides[imgNum].stains[stain].imgSrc;	
		// }

		let $holder = $('#main');
		$holder.append($('<div>', {id: "image-place", style: "margin:5px; height:80vh; width: 100%; border: 3px solid black; border-radius: 5px;"}));

	    let viewer = OpenSeadragon({
	        id: "image-place",
	        showNavigator:  true,
	        prefixUrl: osdprefixUrl,
	        tileSources: data.url
	    });

	    let $navigations = $('<div>', {class: "row row-cols-3 row-cols-sm-4 row-cols-md-6 g-6"}).appendTo($holder);
	} 

	let id = getUrlParameter('id');
	// let imgNum = getUrlParameter('img_num') * 1;
	// let stain =  getUrlParameter('stain_num') * 1;
	// console.log(id, imgNum, stain);
	console.log(id);

	// get the slide information and build the page
	//grab the data, build the page
	fetch(imageURL + id)
		.then(data=>data.json())
		.then(buildPage);




    // let arr = [];
    // builder.slides.forEach(function (slide, i) {
    // 	slide.img_num = i;
    // 	slide.id = builder.id;
    // 	arr.push(slide);
    // 	if (slide.hasOwnProperty("stains") && slide.stains.length > 0) {
    // 		slide.stains.forEach(function (stain, j) {
    // 			stain.img_num = i;
    // 			stain.stain_num = j;
    // 			stain.id = builder.id;
    // 			arr.push(stain);
    // 		})
    // 	}
    // });

 //    console.log(arr);

 //    arr.forEach(function (deck) {
	// 	console.log(deck);
	// 	let $hold = $('<div>', {class: "col"});
	// 	let $card = $('<div>', {class: "card shadow-sm"}).appendTo($hold);
	// 	let $imgHolder = $('<div>', {class: "bd-placeholder-img card-img-top", style: "margin: 2%; position: relative; padding-bottom: 96%; width: 96%; overflow: hidden;"}).appendTo($card);
	// 	let $img = $('<img>', {style: "position: absolute; top: 0; bottom:0; width: auto; height: 100%; overflow: hidden;", src: imgBase + deck.thumb}).appendTo($imgHolder);
	// 	let $body = $('<div>', {class: "card-body"}).appendTo($card);
	// 	let $text = $('<p>', {class: "card-text", html: deck.title}).appendTo($card);
	// 	let $btns = $('<div>', {class: "btn-group"}).appendTo($card);
	// 	let $open = $('<button>', {class: "btn btn-sm btn-outline-secondary", text: "View"}).click(function () {
	// 		let addOn = "";
	// 		if (deck.hasOwnProperty("stain_num")) {
	// 			addOn = "&stain_num=" + deck.stain_num;
	// 		}
	// 		console.log("./view_case.html?id=" + deck.id + "&img_num=" + deck.img_num + addOn)
	// 		window.location.href = "./view_case.html?id=" + deck.id + "&img_num=" + deck.img_num + addOn;
	// 	}).appendTo($btns);
	// 	$hold.appendTo($navigations);
	// });

    // console.log(viewer)

}())