import {point3d,point2d,LWPolylineFlags,HatchPolylineBoundary, vertex ,HatchBoundaryPaths,pattern, HatchPredefinedPatterns} from "@tarikjabiri/dxf";

const DECREMENT_WIDTH = 0.01;
const WALL_HEIGHT = 5;


export function plotLines(dxf, lines) {

  for (let i = 0; i < lines.length-2; i=i+2) {

    const startPoint = lines[i];
    const endPoint = lines[i+1];
        // console.log('Check this out');
        // console.log(startPoint[0],endPoint[0]);
        // console.log(startPoint[1],endPoint[1]);
        dxf.addLine(point3d(startPoint[0], startPoint[1]), point3d(endPoint[0], endPoint[1]));
    
  }
    
}


export function plotRoom(room, dxf) {
    const corners = room.corners.map(corner => [...corner]); 
    
    let xMid = 0;
    let yMid = 0;

    for (let i = 0; i < corners.length; i++) {
        xMid += corners[i][0];
        yMid += corners[i][1];
    }
   
    xMid /= 4;
    yMid /= 4;

    for (let i = 0; i < corners.length; i++) {
        if (corners[i][0] < xMid) {
            corners[i][0] += DECREMENT_WIDTH;
        } else {
            corners[i][0] -= DECREMENT_WIDTH;
        }
        if (corners[i][1] < yMid) {
            corners[i][1] += DECREMENT_WIDTH;
        } else {
            corners[i][1] -= DECREMENT_WIDTH;
        }
    }


    const vertices = [
        {
          point: point2d(corners[0][0], corners[0][1]),
        },
        {
          point: point2d(corners[1][0], corners[1][1]),
        },
        {
          point: point2d(corners[2][0], corners[2][1]),
        },
        {
          point: point2d(corners[3][0], corners[3][1]),
        },
      ];
      
      dxf.addLWPolyline(vertices, {
        flags: LWPolylineFlags.Closed,
      });

      addHatch(dxf,room);

    //   const hatch = dxf.addHatch(boundary, mypattern);
      

    // const roomHatch = msp.addHatch({ color: room.index % 9 });
    // roomHatch.paths.addPolylinePath(corners, true);

    // msp.addText(`${room.index}`, {
    //     height: 1.3,
    //     color: getTextColor(room.index % 9),
    //     x: xMid,
    //     y: yMid,
    //     align: 'middleCenter'
    // });
}

function addHatch(dxf,room){
  const polyline = new HatchPolylineBoundary();
  polyline.add(vertex(room.corners[0][0], room.corners[0][1]));
  polyline.add(vertex(room.corners[1][0], room.corners[1][1]));
  polyline.add(vertex(room.corners[2][0], room.corners[2][1]));
  polyline.add(vertex(room.corners[3][0], room.corners[3][1]));
  
  
  const boundary = new HatchBoundaryPaths();
  boundary.addPolylineBoundary(polyline);
  
  const mypattern = pattern({
    name: HatchPredefinedPatterns.SOLID,
  });
  
  const hatch = dxf.addHatch(boundary, mypattern);
  hatch.colorNumber  = room.index + 1;
}

export function plotWalls(dxf, lines) {

  for(let i = 0; i < lines.length-2; i=i+2){
    const startPoint = lines[i];
    const endPoint = lines[i+1];

    console.log('check here')
    console.log(startPoint)
    console.log(endPoint)
    if(startPoint[0 ]==endPoint[0]){

      const polyline = new HatchPolylineBoundary();
      polyline.add(vertex(startPoint[0], startPoint[1]));
      polyline.add(vertex(endPoint[0], endPoint[1]));
      polyline.add(vertex(endPoint[0] + WALL_HEIGHT, endPoint[1]));
      polyline.add(vertex(startPoint[0] + WALL_HEIGHT, startPoint[1]));

      const boundary = new HatchBoundaryPaths();
      boundary.addPolylineBoundary(polyline);

      const mypattern = pattern({
        name: HatchPredefinedPatterns.SOLID,
      });

      const hatch = dxf.addHatch(boundary, mypattern);
      hatch.colorNumber = 9;
      hatch.elevation =0 ;
    }
  }
  // for (const line of lines) {
  //     const [startPoint, endPoint] = line;
  //     if (startPoint[0] === endPoint[0]) {
  //         const wallHatch = msp.addHatch({ color: 9 });
  //         const vertices = [
  //             startPoint,
  //             endPoint,
  //             [endPoint[0] + WALL_HEIGHT, endPoint[1]],
  //             [startPoint[0] + WALL_HEIGHT, startPoint[1]]
  //         ];
  //         wallHatch.paths.addPolylinePath(vertices, true);
  //         wallHatch.rotateY(-Math.PI / 2);
  //         wallHatch.transparency = 0.2;
  //         wallHatch.translate(startPoint[0], 0, -startPoint[0]);
  //     } else {
  //         const wallHatch = msp.addHatch({ color: 9 });
  //         const vertices = [
  //             startPoint,
  //             endPoint,
  //             [endPoint[0], endPoint[1] + WALL_HEIGHT],
  //             [startPoint[0], startPoint[1] + WALL_HEIGHT]
  //         ];
  //         wallHatch.paths.addPolylinePath(vertices, true);
  //         wallHatch.rotateX(Math.PI / 2);
  //         wallHatch.transparency = 0.2;
  //         wallHatch.translate(0, startPoint[1], -startPoint[1]);
  //     }
}
