'use strict';
/*var $nvc = angular.module('nwk-videochat', ['lumx'])
.factory('GUI', function() {
return require('nw.gui');
})
.factory('Window', ['GUI', function(gui) {
return gui.Window.get();
}]).run(['GUI', 'Window', function(GUI, Window) {
var nativeMenuBar = new GUI.Menu({
type: "menubar"
});
try {
nativeMenuBar.createMacBuiltin("nwk-videochat");
Window.menu = nativeMenuBar;
} catch (ex) {
console.log(ex.message);
}
}]);*/

var $nvc=angular.module('nwk-videochat', ['ui.router','lumx'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
   function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
     $stateProvider.state('server', {
              url : '/server',
              templateUrl : '../partials/server.html',
            })
          .state('client', {
                     url : '/client',
                     templateUrl : '../partials/client.html',
          })
            .state('index', {
                               url : '/',
                               templateUrl : '../views/index.ejs',
                    })
        $urlRouterProvider.otherwise('/');
}]);
