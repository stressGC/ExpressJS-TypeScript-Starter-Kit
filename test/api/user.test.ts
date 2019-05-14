'use strict';

import app from '../../src/app';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import * as HTTPStatus from 'http-status-codes';
import * as lang from '../../src/utils/lang';

const randomNumber = Math.floor(Math.random() * 1000) + 1;

describe('User API is working', () => {
  let userId: string;
  let name: string;
  let email: string;
  let password: string;
  let user: {};

  before(() => {
    name = 'Georges Cosson';
    email = `gcosson${randomNumber}@example.com`;
    password = 'somepassword';
    user = { name, email, password };
  });

  /**
   * USER CREATION
   **/

  it('should create new user', (done) => {
    request(app)
      .post('/api/users/create')
      .send(user)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        const { body } = res;
        expect(body).to.have.all.keys(
          '_id',
          'name',
          'email',
          'createdAt',
        );
        expect(body).not.to.have.any.keys(
          '__v',
          'password',
        );
        expect(body.name).to.equal(name);
        expect(body.email).to.equal(email);
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

  it('should fail when passing invalid body', (done) => {
    request(app)
      .post('/api/users/create')
      .send({ name: 'correctName', email:'incorrect@mail', password: 'correctPassword' })
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
        const { body } = res;
        expect(body).to.have.property('error');
        expect(body.error.code).to.equal(HTTPStatus.BAD_REQUEST);
        expect(body.error.data[0].msg).to.equal(lang.fieldInvalid('email'));
        done();
      });
  });

  it('should fail when passing incomplete body', (done) => {
    request(app)
      .post('/api/users/create')
      .send({ name: 'correctName', wrongKey: 'email@some.com', password: 'correctPassword' })
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
        const { body } = res;
        expect(body).to.have.property('error');
        expect(body.error.code).to.equal(HTTPStatus.BAD_REQUEST);
        expect(body.error.data[0].msg).to.equal(lang.fieldMissing('email'));
        done();
      });
  });

  /**
   * USER GET
   **/

  it('should return recently created user info', (done) => {
    request(app)
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body).to.have.all.keys(
          '_id',
          'name',
          'email',
          'createdAt',
        );
        expect(body).not.to.have.any.keys(
          '__v',
          'password',
        );
        expect(body.name).to.equal(name);
        expect(body.email).to.equal(email);
        done();
      });
  });

  it('should fail when user not found', (done) => {
    const randomValidMongoID = '5cd8e8437bcac443f85d358a';
    request(app)
      .get(`/api/users/${randomValidMongoID}`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.NOT_FOUND);
        const { body } = res;
        expect(body).to.have.property('error');
        expect(body.error.code).to.equal(HTTPStatus.NOT_FOUND);
        expect(body.error.message).to.equal(lang.RESSOURCE_NOT_FOUND);
        done();
      });
  });

  it('should fail when invalid MongoID is provided', (done) => {
    const randomInvalidMongoID = '5cd8e8437bcac443';
    request(app)
      .get(`/api/users/${randomInvalidMongoID}`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
        const { body } = res;
        expect(body).to.have.property('error');
        expect(body.error.code).to.equal(HTTPStatus.BAD_REQUEST);
        expect(body.error.message).to.equal(HTTPStatus.getStatusText(HTTPStatus.BAD_REQUEST));
        done();
      });
  });

  it('should return users list', (done) => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(HTTPStatus.OK);
        const { body } = res;
        expect(body).to.be.an('array');
        expect(body[0]).to.have.all.keys(
          '_id',
          'name',
          'email',
          'createdAt',
        );
        expect(body[0]).not.to.have.any.keys(
          '__v',
          'password',
        );
        done();
      });
  });

  /**
    * USER MODIFICATION
    **/

  it('should update user', (done) => {
    const newName = 'someNewName';
    request(app)
      .put(`/api/users/${userId}`)
      .send({ name: newName })
      .end((err, res) => {
        expect(err).to.equal(null);
        const { status, body } = res;
        expect(status).to.equal(HTTPStatus.OK);
        expect(body).to.have.all.keys(
          '_id',
          'name',
          'email',
          'createdAt',
        );
        expect(body).not.to.have.any.keys(
          '__v',
          'password',
        );
        expect(body._id).to.equal(userId);
        expect(body.name).to.equal(newName);
        done();
      });
  });

  it('should fail when passing empty body', (done) => {
    request(app)
      .put(`/api/users/${userId}`)
      .send({ wrongKey: 'w/e value' })
      .end((err, res) => {
        expect(err).to.equal(null);
        const { body, status } = res;
        expect(status).to.equal(HTTPStatus.BAD_REQUEST);
        expect(body).to.have.property('error');
        expect(body.error.code).to.equal(HTTPStatus.BAD_REQUEST);
        expect(body.error.data[0].msg).to.equal(lang.EMPTY_BODY);
        done();
      });
  });

  /**
    * USER DELETION
    **/
  it('should delete user', (done) => {
    request(app)
      .delete(`/api/users/${userId}`)
      .end((err, res) => {
        /* deletion returns correct informations */
        expect(err).to.equal(null);
        const { status, body } = res;
        expect(status).to.equal(HTTPStatus.OK);
        expect(body._id).to.be.equal(userId);
        expect(body).to.have.all.keys(
          '_id',
          'name',
          'email',
          'createdAt',
        );
        expect(body).not.to.have.any.keys(
          '__v',
          'password',
        );
        /* and the user has been successfully deleted */
        request(app)
          .get(`/api/users/${userId}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            const { status, body } = res;
            expect(status).to.equal(HTTPStatus.NOT_FOUND);
            expect(body).to.have.property('error');
            expect(body.error.code).to.equal(HTTPStatus.NOT_FOUND);
            expect(body.error.message).to.equal(lang.RESSOURCE_NOT_FOUND);
            done();
          });
      });
  });
});
