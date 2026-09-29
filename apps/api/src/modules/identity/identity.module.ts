import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      // In real deployment this secret comes from .env (process.env.JWT_SECRET)
      // Never commit a real secret to Git — this is a placeholder for local dev only.
      secret: process.env.JWT_SECRET || 'dev-only-secret-change-me',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [IdentityController],
  providers: [IdentityService, JwtAuthGuard],
  exports: [IdentityService, JwtAuthGuard, JwtModule], // other modules can check "who is logged in"
})
export class IdentityModule {}
