export class Node {
    #targets = [];
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    pushTarget(node) {
        this.#targets.push(node);
    }

    getTargets() {
        return this.#targets;
    }
    
    getTargetsCoord() {
        let positions = [];
        positions.push([this.x-1, this.y+2]);
        positions.push([this.x+1, this.y+2]);
        positions.push([this.x+2, this.y+1]);
        positions.push([this.x+2, this.y-1]);
        positions.push([this.x+1, this.y-2]);
        positions.push([this.x-1, this.y-2]);
        positions.push([this.x-2, this.y-1]);
        positions.push([this.x-2, this.y+1]);
        return positions.filter(this.isOnBoard);
    }

    isOnBoard(pos) {
        return pos[0] >= 0 &&
        pos[0] <= 7 &&
        pos[1] >= 0 &&
        pos[1] <= 7;
    }
}