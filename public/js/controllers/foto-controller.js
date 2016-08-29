angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, $routeParams) {

  $scope.foto = {};
  $scope.mensagem = '';

  if ($routeParams.fotoId){
    recursoFoto.get({fotoId : $routeParams.fotoId}, function(foto){
      $scope.foto = foto;
    }, function(erro){
      console.log(erro);
      $scope.foto = {};
      $scope.mensagem = 'Não foi possível obter a foto.';
    });
  };

  $scope.submeter = function(){
    if ($scope.formulario.$valid) {
      if($scope.foto._id) {
        recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function(){
          $scope.mensagem = 'Foto alterada com sucesso.';
          console.log($scope.mensagem);
        }, function(erro){
          console.log(erro);
          $scope.mensagem = 'Não foi possível alterar a foto.';
        });
      } else {
        recursoFoto.save($scope.foto, function() {
          $scope.foto = {};
          $scope.formulario.$setPristine();
          $scope.mensagem = 'Foto incluída com sucesso.';
          console.log($scope.mensagem);
        }, function(erro){
          console.log(erro);
          $scope.mensagem = 'Não foi possível incluir a foto.';
        });
      };

    };
  };

});
