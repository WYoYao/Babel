var gulp=require('gulp');
var babel=require('gulp-babel');
//创建一个名为babel的任务
gulp.task('babel',function(){

  return gulp.src('src/*.js')
  //因为我们创建的有.babelrc这个文件所以，直接写babel()就好
  .pipe(babel())
  //如果没有创建对应的配置文件的时候则需要
  //在中间写入对应的配置命令
  //.pipe(babel({···Code···}))
  .pipe(gulp.dest('build'))
})

gulp.task('default',['babel']);
