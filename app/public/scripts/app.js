app = angular.module('NextDavaVizEvents', [])

// Controller for handling the date
app.controller('MainCtrl', function($scope, $timeout) {
  
  // Build the date object
  $scope.date = {};

  // Update function
  var updateTime = function() {
    $scope.date = new Date();
    $timeout(updateTime, 1000);
  }
  // Kick off the update function
  updateTime();

});

// Controller for handling the data retrieved
app.controller('DataCtrl', function($scope, $http) {
  
  //default the menu to not show
  $scope.showmenu=false;

  //this is the toggle function
  $scope.toggleMenu = function(){
    
    $scope.showmenu = ($scope.showmenu) ? false : true;
  }

  $scope.columns = [
    "Name",
    "StartTime",
    "BetGeniusId",
    "Coverage",
    "EventId",
  ]
  $scope.sports = [
    { name: "Football", id: "10"},
    { name: "Basketball", id: "4"},
    { name: "Tennis", id: "24"},
  ]
  $scope.selectedSport = $scope.sports[0]
  $scope.events = [];

  $scope.toggleSport = function(selectedSport) {

    console.log("Selecting sport: "+ selectedSport);
    fetchEvents(selectedSport.id);
  }

  var fetchEvents = function(sportId) {

  	$http.get('https://betfair.betstream.betgenius.com/betstream-view/betfairtennisscorecentre/getBookmakerMappedEvents?sportId='+sportId).
    success(function(data, status, headers, config) {

      $scope.events = data;
      console.log("Fetched! "+ data.lenght+" events");

    }).
    error(function(data, status, headers, config) {

      $scope.events = [];
      console.log("Error fetching: "+headers); // log error
    });
  }

  // Kick off the fetch
  fetchEvents($scope.sports[0].id);

});

app.filter('truncate', function (){
  return function (text, length, end){
    if (text !== undefined){
      if (isNaN(length)){
        length = 10;
      }

      if (end === undefined){
        end = "...";
      }

      if (text.length <= length || text.length - end.length <= length){
        return text;
      }else{
        return String(text).substring(0, length - end.length) + end;
      }
    }
  };
});