export class CustomDataStructure {
    constructor() {
        this.data = {};
    }

    addPoint(key, point) {
        if (!(key in this.data)) {
            this.data[key] = [point];
        } else {
            this.data[key].push(point);
        }
    }

    getPoints(key) {
        return this.data[key] || [];
    }

    iterate() {
        for (let key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                console.log(`Key: ${key}, Points: ${this.data[key]}`);
            }
        }
    }
}


function findUnion(intervals) {
    // Sort intervals based on starting point
    const sortedIntervals = intervals.slice().sort((a, b) => a[0] - b[0]);

    // Initialize the result array with the first interval
    const result = [sortedIntervals[0]];

    for (let i = 1; i < sortedIntervals.length; i++) {
        const currentInterval = sortedIntervals[i];
        const lastInterval = result[result.length - 1];

        // Check for overlap and merge intervals if needed
        if (currentInterval[0] <= lastInterval[1]) {
            // Overlapping intervals, update the end point of the last interval
            lastInterval[1] = Math.max(lastInterval[1], currentInterval[1]);
        } else {
            // Non-overlapping interval, add it to the result array
            result.push(currentInterval);
        }
    }

    return result;
}


export function addLines(room, horizontalLines, verticalLines) {
    // Given a rectangle as a list of corners, add its unique line segments to the lines dictionary
    const rectangle = room.corners;
    console.log(rectangle);
    for (let i = 0; i < rectangle.length; i++) {
        const startPoint = rectangle[i];
        const endPoint = rectangle[(i + 1) % rectangle.length];
        if (startPoint[0] === endPoint[0]) { // vertical line
            const keypoint = startPoint[0];
            if (startPoint[1] < endPoint[1]) {
                verticalLines.addPoint(keypoint, [startPoint[1], endPoint[1]]);
            } else {
                verticalLines.addPoint(keypoint, [endPoint[1], startPoint[1]]);
            }
        } else { // horizontal line
            const keypoint = startPoint[1];
            if (startPoint[0] < endPoint[0]) {
                horizontalLines.addPoint(keypoint, [startPoint[0], endPoint[0]]);
            } else {
                horizontalLines.addPoint(keypoint, [endPoint[0], startPoint[0]]);
            }
        }
    }
}

// export function addLines(room, horizontalLines, verticalLines) {
//     const rectangle = room.corners;
//     for (let i = 0; i < rectangle.length; i++) {
//         const startPoint = [...rectangle[i]];
//         const endPoint = [...rectangle[(i + 1) % rectangle.length]];
//         if (startPoint[0] === endPoint[0]) { // vertical line
//             const keypoint = startPoint[0];
//             if (startPoint[1] < endPoint[1]) {
//                 verticalLines.addPoint(keypoint, [[startPoint[0], startPoint[1]], [endPoint[0], endPoint[1]]]);
//             } else {
//                 verticalLines.addPoint(keypoint, [[endPoint[0], endPoint[1]], [startPoint[0], startPoint[1]]]);
//             }
//         } else { // horizontal line
//             const keypoint = startPoint[1];
//             if (startPoint[0] < endPoint[0]) {
//                 horizontalLines.addPoint(keypoint, [[startPoint[0], startPoint[1]], [endPoint[0], endPoint[1]]]);
//             } else {
//                 horizontalLines.addPoint(keypoint, [[endPoint[0], endPoint[1]], [startPoint[0], startPoint[1]]]);
//             }
//         }
//     }
// }




export function arrangeLines(lines, horizontalLines, verticalLines) {
    for (let key of Object.keys(verticalLines.data)) {
        const data = [...verticalLines.getPoints(key)];
        const finalData = findUnion(data);
        finalData.forEach(point => {
            lines.push([parseInt(key), point[0]]);
            lines.push([parseInt(key), point[1]]);
        });
    }
    for (let key of Object.keys(horizontalLines.data)) {
        const data = [...horizontalLines.getPoints(key)];
        const finalData = findUnion(data);
        finalData.forEach(point => {
            lines.push([point[0], parseInt(key)]);
            lines.push([point[1], parseInt(key)]);
        });
    }
}


