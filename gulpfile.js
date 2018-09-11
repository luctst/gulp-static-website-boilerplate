/**
 * Node modules
 */
const Gulp = require("gulp");
const BrowserSync = require("browser-sync").create();
const Sass = require("gulp-sass");
const Delete = require("del");
const Css = require("gulp-clean-css");
const PostCss = require("gulp-postcss");
const Autoprefixer = require("autoprefixer");
const DeleteDuplicateCss = require("postcss-discard-duplicates");
const Run = require("run-sequence");
const HtmlMinify = require("gulp-htmlmin");
const Image = require("gulp-imagemin");

/**
 * Execution
 */

/**
 * TODO: Create a CSS file by using SASS on the "./src/sass/main.scss" file.
 */
Gulp.task("createCss", () => {
    return Gulp.src("./src/sass/main.scss")
        .pipe(Sass())
        .pipe(Gulp.dest("src/"))
        .pipe(BrowserSync.reload({ stream: true }));
});

/**
 * TODO: Each time a file in the watch() method changed launch the instructions in second parameter.
* @param {taskName, task to execute one after the other, callback function}
 */
Gulp.task("default", ["liveBrowser", "createCss"], () => {
    Gulp.watch("./src/**/*.html", BrowserSync.reload);
    Gulp.watch("./src/**/*.scss", ["createCss"]);
});

/**
 * TODO: Delete the "dist/" folder.
 */
Gulp.task("deleteFolder", () => {
    return Delete.sync("dist");
});

/**
 * TODO: Use postCss packages (Autoprefixer and postcss-discard-duplicates) to format "./src/main.css" file.
 */
Gulp.task("formateCss", () => {
    return Gulp.src("./src/main.css")
        .pipe(PostCss([Autoprefixer, DeleteDuplicateCss]))
        .pipe(Gulp.dest("dist/"));
});

/**
 * TODO: Format the images in the "./src/img/namefolder" folder and places it in the "dit/" folder. If you have many folders repeat this task by changing the name and the paths.
 */
Gulp.task("minifyImg", () => {
    return Gulp.src("./src/img/*.(png|jpeg|jpg|svg)") // Change the path
        .pipe(Image())
        .pipe(Gulp.dest("dist/img/")); // Should be the same path than above.
});

/**
 * TODO: Minify the "./src/index.html" file and move it in the "dist/" folder.
 */
Gulp.task("minifyIndexFile", () => {
    return Gulp.src("./src/index.html")
        .pipe(HtmlMinify())
        .pipe(Gulp.dest("dist/"));
});

/**
 * TODO: Create a server who points to the ".src/" folder.
 */
Gulp.task("liveBrowser", () => {
    BrowserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

/**
 * TODO: Minify the "./src/main.css" file and moves it in the "dist/" folder.
 */
Gulp.task("minifyCss", () => {
    return Gulp.src("./src/main.css")
        .pipe(Css())
        .pipe(Gulp.dest("dist/"));
});

/**
 * TODO: Build the "dist/" folder by executing each task one after the other.
 */
Gulp.task("build", callback => {
    return Run("deleteFolder", "minifyIndexFile", "minifyImg", "formateCss", "minifyCss", callback);
});