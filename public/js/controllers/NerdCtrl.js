// public/js/controllers/NerdCtrl.js
angular.module('sampleApp', ['NerdService']).controller('NerdController', function($scope, NerdService) {

    $scope.tagline = 'Nothing beats a pocket protector!';
	
	$scope.addNew = function( nerd ){
		console.log('addNew');
		NerdService.create( nerd ).then( function( response ){
			console.log('response :',response);
		}, function( errorMessage ){
			console.log('errorMessage :', errorMessage);
		});
	}
});