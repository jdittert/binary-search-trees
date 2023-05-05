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

  
    function min(root) {
      let min = root.data;
      while (root.left !== null) {
        min = root.left.data;
        root = root.left;
      }
      return min;
    };
