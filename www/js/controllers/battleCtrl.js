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
    	update();
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

    function update() {
		updateDate();
        updatePhase();
    }

    function updateDate() {
    	if ($scope.battle) {
	        var dt = moment($scope.battle.startDateTime);
	        var o = ($scope.current.turn - 1) * TURN_MINS;
	        dt.add(o, 'minutes');
            $log.debug('turn: ' + dt.format("MMM DD, YYYY HH:mm A"));
	        $scope.turn = dt.toDate();
		}            
    }

    function updatePhase() {
    	if ($scope.battle) {
	        $log.debug('phase: ' + $scope.current.phase);
    	    $scope.phase = Phases.get($scope.current.phase);
		}            
    }

    $scope.turnPrev = function() {
    	$log.debug('previous turn');
    	changeTurn(-1);
    	$rootScope.$emit('save');
    }
    $scope.turnNext = function() {
    	$log.debug('next turn');
    	changeTurn(1);
    	$rootScope.$emit('save');
    }
    $scope.phasePrev = function() {
    	$log.debug('previous phase');
    	changePhase(-1);
    	$rootScope.$emit('save');
    }
    $scope.phaseNext = function() {
    	$log.debug('next phase');
    	changePhase(1);
    	$rootScope.$emit('save');
    }

    function changeTurn(c) {
    	if (c != 0) {
			$log.debug('change turn: ' + $scope.current.turn);
            $scope.current.turn += c;
	        if ($scope.current.turn < 1) {
	        	$scope.current.turn = 1;
	        }
            else if ($scope.current.turn > $scope.battle.turns) {
            	$scope.current.turn = $scope.battle.turns;
            }
            updateDate();
        }
    }

    function changePhase(c) {
    	if (c != 0) {
	        $scope.current.phase += c;
	        if ($scope.current.phase < 0) {
	        	$scope.turnPrev();
                $scope.current.phase = Phases.count() - 1;
	        }
	        else if ($scope.current.phase >= Phases.count()) {
	        	$scope.turnNext();
                $scope.current.phase = 0;
	        }
	        updatePhase();
		}
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
    		update();
        	save();
        });
	}        
    
    function save() {
    	$log.info('Save battle');
        Current.save($scope.current);
    }
    
    load($stateParams.battleId);
});
