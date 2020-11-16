import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import{ Users } from '../models/user.entity';
import { 
  mockUserModel,
} from '../fakes/test/TestUtils';
import TestUtil from '../fakes/test/TestUtils';

describe('UsersService', () => {
  let serviceUser: UsersService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn().mockReturnValue(mockUserModel),
    findByEmail: jest.fn().mockReturnValue(mockUserModel),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
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

  it('should be defined',() => {
    expect(serviceUser).toBeDefined();
  });

  it('should be able to list all users', async () => {
    const user = TestUtil.giveMeAValideUser();
    mockRepository.find.mockReturnValue([user, user]);

    const users = await serviceUser.find();

    expect(users).toHaveLength(2);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
   });

   it('should be able to find user by id', async () => {
    const user = TestUtil.giveMeAValideUser();
    mockRepository.findOne.mockReturnValue(user);
    const userFound = await serviceUser.findById('1');
    
    expect(userFound).toMatchObject({ id: user.id, email: user.email });
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
   });

   it('should be able to check user e-mail', async () => {
    const user = TestUtil.giveMeAValideUser();
    mockRepository.findByEmail.mockReturnValue(user);
    
    const userEmail = await serviceUser.findByEmail('user@email.com');

    expect(userEmail).toMatchObject({ email: user.email });
    expect(mockRepository.findByEmail);
   });

   it('should be able to create a new user', () => {
     console.log("Criado")
   });
});