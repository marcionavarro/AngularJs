angular.module("listaTelefonica").controller("novoContatoCtrl", function ($scope, contatosAPI, operadoras, serialGenerator, $location) {
    $scope.operadoras = operadoras.data;
      
    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContatos(contato).success(function (data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $location.path("/contatos")
        });
    };
});