import React, {useEffect, useRef} from 'react'

export type coord = {
    x: number;
    y: number
}

export type stroke = {
    type?: "line" | "rect" | "stroke";
    color: string;
    coords: coord[];
};

export type canvasProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
    strokes: stroke[];
}

function Canvas(props: canvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        const canvas = canvasRef.current

        if (canvas){
            const context = canvas.getContext('2d')
            if (context) {
                context.canvas.width  = 800;
                context.canvas.height = 600;

                context.fillStyle = '#000000'
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)

                context.lineWidth = 3;

                console.log("stroke");

                for (const stroke of props.strokes){
                    if (!stroke.coords || !stroke.coords.length) continue;

                    context.fillStyle = stroke.color;
                    context.strokeStyle = stroke.color;

                    context.beginPath();

                    switch (stroke.type){
                        case "line":
                            context.moveTo(stroke.coords[0].x, stroke.coords[0].y);
                            context.lineTo(stroke.coords[stroke.coords.length - 1].x, stroke.coords[stroke.coords.length - 1].y);
                            context.stroke();
                            break;
                        case "rect":
                            context.moveTo(stroke.coords[0].x, stroke.coords[0].y);
                            context.lineTo(stroke.coords[0].x, stroke.coords[stroke.coords.length - 1].y);
                            context.lineTo(stroke.coords[stroke.coords.length - 1].x, stroke.coords[stroke.coords.length - 1].y);
                            context.lineTo(stroke.coords[stroke.coords.length - 1].x, stroke.coords[0].y);
                            context.lineTo(stroke.coords[0].x, stroke.coords[0].y);
                            context.closePath();
                            context.fill();
                            break;
                        case "stroke":
                        default:
                            context.moveTo(stroke.coords[0].x, stroke.coords[0].y);

                            for (const coord of stroke.coords){
                                context.lineTo(coord.x, coord.y);
                            }

                            context.stroke();
                            break;
                    }

                }

            }
        }

    }, [props])

    return <canvas ref={canvasRef} {...props}/>;
}

export default Canvas