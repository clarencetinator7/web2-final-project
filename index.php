<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Streaming Apps</title>

	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/fontawesome.css">
	<link rel="stylesheet" href="css/bootstrap.css">
	<link href="css/jquery-ui.css" rel="stylesheet">




	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/lodash.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/fontawesome.js"></script>
	<script src="js/script.js"></script>
	<script src="js/style.js"></script>

</head>

<body>

	<div class="toastList" id="toastList"></div>

	<div id="modalBackdrop"></div>
	<div class="modal " id="streamingAppModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="streamingAppModalLabel">Add Content</h5>
				</div>
				<div class="modal-body">
					<form id="modalForm" method="post" enctype="multipart/form-data">
						<div id="message"></div>

						<div>
							<label class="form-label" for="appName">App Name:</label>
							<input type="text" name="appName" class="form-control" id="appName" autocomplete="off" required />
							<span class="input-message" id="appNameMessage"></span>
						</div>

						<div>
							<label class="form-label" for="basePlan">Base Plan:</label>
							<input type="text" name="basePlan" class="form-control" id="basePlan" autocomplete="off" required />
							<span class="input-message" id="basePlanMessage"></span>
						</div>

						<div>
							<label class="form-label" for="launchDate">Launch Date:</label>
							<input type="date" name="launchDate" class="form-control" id="launchDate" autocomplete="off" required />
							<span class="input-message" id="launchDateMessage"></span>
						</div>

						<div>
							<label class="form-label" class="picture">Picture: </label>

							<div style="height: 300px; ">
								<div style="width: 100%; height:100%; border:2px solid ; border-radius: 5px; position:relative" id="image_container">
									<input type="file" name="picture" id="picture" accept=".png, .jpg, .jpeg" style="position:absolute; width:100%; height:100%; opacity:0;  z-index:100;" />
									<div id="pictureText" style="position:absolute; width:100%; height:100%;z-index:50; display: flex;
									justify-content: center;
									align-items: center; flex-direction:column;"><i class="fa-solid fa-image fa-2xl"></i>Upload a Picture</div>
									<img id="pictureDisplay" src="img/white.jpg" style="position:absolute; width:100%; height:100%; object-fit:cover; z-index:10;">
								</div>
							</div>

							<span class="input-message" id="pictureMessage"></span>
						</div>


						<div class="checkbox">
							<label class="form-label" class="checkboxTitle" style="margin-bottom:0px;">Platforms: </label>
							<br><span class=" input-message" id="platformsMessage"><br></span>
							<div class="platform-checkbox-container">
								<div>
									<input type="checkbox" class="platform" id="mobile" value="Mobile"><label for="mobile">Mobile
									</label>
								</div>
								<div>
									<input type="checkbox" class="platform" id="smartTv" value="Smart TV">
									<label for="smartTv">Smart TV</label>
								</div>
								<div>
									<input type="checkbox" class="platform" id="web" value="Web">
									<label for="web">Web</label>
								</div>
							</div>
						</div>

						<div class="checkbox">
							<label class="form-label" class="checkboxTitle" style="margin-bottom:0px;">Type Of Contents: </label>
							<br><span class="input-message" id="typeOfContentsMessage"></span>
							<div class="contents-checkbox-container">

								<div class="check-col">
									<div>
										<input type="checkbox" class="typeOfContent" id="asianShows" value="Asian Shows">
										<label for="asianShows">Asian Shows</label>
									</div>
									<div>
										<input type="checkbox" class="typeOfContent" id="horror" value="Horror">
										<label for="horror">Horror</label>
									</div>
									<div>
										<input type="checkbox" class="typeOfContent" id="sports" value="Sports">
										<label for="sports">Sports</label>
									</div>
									<div>
										<input type="checkbox" class="typeOfContent" id="tvShows" value="TV Shows">
										<label for="tvShows">TV
											Shows</label>
									</div>
									<div>
										<input type="checkbox" class="typeOfContent" id="varietyShows" value="Variety Shows">
										<label for="varietyShows">Variety Shows</label>
									</div>
									<div>
										<input type="checkbox" class="typeOfContent" id="indieFilms" value="Indie Films">
										<label for="indieFilms">Indie Films</label>
									</div>
								</div>
								<div class="check-col">
									<div>
										<input type="checkbox" class="typeOfContent" id="koreanDramas" value="Korean Dramas">
										<label for="koreanDramas">Korean Dramas</label>
									</div>
									<!-- <div>
										<input type="checkbox" class="typeOfContent" id="eastAsianContent" value="East Asian Content">
										<label for="eastAsianContent">East Asian Content</label>
									</div> -->
									<div>
										<input type="checkbox" class="typeOfContent" id="familyFriendlyMovies" value="Family-friendly Movies">
										<label for="familyFriendlyMovies">Family-friendly
											Movies
										</label>
									</div>
									<div>
										<input type="checkbox" class="typeOfContent" id="cartoons" value="Cartoons">
										<label for="cartoons">Cartoons</label>
									</div>
									<div>
										<input type="checkbox" class="typeOfContent" id="originalMovies" value="Original Movies">
										<label for="originalMovies">Original
											Movies</label>
									</div>
									<!-- <div>
									<input type="checkbox" class="typeOfContent" id="warnerMediaMovies" value="Warner Media Movies">
									<label for="warnerMediaMovies">Warner Media Movies</label>
								</div> -->
									<div>
										<input type="checkbox" class="typeOfContent" id="adultContent" value="Adult Content">
										<label for="adultContent">Adult Content</label>
									</div>
								</div>

								<div><input type="checkbox" class="typeOfContent others" id="others" value="">
									<label for="others">Others</label>
								</div>
								<input type="text" name="otherContent" class="form-control" id="otherContent" style="opacity:0;" autocomplete="off" />
							</div>
						</div>
						<div><input type="hidden" name="editPicture" id="editPicture" autocomplete="off" readonly />
						</div>

						<div><input type="hidden" name="platforms" id="platforms" autocomplete="off" required /></div>
						<div><input type="hidden" name="typeOfContents" id="typeOfContents" autocomplete="off" required /></div>
						<br />

					</form>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn" id="modalClose">Close</button>
					<input type="submit" class="btn" value="modalButton" id="modalButton" disabled>
				</div>
			</div>
		</div>
	</div>
	<header>
		<div class="container">
			<div class="title-wrapper">
				<p class="h1">Streaming Apps for Legitimate Contents</p>
			</div>
			<div class="add-btn-wrapper">
				<div id="create"> <i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Content</div>
			</div>
		</div>
	</header>
	<div class="container search-box">
		<div class="search-container">
			<input type="text" name="search" class="form-control" id="search" placeholder="Search..." autocomplete="off" required />
			<button class="searchBtn" id="searchButton"><i class="fa fa-search"></i></button>
			<button class="clearBtn" id="clearButton"><i class="fa fa-close"></i></button>
		</div>
		<div id="suggestion"></div>
	</div>

	<div class="container" id="streamingAppList">
	</div>
	<div class="imageModal">
		<img id="zoomableImage">
		<div class="imageControl">
			<button class="btn zoomInImage shadow-none" id="zoomInImage"><i class="fa-solid fa-magnifying-glass-plus "></i></button>
			<button class="btn zoomIOutImage shadow-none" id="zoomOutImage"><i class="fa-solid fa-magnifying-glass-minus "></i></button>
			<button class="btn closeImage shadow-none" id="closeImage"><i class="fa fa-close fa-lg"></i></button>
		</div>
	</div>
	<button id="backToTop" class=" back-to-top ui-widget-content" role="button"><i class="fa fa-chevron-up"></i></button>

	<br><br><br>

</body>

</html>