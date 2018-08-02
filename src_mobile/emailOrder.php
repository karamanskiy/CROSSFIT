<?php

if (!empty($_POST)) {

	// $to = "karamanskyi@gmail.com";
	$to = "k-shark@bk.ru";

	$name = htmlspecialchars($_POST['name']);
	$tel = htmlspecialchars($_POST['tel']);
	$type = htmlspecialchars($_POST['type_card']);


	$subject = 'Новая заявка с сайта - CROSSFIT Shark';

	/* сообщение */
	$message = '
	<html>
	<head>
	<title>Новая заявка с сайта - CROSSFIT Shark</title>
	</head>
	<body>
	<p><b>Имя:</b> ' . $name . '</p>
	<p><b>Телефон:</b> ' . $tel . '</p>
	<p><b>Тип услуги:</b> ' . $type . '</p>
	<br/></body>
	</html>
	';

	$headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
	$headers .= "From: Отправитель <dev@sharkpool.ru>\r\n"; //Наименование и почта отправителя
	mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail

}

?>