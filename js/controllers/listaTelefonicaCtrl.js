angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatos, operadoras, serialGenerator, $filter) {
    // console.log(serialGenerator.generate());
    $scope.app = $filter("upper")("Lista Telefonica");
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    var init = function () {
        calcularImpostos($scope.contatos);
        generateSerial($scope.contatos);
    }

    var calcularImpostos = function (contatos) {
        contatos.forEach(function (contato) {
            contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco)
        });
    }

    var generateSerial = function(contatos){
        contatos.forEach(function(item){
            item.serial = serialGenerator.generate();
        });
    }

    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContatos(contato).success(function (data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
        $scope.verificarContatoSelecionado($scope.contatos);
    };
    var counter = 0;
    $scope.verificarContatoSelecionado = function (contatos) {
        console.log(counter++);
		$scope.hasContatoSelecionado = contatos.some(function (contato) {
			return contato.selecionado;
		});
	};
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    
    var calcularImposto = function (preco) {
        var imposto = 1.2;
        return preco * imposto;
    }

    $scope.reset = function() {
        $scope.contatos = angular.copy($scope.contatos);
    }

    init();
    
});