var loadInProgress = false;
var system = require('system');
var page = require('webpage').create();


var username = system.args[1];
var password = system.args[2];
var url = system.args[3];
var homeUrl = system.args[4];
var tokenUrl = system.args[5];
var qty = system.args[6];

page.settings.javascriptEnabled = true;
page.settings.loadImages = false;
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

page.onLoadStarted = function () {
  loadInProgress = true;
};
page.onLoadFinished = function () {
  loadInProgress = false;
};
page.onConsoleMessage = function (msg) {
  console.log('console', msg);
};
page.onError = function (msg) {
  console.log('error', msg);
  phantom.exit(1);
};

var openPage = function (d) {
  loadInProgress = true;
  page.open(url, function (status) {
    // console.log('login form',status);
  });
};
var homePage = function () {
  loadInProgress = true;
  page.open(homeUrl, function (status) {
    // console.log('homepage', status, page.title);
  });
};
var getToken = function () {
  loadInProgress = true;
  page.open(tokenUrl, function (status) {
    // console.log('tokenUrl', status, page.title);
  });
};


var login = function () {
  loadInProgress = true;
  page.evaluate(function (username, password) {
    document.getElementById('username').value=username;
    document.getElementById('password').value=password;
    document.getElementById('logInForm').submit();
  }, username, password);
};

var wait = function () {
  loadInProgress = true;
  return page.evaluate(function () {
    // console.log('page loaded', document.title);
    return false;
  });
};


var result = function () {
  return page.evaluate(function () {
    return document.querySelector('body > pre').innerHTML;
  });
};

var createSteps = function (qty) {
  var steps = [openPage, login, wait, homePage, wait];
  var n = 0;
  while (n < qty) {
    steps.push(getToken);
    steps.push(result);
    n++;
  }
  return steps;
};


var steps = createSteps(qty);
var i = 0;
var tokens = [];
setInterval(function () {
  // console.log('step', i, 'loadInProgress', loadInProgress);
  if (loadInProgress === false && typeof steps[i] === 'function') {
    if (steps[i] === result) {
      tokens.push(steps[i]());
    } else if (steps[i] === wait){
      loadInProgress = steps[i]();
    } else {
      steps[i]();
    }
    i++;
  }
  if (loadInProgress === false && typeof steps[i] !== 'function') {
    console.log(JSON.stringify(tokens));
    phantom.exit();
  }
}, 20);
