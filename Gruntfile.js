
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      allFiles: [
        'server.js', './app/**/*.js'
      ]
    },
    jscs: {
      main: ['./app/**/*.js', './public/js/angularCore.js', './server.js'],
      options: {
        config: '.jscsrc',
        excludeFiles: ['./app/controller/schedule.js']
      }
    },
    uglify: {
      portergaud: {
        files: {
          'public/js/all.min.js': ['./bower_components/jquery/dist/jquery.min.js', './bower_components/angular/angular.min.js','./bower_components/bootstrap/dist/js/bootstrap.min.js', './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js', './bower_components/angular-prompt/dist/angular-prompt.min.js', './bower_components/angular-cookies/angular-cookies.min.js', './public/js/angularCore.js']
        }
      }
    },
    cssmin: {
      all: {
        files: {
          './public/css/all.min.css': ['bower_components/bootstrap/dist/css/bootstrap.min.css', './public/css/style.css']
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  // grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['jshint', 'jscs', 'uglify', 'cssmin']);

  grunt.registerTask('build:travis', ['jshint', 'jscs', 'uglify', 'cssmin']);
};
