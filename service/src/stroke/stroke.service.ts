import { Injectable } from '@nestjs/common';

export type coord = {
    x: number;
    y: number
}

export type stroke = {
    color: string;
    coords: coord[];
};

@Injectable()
export class StrokeService {

    private strokes: stroke[] = [];

    getStrokes(){
        return this.strokes;
    }

    addStroke(stroke: stroke){
        this.strokes = [...this.strokes, stroke];
    }

    clearStrokes(){
        this.strokes = [];
    }
}
