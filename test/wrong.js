import { expect } from 'chai';
import Urlsparser from '../src/app.js';

describe('wrong', () => {

  it('...', () => {
    const caps = () => {new Urlsparser('...')};
    expect(caps).to.throw();
  });

  it('+++abs+', () => {
    const caps = () => {new Urlsparser('+++abs+')};
    expect(caps).to.throw();
  });

  it('0:5:92', () => {
    const caps = () => {new Urlsparser('0:5:92')};
    expect(caps).to.throw();
  });

});
