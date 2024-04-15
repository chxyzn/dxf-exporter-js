import { DxfWriter, point3d } from "@tarikjabiri/dxf";
import {  writeFileSync } from "fs";
import {roomsFromJson} from './conversion.mjs';
import { plotRoom, plotLines, plotWalls } from "./dxf_handler.mjs";
import { CustomDataStructure, addLines, arrangeLines } from "./line_split.mjs";

import { HatchPolylineBoundary, vertex ,HatchBoundaryPaths,pattern, gradient, GradientType,HatchPredefinedPatterns ,HatchEdgesTypeData, point2d} from "@tarikjabiri/dxf";

const dxf = new DxfWriter();

const my_json = '{"0": {"corners": [[0.0, 5.0], [0.0, 25.0], [12.0, 25.0], [12.0, 5.0]], "width": 20.0, "height": 12.0, "area": 240.0}, "1": {"corners": [[22.0, 39.0], [22.0, 51.0], [34.0, 51.0], [34.0, 39.0]], "width": 12.0, "height": 12.0, "area": 144.0}, "2": {"corners": [[10.0, 39.0], [10.0, 53.0], [22.0, 53.0], [22.0, 39.0]], "width": 14.0, "height": 12.0, "area": 168.0}, "3": {"corners": [[0.0, 0.0], [0.0, 5.0], [12.0, 5.0], [12.0, 0.0]], "width": 5.0, "height": 12.0, "area": 60.0}, "4": {"corners": [[22.0, 51.0], [22.0, 56.0], [29.0, 56.0], [29.0, 51.0]], "width": 5.0, "height": 7.0, "area": 35.0}, "5": {"corners": [[0.0, 39.0], [0.0, 43.0], [10.0, 43.0], [10.0, 39.0]], "width": 4.0, "height": 10.0, "area": 40.0}, "6": {"corners": [[0.0, 35.0], [0.0, 39.0], [12.0, 39.0], [12.0, 35.0]], "width": 4.0, "height": 12.0, "area": 48.0}, "7": {"corners": [[22.0, 0.0], [22.0, 10.0], [32.0, 10.0], [32.0, 0.0]], "width": 10.0, "height": 10.0, "area": 100.0}, "8": {"corners": [[12.0, 0.0], [12.0, 10.0], [22.0, 10.0], [22.0, 0.0]], "width": 10.0, "height": 10.0, "area": 100.0}, "9": {"corners": [[12.0, 10.0], [12.0, 39.0], [34.0, 39.0], [34.0, 10.0]], "width": 29.0, "height": 22.0, "area": 638.0}, "10": {"corners": [[0.0, 25.0], [0.0, 35.0], [12.0, 35.0], [12.0, 25.0]], "width": 10.0, "height": 12.0, "area": 120.0}}'

const rooms = roomsFromJson(JSON.parse(my_json));

var horizontalLines = new CustomDataStructure();
var verticalLines = new CustomDataStructure();
var lines = [];
rooms.forEach(room => {
    const points = room.corners.map(corner => point3d(corner[0], corner[1]));
    plotRoom(room, dxf);
    addLines(room, horizontalLines, verticalLines);
});



arrangeLines(lines, horizontalLines, verticalLines);
plotLines(dxf, lines);
plotWalls(dxf, lines);


writeFileSync("test.dxf", dxf.stringify());
