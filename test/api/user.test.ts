'use strict';

import app from '../../src/app';
import { expect } from 'chai';
import * as request from 'supertest';
import * as HTTPStatus from 'http-status-codes';
import * as lang from '../../src/utils/lang';

describe('User API is working', () => {
  let userId: number;
  let name: string;
  let email: string;
  let password: string;
  let user: {};

  before(() => {
    name = 'Georges Cosson';
    email = 'gcosson@example.com';
    password = 'somepassword';
    user = { name, email, password };
  });

  it('should create new user', (done) => {
    request(app)
      .post('/api/users/create')
      .send(user)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        const { body } = res;
        expect(body).to.have.all.keys(
          '__v',
          '_id',
          'name',
          'email',
          'createdAt',
          'password',
        );
        expect(body.name).to.equal(name);
        expect(body.email).to.equal(email);
        expect(body.password).to.equal(password);
        done();
        userId = body._id;
      });
  });

  it('should fail when trying to create user with same email', (done) => {
    request(app)
      .post('/api/users/create')
      .send(user)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
        const { body } = res;
        expect(body).to.have.property('error');
        expect(body.error.code).to.equal(HTTPStatus.BAD_REQUEST);
        expect(body.error.message).to.equal(lang.EMAIL_ALREADY_TAKEN);
        done();
      });
  });

  it('should return recently created user info', (done) => {
    request(app)
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.all.keys(
          '__v',
          '_id',
          'name',
          'email',
          'createdAt',
          'password',
        );
        expect(body.name).to.equal(name);
        expect(body.email).to.equal(email);
        done();
      });
  });
/*
  it('should fail when user not found', done => {
    request(app)
      .get('/api/users/0')
      .send(user)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.NOT_FOUND);
        expect(res.body).to.have.property('error');
        expect(res.body.error.code).to.equal(HTTPStatus.NOT_FOUND);
        expect(res.body.error.message).to.equal(lang.userNotFound);
        done();
      });
  });

  it('should return users list', done => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.all.keys(
          'id',
          'name',
          'email',
          'updated_at',
          'created_at'
        );
        done();
      });
  });*/
});
