console.log('Loading a web page');
var loadInProgress = false;
var system = require('system');
var page = require('webpage').create();

var url = system.args[1];

page.settings.javascriptEnabled = true;
page.settings.loadImages = false;
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

page.onLoadStarted = function () {
  loadInProgress = true;
  console.log('Loading started');
};
page.onLoadFinished = function () {
  loadInProgress = false;
  console.log('Loading finished');
};
page.onConsoleMessage = function (msg) {
  console.log('console', msg);
};

var openPage = function () {
  console.log('open', url);
  loadInProgress = true;
  page.open(url, function (status) {
    console.log(status);
    console.log(page.content);
  });
};

var login = function () {
  console.log('login');
  loadInProgress = true;
  page.evaluate(function () {
    document.getElementById("login-email").value="username";
    document.getElementById("login-password").value="password";
    document.getElementById("login-form").submit();
  });
};

var result = function () {
  console.log('result');
  page.evaluate(function (status) {
		console.log(document.querySelectorAll('html')[0].outerHTML);
	});
};

var steps = [openPage, login, result];
var i = 0;
setInterval(function () {
  if (loadInProgress === false && typeof steps[i] === "function") {
    console.log('i', i);
    steps[i]();
    i++;
  }
  if (loadInProgress === false && typeof steps[i] !== "function") {
    console.log('i', i);
    console.log('test complete!');
    phantom.exit();
  }
}, 200);
