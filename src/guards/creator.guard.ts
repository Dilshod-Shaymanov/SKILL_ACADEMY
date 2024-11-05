import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CreatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    console.log(user.is_creator);

    if (user.is_creator === undefined || user.is_creator === false) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan foydalanuvchi',
      });
    }

    return true;
  }
}
