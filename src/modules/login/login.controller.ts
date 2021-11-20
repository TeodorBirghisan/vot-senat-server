import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { SecurityService } from "../security/security.service";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Controller("/auth")
export class LoginController {
    constructor(
        private readonly userService: UserService,
        private readonly securityService: SecurityService,
    ){}
    
    @Post("/login")
    async login(
        //TODO create DTO for request body
        @Body("email") email: string,
        @Body("password") password: string
        //TODO create DTO for response
    ): Promise<{}> {
        const user: User | null = await this.userService.findOneByEmail(email);

        if (!user) {
            throw new HttpException("You don't have an account with this email", HttpStatus.NOT_FOUND);
        }

        //TODO add bcrypt verification
        if (user.password !== password) {
            throw new HttpException("Email or password is incorrect", HttpStatus.NOT_FOUND);
        }

        return {
            token: this.securityService.createToken()
        };
    }

    @Post("/signup")
    async signup(
        //TODO create DTO for request body
        @Body("email") email: string,
        @Body("password") password: string
        //TODO create DTO for response
    ): Promise<{}> {
        await this.userService.saveOne(email, password);
        return {
            "message": "User created successfully"
        };
    }
}