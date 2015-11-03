angular.module('starter.services', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  };

  // Process a result set
  self.getAll = function(result) {
    var output = [];
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  };

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  };

  return self;
})

.factory('Notes', function($cordovaSQLite, DBA) {
  // Might use a resource here that returns a JSON array
  var self = this;

  var notes = [];
  // {
  //   id: 0,
  //   name: 'Test Note',
  //   description: 'You on your way?',
  //   icon: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  // };

  self.all = function() {
    return DBA.query("SELECT * FROM notes")
      .then(function(result){
        return DBA.getAll(result);
      });
  };

  self.get = function(memberId) {
    var parameters = [memberId];
    return DBA.query("SELECT id, name FROM notes WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  };

  self.add = function(note) {
    var columns = [];
    var parameters = [];
    for (var key in note) {
      columns.push(key);
      parameters.push(note[key]);
    }
    return DBA.query("INSERT INTO notes (" + columns.toString() + ") VALUES ('" + parameters.join([separator = "','"]) + "')");
  };

  self.remove = function(id) {
    var parameters = [id];
    return DBA.query("DELETE FROM notes WHERE id = (?)", parameters);
  };

  self.update = function(origMember, editMember) {
    var parameters = [editMember.id, editMember.name, origMember.id];
    return DBA.query("UPDATE notes SET id = (?), name = (?) WHERE id = (?)", parameters);
  };

  return self;
  // Some fake testing data
  // var notes = [];

  //   id: 1,
  //   name: 'Max Lynx',
  //   lastText: 'Hey, it\'s me',
  //   face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  // }, {
  //   id: 2,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  // }, {
  //   id: 3,
  //   name: 'Perry Governor',
  //   lastText: 'Look at my mukluks!',
  //   face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  // }, {
  //   id: 4,
  //   name: 'Mike Harrington',
  //   lastText: 'This is wicked good ice cream.',
  //   face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  // }];

  // return {
  //   all: function() {
  //     return notes;
  //   },
  //   add: function(note) {
  //     notes.append(note);
  //   },
  //   remove: function(note) {
  //     notes.splice(notes.indexOf(note), 1);
  //   },
  //   get: function(noteId) {
  //     for (var i = 0; i < notes.length; i++) {
  //       if (notes[i].id === parseInt(noteId)) {
  //         return notes[i];
  //       }
  //     }
  //     return null;
  //   }
  // };
});
