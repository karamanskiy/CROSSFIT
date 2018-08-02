"use strict";

//init package
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const browserSync  = require('browser-sync');
const cssnano			 = require('gulp-cssnano'); // Подключаем пакет для минификации CSS
const rename 			 = require('gulp-rename');
const concat  		 = require('gulp-concat');
const uglify 			 = require('gulp-uglifyjs'); // Подключаем uglifyjs (для сжатия JS)
const pngquant		 = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
const cache				 = require('gulp-cache');				// кеширует изображения
const autoprefixer = require("gulp-autoprefixer");// Подключаем библи`отеку для автоматического добавления префиксов
const imagemin		 = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const del		 			 = require('del'); // Подключаем библиотеку для удаления файлов и папок
const bourbon      = require('node-bourbon'); // Подключаем библиотеку миксинов для SASS
const bourbon2     = require('bourbon'); // Подключаем библиотеку миксинов для SASS
const notify = require( 'gulp-notify' );

/*tasks*/

// sass to css
gulp.task("sass_desktop", function(){
  return gulp.src("src_desktop/sass/**/*.+(scss|sass)")
    .pipe(sass({
			includePaths: bourbon.includePaths
		}).on( 'error', notify.onError( //перехватываем ошибки
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      } ) )
		//.on('error', sass.logError) //перехватываем ошибки
		)
		.pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
    .pipe(gulp.dest("src_desktop/css")) //нельзя писать файл. Нужно только папки
    .pipe(browserSync.reload({
			stream: true
		}));
});

// reload browser
gulp.task("browserSync_desktop", function(){
  browserSync({
    server: {
      baseDir: './src_desktop' //папка с исходными файлами проекта
    },
    notify: false
  });
});

//compress and cached images
gulp.task('img_desktop', function(){
	return gulp.src("src_desktop/img/**/*")
			.pipe(cache(imagemin({
				interlaced:		true,
				progressive:	true,
				svgoPlugins:	[{removeViewBox: false}],
				une:					[pngquant()]
			})))
			.pipe(gulp.dest("dist_desktop/img"));
});

//очистка Cache
gulp.task("clearCache", function(){
	return cache.clearAll();
});

//concat and minification js libs
gulp.task("minJsLibs_desktop", function(){
	del.sync("src_desktop/js/libs.min.js"); // удаляем старую сборку
	return gulp.src([
				// 'src_desktop/libs/jquery/dist/jquery.min.js',
				'src_desktop/libs/jquery-3.3.1.min.js',
				'src_desktop/libs/arcticmodal/jquery.arcticmodal.js',
				'src_desktop/libs/jquery.mask/jquery.mask.min.js',
				'src_desktop/libs/rellax.min.js', //parallax plugin
				'src_desktop/libs/wow/wow.min.js',
				'src_desktop/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
				'src_desktop/libs/owl.carousel/dist/owl.carousel.min.js'
	])
			.pipe(concat("libs.min.js")) // собираем все библиотеки в один файл
			.pipe(uglify()) // сжимаем
			.pipe(gulp.dest("src_desktop/js"));
});

//concat and minification css libs
gulp.task("minCssLibs_desktop", ['sass_desktop'], function(){
	return gulp.src([
		// 'src/libs/owl-carousel/owl-carousel/owl.carousel.css',
		// 'src/libs/owl-carousel/owl-carousel/owl.theme.css',
		// 'src/libs/owl-carousel/owl-carousel/owl.transitions.css',
		// 'src/libs/magnific-popup/dist/magnific-popup.css',
		// 'src/libs/wow/css/animate.css'
		'src_desktop/css/libs.css'
	])
			.pipe(cssnano()) // сжимаем
			.pipe(rename({
				suffix: '.min'
			})) // добавляет суффикс .min
			.pipe(gulp.dest("src_desktop/css"));
});

//remove dist folder
gulp.task("remove_desktop", function(){
		return del.sync("dist_desktop"); // Удаляем папку dist перед сборкой
});

gulp.task("desktop", ['browserSync_desktop', 'sass_desktop', 'minJsLibs_desktop', 'minCssLibs_desktop'], function(){
	gulp.watch("src_desktop/sass/**/*.+(scss|sass)", ['sass_desktop']); //массив запускаемых тасков
	gulp.watch("src_desktop/**/*.+(html|php)", browserSync.reload);
	gulp.watch("src_desktop/js/**/*.js", browserSync.reload);
});

