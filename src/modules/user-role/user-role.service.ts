import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, UserRolesEnum } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  async getAllUsersWithSubRoles(req: any) {
    if (!req.user) {
      throw new HttpException('User cannot be found!', HttpStatus.BAD_REQUEST);
    }

    const userId: number = req.user.id;

    return await this.getRolesForUser(userId);
  }

  async getRolesForUser(userId: number) {
    const userRoles: UserRole[] = await this.userRoleRepository.find({
      where: { user: userId },
      relations: ['role'],
    });
    const roles: string[] = userRoles.map((userRole) => userRole.role.name);
    return roles;
  }

  async grantUserRoles(userId: number, roles: UserRolesEnum[]) {
    const actualRoles: Role[] = await this.roleService.getValidRoles(roles);
    const user: User = await this.userService.findOneById(userId);
    const userRoleEntries = [];
    actualRoles.forEach((role) => {
      const userRole: UserRole = this.userRoleRepository.create({
        user,
        role,
      });
      userRoleEntries.push(userRole);
    });

    await this.userRoleRepository.save(userRoleEntries);
  }
}
