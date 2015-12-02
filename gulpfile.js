"use strict";
var gulp = require("gulp"),
    sourcemaps = require('gulp-sourcemaps'),
    tsc = require("gulp-typescript"),
    Config = require("./gulpfile.config"),
    notify=require("gulp-notify"),
    tsProject = tsc.createProject("tsconfig.json");

var config = new Config();

gulp.task("tsc", function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
        config.libraryTypeScriptDefinitions]; //reference to library .d.ts files
                        

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    tsResult.dts
    .pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
        //.pipe(notify({message:"成功编译TypeScript"}));
});
gulp.task('watch', function () {
    gulp.watch([config.allTypeScript], ['tsc']);
});