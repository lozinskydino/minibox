app.controller('CrudController', ['$scope', '$window', '$aside', '$http', 'PlaceholderTextService', function($scope, $window, $aside, $http, PlaceholderTextService){

  // settings
  $scope.settings = {
    singular: 'Aluno',
    plural: 'Alunos',
    cmd: 'Add'
  };

  // making forms

  $scope.item = {};

  $scope.categorias = [
      {
        value: '1',
        label: 'Esportes'
      },
      {
        value: '2',
        label: 'Notícias'
      },
      {
        value: '3',
        label: 'Debate'
      }
  ];

  $scope.subcategorias = [
    {
      value: '1',
      label: 'Latcínios'
    },
    {
      value: '2',
      label: 'Bovinos'
    },
    {
      value: '3',
      label: 'Suínos'
    }
  ];

  $scope.checkbox = [
    {
      value: '1',
      label: 'Mario Bros'
    },
    {
      value: '2',
      label: 'Luigi Bros'
    },
    {
      value: '3',
      label: 'Yoshi'
    }
  ];

  $scope.radio = [
    {
      value: '1',
      label: 'Goku'
    },
    {
      value: '2',
      label: 'Vegeta'
    },
    {
      value: '3',
      label: 'Gohan'
    }
  ];



  // Beginnin forms
  $scope.forms = [
      {
        type: 'title',
        label: 'Nome',
        model: 'firstname',
        foto: 'foto'
      },
      {
        type: 'title',
        label: 'Sobrenome',
        model: 'lastname'
      },
      {
        type:'select',
        label: 'Categoria',
        model: 'categoria',
        options: $scope.categorias
      },
      {
        type:'select',
        label: 'Sub-Categoria',
        model: 'subcategoria',
        options: $scope.subcategorias
      },
      {
        type: 'checkbox',
        label: 'Algumas Opções',
        model: 'checkbox',
        options: $scope.checkbox
      },
      {
        type: 'radio',
        label: 'Alguns Radios',
        model: 'radio',
        options: $scope.radio
      },
      {
        type: 'date',
        label: 'Data',
        model: 'data'
      },
      {
        type: 'content',
        label: 'Observações',
        model: 'paragraph'
      }
  ];

  // adding demo data
  var data = [];
  for (var i = 1; i <= 1; i++){
    data.push({
      icon: PlaceholderTextService.createIcon(false),
      firstname: PlaceholderTextService.createFirstname(),
      lastname: PlaceholderTextService.createLastname(),
      paragraph: PlaceholderTextService.createSentence()
    });
  }
  $scope.data = data;

  // defining template
  var formTpl = $aside({
    scope: $scope,
    template: 'assets/tpl/apps/crud-form.html',
    show: false,
    placement: 'left',
    backdrop: false,
    animation: 'am-slide-left'
  });

  // methods
  $scope.checkAll = function () {
    angular.forEach($scope.data, function (item) {
      item.selected = !item.selected;
    });
  };

  $scope.editItem = function(item){
    if(item){
      item.editing = true;
      $scope.item = item;
      $scope.settings.cmd = 'Edit';
      showForm();
    }
  };

  $scope.viewItem = function(item){
    if(item){
      item.editing = false;
      $scope.item = item;
      $scope.settings.cmd = 'View';
      showForm();
    }
  };

  $scope.createItem = function(){
    var item = {
      icon: PlaceholderTextService.createIcon(true),
      editing: true
    };
    $scope.item = item;
    $scope.settings.cmd = 'New';
    showForm();
  };

  $scope.saveItem = function(){
    if($scope.settings.cmd == 'New'){
      $scope.data.push($scope.item);
    }
    hideForm();
    console.log($scope.item);
  };

  $scope.remove = function(item){
    if(confirm('Are you sure?')){
      if(item){
        $scope.data.splice($scope.data.indexOf(item), 1);
      } else {
        $scope.data = $scope.data.filter(
          function(item) {
            return !item.selected;
          }
        );
        $scope.selectAll = false;
      }
    }
  };

  showForm = function(){
    angular.element('.tooltip').remove();
    formTpl.show();
  };

  hideForm = function(){
    formTpl.hide();
  };

  $scope.$on('$destroy', function() {
    hideForm();
  });

}]);
