(()=>{"use strict";class t{constructor(t){this.data=t,this.left=null,this.right=null}}const r=new class{constructor(t){this.sortedArray=[...new Set(t)].sort(((t,r)=>t-r)),this.root=this.buildTree(this.sortedArray)}buildTree(r){if(0===r.length)return null;const e=Math.floor(r.length/2),s=new t(r[e]);return s.left=this.buildTree(r.slice(0,e)),s.right=this.buildTree(r.slice(e+1)),s}prettyPrint(t=this.root,r="",e=!0){t.right&&this.prettyPrint(t.right,`${r}${e?"|   ":"    "}`,!1),console.log(`${r}${e?"└── ":"┌── "}${t.data}`),t.left&&this.prettyPrint(t.left,`${r}${e?"    ":"|   "}`,!0)}}([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);console.log(r),r.prettyPrint()})();