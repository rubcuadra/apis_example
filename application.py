#!/usr/bin/python
from flask import render_template, Flask , send_from_directory, url_for
from os import environ

app = Flask(__name__)

#FOR STATICS; TEMPORAL
@app.route('/scripts/<path:path>') 
def send_js(path):return send_from_directory('scripts', path)

@app.route('/')
def root():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(host='0.0.0.0',port=8000,debug=True)