angular.module('bar.services')

.factory('Battles', function ($window, $http, $q) {
	var battles = [];
    var url = '';
    if($window.ionic.Platform.isAndroid()){
    	url = 'file:///android_asset/www';
	}
    url = url + '/data/battles.json';
    
    function load() {
    	var deferred = $q.defer();
        if (battles.length > 0) {
        	deferred.resolve(battles);
        }
        else {
            $http.get(url)
	    	.success(function(data, status, headers, config) {
            	battles = data;
	        	deferred.resolve(battles);
	        })
	        .error(function(data, status, headers, config) {
	        	deferred.reject(data);
	        });        
		}            
        return deferred.promise;
    }
    
    function save() {
    }
    
    function get(battleId) {
    	var deferred = $q.defer();
        load()
        .then(function(data) {
        	var battle = _.find(data, function(battle) {
            	return (battle.id == battleId);
            }) || {};
            return deferred.resolve(battle);
        })
        .catch(function(err) {
        	deferred.reject(err);
        });
        return deferred.promise;
    }
    
    return {
    	load: load,
        save: save,
        get: get
    };
});

