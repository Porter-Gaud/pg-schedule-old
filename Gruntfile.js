module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      allFiles: [
        'server.js', 'config/*.js'
      ],
      options: {
        // *cricket*
      }
    },
    jscs: {
      src: '*.js',
      options: {
        config: '.jscsrc',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['jshint', 'jscs']);

  grunt.registerTask('build:travis', ['jshint', 'jscs']);
};
