<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/upload" method="post" enctype="multipart/form-data">
        @csrf
        <input type="file" name="mycsv" id="mycsv" />
        <input type="submit" value="Upload">
    </form>
</body>
</html>