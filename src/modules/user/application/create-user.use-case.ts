import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../domain/user.model';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = new User(randomUUID(), email, name, new Date());
    return this.userRepository.save(newUser);
  }
}