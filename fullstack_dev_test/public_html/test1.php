<?php
/**
 * QUESTION 1
 *
 * Create a form with a single textarea that will sort words or phrases alphabetically separated by commas.
 * Validate that the field is not empty.
 * Clean up the string to remove any extra spaces and unnecessary commas
 * The result should be shown below the form.
 *
 * Please make sure your code runs as effectively as it can.
 *
 * The end result should look like the following:
 * apples, cars, tables and chairs, tea and coffee, zebras
 */
?>
<?php

	if (file_exists(dirname(__DIR__, 1).'/vendor/autoload.php')) {
		require_once dirname(__DIR__, 1).'/vendor/autoload.php';
	}
	use Synaptic4U\App\App;

	// OPTION 1 - Basic same page script functionality. Quickest
	// OPTION 2 - More planned app, with basic dynamic routing and application call. Returns array.
	$option = 1;

	$request = [
		"input" => "",
		"call"=> ""
	];

	$response = [
		"result" => null,
		"error" => ""
	];
	
	if($option == 1){
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {

			$request['input'] = $_POST['to_sort'];
	
			if (empty($request['input'])) {
				$response['error'] = "Please enter some words or phrases to sort seperated by a comma.";
			} else {
				$phrases = array_map('trim', explode(',', $request['input']));
				$phrases = array_filter($phrases, function($value) {
					return !empty($value);
				});
	
				if (empty($phrases)) {
					$response['error'] = "The input cannot contain only commas or empty phrases.";
				} else {
					sort($phrases, SORT_STRING);
					$response['result'] = implode(', ', $phrases);
				}
			}
		}
	}else if($option == 2){
		$app = new App();
		$response = $app->response();
	}

?>
<!DOCTYPE html>
<html>
<head>

    <!-- META -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
     <!-- TITLE -->
	<title>Test1</title>

    <!-- STYLESHEET -->
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>

	<h1>Sort List</h1>
	
	<!-- CONTAINER DIV - To style the form -->
    <div class="container">
	
		<!-- TO SORT FORM - Form to capture csv list of strings -->
		<form method="post">
			<input type="hidden" name="action" value="sort" />
			<label for="to_sort">Please enter the words/phrases to be sorted separated by commas:</label><br/>
			<textarea name="to_sort" style="width: 400px; height: 150px;"><?php echo htmlspecialchars(string: trim(!empty($request['input'])? $request['input'] : $response['input'])); ?></textarea>
			<div class="error"><?php echo $response['error']; ?></div>
			<br/>			
			<input class="btn-submit" type="submit" value="Sort" />
		</form>
	</div>

	<!-- RESULT DIV - To display the requests response -->
	<div id="result" class="container <?php echo empty($response['result'])? "hidden" : "block"; ?>">
        <?php echo htmlspecialchars($response['result']); ?>
    </div>
</body>
</html>