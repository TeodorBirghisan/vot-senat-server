import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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

  async getOneByIds(userId: number, roleId: number): Promise<UserRole> {
    return await this.userRoleRepository.findOne({
      where: { user: userId, role: roleId },
    });
  }

  async getAllUsersWithSubRoles(req: any) {
    if (!req.user) {
      throw new HttpException('User cannot be found!', HttpStatus.BAD_REQUEST);
    }

    const userId: number = req.user.id;
    const roles: string[] = await this.getRolesForUser(userId);

    const isAdmin: boolean = roles.includes(UserRolesEnum.CAN_GRANT_PRESIDENT);
    const isPresident: boolean =
      roles.includes(UserRolesEnum.CAN_GRANT_VICE_PRESIDENT) && !isAdmin;

    const users: User[] = await this.userService.findAll();

    if (isAdmin) {
      // is admin and get ALL users
      return users;
    } else if (isPresident) {
      // is president and get ALL users that do not have CAN_GRANT_PRESIDENT;
      const userIdsToGet: number[] = await this.getUserIdsWithPresidentRole();
      // const users: User[] = await this.userService.findAllByIds(userIdsToGet);
      return users.filter((user) => !userIdsToGet.includes(user.id));
    } else {
      // is vice-presindent
    }
  }

  async getUserIdsWithPresidentRole() {
    // Get all userIds that have CAN_GRANT_PRESIDENT role
    const presidentRole: Role = await this.roleService.getIdByRoleName(
      UserRolesEnum.CAN_GRANT_PRESIDENT,
    );
    const userRoles: UserRole[] = await this.userRoleRepository.find({
      where: { role: presidentRole.id },
      relations: ['user'],
    });

    const userIds: number[] = userRoles
      .map(({ user }) => user.id)
      .filter((elem, index, self) => index === self.indexOf(elem));

    return userIds;
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
    actualRoles.forEach(async (role) => {
      const existingUserRole: UserRole = await this.getOneByIds(
        user.id,
        role.id,
      );

      if (existingUserRole) {
        throw new HttpException(
          `User has already assigned the role: ${role.name}!`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const userRole: UserRole = this.userRoleRepository.create({
        user,
        role,
      });
      userRoleEntries.push(userRole);
    });

    await this.userRoleRepository.save(userRoleEntries);
  }

  async checkPermission(req: any, roles: UserRolesEnum[]): Promise<boolean> {
    const userId: number = req.user.id;

    const userRoles: string[] = await this.getRolesForUser(userId);

    // Compare that every role required matches the users role
    const hasPermission: boolean = roles.every((requiredRole) =>
      userRoles.includes(requiredRole),
    );

    return hasPermission;
  }
}
