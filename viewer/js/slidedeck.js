(function () {
	'use strict';

	// url to access list of files
	const DEV = false;
	let listURL;
	if (DEV) {
		listURL = "http://localhost/list/";
	} else {
		listURL = "http://dpath-web.stanford.edu/list/";
	}

	let $slides = $('#deck_holder');

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

	const buildPage = function (slideDeck) {
		console.log(slideDeck);
		const imgBase = "";
		let id = getUrlParameter('id');

		if (id) {
			id = JSON.parse(id);
		}

		slideDeck.forEach(function (deck, i) {
			if (!id || id.find(elem => elem === deck.id)) {
				if (deck.hasOwnProperty("TYPE") && deck.TYPE === "slide") {
					let $hold = $('<div>', {class: "col"});
					let $card = $('<div>', {class: "card shadow-sm"}).appendTo($hold);
					let $imgHolder = $('<div>', {class: "bd-placeholder-img card-img-top", style: "margin: 2%; position: relative; padding-bottom: 96%; width: 96%; overflow: hidden;"}).appendTo($card);
					let $img = $('<img>', {style: "position: absolute; top: 0; bottom:0; width: auto; height: 100%; overflow: hidden;", src: imgBase + deck.thumb, alt: " " + (i) + " " + deck.url.replace(/[\s\S]+([\s\S]{4})\.dzi/i, "$1")}).appendTo($imgHolder);
					let $body = $('<div>', {class: "card-body"}).appendTo($card);
					let $text = $('<p>', {class: "card-text", html: deck.title}).appendTo($card);
					let $btns = $('<div>', {class: "btn-group"}).appendTo($card);
					let $open = $('<button>', {class: "btn btn-sm btn-outline-secondary", text: "View"}).click(function () {
						window.location.href = "./view_case.html?n=" + i + "&id=" + deck.id;
					}).appendTo($btns);
					$hold.appendTo($slides);
				}
			}
		});
	};

	//grab the data, build the page
	fetch(listURL)
		.then(data=>data.json())
		.then(buildPage);


// 			<div class="col">
//           <div class="card shadow-sm">
//             <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

//             <div class="card-body">
//               <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//               <div class="d-flex justify-content-between align-items-center">
//                 <div class="btn-group">
//                   <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
//                   <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
//                 </div>
//                 <small class="text-muted">9 mins</small>
//               </div>
//             </div>
//           </div>
//         </div>

    // var viewer = OpenSeadragon({
    //     id: "openseadragon1",
    //     showNavigator:  true,
    //     prefixUrl: "/viewer/openseadragon-bin-2.4.2/images/",
    //     tileSources: "/server/images/SHS-19-35737_B1-2 bigtiff.dzi"
    // });

}())