module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      portergaud: {
        files: {
          'public/js/all.min.js': ['./bower_components/jquery/dist/jquery.min.js', './bower_components/angular/angular.min.js','./bower_components/bootstrap/dist/js/bootstrap.min.js', './bower_components/angular-bootstrap/ui-bootstrap.min.js', './bower_components/angular-prompt/dist/angular-prompt.min.js', './public/js/angularCore.js']
          
        }
      }
    },
    jshint: {
      allFiles: [
        'server.js', './app/**/*.js'
      ]
    },
    cssmin: {
      all: {
        files: {
          './public/css/all.min.css': ['bower_components/bootstrap/dist/css/bootstrap.min.css']
        }
      }
    },
    jscs: {
      options: {
        config: '.jscsrc',
        excludeFiles: ['config/help.js', 'config/schedule.js', 'config/middleSchedule.js'] // API data
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'jscs', 'uglify', 'cssmin']);

  grunt.registerTask('build:travis', ['jshint', 'jscs', 'uglify', 'cssmin']);
};
