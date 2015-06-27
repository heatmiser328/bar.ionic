angular.module('bar.services')

.factory('Morale', function($log) {
	return {
		check: function(die, unitmorale, armymorale, leader) {
	    	return (die + unitmorale + armymorale + leader >= 5);
	    }
    };
});
