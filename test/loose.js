import { expect } from 'chai';
import Urlsparser from '../src/app.js';

describe('loose', () => {
  const up = new Urlsparser('http://simple.org/easy/path');

  it('protocol', () => {
    expect(up.protocol).to.be.empty;
  });

  it('auth', () => {
    expect(up.auth).to.be.an('object').that.is.empty;
  });

  it('origin', () => {
    expect(up.origin).it.equals('http://simple.org');
  });

  it('host', () => {
    expect(up.host).it.equals('simple.org');
  });

  it('hostname', () => {
    expect(up.hostname).it.equals('simple.org');
  });

  it('port', () => {
    expect(up.port).to.be.empty;
  });

  it('path', () => {
    expect(up.path).it.equals('/easy/path');
  });

  it('pathname', () => {
    expect(up.pathname).it.equals('/easy/path');
  });

  it('search', () => {
    expect(up.search).to.be.empty;
  });

  it('query', () => {
    expect(up.query).to.be.an('object').that.is.empty;
  });

  it('hash', () => {
    expect(up.hash).to.be.an('object').that.is.empty;
  });

  describe('mutable query', () => {
    up.queryAdd({ qa: 'added' });

    it('query add', () => {
      expect(up.query).it.equals({ qa: 'added' });
    });
  });

  describe('mutable hash', () => {
    up.hashAdd({ ha: 'added' });

    it('hash add', () => {
      expect(up.hash).it.equals({ ha: 'added' });
    });
  });

  describe('build', () => {

    it('built url', () => {
      expect(up.build()).it.equals('http://simple.org/easy/path?qa=added#ha=added');
    });
  });


});
