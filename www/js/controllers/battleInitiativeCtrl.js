angular.module('bar.controllers')

.controller('BattleInitiativeCtrl', function($rootScope, $scope, $log, Dice, Initiative) {
	$log.info('load battle initiative controller');
    var dice = new Dice.Dice([
    	{num: 1, low: 0, high: 9, color: 'red'},
    	{num: 1, low: 0, high: 9, color: 'blue'}
    ]);

    $scope.show = {};
    $scope.show.results = true;
    $scope.dice = dice.dice();
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
    
    $scope.onDie = function(die) {
    	var d = dice.dieEx(die);
        d.increment(true);
        $scope.dice = dice.dice();
        resolve();
    }
    
    $scope.onChange = function() {
        resolve();
    }
    
    $scope.onRoll = function() {
    	dice.roll();
        $scope.dice = dice.dice();
        resolve();
    }
    
    function resolve() {
    	$log.info('Resolve initiative');
        $log.debug('British: momentum = ' + $scope.momentum.british + ', die = ' + $scope.dice[0].value);
        $log.debug('American: momentum = ' + $scope.momentum.american + ', die = ' + $scope.dice[1].value);
        $scope.results.initiative = Initiative.calc($scope.battle, $scope.dice[0].value, $scope.momentum.british, $scope.dice[1].value, $scope.momentum.american);
    }
});
