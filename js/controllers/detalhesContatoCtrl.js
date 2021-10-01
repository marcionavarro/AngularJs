angular.module("listaTelefonica").controller("detalhesContatoCtrl", function ($scope, $routeParams, contato) {
    console.log($routeParams.id)
    $scope.contato = contato.data;
});