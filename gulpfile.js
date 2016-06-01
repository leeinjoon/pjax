var gulp        = require('gulp');
var sass        = require('gulp-sass');
var cssnext     = require('gulp-cssnext');
var plumber     = require('gulp-plumber');
var fs          = require('fs');
//var imageop = require('gulp-image-optimization');
var imagemin    = require('gulp-imagemin');
var browserSync = require('browser-sync');
var changed     = require('gulp-changed');
var rename      = require('gulp-rename');
var ejs         = require('gulp-ejs');
var sourcemaps  = require('gulp-sourcemaps');
// var minifyCss   = require('gulp-minify-css');


// EJS
 gulp.task('json-html', function(){
     var json_file = "src/data/pages.json";
     var temp_file = "src/ejs/template.ejs";
     var json      = JSON.parse(fs.readFileSync(json_file));
     var pages     = json.pages;

     for (var i = 0; i < pages.length; i++) {
         
         var id  = pages[i].id;
         var pic = pages[i].pic;

         gulp.src(temp_file)
             .pipe(ejs({
                 jsonData  : pages[i],
                 jsonData1 : pages[0],
                 jsonData2 : pages[1],
                 jsonData3 : pages[2]
             }))
             .pipe(rename(id + "_" + pic + ".html")) // (id).htmlにファイル名を変更
             .pipe(gulp.dest("dist")); // 指定したフォルダに出力
     }
     
 });

/*
gulp.task('ejs-watch', function(callback){
    gulp.watch(['./src/index.ejs', './src/index.json'], function(e){
        if(e.type != "deleted"){
            var json = JSON.parse(fs.readFileSync("./src/index.json"));
            gulp.src("./src/index.ejs")
                .pipe(plumber())
                .pipe(ejs(json))
                .pipe(rename("index.html"))
                .pipe(gulp.dest("./src/"))
        }
    });

})
*/

// Sassコンパイルタスク
gulp.task('sass', function(){
  gulp.src('./src/scss/**/*.scss', {
    sourcemap: true
  })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'expanded'}))
    //.pipe(sass({outputStyle:'compressed'}))
    //.pipe(sass({outputStyle:'compact'}))
    .pipe(cssnext())
    //.pipe(minifyCss({advanced:false}))
    .pipe(sourcemaps.write('/dist/css/maps'))
    .pipe(gulp.dest('./dist/css/'));
});

// Image圧縮
var paths = {
  srcDir : './src/img/',
  dstDir : './dist/img/'
};

gulp.task( 'imagemin', function(){
  var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif|svg)';
  var dstGlob = paths.dstDir;
  var imageminOptions = {
    optimizationLevel: 1
  };

  gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin( imageminOptions ))
    .pipe(gulp.dest( dstGlob ));
});

// Image圧縮
// gulp.task('images', function(cb) {
//     gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg']).pipe(imageop({
//         optimizationLevel: 5,
//         progressive: true,
//         interlaced: true
//     })).pipe(gulp.dest('dist/img')).on('end', cb).on('error', cb);
// });

// watchタスク(**/*.scss変更時に実行するタスク)
gulp.task('sass-watch', ['sass'], function(){
  var watcher = gulp.watch('./src/scss/**/*.scss', ['sass']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

//BrowserSync
gulp.task('browser-sync', function() {
    // browserSync({
    //     server: {
    //         baseDir: "./dist/"
    //     }
    // });
    browserSync.init(null, {
      proxy: 'localhost:8888'
    })
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['sass-watch','imagemin', 'browser-sync']);
