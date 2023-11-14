import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/auth/domain/auth.service';
import { RequestContext } from 'src/context/request-context';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, _res: Response, next: NextFunction) {
    const { headers } = req;
    if (!headers.authorization) {
      throw new UnauthorizedException(`Authorization required`);
    }
    if (!headers.authorization.includes('Bearer')) {
      throw new UnauthorizedException(`Bearer token required`);
    }
    const [, token] = headers.authorization.split(' ');
    const user = await this.authService.verify(token);

    RequestContext.setContext({
      user,
    });
    next();
  }
}
