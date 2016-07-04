function popup(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 

function refresh_close(){
	window.opener.location.reload(true);
	window.close();
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
		};
		reader.readAsDataURL(input.files[0]);
	}

	
	// var img = document.querySelector('#pic');
	// window.alert(img.name);
	// $('#pic').ready(function(){

		// var context = document.createElement('canvas').getContext('2d');
		// context.drawImage(img, 0, 0);
		// var letters = OCRAD(context);
		// window.alert(letters);
	// });
	
}