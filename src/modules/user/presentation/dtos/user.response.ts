import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/user.model';

export class UserResponse {
  @ApiProperty({ example: 'uuid-v4-string' })
  id: string;

  @ApiProperty({ example: 'christian-reinoso@rinnotec.com' })
  email: string;

  @ApiProperty({ example: 'Christian Reinoso' })
  name: string;

  @ApiProperty()
  createdAt: string;

  static fromDomain(user: User): UserResponse {
    const response = new UserResponse();
    response.id = user.id;
    response.email = user.email;
    response.name = user.name;
    response.createdAt = user.createdAt.toISOString();
    return response;
  }
}