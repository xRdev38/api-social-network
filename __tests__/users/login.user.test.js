const app = require('../../index')
const User = require('../../controllers/users')
const UserModel = require('../../models/user')
const mockedBcrypt = require('../__mocks__/bcrypt')
const mockedUser = require('../__mocks__/user')
const request = require('supertest')
const mockUser  = require("../fixtures/users.fixture")

describe('POST /users/login', () => {
    test('authenticate user', async () => {
        expect.assertions(3);
        mockedUser.findOne.mockResolvedValueOnce(mockUser)
        mockedBcrypt.compareSync.mockReturnValue(true);
        const response = await request(app).post('/users/login').send(mockUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatchInlineSnapshot(`"Successful login"`);
        expect(response.body.token).toEqual(expect.stringMatching(/\w+.\w+.\w+/));
    });

    test('missing inputs', async () => {
        expect.assertions(3);
        const response = await request(app).post('/users/login');
        expect(response.statusCode).toBe(400);
        expect(response.body.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "location": "body",
              "msg": "Please enter valid email",
              "param": "email",
              "value": "@",
            },
            Object {
              "location": "body",
              "msg": "Password should be at least 6 characters long ",
              "param": "password",
            },
          ]
        `);
        expect(mockedUser.findOne).toHaveBeenCalledTimes(0);
    });

    test('invalid email', async () => {
        expect.assertions(3);
        const invalidEmail = 'invalid-email.com';
        const response = await request(app)
            .post('/users/login')
            .send({...mockUser, email: invalidEmail});
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toMatchInlineSnapshot(`"Please enter valid email"`);
        expect(mockedUser.findOne).toHaveBeenCalledTimes(0);
    });

    test('short password', async () => {
        expect.assertions(3);
        const invalidPassword = '12345';
        const response = await request(app)
            .post('/users/login')
            .send({...mockUser, password: invalidPassword});

        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toMatchInlineSnapshot(`"Password should be at least 6 characters long "`);
        expect(mockedUser.findOne).toHaveBeenCalledTimes(0);
    });

    test('wrong email', async () => {
        expect.assertions(2);
        mockedUser.findOne.mockResolvedValueOnce(null);
        const response = await request(app).post('/users/login').send(mockUser);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatchInlineSnapshot(`"Invalid credentials"`);
    });

    test('wrong password', async () => {
        mockedUser.findOne.mockResolvedValueOnce(true)
        mockedBcrypt.compareSync.mockReturnValue(false);
        const response = await request(app).post('/users/login').send(mockUser);
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toMatchInlineSnapshot(`"Invalid credentials"`)
    })
})