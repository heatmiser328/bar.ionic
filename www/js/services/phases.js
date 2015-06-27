angular.module('bar.services')

.factory('Phases', function() {
	var phases = [
		"1. Movement", 
		"1. Rally", 
		"1. Def Arty Fire", 
		"1. Rifle Fire", 
		"1. Close Combat", 
		"2. Movement", 
		"2. Rally", 
		"2. Def Arty Fire", 
		"2. Rifle Fire", 
		"2. Close Combat", 
		"End of Turn"
	];
    
    return {
    	get: function(idx) {
        	if (idx != undefined) {
            	return phases[idx];
            }
            return phases;
        },
    	getIndex: function(name) {
        	for (var i=0; i<phases.length; i++) {
            	if (phases[i] == name) {
                	return i;
                }
            }
            return -1;
        },
        count: function() {
        	return phases.length;
        }
    };
});
