import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
