<?php 
	$mysqli = mysqli_connect("127.0.0.1:3306", "root", "","restaurants");
	if ($mysqli->connect_errno) {
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	// echo $_POST['analysis'];
	$analysis = $_POST['analysis'];
	$query = mysqli_query($mysqli, "INSERT INTO review (RestaurantID, UserID, Rating, Confidence, Review) VALUES('".$_POST['restid']."', '".$_POST['userid']."', '".$_POST['rating']."', '".$_POST['analysis']."', '".$_POST['review']."')");
	mysqli_close($mysqli);
	if($query){echo "<script>self.close();</script>";}
	else{echo "Failed to add review";}
?>