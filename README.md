
# 前言

- 开篇两问：
  - 什么是React？：React，用于构建用户界面的 JavaScript 库（官网复制粘贴，真香，不用怎么写template了，舒服
  - 什么是Flask？：一个使用Python编写的轻量级Web应用框架。用来写[云原生应用](https://jimmysong.io/kubernetes-handbook/cloud-native/cloud-native-definition.html)很香！

先看下最终的项目结构，如下：[《项目源码》](https://github.com/yeshan333/React-Flask--Development-Environment)

```bash
├── app.py
├── env
|  ├── Include
|  ├── Lib
|  ├── LICENSE.txt
|  ├── Scripts
|  └── tcl
├── frontend
|  ├── build
|  ├── node_modules
|  ├── package-lock.json
|  ├── package.json
|  ├── public
|  ├── README.md
|  └── src
├── static
|  └── js
└── templates
   └── index.html
```

>开发环境：Windows+Flask+React+Git Bash+vscode

# Backend-Flask

>个人比较喜欢用CLI，So，项目开发依赖使用`virtualenv+pip`管理，[pipenv](https://github.com/pypa/pipenv)也还行，虽然lock package有点久。听说比较新的[poetry](https://github.com/python-poetry/poetry)很香？

```bash
# 1、安装virtualenv
pip install virtualenv
# 2、为项目（Flask_React）创建虚拟环境->env
virtualenv env
# 3、激活虚拟环境env
source env/Scripts/activate
# 4、安装项目依赖
pip install -r requirments.txt
# 5、创建好templates和static目录，用于存放React打包好的渲染模板和静态文件
mkdir templates
mkdir static
```

后端服务的基础环境搭建好了，随手写个路由，看下能不能用先

```python
# app.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "<h1>Hello React+Flask!</h1>"

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
```

![效果.png](https://img.vim-cn.com/03/9b18cb0cd65b8249a0e9069d4845e6d27744af.png)

# Frontend-React

>前端React应用的开发环境使用官方提供的脚手架[create-react-app](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app)搭建。

```bash
# 1、安装脚手架
npm install -g create-react-app
# 2、为Flask_React项目创建React App->frontend
create-react-app frontend # 这里有点小久，喝杯咖啡☕摸下鱼
```
OK，前端开发环境搭建好了，清理掉src目录下的所有文件，自己写个组件，如下：

```bash
cd frontend/src
rm -rf *
touch index.js
```

```js
//index.js
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="center-align">
                    盒装一流弊<br/>
                    <span className="waves-effect waves-light btn">
                        <i className="material-icons right">cloud</i>您说的都对
                    </span>
                </h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

OK，预览下效果，顺便调试（没啥可调试的/(ㄒoㄒ)/~~）。`npm start`。效果如下：

![React App预览效果.png](https://img.vim-cn.com/e5/a82817a8d6d3d240674cef5c65e955b929aba1.png)

没多大问题的话，是时候打包写好的React App给后端服务了。

# Done

很舒服的是[create-react-app](https://create-react-app.dev/docs/deployment)封装好了 Babel 和 webpack，我们可以直接使用`npm run build`打包写好的App到frontend/build目录中。然后手动将生成的文件分别挪到Flask的[templates](https://exploreflask.com/en/latest/templates.html)和[static](https://exploreflask.com/en/latest/static.html)目录中即可。**等等？手动**，能不能使用CLI，dang然阔以。

npm 允许我们在package.json文件里面，使用scripts字段自定义脚本命令。更舒服的是`npm script`提供了`pre`和`post`钩子。我们可以给`build`脚本命令提供两个钩子`prebuild`和`postbuild`。编辑后的`package.json`文件的Script命令如下如下：

```json
  "scripts": {
    "start": "react-scripts start",
    "prebuild": "rm -rf ..\\templates\\index.html && rm -rf ..\\static",
    "build": "react-scripts build",
    "postbuild": "mv build\\index.html ..\\templates\\ &&  mv build\\static ..\\static",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

这时候，我们执行`npm run build`命令时，会自动按照下面的顺序执行

```bash
rm -rf ..\\templates\\index.html && rm -rf ..\\static
react-scripts build
mv build\\index.html ..\\templates\\ &&  mv build\\static ..\\static
```

OK，我们试试。如下：

![示范.gif](https://img.vim-cn.com/a1/be51d238380ead4e8c6d6b6fba6eb0bbe55c5e.gif)

Nice，没毛病。🎉🎉🎉。改下`app.py`:

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # 渲染打包好的React App的页面

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
```

![效果.png](https://img.vim-cn.com/06/aa0b2dc80df8c8bfc021e57a93981fe07acc02.png)

**冇问题啊！收工！！！**

# References

- [React Docs](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html#create-react-app)
- [Create React App](https://create-react-app.dev/docs/documentation-intro)
- [npm-scripts](https://docs.npmjs.com/misc/scripts)
- [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)