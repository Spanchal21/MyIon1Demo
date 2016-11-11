angular.module('Emily.emilyadmin', [])

.controller('emilyadminCtrl', function($scope, $state, $ionicModal, $rootScope, $timeout, $ionicLoading, $http, $ionicPopup) {

    $scope.getProductList = function() {
        var Model = { session_id: localStorage.getItem("userid") }
        $ionicLoading.show();
        $http.post($rootScope.url + "/products/getproducts", Model)
            .success(function(data) {
                $ionicLoading.hide();
                $scope.products = data.response;
                // console.log(JSON.stringify($scope.products));
            }).error(function(error) {
                $ionicLoading.hide();
                console.log(JSON.stringify(error));
            });
    }

    $scope.fnGo = function() {
        $state.go('app.addProduct');
    }

    $scope.fnAddView = function() {
        $ionicModal.fromTemplateUrl("templates/EmilyAdmin/view.html", {
            scope: $scope
                // animation: animation
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    }

    $scope.fnDelete = function(Productid) {
        var myPopup = $ionicPopup.show({
            title: 'Confirmation',
            template: 'are you sure want to Delete ?',
            scope: $scope,
            buttons: [
                { text: 'No',
                  type: 'button-positive' }, 
                { text: '<b>Yes</b>',
                  type: 'button-assertive',
                    onTap: function(res) {
                        if (res) {
                            $ionicLoading.show();
                            $http.get($rootScope.url + "/products/deleteproduct?productid=" + Productid)
                                .success(function(data) {
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: 'Success',
                                        template: 'Data Deleted Successfully..',
                                        okType: 'positive-btn'
                                    }).then(function() {
                                        $scope.getProductList();
                                    });
                                }).error(function() {
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: 'Message',
                                        template: 'Operation Failed..!!',
                                        okType: 'common-btn'
                                    })
                                });
                        }
                    },
                }
            ]
        });
        myPopup.then(function(res) {

        });
        $timeout(function() {
            myPopup.close();
        }, 15000);
    }
});






 ////========================= Using AJAX get product list ========================
   // $scope.getProductList = function() {
   //       $.ajax({
   //      url: "http://apps.atozinfoway.in:8082/additional/products/getproducts",
   //      data: { session_id: localStorage.getItem("userid") },
   //      Type: 'POST'  ,
   //      dataType:"json",
   //      success:function (data) {
   //           $scope.products = data.response;
   //           console.log(JSON.stringify($scope.products));
   //      },
   //      error: function(er) {
   //           console.log(JSON.stringify(er));
   //      }
   //  });


        // $.ajax({
        //  url: "http://apps.atozinfoway.in:8082/additional/products/getproducts",
        //  data: { session_id: localStorage.getItem("userid") },
        //  Type: 'POST'          
        //  }).done(function(data){
        //      if(data.error){
        //        $ionicLoading.hide();
        //              console.log(JSON.stringify(data.error));
        //      }  
        //      else{
        //        $ionicLoading.hide();
        //           $scope.products = data.response;
        //           console.log(JSON.stringify($scope.products));
        //      }
        //  })
 //}







