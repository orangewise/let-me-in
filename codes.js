console.log('Loading a web page');
var loadInProgress = false;
var system = require('system');
var page = require('webpage').create();

var username = system.args[1];
var password = system.args[2];
var url = system.args[3];
var homeUrl = system.args[4];
var tokenUrl = system.args[5];

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
page.onError = function (msg) {
  console.log('error', msg);
  phantom.exit(1);
};

var openPage = function () {
  console.log('open', url);
  loadInProgress = true;
  page.open(url, function (status) {
    console.log('login form',status);
  });
};
var homePage = function () {
  console.log('open', homeUrl);
  loadInProgress = true;
  page.open(homeUrl, function (status) {
    console.log('homepage', status, page.title);
  });
};
var getToken = function () {
  console.log('token', tokenUrl);
  loadInProgress = true;
  page.open(tokenUrl, function (status) {
    console.log('tokenUrl', status, page.title);
  });
};


var login = function () {
  console.log('submit login form');
  loadInProgress = true;
  page.evaluate(function (username, password) {
    document.getElementById("username").value=username;
    document.getElementById("password").value=password;
    document.getElementById("logInForm").submit();
  }, username, password);
};

var result = function (cb) {
  console.log('result');
  page.evaluate(function (cb) {
    console.log(document.title);
    var t = document.querySelector('body > pre').innerHTML;
    return cb(null, t);
  }, cb);
};

var steps = [openPage, login, homePage, getToken, result];
var i = 0;
var tokens = [];
var loop = setInterval(function () {
  if (loadInProgress === false && typeof steps[i] === "function") {
    if (steps[i] === result) {
      steps[i](function (e, r) {
        console.log(r);
   	//console.log(tokens);
        //tokens.push(r); 
      });
    } else {
      steps[i]();
    } 
    i++;
  }
  if (loadInProgress === false && typeof steps[i] !== "function") {
    console.log('Finished:', tokens);
    phantom.exit();
  }
}, 20);
