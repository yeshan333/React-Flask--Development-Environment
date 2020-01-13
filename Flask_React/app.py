from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')  # 渲染打包好的React App的页面

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)