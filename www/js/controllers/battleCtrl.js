angular.module('bar.controllers')

.controller('BattleCtrl', function($rootScope, $scope, $log, $stateParams, $ionicPopup, Battles, Current, Phases) {
	$log.info('load battle controller');
    var TURN_MINS = 60;
    
    $rootScope.$on('load', function(e, id) {
    	load(id);
    });
    
    $rootScope.$on('reset', function() {
    	$log.info('reset battle');
        $scope.current = Current.new($scope.battle);
    	save();
    });
    
    $rootScope.$on('save', function() {
    	save();
    });

	$scope.reset = function() {
		$rootScope.$emit('reset');
	}

	$scope.save = function() {
		$rootScope.$emit('save');
	}
   
	// A confirm dialog
    $scope.showConfirm = function(title, message) {
    	return $ionicPopup.confirm({
        	title: title || 'Confirm Action',
            template: message || 'Are you sure you want to perform this action?'
		});
	}

    function load(id) {
    	$log.debug('Load battle ' + id);
	    Battles.get(id)
		.then(function(data) {
			$log.info('retrieved battle');
	        $scope.battle = data;
	        // current battle settings: turn, orders, roster, etc.
	        var current = Current.load();
	        if (current && current.battle != data.id) {
	        	current = null;
	        }
	        $scope.current = current || Current.new(data);
            $rootScope.$emit('loaded');
		})
		.catch(function(err) {
			$log.error('failed to retrieve battle');
			$log.error(err);
	        $scope.battle = {};
	        $scope.current = {};
		})
        .finally(function() {
        	save();
        });
	}        
    
    function save() {
    	$log.info('Save battle');
        Current.save($scope.current);
    }
    
    load($stateParams.battleId);
});
