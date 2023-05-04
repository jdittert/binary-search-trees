import Node from "./node"

export default class Tree {
    constructor(array) {
        this.sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(this.sortedArray);
    }

    buildTree(sortedArray) {
        if (sortedArray.length === 0) return null;

        const mid = Math.floor(sortedArray.length / 2);
        const node = new Node(sortedArray[mid]);
        node.left = this.buildTree(sortedArray.slice(0, mid));
        node.right = this.buildTree(sortedArray.slice(mid + 1));
        return node;
    }    

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
        }
      }
    }
