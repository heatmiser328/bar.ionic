angular.module('bar.directives')

.directive('dice', [function () {
    return {
        restrict: 'E',
        scope: {
            defs: '=defs',
            result: '=result',
            roll: '&onRoll'
        },
        templateUrl: 'templates/dice.html',
        controller: 'DiceDirectiveController'
    };
}])
.controller('DiceDirectiveController', ['$scope', '$log', 'Dice', function ($scope, $log, Dice) {
    var dice = new Dice.Dice($scope.defs);
    $scope.dice = dice.dice();
    $scope.includeResult = typeof $scope.result != 'undefined';
    
    $scope.onDie = function(die) {
    	var d = dice.dieEx(die);
        d.increment(true);
        $scope.dice = dice.dice();
        callback();
    }
    
    $scope.onRoll = function() {
    	dice.roll();
        $scope.dice = dice.dice();
        callback();
    }
	function callback() {
    	if ($scope.roll) {
        	$scope.roll({
            	dice: _.map(dice.dice(), function(d) {
                	return d.value;
                })
            });
        }
    }
}]);

