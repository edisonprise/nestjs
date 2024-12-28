import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsEmpty,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the user, minimum 3 characters',
    example: 'Edison',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user, must be a valid email',
    example: 'example@mail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({
    description: 'The password should be different from the email',
    example: 'Strong!Password123',
  })
  password: string;

  @IsEmpty()
  @ApiProperty({
    description: 'Assigned by the system, not to be included in the body',
    default: false,
  })
  isAdmin: boolean;
}
