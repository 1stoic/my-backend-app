<?php
// 1. Capture the request data normally
$ip = $_SERVER['REMOTE_ADDR'];
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
}

$user_agent = $_SERVER['HTTP_USER_AGENT'];
$time = date('Y-m-d H:i:s');
$log_entry = "Time: " . $time . " | IP: " . $ip . " | User-Agent: " . $user_agent . "\n";

file_put_contents('log.txt', $log_entry, FILE_APPEND);

// 2. Do NOT use standard PHP header() redirection here.
// Instead, print standard HTML text to let the browser process the security cookies.
?>
<!DOCTYPE html>
<html>
<head>
    <title>Loading...</title>
    <script>
        // 3. Wait exactly 1.5 seconds so InfinityFree registers the browser cookie, 
        // then seamlessly send the user to the destination site.
        setTimeout(function(){
            window.location.href = "https://www.youtube.com/@Noahlovestoblog";
        }, 1500);
    </script>
</head>
<body>
    <p>Connecting to the server, please wait...</p>
</body>
</html>
