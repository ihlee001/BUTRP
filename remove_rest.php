<?php 
	$mysqli = mysqli_connect("127.0.0.1:3306", "root", "","restaurants");
	if ($mysqli->connect_errno) {
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	$test =	mysqli_query($mysqli, "DELETE FROM restaurant WHERE restaurant.ID = '".$_POST['id']."'");
	mysqli_close($mysqli);
	if($test){echo "<script>self.close();</script>";}
	else{echo "Failed to remove Restaurant";}
?>