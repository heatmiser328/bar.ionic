angular.module('bar.controllers')

.controller('BattleInitiativeCtrl', function($rootScope, $scope, $log, Dice, Initiative) {
	$log.info('load battle initiative controller');
    var _dice = [0,0];
    $scope.show = {};
    $scope.show.results = true;
    $scope.momentum = {
    	british: 0,
        american: 0
	};        
    $scope.results = {
    	initiative: ''
	};        
    
    $scope.reset = function() {
    	$rootScope.$emit('reset');
    }
    
    $scope.toggleItem = function(item) {
    	$scope.show[item] = !$scope.show[item];
    }
    
    $scope.isItemShown = function(item) {
    	return !!$scope.show[item];
    }
    
    $scope.$watch('momentum.british', function(nv,ov) {
    	$scope.onChange(nv);
    });
    $scope.$watch('momentum.american', function(nv,ov) {
    	$scope.onChange(nv);
    });
    
    $scope.onChange = function(v) {
    	$log.debug('onChange ' + v);
        resolve();
    }
    
    $scope.onRoll = function(dice) {
    	_dice = dice;
        resolve();
    }
    
    function resolve() {
    	if ($scope.battle) {
	    	$log.info('Resolve initiative');
	        $log.debug('British: momentum = ' + $scope.momentum.british + ', die = ' + _dice[0]);
	        $log.debug('American: momentum = ' + $scope.momentum.american + ', die = ' + _dice[1]);
	        $scope.results.initiative = Initiative.calc($scope.battle, _dice[0], $scope.momentum.british, _dice[1], $scope.momentum.american);
        }
    }
});
