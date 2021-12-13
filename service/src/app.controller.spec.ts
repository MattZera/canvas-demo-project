import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import {StrokeService} from "./stroke/stroke.service";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [StrokeService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return an empty object after created"', () => {
      expect(appController.getStrokes()).toEqual([]);
    });

    it('should Add Strokes"', () => {

      appController.addStroke({
        color: "#004400",
        coords: [{x:0,y:0}, {x:1, y:1}]
      })

      expect(appController.getStrokes().length).toEqual(1);
      expect(appController.getStrokes()).toEqual([{
        color: "#004400",
        coords: [{x:0,y:0}, {x:1, y:1}]
      }]);
    });
  });
});
