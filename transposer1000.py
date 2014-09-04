import os, re, urllib, json
from flask import Flask, redirect, render_template, send_from_directory, request, jsonify
from jinja2 import Environment, PackageLoader
from datetime import datetime
from random import choice
from PIL import Image, ImageFilter
import base64, random
from io import BytesIO

app = Flask(__name__)
app.config['DEBUG'] = True

def isPrime(x):
    if x<2:
        return False
    for i in range(2,x):
        if not x%i:
           return False
    return True

def doesItPass(x):
	random_int = random.randint(1, x)
	if x % random_int is 0:
		return True
	else:
		return False

def imgTranspose(im):
	max_size = min(im.size[0], im.size[1])

	for i in xrange(1, max_size, 1):
#		if isPrime(i):
		if doesItPass(i):
			box = (0, i, im.size[0], im.size[1])
			region = im.crop(box)

			region = region.transpose(Image.ROTATE_180)
			if doesItPass(random.randint(1, max_size)):
				region = region.filter(ImageFilter.DETAIL)

			region = region.point(lambda i: i)

			im.paste(region, box)
	return im

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')

@app.route('/service', methods=['POST'])
def service():
	#from pprint import pprint
	info = jsonify(request.get_json(force=True))
	image_data = request.json['content']['data']
	image_data = [x.strip() for x in image_data.split(',')]

	blank_meta = {
		"audio": {
			"type": False,
			"data": False
		}
	}

	image_meta = request.json.get('meta', blank_meta)
#	image_meta = request.json['meta']
	im = Image.open(BytesIO(base64.b64decode(image_data[1])))
	im = im.convert("RGBA")

	#pprint (im.format, im.size, im.mode)
	#pprint (im.size[0])
	#pprint (im.size[1])

	im = imgTranspose(im)
	#im.show()

	import cStringIO
	f = cStringIO.StringIO()

	im.save(f, "JPEG")
	content = f.getvalue()
	f.close()
	transposed_image = image_data[0] + "," + content.encode("base64").replace("\n", "")
	transposed = {}
	transposed["content"] = {
		"data": transposed_image
	}

	if (image_meta):
		transposed["meta"] = image_meta
	else:
		transposed["meta"] = {
			"audio": {
				"type": False,
				"data": False
			}
		}

	return jsonify(transposed)

if __name__ == '__main__':
	app.run()
