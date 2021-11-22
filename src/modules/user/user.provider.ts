import { RepositoryKeys } from 'src/core/constants/provider-keys.enum';
import { User } from './user.entity';

export const USER_PROVIDER = [
  {
    provide: RepositoryKeys.USER_REPOSITORY,
    useValue: User,
  },
];
