import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [ProductsModule, SystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
