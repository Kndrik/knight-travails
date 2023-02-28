import { Node } from "./node.js";

class KnightGraph {
    #nodes = [];

    constructor() {
        this.#createNodes();
    }
    
    #createNodes() {
        for(let x = 0; x < 8; x++) {
            this.#nodes[x] = [];
            for(let y = 0; y < 8; y++) {
                this.#nodes[x][y] = new Node(x,y);
            }
        }
        this.#assignTargets();
    }

    #assignTargets() {
        this.#nodes.forEach(line => {
            line.forEach(node => {
                const targets = node.getTargetsCoord();
                targets.forEach(coord => {
                    const targetNode = this.#nodes[coord[0]][coord[1]];
                    node.pushTarget(targetNode);
                });
            });
        });
    }

    knightMoves(start, finish) {
        this.root = this.getNode(start[0], start[1]);
        const targetNode = this.getNode(finish[0], finish[1]);
        console.log(this.dijkstra(targetNode));
    }

    dijkstra(target) {
        let node = this.root;
        let queue = [];
        let visited = [];
        let previous = [... Array(8)].map(() => Array(8).fill(0));
        let distance = [... Array(8)].map(() => Array(8).fill(Infinity));
        distance[node.getX()][node.getY()] = 0;
        queue.push(node);
        while (queue.length > 0) {
            node = queue.shift();
            if (visited.includes(node)) continue;
            node.getTargets().forEach(elem =>  {
                let distanceToElem = distance[node.getX()][node.getY()] + 1;
                if (distanceToElem < distance[elem.getX()][elem.getY()]) {
                    distance[elem.getX()][elem.getY()] = distanceToElem;
                    previous[elem.getX()][elem.getY()] = [node.getX(), node.getY()];
                }
                queue.push(elem);
            });
            visited.push(node);
        }

        let path = [];
        let curLocation = [target.getX(), target.getY()];
        while (curLocation[0] !== this.root.getX() || curLocation[1] !== this.root.getY()) {
            path.unshift([curLocation[0], curLocation[1]]);
            curLocation = previous[curLocation[0]][curLocation[1]];
        }
        path.unshift([this.root.getX(), this.root.getY()]);

        return path;
    }

    getNode(x, y) {
        return this.#nodes[x][y];
    }
}

const graph = new KnightGraph([1,2]);
graph.knightMoves([3,3], [4,3]);