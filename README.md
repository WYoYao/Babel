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

# 29：27 <http://www.zhufengpeixun.cn/course/31/learn#lesson/771>
