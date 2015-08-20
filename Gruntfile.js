module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      portergaud: {
        files: {
          'public/js/alljs.min.js': ['./bower_components/jquery/dist/jquery.min.js', './bower_components/bootstrap/dist/js/bootstrap.min.js','./bower_components/angular/angular.min.js','./public/js/angularCore.js']
        }
      }
    },
    jshint: {
      allFiles: [
        'server.js', 'config/*.js', 'views/*.js'
      ],
      options: {
        // *cricket*
      }
    },
    jscs: {
      main: ['*.js', 'views/js/*.js', 'config/*.js'],
      options: {
        config: '.jscsrc',
        excludeFiles: ['config/help.js', 'config/schedule.js', 'config/middleSchedule.js'] // API data
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'jscs', 'uglify']);

  grunt.registerTask('build:travis', ['jshint', 'jscs', 'uglify']);
};
