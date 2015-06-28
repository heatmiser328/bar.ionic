angular.module('bar', ['ionic', 'bar.controllers', 'bar.services', 'bar.directives'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'MainCtrl'
        })
        .state('app.home', {
            url: '/home',
            views: {
                'contentView': {
                    templateUrl: 'templates/main.html'
                }
            }
        })

        // setup an abstract state for the tabs directive
        .state('app.battle', {
        	url: '/battle/:battleId',
            abstract: true,
            views: {
            	'contentView': {
            		templateUrl: 'templates/battle.html',
	                controller: 'BattleCtrl'
				}
            }
        })
        .state('app.battle.turn', {
        	url: '/turn',
            views: {
            	'battle-turn': {
		            templateUrl: 'templates/battle-tab-turn.html',
    		        controller: 'BattleTurnCtrl'
				      }
			}
		})

        .state('app.battle.initiative', {
            url: '/initiative',
            views: {
                'battle-initiative': {
                    templateUrl: 'templates/battle-tab-initiative.html',
                    controller: 'BattleInitiativeCtrl'
                }
            }
        })

        .state('app.battle.fire', {
            url: '/fire',
            views: {
                'battle-fire': {
                    templateUrl: 'templates/battle-tab-fire.html',
                    controller: 'BattleFireCtrl'
                }
            }
        })

        .state('app.battle.melee', {
            url: '/melee',
            views: {
                'battle-melee': {
                    templateUrl: 'templates/battle-tab-melee.html',
                    controller: 'BattleMeleeCtrl'
                }
            }
        })

        .state('app.battle.morale', {
            url: '/morale',
            views: {
                'battle-morale': {
                    templateUrl: 'templates/battle-tab-morale.html',
                    controller: 'BattleMoraleCtrl'
                }
            }
        })

        .state('app.battle.armymorale', {
            url: '/armymorale',
            views: {
                'battle-amrymorale': {
                    templateUrl: 'templates/battle-tab-armymorale.html',
                    controller: 'BattleArmyMoraleCtrl'
                }
            }
        })

        .state('app.battle.victory', {
            url: '/victory',
            views: {
                'battle-victory': {
                    templateUrl: 'templates/battle-tab-victory.html',
                    controller: 'BattleVictoryCtrl'
                }
            }
        })

        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });
