module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['browserify', 'uglify']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                src: [],
                dest: 'dist/dark-gravity-wave.js',
                options: {
                    require: [
                        './index.js:dgw'
                    ]
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/dark-gravity-wave.min.js': ['dark-gravity-wave.js']
                }
            }
        }
    });
}