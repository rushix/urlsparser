'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parseRaw = function parseRaw(raw) {
  return raw.split('&').reduce(function (acc, pair) {
    var _pair$split = pair.split('='),
        _pair$split2 = _slicedToArray(_pair$split, 2),
        key = _pair$split2[0],
        value = _pair$split2[1];

    acc[key] = value;

    return acc;
  }, {});
};

var composeParams = function composeParams(prefix, params) {
  var pairs = Object.entries(params).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    acc.push(key + '=' + value);

    return acc;
  }, []);

  return pairs.length ? '' + prefix + pairs.join('&') : '';
};

var _class = function () {
  function _class(url) {
    _classCallCheck(this, _class);

    var pattern = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/g;
    var matches = pattern.exec(url);

    var _matches = _slicedToArray(matches, 14),
        href = _matches[0],
        protocol = _matches[1],
        auth = _matches[3],
        login = _matches[4],
        password = _matches[5],
        hostname = _matches[6],
        port = _matches[7],
        path = _matches[8],
        pathname = _matches[9],
        rawQuery = _matches[12],
        rawHash = _matches[13];

    if (!hostname) {
      throw new Error('hostname is expected');
    }

    this.href = href;
    this.protocol = protocol;
    this.rawAuth = auth;
    this.auth = auth ? { login: login, password: password } : {};
    this.hostname = hostname;
    this.port = port;
    this.host = '' + this.hostname + (this.port ? ':' + this.port : '');
    this.origin = '' + (this.protocol ? this.protocol + '://' : '') + this.host;
    this.pathname = pathname;
    this.path = '' + (this.pathname ? this.pathname : '') + (rawQuery ? '?' + rawQuery : '');
    this.search = '?' + (rawQuery ? rawQuery : '');

    this.query = !rawQuery ? {} : parseRaw(rawQuery);
    this.hash = !rawHash ? {} : parseRaw(rawHash);
  }

  _createClass(_class, [{
    key: 'queryAdd',
    value: function queryAdd(additionalQueries) {
      this.query = Object.assign(this.query, additionalQueries);
    }
  }, {
    key: 'querySet',
    value: function querySet(queries) {
      this.query = queries;
    }
  }, {
    key: 'queryRemove',
    value: function queryRemove() {
      this.query = {};
    }
  }, {
    key: 'hashAdd',
    value: function hashAdd(additionalHashes) {
      this.hash = Object.assign(this.hash, additionalHashes);
    }
  }, {
    key: 'hashSet',
    value: function hashSet(hashes) {
      this.hash = hashes;
    }
  }, {
    key: 'hashRemove',
    value: function hashRemove() {
      this.hash = {};
    }
  }, {
    key: 'build',
    value: function build() {
      var url = '';

      if (this.protocol) {
        url = '' + this.protocol + url + '://';
      }

      if (this.rawAuth) {
        url = '' + url + this.auth.login + ':' + this.auth.password + '@';
      }

      url = '' + url + this.host;

      if (this.pathname) {
        url = '' + url + this.pathname;
      }

      url = '' + url + composeParams('?', this.query);
      url = '' + url + composeParams('#', this.hash);

      return url;
    }
  }]);

  return _class;
}();

exports.default = _class;
