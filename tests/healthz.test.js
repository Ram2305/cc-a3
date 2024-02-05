const request = require('supertest');
const express = require('express');
const healthzRoute = require('../api-routes/routes/healthz');

const app = express();
app.use(express.json());
app.use('/healthz', healthzRoute);

describe('GET /healthz', () => {
  it('should respond with 200 OK when there is no payload and no query parameters', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
  });

  it('should respond with 400 Bad Request when there is a payload', async () => {
    const response = await request(app)
      .get('/healthz')
      .send({ key: 'value' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: '400 Bad Request (payloads not allowed for healthz) ' });
  });

  it('should respond with 400 Bad Request when there are query parameters', async () => {
    const response = await request(app).get('/healthz?param=value');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: '400 Bad Request : Query parameters not allowed for healthz' });
  });

});

describe('Other HTTP Methods for /healthz', () => {
  const otherMethods = ['post', 'put', 'delete', 'patch'];

  otherMethods.forEach((method) => {
    it(`should respond with 405 Method Not Allowed for ${method.toUpperCase()} request`, async () => {
      const response = await request(app)[method]('/healthz');
      expect(response.status).toBe(405);
      expect(response.body).toEqual({ error: '405 Method Not Allowed' });
    });
  });
});
