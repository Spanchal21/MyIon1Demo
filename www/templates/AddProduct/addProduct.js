angular.module('Emily.addProduct', [])

.controller('addProductCtrl', function($scope, $ionicViewSwitcher, $http, $ionicLoading, $ionicHistory,$ionicPopup, $rootScope) {

    $scope.fnAddProduct = function(form, val) {

        if (form.$valid) {
            var model = {
                productname: val.productname,
                productpercaratqty: val.productpercaratqty,
                productpurchaseprice: val.productpurchaseprice,
                productsaleprice: val.productsaleprice
            };
            $ionicLoading.show();
            $http.post($rootScope.url + "/products/addproduct", model)
                .success(function(data) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Success..',
                        template: 'Product Add Successfully..',
                        okType: 'common-btn'
                    }).then(function() {
                        $ionicHistory.goBack();
                        $ionicViewSwitcher.nextDirection('back');
                    });
                }).error(function(er) {
                    console.log(JSON.stringify(er));
                })

        }









    }
});
