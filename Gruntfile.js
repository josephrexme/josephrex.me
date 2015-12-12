module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    perfbudget : {
      default: {
        options: {
          url: 'http://josephrex.me',
          key: 'A.4b481973e68f123cb6e6fc7f3bece7b8',
          budget: {
            visualComplete: '4000',
            loadTime: '5000',
            render: '1000',
            requests: '20',
            SpeedIndex: '1000',
            requestsDoc: '20',
            bytesIn: '900000',
            bytesInDoc: '858000',
            fullyLoaded: '3000'
          }
        }
      }
    }
  });
  // Loading Tasks
  grunt.loadNpmTasks('grunt-perfbudget');
  // Default task(s).
  grunt.registerTask('default', ['perfbudget']);

};
