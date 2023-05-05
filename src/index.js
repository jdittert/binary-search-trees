import Tree from "./tree";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// tree.delete(4);

tree.prettyPrint();

console.log(tree.find(7));

tree.postOrder(console.log);