angular.module('bar.controllers')

.controller('BattleMoraleCtrl', function($rootScope, $scope, $log, Morale, ArmyMorale) {
	$log.info('load battle morale controller');

    var _dice = [0];
    $scope.show = {};
    $scope.show.results = true;
    $scope.morale = {
    	unit: 0,
        army: 'british',
        leader: 0
	};
    $scope.results = {
    	morale: ''
	};

    $scope.toggleItem = function(item) {
    	$scope.show[item] = !$scope.show[item];
    }

    $scope.isItemShown = function(item) {
    	return !!$scope.show[item];
    }

    $scope.reset = function() {
    	$rootScope.$emit('reset');
    }

    $scope.$watch('morale.unit', function(nv,ov) {
    	$scope.onChange(nv);
    });
    $scope.$watch('morale.leader', function(nv,ov) {
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
	    	$log.info('Resolve morale');
	        var armymorale = 0;
	        if ($scope.morale.army == 'British') {
	        	armymorale = $scope.current.britishMorale;
	        } else if ($scope.morale.army == 'American') {
	        	armymorale = $scope.current.americanMorale;
	        } else {
	        	armymorale = $scope.current.frenchMorale;
	        }
	        var armymod = ArmyMorale.moraleModifier($scope.battle.moraleLevels, armymorale);
            var result = Morale.check(_dice[0], $scope.morale.unit, armymod, $scope.morale.leader);
	        $scope.results.morale = result ? 'Pass' : 'Fail';
        }
    }
});
