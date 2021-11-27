import { Module } from "@nestjs/common";
import { UserRoleModule } from "../user-role/user-role.module";
import { UserPermissionGuard } from "./user-permission.guard";

@Module({
    imports: [
        UserRoleModule,
        UserPermissionGuard
    ],
    exports: [UserPermissionGuard]
})
export class UserPermissionModule {}