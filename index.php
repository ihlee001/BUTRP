<!DOCTYPE html>
<!--GPS, filter settings, finish up algorithm, setup time, and abstract-->
<html lang="en">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="pics/favicon.ico">

    <title>Dashboard Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#" onclick="window.location.reload()">Bring Up The Review Please</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right"><br>
            <li><font color="white">Filter Setting </font><input type="number" min="0" max="99" value="0" id="filter"></li>
			<li><button type="button" onclick="apply_filter();">Apply</li>
          </ul>
<!--          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form> -->
        </div>
      </div>
    </nav>
	

    <div class="container-fluid">
      <div class="row">
	   
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
           <li class="active"><a href="index.php">Overview <span class="sr-only">(current)</span></a></li>
            <li><a href = "#" onclick="popup('add_rest.html','Add Restaurant',400,400);">Add Restaurant</a></li>
            <li><a href = "#" onclick="popup('remove_rest.html','Remove Restaurant',200,200);">Remove Restaurant</a></li>
			
          </ul>
     
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="sub-header">Rowland Heights Restaurant List</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Rating</th>
				  <th>Tags</th>
                </tr>
              </thead>
              <tbody id='rows'>
				<?php 
					if(isset($_COOKIE['filter'])){
						$filter = $_COOKIE['filter'];
					}
					else{
						$filter = 0;
					}
					$mysqli = mysqli_connect("127.0.0.1:3306", "root", "","restaurants");
					if ($mysqli->connect_errno) {
						echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
					}
					$query="SELECT * FROM restaurant";
					$results = mysqli_query($mysqli, $query);
					
					while ($row = mysqli_fetch_array($results)) {
						$avgquery="SELECT AVG(Rating) AS AverageReview FROM review WHERE review.RestaurantID = '".$row['ID']."' AND review.Confidence >= '".$filter."'" ;
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
				?>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
	




    <!-- Javascripts
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->

    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="dist/js/bootstrap.min.js"></script>
    <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
    <script src="assets/js/vendor/holder.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
	<script src="js/scripts.js"></script>
	<script>get_geo();</script>
  </body>
</html>
