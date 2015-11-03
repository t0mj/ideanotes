angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('NoteCtrl', function($scope, Notes) {

  $scope.newNote = {};
  // $scope.note = null;

  // $scope.updateNote = function() {
  //   Notes.all().then(function(note){
  //     $scope.note = note;
  //   });
  // };
  //
  // $scope.updateNote();

  $scope.createNote = function() {
    Notes.add($scope.newNote);
    // $scope.updateNote();
    $scope.newNote = {};
  };

  // $scope.removeNote = function(note) {
  //   Notes.remove(note);
  //   $scope.updateNote();
  // };
  //
  // // fix later
  // $scope.editNote = function(origMember, editMember) {
  //   Notes.update(origMember, editMember);
  //   $scope.updateNote();
  // };

})

// .controller('FormCtrl', function ($scope, $http, Notes) {
//     $scope.note = { 'name': 'Fresh New Idea!' };
//     $scope.submitForm = function(note) {
      // Notes.add(note);
    // };
    // $scope.submitForm = function() {
    //     console.log("posting data....");
    //     $http.post('http://posttestserver.com/post.php?dir=jsfiddle', JSON.stringify(data)).success(function(){/*success callback*/});
    // };
// })

.controller('MyNotesCtrl', function($scope, Notes) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.updateNotes = function() {
    Notes.all().then(function(notes){
      $scope.notes = notes;
    });
  };

  $scope.updateNotes();

  $scope.removeNote = function(id) {
    Notes.remove(id);
    $scope.updateNotes();
  };

  // fix later
  $scope.editNote = function(origMember, editMember) {
    Notes.update(origMember, editMember);
    // $scope.updateNotes();
  };

  $scope.remove = function(note) {
    Notes.remove(note);
  };
})

.controller('NoteDetailCtrl', function($scope, $stateParams, Notes) {
  $scope.note = Notes.get($stateParams.noteId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
