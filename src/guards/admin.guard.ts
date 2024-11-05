import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (
      !req.user ||
      req.user.is_creator === undefined ||
      req.user.is_creator === true
    ) {
      throw new ForbiddenException({
        message: 'Siz admin emassiz',
      });
    }

    return true;
  }
}
