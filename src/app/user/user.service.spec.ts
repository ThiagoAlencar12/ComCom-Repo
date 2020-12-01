import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from './entities/user.entity';
import { UsersService } from './user.service';

import FakeUtilsUsers from './fakes/FakeUtilsUsers';

describe('UserService', () => {
  let serviceUsers: UsersService;

  const mockUsersRepository = ({
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        }
      ],
    }).compile();
    serviceUsers = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(serviceUsers).toBeDefined();
  });

  it('should be able list users [Service Users]', async () => {
    const user = FakeUtilsUsers.testeUser();
    mockUsersRepository.find.mockReturnValue([ user, user, user ]);
    const users = await serviceUsers.findAll();

    expect(users).toHaveLength(3);
    expect(mockUsersRepository.find).toHaveBeenCalledTimes(1);
   });

  it('should be able to find a user by id', async () => {
    const user = FakeUtilsUsers.testeUser();
    mockUsersRepository.findOne.mockReturnValue(user.id);

    const users = await serviceUsers.findById(user.id);
    expect(users).toBe(user.id);
    expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should be able to find a user by email', async () => {
    const user = FakeUtilsUsers.testeUser();
    mockUsersRepository.findOne.mockReturnValue(user.email);
    const users = await serviceUsers.findByEmail(user.email);

    await expect(users).toBe(user.email);
    expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(2);
  });

  it('should be able to create a new user', async () => {
    const user = FakeUtilsUsers.testeUser();
    mockUsersRepository.save.mockReturnValue(user);

    const users = await serviceUsers.create(user);
    await expect(user).toMatchObject(users);

    // await expect(users).rejects.toContainEqual(user.email)
  });

  it('should be able to update user', async () => {
    const user = FakeUtilsUsers.testeUser();

    mockUsersRepository.findOne.mockReturnValue(user.id);

    const findId = await serviceUsers.findById(user.id);
    await expect(findId).toBe(user.id);
  });
});


