import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SecurityToken } from '../security/security-token.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Role, UserRolesEnum } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SecurityToken)
    private securityTokenRepository: Repository<SecurityToken>,
    private userService: UserService,
  ) {}

  //TODO mechaninc that ensures the user roles are added whenever the database is cleaned
  seed() {
    Object.values(UserRolesEnum).map((role) => {
      const userRole: Role = this.roleRepository.create({
        name: role,
      });
      this.roleRepository.save(userRole);
    });
  }

  async getOneRoleById(id: number): Promise<Role> {
    const role: Role = await this.roleRepository.findOne({
      where: {
        id,
      },
    });

    if (!role) {
      throw new HttpException(
        'Cannot find specified role!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return role;
  }

  async getIdByRoleName(role: string): Promise<Role> {
    const validRole: Role = await this.roleRepository.findOne({
      where: { name: role },
    });

    if (!validRole) {
      throw new HttpException(
        'Cannot find specified role!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return validRole;
  }

  async getIdsByPermissionsName(permissions: string[]): Promise<number[]> {
    const validPermissions: number[] = await Promise.all(
      permissions.map(async (role) => {
        const currentRole: Role = await this.getIdByRoleName(role);
        return currentRole.id;
      }),
    );

    if (!validPermissions) {
      throw new HttpException(
        'Cannot find specified role!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return validPermissions;
  }

  async getValidRoles(roles: UserRolesEnum[]): Promise<Role[]> {
    //TODO: Check for invalid votes
    const actualRoles: Role[] = await this.roleRepository.find({
      where: {
        name: In(roles),
      },
    });

    //TODO: return an array of ids
    return actualRoles;
  }

  async getRolesByIds(rolesIds: number[]): Promise<Role[]> {
    const roles: Role[] = await this.roleRepository.find({
      where: { id: In(rolesIds) },
    });

    return roles;
  }
}
