import {Body, Controller, Get, Post} from '@nestjs/common';
import {stroke, StrokeService} from "./stroke/stroke.service";

@Controller('strokes')
export class AppController {
  constructor(private readonly strokeService: StrokeService) {}

  @Get()
  getStrokes(): stroke[] {
    return this.strokeService.getStrokes();
  }

  @Post('add')
  addStroke(@Body() stroke: stroke): stroke[] {
    console.log(stroke)
    this.strokeService.addStroke(stroke);
    return this.strokeService.getStrokes();
  }

  @Get('clear')
  clearStrokes(): stroke[] {
    this.strokeService.clearStrokes();
    return this.strokeService.getStrokes();
  }
}
