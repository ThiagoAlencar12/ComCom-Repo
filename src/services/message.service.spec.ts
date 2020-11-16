import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import{ Messages } from '../models/message.entity';
import { MessageService } from './messages.service';
import { 
  mockUserModel,
} from '../fakes/test/TestUtils';

import TestUtil from '../fakes/test/TestUtils';

describe('MessageService', () => {
  let serviceMessage: MessageService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn().mockReturnValue(mockUserModel),
    findByEmail: jest.fn(),
    findByIDWithPassword: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Messages),
          useValue: mockRepository,
        }
      ]
    }).compile();
    
    serviceMessage = moduleRef.get<MessageService>(MessageService);

  });

  it('should be define', () => {
    expect(serviceMessage).toBeDefined();
  })
});