//собираем проект в продакшн
gulp.task("build_desktop", ['remove_desktop', 'img_desktop', 'sass_desktop', 'minJsLibs_desktop'], function(){
	var buildCss = gulp.src("src_desktop/css/*").pipe(gulp.dest("dist_desktop/css"));

	var buildFonts = gulp.src("src_desktop/fonts/**/*")
			.pipe(gulp.dest("dist_desktop/fonts"));

	var buildJs = gulp.src("src_desktop/js/**/*")
			.pipe(gulp.dest("dist_desktop/js"));

	var buildHtml = gulp.src("src_desktop/*.html")
			.pipe(gulp.dest("dist_desktop/"));

	var buildPhp = gulp.src("src_desktop/*.php")
			.pipe(gulp.dest("dist_desktop/"));
});










// MOBILE TASKS


/*tasks*/

// sass to css
gulp.task("sass_mobile", function(){
  return gulp.src("src_mobile/sass/**/*.+(scss|sass)")
    .pipe(sass({
			includePaths: bourbon.includePaths
		}).on( 'error', notify.onError( //перехватываем ошибки
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      } ) )
		//.on('error', sass.logError) //перехватываем ошибки
		)
		.pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
    .pipe(gulp.dest("src_mobile/css")) //нельзя писать файл. Нужно только папки
    .pipe(browserSync.reload({
			stream: true
		}));
});

// reload browser
gulp.task("browserSync_mobile", function(){
  browserSync({
    server: {
      baseDir: './src_mobile' //папка с исходными файлами проекта
    },
    notify: false
  });
});

//compress and cached images
gulp.task('img_mobile', function(){
	return gulp.src("src_mobile/img/**/*")
			.pipe(cache(imagemin({
				interlaced:		true,
				progressive:	true,
				svgoPlugins:	[{removeViewBox: false}],
				une:					[pngquant()]
			})))
			.pipe(gulp.dest("dist_mobile/img"));
});


//concat and minification js libs
gulp.task("minJsLibs_mobile", function(){
	del.sync("src_mobile/js/libs.min.js"); // удаляем старую сборку
	return gulp.src([
				// 'src/libs/jquery/dist/jquery.min.js',
				'src_mobile/libs/jquery-3.3.1.min.js',
				'src_mobile/libs/arcticmodal/jquery.arcticmodal.js',
				'src_mobile/libs/jquery.mask/jquery.mask.min.js',
				'src_mobile/libs/rellax.min.js',
				// 'src_mobile/libs/jQueryFormStyler/jquery.formstyler.min.js',
				'src_mobile/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
				// 'src_mobile/libs/bootstrap-sass/assets/javascripts/bootstrap.min.js',
				'src_mobile/libs/owl.carousel/dist/owl.carousel.min.js'
	])
			.pipe(concat("libs.min.js")) // собираем все библиотеки в один файл
			.pipe(uglify()) // сжимаем
			.pipe(gulp.dest("src_mobile/js"));
});

//concat and minification css libs
gulp.task("minCssLibs_mobile", ['sass_mobile'], function(){
	return gulp.src([
		// 'src/libs/owl-carousel/owl-carousel/owl.carousel.css',
		// 'src/libs/owl-carousel/owl-carousel/owl.theme.css',
		// 'src/libs/owl-carousel/owl-carousel/owl.transitions.css',
		// 'src/libs/magnific-popup/dist/magnific-popup.css',
		// 'src/libs/wow/css/animate.css'
		'src_mobile/css/libs.css'
	])
			.pipe(cssnano()) // сжимаем
			.pipe(rename({
				suffix: '.min'
			})) // добавляет суффикс .min
			.pipe(gulp.dest("src_mobile/css"));
});

//remove dist folder
gulp.task("remove_mobile", function(){
		return del.sync("dist_mobile"); // Удаляем папку dist перед сборкой
});

gulp.task("mobile", ['browserSync_mobile', 'sass_mobile', 'minJsLibs_mobile', 'minCssLibs_mobile'], function(){
	gulp.watch("src_mobile/sass/**/*.+(scss|sass)", ['sass_mobile']); //массив запускаемых тасков
	gulp.watch("src_mobile/**/*.+(html|php)", browserSync.reload);
	gulp.watch("src_mobile/js/**/*.js", browserSync.reload);
});

//собираем проект в продакшн
gulp.task("build_mobile", ['remove_mobile', 'img_mobile', 'sass_mobile', 'minJsLibs_mobile'], function(){
	var buildCss = gulp.src("src_mobile/css/*").pipe(gulp.dest("dist_mobile/css"));

	var buildFonts = gulp.src("src_mobile/fonts/**/*")
			.pipe(gulp.dest("dist_mobile/fonts"));

	var buildJs = gulp.src("src_mobile/js/**/*")
			.pipe(gulp.dest("dist_mobile/js"));

	var buildHtml = gulp.src("src_mobile/*.html")
			.pipe(gulp.dest("dist_mobile/"));

	var buildPhp = gulp.src("src_mobile/*.php")
			.pipe(gulp.dest("dist_mobile/"));
});






//default gulp task call watch
gulp.task('default', ['watch_desktop']);