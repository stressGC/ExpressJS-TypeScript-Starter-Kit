'use strict';

import app from '../../src/app';
import { expect } from 'chai';
import * as request from 'supertest';
import * as HTTPStatus from 'http-status-codes';

describe('Test global API behavior', () => {
  it('should return 404', (done) => {
    const randomPath = 'trfgyhujikol';
    request(app)
      .get(randomPath)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.NOT_FOUND);
        done();
      });
  });
});
