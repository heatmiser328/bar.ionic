angular.module('bar.services')

.factory('Sound', function(MediaSrv) {
	return {
    	play: function() {
        	MediaSrv.loadMedia('snd/droll.wav').then(function(media){
            	media.play();
			});
        }
    };
});
