// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("ListCtrl",function($scope, Items, Auth){
  $scope.items = Items;

  $scope.addItem = function(){

  var name = prompt("What do you need to buy?");
    if(name){
      $scope.items.$add({
        "name": name
      });
    }
  };

  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      console.log("inside login");
      // User successfully logged in
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });

    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
      } else {
        console.log("Logged in as", authData.uid);
      }
      $scope.authData = authData; // This will display the user's name in our view
    });
  };

})

.factory("Items", function($firebaseArray){
  var itemsRef = new Firebase("https://incandescent-inferno-5080.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})


.factory("Auth", function($firebaseAuth) {
  var endPoint = "https://incandescent-inferno-5080.firebaseio.com";
  var usersRef = new Firebase(endPoint);
  return $firebaseAuth(usersRef);
});
