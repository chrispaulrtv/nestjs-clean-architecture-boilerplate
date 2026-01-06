import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Christian Reinoso', description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'chrispaulrtv@rinnotec.com', description: 'Correo electrónico único' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}