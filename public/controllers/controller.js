var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope','$http', 
function($scope, $http){
  console.log("Hello World from controller!");

  

    var refresh = function() {
        $http.get('/bankapp').success(function(response){
          console.log("I got the data I requested in json");
        $scope.bankapp = response;
        $scope.account = "";
      });
    }

    refresh();

    $scope.addAccount = function(){
      console.log($scope.account);
      $http.post('/bankapp', $scope.account).success(function(response){
        console.log(response);
        refresh();
      })
    };

    $scope.remove = function(id){
      console.log(id);
      $http.delete('/bankapp/' + id).success(function(response){
          refresh();
      });
    };

    $scope.edit = function(id){
      console.log(id);
      $http.get('/bankapp/' + id).success(function(response){
        $scope.account = response;
      });
    };

    $scope.update = function() {
      console.log($scope.account._id);
      $http.put('/bankapp/' + $scope.account._id, $scope.account).success(function(response){
        refresh();
      })
    };

    $scope.deselect = function() {
      $scope.account = "";
    }


}]);

//$scope is the glue between the controller and the view
//to get data from the server instead of the controller, the protocol $http.get is used
//'/bankapp' is the route created to get data 
// $scope.bankapp = response will place the data into the html 
// $scope.addAccount=function() sends data from the input boxes on the html file and then via the $http.post request, is sent to the server to be processed into the database, but the new data won't show on the view, just yet
// to make the new data show on the view, the page has to be refreshed, so a new function called refresh(); is created
// so on and so forth with the rest of the http protocol requests 