// import { CreateUserInput } from 'src/users/dto/create-user.input';
// import { UpdateUserInput } from 'src/users/dto/update-user.input';
import { Users } from '../../models/user.entity';

export const mockAddAccountParams = {
  id: '1',
  name: 'Test User',
  email: 'user@email.com',
  password: '123123'
};

// export const mockUpdateUserParams: UpdateUserInput = {
//   id: '1',
//   email: 'email-updated@email.com',
// };

export default class TestUtil {
  static giveMeAValideUser(): Users {
    const user = new Users();

    user.id = '1';
    user.name = 'Test User';
    user.email = 'user@email.com';
    user.password = '123123';
    user.online = true;

    return user;
  }
}

export const mockUserModel: Users = {
  id: '1',
  name: 'Test User',
  email: 'user@email.com',
  password: '123123',
  online: true,
  ...mockAddAccountParams,
};

export const mockUpdatedUserModel: Users = {
  ...mockUserModel,
  email: 'updated-email@email.com',
};

export const mockUserArrayModel: Users[] = [
  mockUserModel,
  {
    id: '2',
    name: 'Test User 2',
    email: 'email2@email.com',
    password: 'teste',
    online: true
  },
  {
    id: '3',
    name: 'Test User 3',
    email: 'email3@email.com',
    password: 'teste',
    online: true
  },
  {
    id: '3',
    name: 'Test User 3',
    email: 'email3@email.com',
    password: 'teste',
    online: false
  }
];