module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
        excludeFiles: ['config/help.js', 'config/schedule.js'] // API data
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['jshint', 'jscs']);

  grunt.registerTask('build:travis', ['jshint', 'jscs']);
};
