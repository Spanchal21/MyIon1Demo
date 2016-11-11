// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('Emily', ['ionic', 'Emily.adminlogin', 'Emily.emilyadmin', 'Emily.doctorlist', 'Emily.patientlist', 'Emily.myFirst', 'Emily.addProduct'])

.run(function($ionicPlatform, $rootScope, $timeout, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $rootScope.url = 'http://apps.atozinfoway.in:8082/additional';
        if (localStorage.getItem("userid") == null) { // one time Login Condition
            $timeout(function() {
                $state.go('adminlogin');
            });
        } else {
            $timeout(function() {
                $state.go('app.emilyadmin');
            });
        }


    });
})

.controller('signoutCtrl', function($scope, $http, $timeout, $state, $rootScope, $ionicLoading, $ionicViewSwitcher, $ionicPopup, $ionicHistory, $ionicViewService) {

    //================================== LogOut ============================================
    $scope.fnSignout = function() {
        var myPopup = $ionicPopup.show({
            title: 'Confirmation',
            template: 'are you sure want to log out ?',
            scope: $scope,
            buttons: [
                { text: 'ના' }, {
                    text: '<b>હા</b>',
                    type: 'button-assertive',
                    onTap: function(res) {
                        if (res) {
                            $ionicLoading.show();
                            $ionicViewSwitcher.nextDirection('back');
                            $ionicHistory.clearCache();
                            $ionicHistory.clearHistory();
                            localStorage.clear();
                            $state.go('adminlogin');
                            $ionicLoading.hide();
                        }
                    }
                },
            ]
        });
        myPopup.then(function(res) {

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 15000);
    }
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.forwardCache(true);
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider

        .state('app', {
        url: '/app',
         cache: false,
        abstract: true,
        templateUrl: 'templates/menu.html',
    })

    .state('adminlogin', {
        url: '/adminlogin',
        templateUrl: 'templates/AdminLogin/adminlogin.html',
        controller: 'adminloginCtrl'
    })

    .state('app.emilyadmin', {
        url: '/emilyadmin',
        views: {
            'menuContent': {
                templateUrl: 'templates/EmilyAdmin/emilyadmin.html',
                controller: 'emilyadminCtrl'
            }
        }
    })

    .state('app.doctorlist', {
        url: '/doctorlist',
        views: {
            'menuContent': {
                templateUrl: 'templates/DoctorList/doctorlist.html',
                controller: 'doctorlistCtrl'
            }
        }
    })

    .state('app.myFirst', {
        url: '/myFirst',
        views: {
            'menuContent': {

                templateUrl: 'templates/MyFirst/myFirst.html',
                controller: 'myFirstCtrl'
            }
        }
    })

    .state('app.addProduct', {
        url: '/addProduct',
        views: {
            'menuContent': {
                templateUrl: 'templates/AddProduct/addProduct.html',
                controller: 'addProductCtrl'
            }
        }
    })

    .state('app.patientlist', {
        url: '/patientlist',
        views: {
            'menuContent': {
                templateUrl: 'templates/PatientList/patientlist.html',
                controller: 'patientlistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/adminlogin');
});
