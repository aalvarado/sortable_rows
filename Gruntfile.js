module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      pivotal: {
        src: 'src/*.js',
        options: {
          specs: 'spec/*_spec.js',
          keepRunner: true,
          outfile: 'spec_runner.html',
          vendor: [
            "bower_components/jquery/jquery.js"
          ],
          helpers: [
            "bower_components/jasmine-jquery/lib/jasmine-jquery.js"
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
}


