import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { UsersService } from '../user/user.service'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { Users } from '../user/entities/user.entity';

describe('EmailService', () => {
  let emailService: EmailService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        UsersService,
        {
          provide: getRepositoryToken(Email),
          useValue: null,
        },
        {
          provide: getRepositoryToken(Users),
          useValue: null,
        },
      ],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
