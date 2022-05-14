import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import casual from 'casual';
import server from '../index';

chai.use(chaiHttp);

describe('API testing', () => {
  const email = casual.email;
  const password = casual.password;
  const full_name = casual.name;

  let userId, postId, answerId;

  const title = casual.word;
  const body = casual.description;
  const tags = ['python', 'javascript'];
  const approved = false;

  it('Checks Register API and returns status code', (done) => {
    chai.request(server)
      .post('/api/auth/register')
      .send({
        full_name,
        email,
        password,
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('full_name');
        expect(res.body).to.have.property('email');
        expect(res.body.full_name).to.equal(full_name);
        expect(res.body.email).to.equal(email);
        done();
      });
  });

  it('Checks Login API and returns status code', (done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({
        email,
        password,
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('id');
        userId = res.body.user.id;
        done();
      });
  });

  it('Checks Create posts API and returns status code', (done) => {
    chai.request(server)
      .post('/api/posts')
      .send({
        title,
        body,
        tags,
        ownerId: userId,
        approved,
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('body');
        expect(res.body).to.have.property('tags');
        expect(res.body).to.have.property('ownerId');
        expect(res.body).to.have.property('approved');
        expect(res.body).to.have.property('answers');
        expect(res.body.title).to.equal(title);
        expect(res.body.body).to.equal(body);
        expect(res.body.tags).to.deep.equal(tags);
        expect(res.body.ownerId).to.equal(userId);
        expect(res.body.approved).to.equal(approved);
        postId = res.body._id;
        done();
      });
  });

  it('Checks Get all interesting posts API and returns status code', (done) => {
    chai.request(server)
      .get('/api/posts/getInteresting')
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        res.body.forEach(element => {
          expect(element.post).to.have.property('_id');
          expect(element.post).to.have.property('title');
          expect(element.post).to.have.property('body');
          expect(element.post).to.have.property('tags');
          expect(element.post).to.have.property('ownerId');
          expect(element.post).to.have.property('approved');
          expect(element.post).to.have.property('answers');
        });
        done();
      });
  });

  it('Checks posts answer API and returns status code', (done) => {
    chai.request(server)
      .post('/api/posts/answer')
      .send({
        questionId: postId,
        body: casual.description,
        ownerId: userId
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  it('Checks Get single posts API and returns status code', (done) => {
    chai.request(server)
      .get(`/api/posts/${postId}`)
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('body');
        expect(res.body).to.have.property('tags');
        expect(res.body).to.have.property('approved');
        expect(res.body).to.have.property('ownerId');
        expect(res.body).to.have.property('answers');
        expect(res.body.title).to.equal(title);
        expect(res.body.body).to.equal(body);
        expect(res.body.tags).to.deep.equal(tags);
        expect(res.body.approved).to.equal(approved);
        expect(res.body.ownerId).to.equal(userId);
        answerId = res.body.answers[0].id;
        done();
      });
  });

  it('Checks posts comment API and returns status code', (done) => {
    chai.request(server)
      .post('/api/posts/comment')
      .send({
        parentId: postId,
        comment: casual.description,
        userId,
        userName: full_name
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  it('Checks posts vote API and returns status code', (done) => {
    chai.request(server)
      .post('/api/posts/voteQuestion')
      .send({
        questionId: postId,
        userId,
        value: 5
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  it('Checks mark posts accepted API and returns status code', (done) => {
    chai.request(server)
      .post('/api/posts/markAccepted')
      .send({
        questionId: postId,
        userId,
        answerId,
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        done();
      });
  });

  it('Checks posts bookmark API and returns status code', (done) => {
    chai.request(server)
      .post('/api/user/bookmark')
      .send({
        postId,
        userId,
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(200);
        done();
      });
  });
});