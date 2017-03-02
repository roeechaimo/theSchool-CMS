<!DOCTYPE html>

<html ng-app="app">
    <head>
        <title>The School</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" >
        <link href="../css/style.css" rel="stylesheet" type="text/css"/>
        <script src="https://code.jquery.com/jquery-3.1.0.min.js"  ></script>

    </head>

    <body> 
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min.js"></script>        
        
        <script src="app.js" type="text/javascript"></script>
        <script src="ngServices/msgSrv.js" type="text/javascript"></script>
        <script src="ngServices/courseCounterSrv.js" type="text/javascript"></script>
        <script src="ngControllers/loginCtrl.js" type="text/javascript"></script>
        <script src="ngControllers/mainCtrl.js" type="text/javascript"></script>
        <script src="ngControllers/sideCtrl.js" type="text/javascript"></script>

        <script src="ngControllers/navCtrl.js" type="text/javascript"></script>

        <div class="nav container" ng-include="'ngViews/nav.php'"></div>
        <div class="homeView" ui-view=""></div>

    </body>
</html>



