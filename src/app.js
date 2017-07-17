const parseRaw = raw => {
  return raw.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    acc[key] = value;

    return acc;
  }, {});
}

export default class {
  constructor(url) {
    const pattern = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/g;
    const matches = pattern.exec(url);
    
    const [href, protocol, , auth, login, password, hostname, port, path, pathname, , , rawQuery, rawHash] = matches;
    console.log(href, protocol, auth, login, password, hostname, port, path, pathname, rawQuery, rawHash);
    console.log(matches);

    if (!hostname) {
      throw(new Error('hostname is expected'));
    }

    this.href = href;
    this.protocol = protocol;
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

  queryAdd() {}
  querySet() {}
  queryRemove() {}
  hashAdd() {}
  hashSet() {}
  hashRemove() {}
  build() {}
}
