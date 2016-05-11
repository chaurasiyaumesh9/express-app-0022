// public/js/app.js
var app = angular.module('sampleApp', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        });

    $locationProvider.html5Mode(true);

}]);

app.service('NerdService', function($http, $q){
	
	return({
		get: get,
		create: create,
		deleteNerd: deleteNerd
	});
	
	 function get() {
		//return $http.get('/api/nerds');
		var request = $http({
			method: "get",
			url: "/api/nerds",
			params: {
				action: "get"
			}
		});
		return( request.then( handleSuccess, handleError ) );
	}

	function create(nerdData) {
		//return $http.post('/api/nerds', nerdData);
		var request = $http({
			method: "post",
			url: "/api/nerds",
			params: {
				action: "add"
			},
			data: {
				nerdData: nerdData
			}
		});
		return( request.then( handleSuccess, handleError ) );
	}

	function deleteNerd( id ) {
        var request = $http({
            method: "delete",
            url: "/api/nerds/" + id,
            params: {
                action: "delete"
            },
            data: {
                id: id
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

	function handleError( response ) {
        if ( ! angular.isObject( response.data ) || ! response.data.message ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    function handleSuccess( response ) {
	    return( response.data );
	}
});

app.controller('MainController', function($scope) {

    $scope.tagline = 'To the moon and back!';   

});

app.controller('NerdController', function($scope, NerdService) {

    $scope.tagline = 'Nothing beats a pocket protector!';
	$scope.nerds = [];
	
	$scope.getNerds = function( ){
		NerdService.get( ).then( function( response ){
			$scope.nerds = response;
		}, function( errorMessage ){
			console.log('errorMessage :', errorMessage);
		});
	}

	function getNerds(){
		$scope.getNerds();
	}

	$scope.addNew = function( nerd ){
		NerdService.create( nerd ).then( function( response ){
			$scope.nerd = {};
			getNerds();
		}, function( errorMessage ){
			console.log('errorMessage :', errorMessage);
		});
	}

	$scope.delete = function( id ){
		NerdService.deleteNerd( id ).then( function( response ){
			getNerds();
		}, function( errorMessage ){
			console.log('errorMessage :', errorMessage);
		});
	}

	getNerds();
});