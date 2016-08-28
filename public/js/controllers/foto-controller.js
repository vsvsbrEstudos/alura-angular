angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams) {


  $scope.foto = {};
  $scope.mensagem = '';

  $scope.picture = false;

  if ($routeParams.fotoId){
    $http.get('v1/fotos/'+$routeParams.fotoId)
    .success(function(foto){
      $scope.foto = foto;
    })
    .error(function(erro){
      $scope.foto = {};
      $scope.mensagem = 'Não foi possível obter a foto.';
      console.log(erro);
    });
  };

  $scope.verFoto = function(){
    console.log($scope.picture);
  };

  $scope.submeter = function(){
    if ($scope.formulario.$valid) {
      if($scope.foto._id) {
        $http.put('v1/fotos/'+$scope.foto._id, $scope.foto)
        .success(function(){
          $scope.foto = {};
          $scope.mensagem = 'Foto alterada com sucesso.';
          console.log($scope.mensagem);
        })
        .error(function(erro){
          $scope.mensagem = 'Não foi possível alterar a foto.';
          console.log(erro);
        });
      } else {
        $http.post('v1/fotos', $scope.foto)
        .success(function(){
          $scope.foto = {};
          $scope.mensagem = 'Foto incluída com sucesso.';
          console.log($scope.mensagem);
        })
        .error(function(erro){
          $scope.mensagem = 'Não foi possível incluir a foto.';
          console.log(erro);
        });
      };

    };
  };

  $scope.makeSnapshot = function makeSnapshot() {
    if (_video) {
      var patCanvas = document.querySelector('#snapshot');
      if (!patCanvas) return;

      patCanvas.width = _video.width;
      patCanvas.height = _video.height;
      var ctxPat = patCanvas.getContext('2d');

      var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
      ctxPat.putImageData(idata, 0, 0);

      sendSnapshotToServer(patCanvas.toDataURL());

      patData = idata;
    }
  };


  var getVideoData = function getVideoData(x, y, w, h) {
    var hiddenCanvas = document.createElement('canvas');
    hiddenCanvas.width = _video.width;
    hiddenCanvas.height = _video.height;
    var ctx = hiddenCanvas.getContext('2d');
    ctx.drawImage(_video, 0, 0, _video.width, _video.height);
    return ctx.getImageData(x, y, w, h);
  };

  /**
   * This function could be used to send the image data
   * to a backend server that expects base64 encoded images.
   *
   * In this example, we simply store it in the scope for display.
   */
  var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
    $scope.snapshotData = imgBase64;
  };

});
