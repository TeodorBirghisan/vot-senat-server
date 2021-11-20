import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RepositoryKeys } from 'src/core/constants/provider-keys.enum';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(RepositoryKeys.USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll<User>();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne<User>({
      where:{
        email
      }
    });
  }

  //TODO complete the data for the user
  async saveOne(email: string, password: string): Promise<User> {
    const user: User = await this.findOneByEmail(email);

    if (user) {
      throw new HttpException("User with this email already exists", HttpStatus.CONFLICT);
    }

    return await this.userRepository.create<User>({
      email,
      password
    });
  }
}
