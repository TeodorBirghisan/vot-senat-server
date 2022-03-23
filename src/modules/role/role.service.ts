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

  async checkPermission(
    token: string,
    roles: UserRolesEnum[],
  ): Promise<boolean> {
    const securityToken = await this.securityTokenRepository.findOne({
      //TODO replace magic string with enum
      relations: ['user'],
      where: {
        token,
      },
    });

    if (!securityToken || !securityToken?.user) {
      return false;
    }

    //TBD is this a redundant query because of the relationship SecurityToken has User?
    const user = await this.userRepository.findOne({
      //TODO replace magic string with enum
      relations: ['roles'],
      where: {
        id: securityToken.user.id,
      },
    });

    if (!user) {
      return false;
    }

    // const userRoles = user.roles.map((role) => role.name);
    // const hasPermission = roles.every((requiredRole) =>
    //   userRoles.includes(requiredRole),
    // );

    // return hasPermission;
  }
}
