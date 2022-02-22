import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from './user.entity';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() @IsEmail() email: string;
}

export class UserDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() @IsEmail() email: string;
}

export class LoginUserDto {
  @IsNotEmpty() @IsEmail() readonly email: string;
  @IsNotEmpty() readonly password: string;
}

export const toUserDto = (data: User): UserDto => {
  const { id, email } = data;
  const userDto: UserDto = { id, email };
  return userDto;
};
