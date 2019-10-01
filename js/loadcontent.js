function includeHTML(prefix) {
	var elem, file, xhttp;
	elem = $("#html-content");
	file = elem.attr("content");
	if (file) {

		$("#html-content").load(file, function() {
			bindTriggers();
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			$("html, body").scrollTop(($('#content-sec').offset().top));
			if(prefix !== undefined) {
				$('#html-content img').each(function(){ 
					src = $(this).attr('src');
					$(this).attr('src', prefix+src);
				});
			}
		});
	}
}

function bindTriggers() {
	$( "a[customhref]" ).off();
	$( "a[customhref]" ).bind( "click", function( event ) {
	var content = $(this).attr("customhref");
	if(content !== "#") {
		var elem = document.getElementById("html-content");
		elem.setAttribute("content", content);
		includeHTML();
		$(".dl-trigger").trigger("customClose");
		return false;
	}
	
  });
}

function loadGist(divId, url) {
	$.ajax({
	  url: url,
	  dataType: 'jsonp',
	  timeout: 1000,
	  success: function (data) {
		$(document.head).append('<link href="' + data.stylesheet + '" rel="stylesheet">')
		$("#"+divId).html(data.div)
	  }
	})
}

includeHTML();