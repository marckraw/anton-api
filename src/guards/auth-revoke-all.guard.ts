import { CanActivate } from '@nestjs/common';

export class AuthRevokeAllGuard implements CanActivate {
  canActivate() {
    return false;
  }
}
