class Room {
    constructor(index, corners, width, height, area) {
        this.index = index;
        this.corners = corners;
        this.width = width;
        this.height = height;
        this.area = area;
    }
}

export function roomsFromJson(data) {
    const rooms = [];
    for (const [index, roomData] of Object.entries(data)) {
        const room = new Room(
            parseInt(index),
            roomData.corners,
            roomData.width,
            roomData.height,
            roomData.area
        );
        rooms.push(room);
    }
    return rooms;
}

function roomsToJson(rooms) {
    for (const room of rooms) {
        const roomData = {
            index: room.index,
            corners: room.corners,
            width: room.width,
            height: room.height,
            area: room.area
        };
        console.log(JSON.stringify(roomData, null, 4));
    }
}
