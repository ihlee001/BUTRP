<?php 
	if($_POST['action'] == 'apply_filter') {
		$mysqli = mysqli_connect("127.0.0.1:3306", "root", "","restaurants");
		if ($mysqli->connect_errno) {
			echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		}
		$query="SELECT * FROM restaurant";
		$results = mysqli_query($mysqli, $query);
		
		while ($row = mysqli_fetch_array($results)) {
			$avgquery="SELECT AVG(Rating) AS AverageReview FROM review WHERE review.RestaurantID = '".$row['ID']."'";
			$average_array = mysqli_query($mysqli, $avgquery);
			$average = mysqli_fetch_array($average_array);
			$rating = $average['AverageReview'];
			if($rating === null) $rating = 0;
			$id = $row['ID'];
			$name = $row['Name'];
			$lat = $row['Latitude'];
			$long = $row['Longitude'];
			echo "<tr><td>" . $id . "</td>
				<td>". '<a href="restaurant.php?id='.urlencode($id).'&name='.urlencode($name).'&lat='.urlencode($lat).'&long='.urlencode($long).'">' . $name . "</a></td>
				<td>" . number_format((float)$rating, 1, '.', '') . "</td>
				<td></td></tr>";
		}
		mysqli_close($mysqli);
	};
?>