angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos', 'camera'])
.config(function($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true); //colocar o base href no index

  $routeProvider.when('/fotos', {
    templateUrl: 'partials/principal.html',
    controller:'FotosController'
  });

  $routeProvider.when('/fotos/new', {
    templateUrl: 'partials/foto.html',
    controller: 'FotoController'
  });

  $routeProvider.when('/fotos/edit/:fotoId', {
    templateUrl: 'partials/foto.html',
    controller: 'FotoController'
  });


  $routeProvider.otherwise({ redirectTo: '/fotos' });

});
