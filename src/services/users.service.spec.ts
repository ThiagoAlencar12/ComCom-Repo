import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import{ Users } from '../models/user.entity';
import { 
  mockUserModel,
  mockUserArrayModel,
  mockAddAccountParams
} from '../fakes/test/TestUtils';
import TestUtil from '../fakes/test/TestUtils';

describe('UsersService', () => {
  let serviceUser: UsersService;

  const mockRepository = {
    find: jest.fn().mockReturnValue(mockUserArrayModel),
    findOne: jest.fn().mockReturnValue(mockUserModel),
    create: jest.fn(),
    save: jest.fn().mockReturnValue(mockUserModel),
    findByEmail: jest.fn().mockReturnValue(mockUserModel),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        }
      ]
    }).compile();
    serviceUser = moduleRef.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.delete.mockReset();
    mockRepository.create.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findByEmail.mockReset();
    mockRepository.findOne.mockReset();
  });

  it('should be defined',() => {
    expect(serviceUser).toBeDefined();
  });

  it('should be able to list all users', async () => {
    const user = serviceUser.find();

    expect(user).resolves.toBe(mockUserArrayModel);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
   });

   it('should be able to find user by id', async () => {
    const userFound = serviceUser.findById('1');

    expect(mockRepository.findOne).toHaveBeenCalledWith(mockUserModel.id);
    expect(userFound).resolves.toBe(mockUserModel);
   });

   it('should be able to find user by email', async () => {
    const userFound = serviceUser.findByEmail('user@temail.com');

    expect(mockRepository.findByEmail);
    expect(userFound).resolves.toBe(mockUserModel);
   });

  //  it('should be able to check user e-mail', async () => {
  //   const user = TestUtil.giveMeAValideUser();
  //   mockRepository.findByEmail.mockReturnValue(user.email);
  //   const userEmailFound = await serviceUser.findByEmail('user@email.com');
  //   expect(userEmailFound).toBe(user.email);
  //   expect(mockRepository.findByEmail).toBeCalledTimes(1);
  //  });

  //  it('Should create a user', async () => {
  //  const user = TestUtil.giveMeAValideUser();
  //  mockRepository.create.mockReturnValue({
  //    name: 'Thiago Alencar',
  //    email: 'thiagoTeste@gmail.com',
  //    password: 'password',
  //  });
  //  mockRepository.save.mockReturnValue({
  //   name: 'Thiago Alencar',
  //   email: 'thiagoTeste@gmail.com',
  //   password: 'password',
  //  });

  //  const userFound = serviceUser.findByEmail('user@temail.com');

  //  const savedUser = await serviceUser.create(user);
  //  expect(savedUser).toMatchObject(user);
  //  expect(mockRepository.findByEmail);
  //  expect(userFound).resolves.toBe(mockUserModel);
  //  expect(mockRepository.create).toBeCalledTimes(1);
  //  expect(mockRepository.save).toBeCalledTimes(1);
  // });

});