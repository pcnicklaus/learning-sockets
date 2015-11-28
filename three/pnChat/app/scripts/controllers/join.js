'use strict';

/**
 * @ngdoc function
 * @name pnChatApp.controller:JoinCtrl
 * @description
 * # AboutCtrl
 * Controller of the pnChatApp
 */
angular.module('pnChatApp')
  .controller('JoinCtrl', ['$scope', '$rootScope', '$location', 'PubNub', function ($scope, $rootScope, $location, PubNub) {

    //random name generator
    $scope.data = {
      username: "User_" + Math.floor(Math.random() * 1000)
    };

    $scope.join = function () {
      console.log('joining');
      var _ref;
      var _ref2;
      $rootScope.data || ($rootScope.data = {});
      $rootScope.data.username = (_ref = $scope.data) != null ? _ref.username : void 0;
      $rootScope.data.city = (_ref2 = $scope.data) != null ? _ref2.username : void 0;
      $rootScope.data.uuid = Math.floor(Math.random() * 1000000) + "__" + $scope.data.username;
      console.log($rootScope);

      PubNub.init({
        subscribe_key: 'pub-c-6704fe46-5010-4119-958a-fb0f8bd62de8',
        publish_key: 'sub-c-c9573ad4-77a3-11e5-8d0a-0619f8945a4f',
        uuid: $rootScope.data.uuid
      });

      return $location.path('/main');

    };

  }]);
