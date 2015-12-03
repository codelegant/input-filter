'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './';
        this.sourceTs = this.source + 'ts/';

        this.tsOutputPath = this.source + 'js';
        this.allJavaScript = [this.source + 'js/**/*.js'];
        this.allTypeScript = this.sourceTs + '**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;
