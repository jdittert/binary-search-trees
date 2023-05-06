import Node from "./node"

export class Tree {
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
    
    insert(value, root = this.root) { 
      if (root === null) {
        root = new Node(value);
        return root;
      } 
      if (value < root.data) {
        root.left = this.insert(value, root.left);
      } else if (value > root.data) {
        root.right = this.insert(value, root.right);
      }
      return root;
    }

    delete(value, root = this.root) {
      if (root === null) return root;
      if (value < root.data) {
        root.left = this.delete(value, root.left);
      } else if (value > root.data) {
        root.right = this.delete(value, root.right);
      } else {
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;
        root.data = min(root.right);
        root.right = this.delete(root.data, root.right);        
      }
      return root;
    }

    find(value, root = this.root) {
      if (!root) return null;
      if (root.data === value) return root;
      if (value < root.data) {
        root = this.find(value, root.left);
      } else if (value > root.data) {
        root = (this.find(value, root.right));
      }      
      return root;
    }

    levelOrder(fnc, root = this.root) {
      if (root === null) return null;
      if (fnc) {
        const queue = [];
        queue.push(root);
        while (queue.length > 0) {
          const current = queue[0];
          fnc(current);
          if (current.left !== null) queue.push(current.left);
          if (current.right !== null) queue.push(current.right);
          queue.shift();
        }
      }
      if (!fnc) {
        const queue = [];
        const values = [];
        queue.push(root);
        while (queue.length > 0) {
          const current = queue[0];
          values.push(current.data);
          if (current.left !== null) queue.push(current.left);
          if (current.right !== null) queue.push(current.right);
          queue.shift()
        }
        return values;
      }
    }

    inOrder(fnc, root = this.root) {
      if (root === null) return;
      if (fnc) {
        if (root === null) return;
        this.inOrder(fnc, root.left)
        fnc(root.data);
        this.inOrder(fnc, root.right);
      }
      if (!fnc) {        
        const values = [];
        const helper = root => {
          if (root === null) return;
          helper(root.left);
          values.push(root.data);
          helper(root.right);
        }
        helper(root);
        return values;        
      }
    }

    preOrder(fnc, root = this.root) {
      if (root === null) return; 
      if (fnc) {
        if (root === null) return;
        fnc(root);
        this.preOrder(fnc, root.left);
        this.preOrder(fnc, root.right);
      }
      if (!fnc) {
        const values = [];
        const helper = root => {
          if (root === null) return;
          values.push(root.data);
          helper(root.left);
          helper(root.right);
        }
        helper(root);
        return values;
      }
    }

    postOrder(fnc, root = this.root) {
      if (root === null) return; 
      if (fnc) {
        if (root === null) return;        
        this.preOrder(fnc, root.left);
        this.preOrder(fnc, root.right);
        fnc(root);
      }
      if (!fnc) {
        const values = [];
        const helper = root => {
          if (root === null) return;
          helper(root.left);
          helper(root.right);
          values.push(root.data);
        }
        helper(root);
        return values;
      }
    }

    height(root = this.root) {
      if (root === null) return -1;
      const leftHeight = this.height(root.left);
      const rightHeight = this.height(root.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, root = this.root, d = 0) {
      if (node === null) return 0;

      if (node.data === root.data) return d;
      if (root.data < node.data) {
        return this.depth(node, root.right, d + 1)
      }
      return this.depth(node, root.left, d + 1);
     }

     isBalanced(root = this.root) {
      const l = this.height(root.left);
      const r = this.height(root.right);
      if (Math.abs(l - r) > 1) return false;
      return true;
     }

     rebalance() {
      const newArray = this.inOrder();
      return new Tree(newArray);
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
    
export function createArray(value) {
    const array = [];
    let i;
    for (i = 0; i < value; i++) {
      const num = Math.floor(Math.random() * 9000);
      array.push(num);
    }
    return array;
  }

  
    function min(root) {
      let min = root.data;
      while (root.left !== null) {
        min = root.left.data;
        root = root.left;
      }
      return min;
    };
