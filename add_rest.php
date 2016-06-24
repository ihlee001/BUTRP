<!DOCTYPE html>
<html lang="en">
	<link href="style.css" rel="stylesheet">
	<table>
		<tr>
			<td>Name</td>
			<td>Rating</td>
		</tr>
	<?php 
		$mysqli = mysqli_connect("localhost:3306", "root", "");
		mysqli_query($mysqli, "USE restaurants");
		$query="SELECT * FROM restaurant";
		$results = mysqli_query($mysqli, $query);
		
		while ($row = mysqli_fetch_array($results)) {
			echo "<tr><td>" . $row['Name'] . "</td><td>" . $row['Rating'] . "</td></tr>";
		}
	?>
	</table>
</html>