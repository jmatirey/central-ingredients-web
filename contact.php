<?php
		header('Access-Control-Allow-Origin: *');

		$jsondata = array();

	    $jsondata['saludo'] = '¡Hola '. $_POST['campoNombre'] . '!';

	    $jsondata['mensaje'] = 'Nos pondremos en contacto contigo lo antes posible';


		header('Content-type: application/json; charset=utf-8');
		echo json_encode($jsondata);
		// exit();



		if($_POST) {
		    $to_Email       = "fmls1989@gmail.com"; // email de recepción
		    $subject        = 'SOLICITUD DE CONTACTO'; // asunto

		    // saneado de seguridad
		    $user_Name        = filter_var($_POST["campoNombre"], FILTER_SANITIZE_STRING);
		    $user_Email       = filter_var($_POST["campoEmail"], FILTER_SANITIZE_EMAIL);
		    $user_Telefono    = filter_var($_POST["campoTelefono"], FILTER_SANITIZE_STRING);
		    $user_Message     = filter_var($_POST["campoMensaje"], FILTER_SANITIZE_STRING);

		    // composición de email
		    $headers = "MIME-Version: 1.0";
		    $headers .= "Content-type: text/html; charset=charset=UTF-8";
		    $headers .= 'From: SOLICITUD DE CONTACTO' . "\r\n" .
		    'Reply-To: '.$user_Email.'' . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();

		    $body = "Se ha recibido una nueva solicitud de contacto:"."\r\n";
		    $body .= "Nombre: " . $user_Name ."\r\n";
		    $body .= "Correo: " . $user_Email ."\r\n";
		    $body .= "Telefono: " . $user_Telefono ."\r\n";
		    $body .= "Mensaje: " . $user_Message ."\r\n";


		    // envío de email
		    $sentMail = @mail($to_Email, $subject, $body, $headers);

				// if($sentMail)
				// {
				// 		header('Location: contact.php');
				// 		//PROBAR METER AJAX CON JS sin mandar a pagina, con alerta en la misma pagina
				// }

		}


?>
