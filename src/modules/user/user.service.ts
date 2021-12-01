import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  //TODO abstract findOneBy in a common method
  //TBD hasty abstraction?
  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  //TODO complete the data for the user
  async saveOne(email: string, password: string): Promise<User> {
    const user: User = await this.findOneByEmail(email);

    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newUser: User = this.usersRepository.create({
      email,
      password,
    });

    return await this.usersRepository.save(newUser);
  }
}
