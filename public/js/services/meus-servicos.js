angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function ($resource) {
  return $resource('v1/fotos/:fotoId', null, {
    update : {
      method: 'PUT'
    }
  });

})
.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope) {
  var servico = {}

  var evento = 'fotoCadastrada';

  servico.cadastrar = function(foto){
    return $q(function(resolve, reject) {
        if(foto._id) {
          recursoFoto.update({fotoId : foto._id}, foto, function(){
            var mensagem = 'Foto ['+foto.titulo+'] atualizada com sucesso.';

            console.log(mensagem);
            resolve({
              mensagem: mensagem,
              inclusao: false});
            $rootScope.$broadcast(evento);
          }, function(erro){
            console.log(erro);
            reject({mensagem: 'Não foi possível alterar a foto.'});
          });
        } else {
          recursoFoto.save(foto, function() {
            var mensagem = 'Foto ['+foto.titulo+'] atualizada com sucesso.';

            console.log(mensagem);
            resolve({
              mensagem: mensagem,
              inclusao: true});
            $rootScope.$broadcast(evento);

          }, function(erro){
            console.log(erro);
            reject({mensagem: 'Não foi possível incluir a foto.'});
          });
        };

    });
  };

  return servico;
});
