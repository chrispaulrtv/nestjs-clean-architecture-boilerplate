import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.model';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmRepository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const entity = this.toEntity(user);
    const saved = await this.typeOrmRepository.save(entity);
    return this.toDomain(saved);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.typeOrmRepository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.typeOrmRepository.find();
    return entities.map((e) => this.toDomain(e));
  }

  private toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.name = user.name;
    entity.createdAt = user.createdAt;
    return entity;
  }

  private toDomain(entity: UserEntity): User {
    return new User(entity.id, entity.email, entity.name, entity.createdAt);
  }
}