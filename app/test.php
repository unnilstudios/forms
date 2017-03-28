<?php 

$data 			= array(); 		// array to pass back data

		// show a message of success and provide a true success variable
		$data['success'] = true;
		$data['message'] = 'Success!';

	// return all our data to an AJAX call
	echo json_encode($data);

 ?>
