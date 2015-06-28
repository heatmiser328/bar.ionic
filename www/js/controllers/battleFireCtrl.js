angular.module('bar.controllers')

.controller('BattleFireCtrl', function($rootScope, $scope, $log, Fire) {
	$log.info('load battle fire controller');
    var _dice = [0,0];
    $scope.show = {};
    $scope.show.results = true;
    $scope.fire = {};
    $scope.results = {
    	fire: ''
    };

    $scope.fire.types = Fire.types;
    $scope.fire.type = Fire.types[0];
    $scope.fire.sps = Fire.sps;
    $scope.fire.strength = Fire.sps[0];
    $scope.fire.ranges = Fire.ranges;
    $scope.fire.range = Fire.ranges[0];
    $scope.fire.modifiers = [];
    $scope.fire.modifier = {};

    $scope.reset = function() {
    	$rootScope.$emit('reset');
    }
    
    $rootScope.$on('loaded', function(e) {
    	$scope.fire.modifiers = $scope.battle.modifiers.fire;
    });
    
    $scope.toggleItem = function(item) {
    	$scope.show[item] = !$scope.show[item];
    }

    $scope.isItemShown = function(item) {
    	return !!$scope.show[item];
    }

    $scope.onChange = function(v) {
    	$log.debug('onChange ' + v);
        resolve();
    }

    $scope.onRoll = function(dice) {
    	_dice = dice;
        resolve();
    }

    function modifiers() {
    	var drm = 0;
        _.each($scope.fire.modifier, function(value, key) {
        	if (value) {
	        	var m = _.find($scope.fire.modifiers, function(modifier) {
	            	return (key == modifier.name);
	            });
            	drm += (m ? m.value : 0);
            }
        });
        return drm;
    }

    function resolve() {
    	$log.info('Resolve fire');
        var drm = modifiers();
        $log.debug('Hit: ' + _dice[0] + ', Damage: ' + _dice[1] + ', Type: ' + $scope.fire.type + ', SPs: ' + $scope.fire.strength + ', Range: ' + $scope.fire.range + ', DRM: ' + drm);
        $scope.results.fire = Fire.resolve(_dice[0], _dice[1], $scope.fire.type, $scope.fire.strength, $scope.fire.range, drm);
    }
});
