import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StrokeService } from './stroke/stroke.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [StrokeService],
})
export class AppModule {}
