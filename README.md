# babel自学

## 1.最开始的准备阶段

> 首先创建后面例子中所需要的文件

> ```
> cd Babel/
> touch README.md
> npm init
> touch index.html
> touch index.js
> touch .gitignore
> npm install babel-cli --save-dev
> ```

> - 开发模式下安装--save-dev<br>

> - -g 全局进行安装<br>

> - --save 保存到package.js 下面

### 2.单个文件进行编译

> 在index.js 文件中添加一行代码,然后执行shell

> ```
> const a= 'hello World';
> ```

> 对单个文件进行编译，编译后存放的地址为a.js

> ```
> babel index.js --out-file a.js
> ```

> 整个命令执行完成之后，ls 会发现多了一个a.js 文件，里面存放的就是编译后的文件

### 3.整个目录进行编译

> 首先删除刚才生成的文件a.js(不删除并不影响后面的操作) 然后创建两个新的文件夹 src用于保存原有的资源 build 用于保存生成后的文件。

> 将index.js剪切到src的文件目录下

> ```
> rm -rf a.js
> mkdir src build
> mv index.js src/
> ```

> 接下来执行编译

```
babel src --out-dir build
cd build
ls
```

> 你会发现build中有已经编译好的文件

### 4.设置编译的快捷方式

> 修改项目主目录下面的package 文件 创建一个Build 指令，来避免每次输入过多的字符<br>
> --watch 见识每次修改保存后都重新编译<br>
> 更多的方法 babel --help

> ```
> "scripts": {
>   "test": "echo \"Error: no test specified\" && exit 1",
>   "./node_modules/.bin/babel src --watch --out-dir build"
> }
> ```

> 接下来只需要执行 npm run build

> 就可以执行<br>
> （./node_modules/.bin/babel是为了执行本地的安装的babel 而不是全局安装的babel）

> ```
> ./node_modules/.bin/babel src --out-dir build
> ```

> 这样虽然能够编译过来但是中间的代码并没有将ES6的语法向下转换

### 5.对babel的编译进行预设

> 先安装需要的依赖包<br>
> 然后创建.babelrc 进行预设

> ```
> npm install babel-preset-es2015 --save-dev
> touch .babelrc
> echo {"persets":["es2015"]} > .bablerc
> ```

> 这个时候就编译后的js文件就转变成为了转义后的js 更多的persets的设置属性[点这里](http://babeljs.io/docs/usage/options/)

### 6.添加react的预设

> 添加react 对应的预设

> ```
> npm install babel-preset-react --save-dev
> ```

> 添加简单的react语法<br>

```
import React,{Component} from 'react';
class DemoComponent extends Component{
  render(){
    return<h1>HelloWorld</h1>
  }
}
```

> 这个时候react 的预设已经解决了

> 下面有几个常用的插件

> - 这个插件转换ES2015模块UMD格式。
> - This plugin transforms ES2015 modules to UMD.
> - 让代码更加的简洁
> - babel-plugin-transform-runtime
> - 只用用到的es2015只是将代码中的语法转换成低版本的，但是API并没有转换，需要使用转换API的时候需要用到polyfill;

### 使用es2015+polyfill(语法+API完全兼容ES6)

> 首先需要安装polyfill 包<br>

> ```
> npm install --save-dev babel-polyfill
> ```

> 安装完polyfill之后需要在文件中导入polyfill<br>
> polyfill 并不是一个插件，所以并不需要修改.babelrc

> ```
> import 'babel-polyfill';
> Array.from('asdfgh');
> var fn=(a,b)=>a+b;
> let [a,b]=[1,2];
> console.log(a,b);
> ```

> 通力想要使用ES7的语法只需要下载并引用相对应的包(后面数字越小越基础)

> - npm install --save-dev babel-preset-stage-0
> - npm install --save-dev babel-preset-stage-1
> - npm install --save-dev babel-preset-stage-2
> - npm install --save-dev babel-preset-stage-3

### gulp+babel 结合使用

> 首先安装对应的两个包gulp 和 gulp对应的包

```
npm install gulp gulp-babel --save-dev
```

> 接下来创建gulp对应的配置文件

> ```
> touch gulpfile.js
> ```

> 接下来在配置文件中引用gulp gulp-babel

```
var gulp=require('gulp'); var babel=require('gulp-babel'); //创建一个名为babel的任务 gulp.task('babel',function(){

return gulp.src('src/*.js')<br>
//因为我们创建的有.babelrc这个文件所以，直接写babel()就好<br>
.pipe(babel()) //如果没有创建对应的配置文件的时候则需要 //在中间写入对应的配置命令<br>
//.pipe(babel({···Code···})) })<br>
.pipe(gulp.dest('build'))<br>
```

> 上面代码的作用

> - 使用gulp创建了一个task(任务)，这个任务名叫babel
> - 先匹配到src 这个目录下面的所有js文件
> - 通过管道流pipe 输出到babel 里面进行编译
> - 然后输出到build中

### 使用gulp配置的时候一定要写一个默认的任务，不然会出错

```
gulp.task('default',['babel']);
```

> 配置package.json 的时候最要使用私有的模块，避免使用全局的模块
