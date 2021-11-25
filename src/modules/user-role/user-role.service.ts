import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { SecurityToken } from "../security/security-token.entity";
import { User } from "../user/user.entity";
import { UserRole, UserRolesEnum } from "./user-role.entity";

@Injectable()
export class UserRoleService {
    constructor(
        @InjectRepository(UserRole)
        private userRoleRepository: Repository<UserRole>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(SecurityToken)
        private securityTokenRepository: Repository<SecurityToken>,
    ){}


    //TODO mechaninc that ensures the user roles are added whenever the database is cleaned
    seed(){
        Object.values(UserRolesEnum).map((role)=>{
            const userRole: UserRole = this.userRoleRepository.create({
                name: role
            });
            this.userRoleRepository.save(userRole);
        });
    }

    async checkPermission(token: String, roles: UserRolesEnum[]): Promise<boolean> {
        const securityToken = await this.securityTokenRepository.findOne({
            //TODO replace magic string with enum
            relations: ["user"],
            where: {
                token
            }
        });

        if (!securityToken || !securityToken?.user) {
            return false;
        }

        //TBD is this a redundant query because of the relationship SecurityToken has User?
        const user = await this.userRepository.findOne({
            //TODO replace magic string with enum
            relations: ["roles"],
            where: {
                id: securityToken.user.id
            }
        });

        if (!user) {
            return false;
        }
        
        const userRoles = user.roles.map(role => role.name);
        const hasPermission = roles.every(requiredRole => userRoles.includes(requiredRole));

    
        return hasPermission;
    }

    async grantRolesToUser(user: User, roles: UserRolesEnum[]) {
        //TODO check if roles is not null/undefined/empty
        const grantedRoles: UserRole[] = await this.userRoleRepository.find({
            where:{
                name: In(roles)
            }
        });

        user.roles = grantedRoles;

        this.userRepository.save(user);
    }

    //TODO remove role/roles from user
}