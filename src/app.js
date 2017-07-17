const parseRaw = raw => {
  return raw.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    acc[key] = value;

    return acc;
  }, {});
}

const composeParams = (prefix, params) => {
  const pairs = Object.entries(params).reduce((acc, [key, value]) => {
    acc.push(`${ key }=${ value }`);

    return acc;
  }, []);

  return pairs.length ? `${ prefix }${ pairs.join('&') }` : '';
}

export default class {
  constructor(url) {
    const pattern = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/g;
    const matches = pattern.exec(url);
    const [href, protocol, , auth, login, password, hostname, port, path, pathname, , , rawQuery, rawHash] = matches;

    if (!hostname) {
      throw new Error('hostname is expected');
    }

    this.href = href;
    this.protocol = protocol;
    this.rawAuth = auth;
    this.auth = auth ? { login, password } : {};
    this.hostname = hostname;
    this.port = port;
    this.host = `${ this.hostname }${ this.port ? `:${ this.port }` : '' }`;
    this.origin = `${ this.protocol ? `${ this.protocol }:\/\/` : '' }${ this.host }`;
    this.pathname = pathname;
    this.path = `${ this.pathname ? this.pathname : '' }${ rawQuery ? `?${ rawQuery }` : '' }`;
    this.search = `?${ rawQuery ? rawQuery : '' }`;

    this.query = !rawQuery ? {} : parseRaw(rawQuery);
    this.hash = !rawHash ? {} : parseRaw(rawHash);
  }

  queryAdd(additionalQueries) {
    this.query = Object.assign(this.query, additionalQueries);
  }

  querySet(queries) {
    this.query = queries;
  }

  queryRemove() {
    this.query = {};
  }

  hashAdd(additionalHashes) {
    this.hash = Object.assign(this.hash, additionalHashes);
  }

  hashSet(hashes) {
    this.hash = hashes;
  }

  hashRemove() {
    this.hash = {};
  }

  build() {
    let url = '';

    if (this.protocol) {
      url = `${ this.protocol }${ url }:\/\/`;
    }

    if (this.rawAuth) {
      url = `${ url }${ this.auth.login }:${ this.auth.password }@`;
    }

    url = `${ url }${ this.host }`;

    if (this.pathname) {
      url = `${ url }${ this.pathname }`;
    }

    url = `${ url }${ composeParams('?', this.query) }`;
    url = `${ url }${ composeParams('#', this.hash) }`;

    return url;
  }
}
