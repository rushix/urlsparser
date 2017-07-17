import { expect } from 'chai';
import Urlsparser from '../src/app.js';

describe('main', () => {
  let up;
  beforeEach(() => {
    up = new Urlsparser('https://login:passwd@sub.domain.xyz:53366/very/long/path/?q1=val1&q2=v2#h1=hv&h2=hv2');
  });

  it('protocol', () => {
    expect(up.protocol).to.equal('https');
  });

  it('auth', () => {
    expect(up.auth).to.deep.equal({ login: 'login', password: 'passwd' });
  });

  it('origin', () => {
    expect(up.origin).to.equal('https://sub.domain.xyz:53366');
  });

  it('host', () => {
    expect(up.host).to.equal('sub.domain.xyz:53366');
  });

  it('hostname', () => {
    expect(up.hostname).to.equal('sub.domain.xyz');
  });

  it('port', () => {
    expect(up.port).to.equal('53366');
  });

  it('path', () => {
    expect(up.path).to.equal('/very/long/path/?q1=val1&q2=v2');
  });

  it('pathname', () => {
    expect(up.pathname).to.equal('/very/long/path/');
  });

  it('search', () => {
    expect(up.search).to.equal('?q1=val1&q2=v2');
  });

  it('query', () => {
    expect(up.query).to.deep.equal({ q1: 'val1', q2: 'v2' });
  });

  it('hash', () => {
    expect(up.hash).to.deep.equal({ h1: 'hv', h2: 'hv2' });
  });

  describe('mutable query', () => {
    it('query add', () => {
      up.queryAdd({ qa: 'added' });
      expect(up.query).to.deep.equal({ q1: 'val1', q2: 'v2', qa: 'added' });
    });

    it('query set', () => {
      up.querySet({ qn: 'brandnew' });
      expect(up.query).to.deep.equal({ qn: 'brandnew' });
    });

    it('query remove', () => {
      up.queryRemove();
      expect(up.query).to.be.an('object').that.is.empty;
    });
  });

  describe('mutable hash', () => {
    it('hash add', () => {
      up.hashAdd({ ha: 'added' });
      expect(up.hash).to.deep.equal({ h1: 'hv', h2: 'hv2', ha: 'added' });
    });

    it('hash set', () => {
      up.hashSet({ hn: 'brandnew' });
      expect(up.hash).to.deep.equal({ hn: 'brandnew' });
    });

    it('hash remove', () => {
      up.hashRemove();
      expect(up.hash).to.be.an('object').that.is.empty;
    });
  });

  describe('build', () => {
    it('built url', () => {
      up.querySet({ qb1: 'b1', qb2: 'b2' });
      up.hashSet({ hb1: 'b1', hb2: 'b2' });

      expect(up.build()).to.equal('https://login:passwd@sub.domain.xyz:53366/very/long/path/?qb1=b1&qb2=b2#hb1=b1&hb2=b2');
    });
  });


});
