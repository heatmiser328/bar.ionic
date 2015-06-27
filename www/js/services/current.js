angular.module('bar.services')

.factory('Current', function($localstorage, $log, Battles, Phases) {
	var key = 'bar-current';
	return {			
    	new: function(battle) {
        	return {
            	battle: battle.id,
                turn: 1,
                phase: 0,
                britishMorale: battle.startBritishMorale,
                americanMorale: battle.startAmericanMorale,
                frenchMorale: battle.startFrenchMorale,
                britishVP: 0,
                americanVP: 0
            };
        },
        load: function() {
        	return $localstorage.getObject(key);
        },
        save: function(current) {
        	$localstorage.setObject(key, current);
        }
    };
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      var v = $window.localStorage[key];
      return v && v != "undefined" ? JSON.parse(v) : undefined;
    }
  }
}]);
