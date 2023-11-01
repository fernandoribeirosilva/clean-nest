import { Env } from '@/infra/env'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService], // O inject vai injetar uma lista de serviços, enquanto  eu estou registrando este modulo
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'), // fazendo o decode da chave, e converter para buffer
          publicKey: Buffer.from(publicKey, 'base64'), // fazendo o decode da chave, e converter para buffer
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
