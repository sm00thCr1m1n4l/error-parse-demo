import { Module } from '@nestjs/common';
import { GenSourceCodeController } from './gen-source-code.controller';

@Module({
  controllers: [GenSourceCodeController]
})
export class GenSourceCodeModule {}
