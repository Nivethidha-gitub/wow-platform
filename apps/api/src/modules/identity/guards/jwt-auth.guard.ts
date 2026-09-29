import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Attach this to any controller/route with @UseGuards(JwtAuthGuard) to
// require a valid "Authorization: Bearer <token>" header.
// On success, it puts the logged-in user's info onto request.user so your
// controller can read req.user.role, req.user.id, etc.
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // { sub, phone, role }
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
