<body>
	
<?php

$query = 'dogs';

$data = getPage('http://www.google.com/search?q='.urlencode($query));

preg_match_all("/\<li class\=g\>\<h3 class\=\"r\"\>\<a href\=\"([^\<\>]*)\" class\=l\>/", $data, $matches);

file_put_contents('urls.txt', implode("\n", $matches[1]));

function getPage($url) {
$ch = curl_init();

curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);

$data = curl_exec($ch);

curl_close($ch);

return $data;
}

?>
</body>