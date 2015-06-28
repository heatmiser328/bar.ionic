angular.module('bar.controllers')

.controller('BattleArmyMoraleCtrl', function($rootScope, $scope, $log, ArmyMorale) {
	$log.info('load battle army morale controller');
    $scope.maxMorale = 0;
    
    $scope.reset = function() {
    	$rootScope.$emit('reset');
    }
    
    $rootScope.$on('loaded', function(e) {
    	$scope.maxMorale = ArmyMorale.maxMorale($scope.battle.moraleLevels);
    });
    
    $scope.onChange = function(v) {
    	$rootScope.$emit('save');
    }
});
