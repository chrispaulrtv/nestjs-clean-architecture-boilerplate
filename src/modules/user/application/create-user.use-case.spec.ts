import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../domain/user.model';
import { UserRepository } from '../domain/user.repository';
import { CreateUserUseCase } from './create-user.use-case';

const mockUserRepository = {
  save: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
};

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let repository: typeof mockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    repository = module.get(UserRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const name = 'Chris';
    const email = 'chris@test.com';

    repository.findByEmail.mockResolvedValue(null); 
    repository.save.mockImplementation((user) => Promise.resolve(user));

    const result = await useCase.execute(name, email);

    expect(result).toBeInstanceOf(User);
    expect(result.email).toBe(email);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should throw ConflictException if email exists', async () => {
    const email = 'existing@test.com';
    repository.findByEmail.mockResolvedValue(new User('1', email, 'Chris', new Date()));

    await expect(useCase.execute('Chris', email))
      .rejects
      .toThrow(ConflictException);
  });
});