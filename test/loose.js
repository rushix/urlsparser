import { expect } from 'chai';
import Urlsparser from '../src/app.js';

describe('loose', () => {
  let up;
  beforeEach(() => {
    up = new Urlsparser('http://simple.org/easy/path');
  });

  it('protocol', () => {
    expect(up.protocol).to.equal('http');
  });

  it('auth', () => {
    expect(up.auth).to.be.an('object').that.is.empty;
  });

  it('origin', () => {
    expect(up.origin).to.equal('http://simple.org');
  });

  it('host', () => {
    expect(up.host).to.equal('simple.org');
  });

  it('hostname', () => {
    expect(up.hostname).to.equal('simple.org');
  });

  it('port', () => {
    expect(up.port).to.be.undefined;
  });

  it('path', () => {
    expect(up.path).to.equal('/easy/path');
  });

  it('pathname', () => {
    expect(up.pathname).to.equal('/easy/path');
  });

  it('search', () => {
    expect(up.search).to.equal('?');
  });

  it('query', () => {
    expect(up.query).to.be.an('object').that.is.empty;
  });

  it('hash', () => {
    expect(up.hash).to.be.an('object').that.is.empty;
  });

  describe('mutable query', () => {
    it('query add', () => {
      up.queryAdd({ qa: 'added' });
      expect(up.query).to.deep.equal({ qa: 'added' });
    });
  });

  describe('mutable hash', () => {
    it('hash add', () => {
      up.hashAdd({ ha: 'added' });
      expect(up.hash).to.deep.equal({ ha: 'added' });
    });
  });

  describe('build', () => {

    it('built url', () => {
      up.queryAdd({ qa: 'added' });
      up.hashAdd({ ha: 'added' });
      expect(up.build()).to.equal('http://simple.org/easy/path?qa=added#ha=added');
    });
  });


});
