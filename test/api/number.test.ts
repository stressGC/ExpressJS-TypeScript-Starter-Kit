'use strict';

import app from '../../src/app';
import { expect } from 'chai';
import * as request from 'supertest';
import * as HTTPStatus from 'http-status-codes';

describe('test number routes', () => {
  it('should return the same number', (done) => {
    const dummyNumber = 56;
    request(app)
      .get(`/api/numbers/${dummyNumber}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(HTTPStatus.OK);

        const { result } = res.body;
        expect(Number(result)).to.equal(dummyNumber);
        done();
      });
  });
});
