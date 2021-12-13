import React, {MouseEventHandler, useCallback, useEffect, useState} from 'react';
import './App.css';
import Canvas, {stroke} from "./components/Canvas";


function App() {
    const [currentColor, setCurrentColor] = useState("#00FF00");
    const [currentType, setCurrentType] = useState("rect" as stroke["type"]);
    const [currentStroke, setCurrentStroke] = useState(null as stroke | null);
    const [strokes, setStrokes] = useState([] as stroke[]);
    const [syncing, setSyncing] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3001/strokes", {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const json = await response.json();
            setStrokes(json);
            setSyncing(false)
        })();
    }, [])

    const synchronize = useCallback(async (stroke: stroke) => {
        if (syncing) return
        setSyncing(true)
        const response = await fetch("http://localhost:3001/strokes/add", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(stroke)
        })
        const json = await response.json();
        setStrokes(json);
        setSyncing(false)
    }, [syncing]);

    const trash = useCallback(async () => {
        if (syncing) return
        setSyncing(true)
        const response = await fetch("http://localhost:3001/strokes/clear", {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json();
        setStrokes(json);
        setSyncing(false)
    }, [syncing]);

    const handleMouseDown: MouseEventHandler<HTMLCanvasElement> = (event) => {
        if (syncing) return;
        console.log("MouseDown")
        setCurrentStroke({
            color: currentColor,
            type: currentType,
            coords: [{x: event.clientX, y: event.clientY}]
        });
    }

    const handleMouseUp: MouseEventHandler<HTMLCanvasElement> = () => {
        if (syncing) return;
        console.log("MouseUp")
        if (currentStroke !== null) {
            setStrokes([...strokes, currentStroke])
            synchronize(currentStroke);
        }
        console.log(currentStroke);
        setCurrentStroke(null);
    }

    const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (event) => {
        if (syncing) return;
        if (currentStroke !== null){
            console.log("MouseMove")
            let nextCoord = { x: event.clientX, y: event.clientY };

            setCurrentStroke({
                ...currentStroke,
                coords: [...currentStroke.coords, nextCoord]
            });
        }
    }

    return (
        <div className="App">
            <Canvas data-testid="main-canvas" className="draw-pad"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    strokes={currentStroke ? [...strokes, currentStroke] : strokes}/>
            <button className="btn btn-red" onClick={() => setCurrentColor("#ff0000")}/>
            <button className="btn btn-green" onClick={() => setCurrentColor("#00FF00")}/>
            <button className="btn btn-blue" onClick={() => setCurrentColor("#0000ff")}/>
            <button className="btn btn-rect" onClick={() => setCurrentType("rect")}>Rectangle</button>
            <button className="btn btn-line" onClick={() => setCurrentType("line")}>Line</button>
            <button className="btn btn-stroke" onClick={() => setCurrentType("stroke")}>Stroke</button>
            <button className="btn btn-trash" onClick={() => trash()}>Clear</button>
        </div>
    );
}

export default App;
