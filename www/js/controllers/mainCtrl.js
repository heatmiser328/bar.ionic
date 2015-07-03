angular.module('bar.controllers')

.controller('MainCtrl', function($rootScope, $scope, $location, $log, Battles, Current) {
    $log.info('Load App Controller');

	$scope.select = function(battle) {
      $log.debug('Selected ' + battle.name);
    	$rootScope.$emit('load', battle.id);
    }

    $scope.noCurrent = function() {
    	return !Current.load();
    }

    Battles.load()
    .then(function(data) {
        $scope.battles = data;
        var current = Current.load();
        if (current && current.battle) {
            $log.debug('initial load');
        	//$state.go('app.battle.turn');
            $location.path('/app/battle/' + current.battle + '/turn');
        }
    })
    .catch(function(err) {
    	$log.error(err);
    });

});
