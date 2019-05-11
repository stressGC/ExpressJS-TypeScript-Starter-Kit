'use strict';

import app from '../../src/app';
import { expect } from 'chai';
import * as request from 'supertest';
import * as HTTPStatus from 'http-status-codes';

describe('test global API behavior', () => {
  it('should return 404 if no path matched', (done) => {
    const randomPath = '/somerandompath';
    request(app)
      .get(randomPath)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(HTTPStatus.NOT_FOUND);
        done();
      });
  });
});
