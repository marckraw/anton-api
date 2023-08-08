import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable() // Make sure your guard is Injectable
export class AuthTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const singleShotAuthorizationToken = this.configService.get<string>(
      'SINGLE_SHOT_AUTHORIZATION_TOKEN',
    );
    const authorizationTokenFromHeaders = request.headers['authorization'];

    if (
      authorizationTokenFromHeaders &&
      authorizationTokenFromHeaders === singleShotAuthorizationToken
    ) {
      return true;
    }

    return false; // Deny the request if the token does not match
  }
}
