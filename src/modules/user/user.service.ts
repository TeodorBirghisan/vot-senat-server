import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findAllByIds(userIds: number[]): Promise<User[]> {
    return this.usersRepository.findByIds(userIds);
  }

  //TODO abstract findOneBy in a common method
  //TBD hasty abstraction?
  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException(
        'This user does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async saveOne(userCreateDto: CreateUserDto): Promise<User> {
    const user: User = await this.findOneByEmail(userCreateDto.email);

    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newUser: User = this.usersRepository.create(userCreateDto);

    return await this.usersRepository.save(newUser);
  }
}
