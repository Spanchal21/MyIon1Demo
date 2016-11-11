angular.module('Emily.adminlogin', [])

.controller('adminloginCtrl', function($scope, $state,$rootScope, $ionicLoading, $http, $ionicPopup) {

    $scope.fnLogin = function(form, val) {

        if (form.$valid) {
            var model = {
                username: val.Uname,
                password: val.Pword
            }
            $ionicLoading.show();
            $http.post($rootScope.url + "/user/login", model)
                .success(function(data) {
                	$ionicLoading.hide();
                    console.log(JSON.stringify(data.response));
                    localStorage.setItem('userid', data.response.userid);
                    $ionicPopup.alert({
                                title: 'Success..',
                                template: 'Login Successful',
                                okType: 'common-btn'
                            }).then(function() {
                                $state.go('app.emilyadmin');
                            });


                }).error(function(er) {
                    console.log(JSON.stringify(er));
                })

        }
        else{
            alert('all field are required');
        }
    }
});
