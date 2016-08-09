var current_id = localStorage.getItem("current_id");
var current_name = localStorage.getItem("current_name");

function popup(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

function popup_review(url, title, w, h, id, name) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	localStorage.setItem("current_id", id);
	localStorage.setItem("current_name", name);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

function refresh_close(){
	window.opener.location.reload(true);
	window.close();
}

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
			analysis.value = parseFloat(analysis.value) + parseFloat(json.result.confidence);
			console.log(analysis.value);
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
			letters = letters.trim().toLowerCase();
			window.alert(letters);
			var analysis = document.getElementById('analysis');
			if(current_name.toLowerCase().trim() == letters){
				analysis.value = parseFloat(analysis.value) + 33.0;
			}
			else analysis.value = parseFloat(analysis.value) + 10.0;
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