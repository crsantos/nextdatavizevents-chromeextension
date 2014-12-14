app = angular.module('myApp', [])

// Controller for handling the date
app.controller('MainCtrl', function($scope, $timeout) {
  
  // Build the date object
  $scope.date = {};

  // Update function
  var updateTime = function() {
    $scope.date.raw = new Date();
    $timeout(updateTime, 1000);
  }
  // Kick off the update function
  updateTime();

});

// Controller for handling the data retrieved
app.controller('DataCtrl', function($scope, $http) {
  
  $scope.columns = [
    "Name",
    "Start Time",
    "BetGenius EventId",
    "Has Coverage",
    "EventId",
  ]
  $scope.sports = [
    { name: "Foootball", id: "4"},
    { name: "Tennis", id: "24"},
  ]
  $scope.events = [];

  var fetchEvents = function() {

  	$http.get('https://betfair.betstream.betgenius.com/betstream-view/betfairtennisscorecentre/getBookmakerMappedEvents?sportId=4').
    success(function(data, status, headers, config) {
      $scope.events = data;
    }).
    error(function(data, status, headers, config) {
      // log error
      $console.log("Error fetching: "+headers)
    });
  }

  // Kick off the fetch
  fetchEvents();
});

