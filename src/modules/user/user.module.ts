import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from './application/create-user.use-case';
import { UserRepository } from './domain/user.repository';
import { UserRepositoryImpl } from './infrastructure/persistence/user-repository.impl';
import { UserEntity } from './infrastructure/persistence/user.entity';
import { UserController } from './presentation/user.controller';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: UserRepository, 
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}