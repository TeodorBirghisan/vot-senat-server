import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { DATABASE_CONFIG } from "./database.config";

@Module({
    imports:[
        TypeOrmModule.forRoot({
            ...DATABASE_CONFIG as any,
            entities: [
              User
            ],
          })
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule{}