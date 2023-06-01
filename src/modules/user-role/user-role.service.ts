import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

    const isAdmin: boolean = roles.includes(
      UserRolesEnum.CAN_GRANT_PERMISSIONS_ALL,
    );

    const isPresident: boolean =
      roles.includes(UserRolesEnum.CAN_GRANT_PERMISSIONS_PRESIDENT) && !isAdmin;

    const isVicePresident: boolean =
      roles.includes(UserRolesEnum.CAN_GRANT_PERMISSIONS_VICEPRESIDENT) &&
      !isAdmin &&
      !isPresident;

    const users: User[] = await this.userService.findAll();

    if (isAdmin) {
      // is admin => get all users
      return users;
    } else if (isPresident) {
      // is president => get all vicepresidents and senators;
      const presidentOrAboveUsers: number[] =
        await this.getUserIdsWithPermissions([
          UserRolesEnum.CAN_GRANT_PERMISSIONS_PRESIDENT,
          UserRolesEnum.CAN_GRANT_PERMISSIONS_ALL,
        ]);
      return users.filter((user) => !presidentOrAboveUsers.includes(user.id));
    } else if (isVicePresident) {
      // is vice-presindent => get all senators
      const vicepresidentOrAboveUsers: number[] =
        await this.getUserIdsWithPermissions([
          UserRolesEnum.CAN_GRANT_PERMISSIONS_PRESIDENT,
          UserRolesEnum.CAN_GRANT_PERMISSIONS_ALL,
          UserRolesEnum.CAN_GRANT_PERMISSIONS_VICEPRESIDENT,
        ]);
      return users.filter(
        (user) => !vicepresidentOrAboveUsers.includes(user.id),
      );
    }
  }

  async getUserIdsWithPermissions(permissions: string[]): Promise<number[]> {
    const userPermissionsIds: number[] =
      await this.roleService.getIdsByPermissionsName(permissions);

    const userRoles: UserRole[] = await this.userRoleRepository.find({
      where: { role: In(userPermissionsIds) },
      relations: ['user'],
    });

    const userIds: number[] = userRoles
      .map(({ user }) => user.id)
      .filter((elem, index, self) => index === self.indexOf(elem));

    return userIds;
  }

  async getUserIdsWithPermission(permission: string): Promise<number[]> {
    const presidentRole: Role = await this.roleService.getIdByRoleName(
      permission,
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

  async getRolesForUser(userId: number): Promise<string[]> {
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
    const userRoleEntries = await Promise.all(
      actualRoles.map(async (role) => {
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

        return userRole;
      }),
    );

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

  async getPermissionsForUser(userId: number): Promise<string[]> {
    return await this.getRolesForUser(userId);
  }

  async getAllUsersPermissions(req: any) {
    type UserPermissions = User & { permissions: string[] };

    const currentUserId: number = req.user.id;

    const users: User[] = await this.getAllUsersWithSubRoles(req);

    const enhancedUsers = await Promise.all(
      users.map(async (user: UserPermissions) => {
        if (user.id !== currentUserId) {
          const permissions: string[] = await this.getRolesForUser(user.id);
          return {
            ...user,
            permissions,
          };
        }
      }),
    );

    return enhancedUsers;
  }

  async updateUserPermission(
    userId: number,
    permission: string,
    isEnabled: boolean,
  ) {
    if (!userId || !permission) {
      throw new HttpException('Missing Data!', HttpStatus.BAD_REQUEST);
    }

    const role: Role = await this.roleService.getIdByRoleName(permission);

    if (!role) {
      throw new HttpException('Invalid Role!', HttpStatus.BAD_REQUEST);
    }

    if (isEnabled) {
      // create
      await this.grantUserRoles(userId, [role.name]);
    }
    if (!isEnabled) {
      // delete
      await this.removeRoleFromUser(userId, role.id);
    }
  }

  async removeRoleFromUser(userId: number, roleId: number) {
    const userRoleToDelete: UserRole = await this.getOneByIds(userId, roleId);
    const deletedUserRole: UserRole = await this.userRoleRepository.remove(
      userRoleToDelete,
    );

    if (!deletedUserRole) {
      throw new HttpException('Cannot delete!', HttpStatus.BAD_REQUEST);
    }
  }
}
