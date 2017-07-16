import { expect } from 'chai';
import Urlsparser from '../src/app.js';

describe('main', () => {
  const up = new Urlsparser('https://login:passwd@sub.domain.xyz:53366/very/long/path/?q1=val1&q2=v2#h1=hv&h2=hv2');

  it('protocol', () => {
    expect(up.protocol).it.equals('https');
  });

  it('auth', () => {
    expect(up.auth).it.equals({ login: 'login', password: 'passwd' });
  });

  it('origin', () => {
    expect(up.origin).it.equals('https://sub.domain.xyz:53366');
  });

  it('host', () => {
    expect(up.host).it.equals('sub.domain.xyz:53366');
  });

  it('hostname', () => {
    expect(up.hostname).it.equals('sub.domain.xyz');
  });

  it('port', () => {
    expect(up.port).it.equals('53366');
  });

  it('path', () => {
    expect(up.path).it.equals('/very/long/path/?q1=val1&q2=v2');
  });

  it('pathname', () => {
    expect(up.pathname).it.equals('/very/long/path/');
  });

  it('search', () => {
    expect(up.search).it.equals('?q1=val1&q2=v2');
  });

  it('query', () => {
    expect(up.query).it.equals({ q1: 'val1', q2: 'v2' });
  });

  it('hash', () => {
    expect(up.hash).it.equals({ h1: 'hv', h2: 'hv2' });
  });

  describe('mutable query', () => {
    up.queryAdd({ qa: 'added' });

    it('query add', () => {
      expect(up.query).it.equals({ q1: 'val1', q2: 'v2', qa: 'added' });
    });

    up.querySet({ qn: 'brandnew' });

    it('query set', () => {
      expect(up.query).it.equals({ qn: 'brandnew' });
    });

    up.queryRemove();

    it('query remove', () => {
      expect(up.query).to.be.an('object').that.is.empty;
    });
  });

  describe('mutable hash', () => {
    up.hashAdd({ ha: 'added' });

    it('hash add', () => {
      expect(up.hash).it.equals({ h1: 'hv', h2: 'hv2', ha: 'added' });
    });

    up.hashSet({ hn: 'brandnew' });

    it('hash set', () => {
      expect(up.hash).it.equals({ hn: 'brandnew' });
    });

    up.hashRemove();

    it('hash remove', () => {
      expect(up.hash).to.be.an('object').that.is.empty;
    });
  });

  describe('build', () => {
    up.querySet({ qb1: 'b1', qb2: 'b2' });
    up.hashSet({ hb1: 'b1', hb2: 'b2' });

    it('built url', () => {
      expect(up.build()).it.equals('https://login:passwd@sub.domain.xyz:53366/very/long/path/?qb1=b1&qb2=b2#hb1=b1&hb2=b2');
    });
  });


});
