import { SetMetadata } from "@nestjs/common";
import { UserRolesEnum } from "../user-role/user-role.entity";

//TODO replace magic string with enum value/constant
export const UserPermission = (roles: UserRolesEnum[]) => SetMetadata('roles', roles);