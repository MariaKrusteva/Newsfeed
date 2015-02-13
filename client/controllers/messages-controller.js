app.controller("messagesController", ["$scope", "$resource", function($scope, $resource){
  var Message = $resource("/api/messages"),
      nextMessage = $resource("api/nextMessages");

  $scope.messages = [];

  Message.query(function (results) {
    $scope.messages = results;
    //console.log($scope.messages[0].author)
  });

  $scope.createMessage = function (){
    var message = new Message();
    message.author = $scope.authorName;
    message.text = $scope.textMessage;
    message.$save(function (result){
      $scope.messages.push(result);
      //$scope.authorName = "";
    });
  }
  $scope.listNext = function (){
    nextMessage.query(function (results) {
      $scope.messages = results;
    });
  }
}]);
