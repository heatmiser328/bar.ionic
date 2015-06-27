angular.module('bar.services')

.factory('ArmyMorale', function () {

	function find(levels, morale) {
    	return _.find(levels, function(level) {
        	return (morale >= level.low && morale <= level.high);
        }) || {};
	}

	return {
		maxMorale: function(levels) {
        	var l = _.find(levels, function(level) {
            	return level.name == 'high';
            });
            return l ? l.high : 1;
	    },

		initiativeModifier: function(levels, morale) {
	    	var level = find(levels, morale);
	        if (level.name == 'high') {
	        	return 1;
	        }
	        if (level.name == 'wavering') {
	        	return -1;
	        }
	        return 0;
	    },
		moraleModifier: function(levels, morale) {
	    	var level = find(levels, morale);
	        if (level.name == 'fatigued') {
	        	return -1;
	        }
	        if (level.name == 'wavering') {
	        	return -2;
	        }
	        return 0;
	    }
	};        
});

