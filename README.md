Transposer 1000
==============

**Transposer 1000** is a service for [revisit.link](http://revisit.link/ "revisit.link"). See [the revisit.link specs](http://revisit.link/spec.html) for technical details.

**Transposer 1000** slices the image and turns some of the slices upside down. For good measure, it also applies a little bit of noise to the flipped slices.

An example output is below:

![Example](https://raw.githubusercontent.com/fourtonfish/transposer1000/master/example.jpg "Example")

You can preview the service on this [test page](http://fourtonfish.com/imgapi/transposer1000/). The test page is in a more of a proof-of-concept state; only upload via drag and drop is supported and the page has been tested only in Chrome and Firefox on Ubuntu.

Running localy
--------------

**Transposer 1000** is built with Python and Flask, unlike [most revisit.link services](https://github.com/revisitors/revisit.link.hub/blob/master/config/services.json) which I believe are node.js-based.

Make sure you install all the dependencies: [Flask](http://flask.pocoo.org/), of course, plus the content of *requirements.txt*.

```shell
pip install -r requirements.txt --no-index
```

For the test page, I am using [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) (with a few plugins):

```shell
sudo npm install --save-dev
```

So to run everything, simply do (in two separate terminal windows/tabs):

```shell
python transposer1000.py
```
and
```shell
gulp
```

The Flask script will run at localhost:5000 and will be proxied to localhost:3000 with the browser-sync gulp.js plugin, which will also automatically open and reload the test page.

If this is too complicated, have a look at [this repo](https://github.com/rozap/sweg.revisit) for another Flask-based revisit.link service blueprint. Chris, the author, also made [a very useful testing script](https://github.com/revisitors/revisit-test-util).

You can always ask me for help at [stefan@fourtonfish.com](mailto:stefan@fourtonfish.com) or [on Twitter](https://twitter.com/fourtonfish).
