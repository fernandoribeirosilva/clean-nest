import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // toda vez que eu importar o DatabaseModule eles vão ter acesso ao PrismaService
})
export class DatabaseModule {}
