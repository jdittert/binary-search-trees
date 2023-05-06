import {Tree, createArray} from "./tree";

let tree = new Tree(createArray(10));

tree.prettyPrint();

console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

tree.insert(200);
tree.insert(300);
tree.insert(400);

tree.prettyPrint();

console.log(tree.isBalanced());

tree = tree.rebalance();

tree.prettyPrint();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());