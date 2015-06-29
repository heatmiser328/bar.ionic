angular.module('bar.controllers')

.controller('BattleTurnCtrl', function($rootScope, $scope, $log, Phases) {
	$log.info('load battle turn controller');
    var TURN_MINS = 60;

    $rootScope.$on('loaded', function(e) {
    	update();
    });

    $rootScope.$on('reset', function() {
    	update();
    });

    $scope.reset = function() {
    	$rootScope.$emit('reset');
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
    
    update();
});
