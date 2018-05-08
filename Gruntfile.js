module.exports = function (grunt) {
    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint'
    ].forEach(function (task) {
        grunt.loadNpmTasks(task);
    });
    // configure plugins
    // run test with grunt but still confusing, need to learn more
    grunt.initConfig({
        cafemocha: {
            unit: { src: 'public/qa/tests-unit.js', options: { ui: 'tdd' }, }
        },
        jshint: {
            app: ['index.js', 'public/js/**/*.js',
                'lib/**/*.js'],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
        }
    });
    // register tasks
    grunt.registerTask('default', ['cafemocha', 'jshint']);
};