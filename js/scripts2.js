function sentiment_analysis(caller){
	var user_review = document.getElementById('texts').value;
	var http = new XMLHttpRequest();
	var url = "http://sentiment.vivekn.com/api/text/";
	var params = "txt=" + user_review;
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var json = JSON.parse(http.responseText);
			// console.log(json.result.sentiment + ", " + json.result.confidence);
			caller.value = json.result.sentiment + ", " + json.result.confidence;
			var analysis = document.getElementById("analysis");
			analysis.value = parseFloat(json.result.confidence);
		}
	}
	http.send(params);
}

function read_image_text(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function(e){
			$('#receipt')
				.attr('src', e.target.result);
			var img = document.querySelector("#receipt");
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			canvas.width = img.clientWidth;
			canvas.height = img.clientHeight;
			context.drawImage(img, 0, 0);
			var letters = OCRAD(context);
			letters = letters.trim();
			window.alert(current_id);
		};
		reader.readAsDataURL(input.files[0]);
	};

	
	// var img = document.querySelector('#pic');
	// window.alert(img.name);
	// $('#pic').ready(function(){

		// var context = document.createElement('canvas').getContext('2d');
		// context.drawImage(img, 0, 0);
		// var letters = OCRAD(context);
		// window.alert(letters);
	// });
}