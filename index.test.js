import {UserController} from './src/app/controllers/UserController.js';

describe('User Controller', () => {
    class UserStub {
        store(user) {
            return user
        }
    }


    it('should be able to create a new user', async () => {
        //arrange
        const user = new UserController(
            new UserStub()
        );

        const request = {
            body: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456'
            }
        };

        //act
        const response = await user.store(request)


        //assert
        expect(response.statusCode).toBe(201)
    });
});