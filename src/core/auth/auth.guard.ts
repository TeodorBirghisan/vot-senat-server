import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { SecurityService } from "src/modules/security/security.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly securityService: SecurityService) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization){
            return false;
        }

        const token: string | null = request.headers.authorization.split(" ")?.[1];

        if (!this.securityService.checkToken(token)) {
            return false;
        }


        return true;
    }
}