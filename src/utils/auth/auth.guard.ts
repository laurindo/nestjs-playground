import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from './role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  private readonly logger = new Logger(AuthGuard.name);

  private matchRoles(roles: Role[], userRolesFromSession: string[]): boolean {
    this.logger.log(`validating roles inside matchRoles(roles): ${roles}`);
    this.logger.log(
      `validating roles inside matchRoles(user roles): ${userRolesFromSession}`,
    );

    const hasRoles = roles?.filter((role) => {
      return userRolesFromSession?.includes(role);
    });

    return !!hasRoles.length;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('Starting process to extract and validate token');

    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = this.extractTokenFromHeader(req);

    this.logger.log('Token Found', token);

    if (!token) {
      this.logger.log('There is no token');
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      this.logger.log('Payload verified from JWT Service', payload);

      const userIsAllowed = this.matchRoles(roles, payload.roles);

      if (!userIsAllowed) {
        throw new UnauthorizedException();
      }

      this.logger.log('User is allowed: ', userIsAllowed);

      req['user'] = payload;
      this.logger.log("Payload assigned to req['user']");
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error('Error to validate token, returning exception');
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    this.logger.log('Extracting token from Bearer');
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
