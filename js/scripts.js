var current_id = localStorage.getItem("current_id");
var current_name = localStorage.getItem("current_name");
var current_score = localStorage.getItem("current_score");
var lat2 = localStorage.getItem("current_lat");
var lon2 = localStorage.getItem("current_lon");

function toRad(degree){
	return degree * (Math.PI / 180);
}

function apply_filter(){
	document.cookie = "filter=" + filter.value;
	location.reload();
}

function get_geo(){
	if("geolocation" in navigator){
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			localStorage.setItem("current_lat", lat);
			localStorage.setItem("current_lon", lon);
		});
	}
	else{
		localStorage.setItem("current_lat", 52.520007);
		localStorage.setItem("current_lon", 13.404954);
	}
}

function popup(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

function popup_review(url, title, w, h, id, name, lat, longi) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	localStorage.setItem("current_id", id);
	localStorage.setItem("current_name", name);
	var lat1 = parseFloat(lat);
	var lon1 = parseFloat(longi);
	var score = 0;
	var R = 6371; // km
	var dLat = toRad(lat2-lat1);
	var dLon = toRad(lon2-lon1);
	lat1 = toRad(lat1);
	lat2 = toRad(lat2);
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	if(d < 0.1) score = 33; 
	localStorage.setItem("current_score", score);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

function set_id(){
	var rest_id = document.getElementById('restid');
	rest_id.value = current_id;
}

function set_score(){
	var analysis = document.getElementById('analysis');
	analysis.value = parseFloat(analysis.value) + parseFloat(current_score);
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
			caller.value = json.result.sentiment + ", " + json.result.confidence;
			var analysis = document.getElementById("analysis");
			var rating = parseInt(document.getElementById("rating").value);
			var stance = json.result.sentiment.trim();
			var score = 0;
			var review_length = user_review.length;
			if(rating == 1){
				if(stance == "Negative") score += 11;
				if(review_length > 100) score += 22;
				else if(review_length > 50) score += 11;
				else if(review_length > 10) score += 5;
			}
			else if(rating == 2){
				if(stance == "Negative") score += 11;
				if(review_length > 50) score += 22;
				else if(review_length > 10) score += 11;
				else if(review_length > 0) score += 5;
			}
			else if(rating == 3){
				if(stance == "Neutral") score += 11;
				if(review_length > 1) score += 22;
			}
			else if(rating == 4){
				if(stance == "Positive") score += 11;
				if(review_length > 50) score += 22;
				else if(review_length > 10) score += 11;
				else if(review_length > 0 ) score += 5;
			}
			else{
				if(stance == "Positive") score += 11;
				if(review_length > 100) score += 22;
				else if(review_length > 50) score += 11;
				else if(review_length > 10) score += 5;
			}
			analysis.value = parseFloat(analysis.value) + parseFloat(score);
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
			var analysis = document.getElementById('analysis');
			var strIndex = letters.indexOf(current_name.toLowerCase().trim());
			if(strIndex == -1){
				analysis.value = parseFloat(analysis.value) + 10.0;
			}
			else{
				analysis.value = parseFloat(analysis.value) + 33.0;
			} 
			window.alert(analysis.value);
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