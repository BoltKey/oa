<head>
<meta charset="utf-8" />
<title>Optimal racer</title>
<link rel="shortcut icon" href="/boltlogo.png">
<script type="text/javascript" src="jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="proton-1.0.0.min.js"></script>
<link href="buttons.css" rel="stylesheet">
<link href="style.css" rel="stylesheet">
<!--<script src='https://cdn1.kongregate.com/javascripts/kongregate_api.js'></script>-->

<?php 
foreach (glob("game/*.js") as $filename)
{
    echo '<script type="text/javascript" src='.$filename.'></script>
';
} 
?>
<script> var logo; window.onload = function(){window.logo = BKLogo(main)}; </script>
</head>
<body style="margin: 0">
<canvas style="background-color:#555555;" class="unselectable" id="game" draggable="false" align="center" width="960" height="640">Your browser does not support canvas. Use Chrome instead.</canvas>
</div>
</body>