import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '../application/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponse } from './dtos/user.response';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User email already exists.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.createUserUseCase.execute(
      createUserDto.name,
      createUserDto.email,
    );
    
    return UserResponse.fromDomain(user);
  }
}