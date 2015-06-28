angular.module('bar.controllers')

.controller('BattleVictoryCtrl', function($rootScope, $scope, $log) {
	$log.info('load battle victory controller');
    
    $scope.reset = function() {
    	$rootScope.$emit('reset');
    }
    
    $scope.$watch('current.americanVP', function(nv,ov) {
    	$scope.onChange(nv);
    });
    $scope.$watch('momentum.britishVP', function(nv,ov) {
    	$scope.onChange(nv);
    });
    
    $scope.onChange = function(v) {
    	$rootScope.$emit('save');
    }
});
