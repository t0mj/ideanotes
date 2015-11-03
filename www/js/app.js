// Ionic Starter App

var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    // Cordova SQLite
    if(window.cordova) {
      // App syntax
      db = $cordovaSQLite.openDB("ideanotes.db");
    } else {
      // Ionic serve syntax
      db = window.openDatabase("ideanotes.db", "1.0", "Idea Notes", -1);
    }

    /*jshint multistr: true */
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS `notes` (\
                              	`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\
                              	`name`	TEXT,\
                              	`type`	TEXT,\
                              	`audience`	TEXT,\
                              	`description`	TEXT,\
                              	`drawing`	TEXT\
                              );'
    );
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.new-note', {
    url: '/new-note',
    views: {
      'tab-new-note': {
        templateUrl: 'templates/tab-new-note.html',
        controller: 'NoteCtrl'
      }
    }
  })

  .state('tab.notes', {
      url: '/notes',
      views: {
        'tab-notes': {
          templateUrl: 'templates/tab-notes.html',
          controller: 'MyNotesCtrl'
        }
      }
    })
    .state('tab.note-detail', {
      url: '/notes/:noteId',
      views: {
        'tab-notes': {
          templateUrl: 'templates/note-detail.html',
          controller: 'NoteDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/new-note');

});
