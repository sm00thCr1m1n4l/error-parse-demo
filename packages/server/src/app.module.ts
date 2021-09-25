import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenSourceCodeModule } from './gen-source-code/gen-source-code.module';

@Module({
  imports: [GenSourceCodeModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
