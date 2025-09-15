class Node{
    constructor(data){
        this.data = data;
        this.right=null;
        this.left = null;
    }
}
class Tree{
    constructor(arr){
        this.arr = arr;
        this.initialSort();
        this.root = this.buildTree(this.arr,0,this.arr.length-1);
    }
    initialSort(){
        this.arr = [...new Set(this.arr)] // removes duplicates
        function compareNumbers(a,b){
            return a-b;
        }
        this.arr.sort(compareNumbers);
        }
    buildTree(array,start,end){
        if(start>end) return null
        let mid = start+Math.floor((end-start)/2);
        let root = new Node(array[mid]);
        root.left = this.buildTree(array,start,mid-1);
        root.right = this.buildTree(array,mid+1,end);
        return  root;

    }
    insert(value,tree=this.root){
        if(tree == null){
            tree = new Node(value);
            return tree
        }
        if(value < tree.data){
            tree.left = this.insert(value,tree.left);
        }
        else if(value > tree.data){
            tree.right = this.insert(value,tree.right)
        }
        return tree
    }
    delete(data, node = this.root) {
    if (node == null) return node;

    if (data < node.data) node.left = this.delete(data, node.left);
    else if (data > node.data) node.right = this.delete(data, node.right);
    else {
      // node with only one child or no child
      if (node.left == null) return node.right;
      if (node.right == null) return node.left;

      // node with two children
      node.data = this.minValue(node.right);
      node.right = this.delete(node.data, node.right);
    }
    return node;
  }

  minValue(node) {
    let minv = node.data;
    while (node.left != null) {
      minv = node.left.data;
      node = node.left;
    }
    return minv;
  }
    find(value,tree){
        if(value == tree.data){
            return tree
        }
        if(value > tree.data & tree.right !=null){
            return this.find(value,tree.right)
        }
        if(value < tree.data & tree.left !=null){
            return this.find(value,tree.left);
        }
        return 'not found'
    }
    levelOrderForEach(node){
        // review how it could be done with with callback as an argument;
        let result = [];
        let queue = [node];
        while(queue.length >0){
            let current = queue[0];
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
            result.push(current);
            queue.shift()
        }
        return result;
    }
    inOrderForEach(node,result=[]){
        
        if(node ==null || node == undefined) return 
        this.inOrderForEach(node.left,result)
        result.push(node);
        this.inOrderForEach(node.right,result)
       return result
    }
    postOrderForEach(node,result=[]){
        if(node == null || node == undefined) return
        this.postOrderForEach(node.left,result);
        this.postOrderForEach(node.right, result);
        result.push(node);
        return result
    }
    preOrderForEach(node,result=[]){
       
        if(node == null || node == undefined) return
        result.push(node);
        this.preOrderForEach(node.left,result);
        this.preOrderForEach(node.right, result);
        return result
    }
    height(node){
        if(typeof node == 'number') node = this.find(node,this.root)
      if(node == null){
        return 0
      }
      let leftH = this.height(node.left);
      let rightH = this.height(node.right);
      return Math.max(leftH,rightH)+1
    }
    depth(data, node = this.root) {
    if(typeof data == 'number') data = this.find(data,this.root)
    if (node.data === data.data) return 0;
    if (data.data < node.data) return this.depth(data, node.left) + 1;
    if (data.data > node.data) return this.depth(data, node.right) + 1;
  }
    isBalanced(node=this.root){
        if(node == null || node ==undefined) return
        let rightH=0;
        let leftH=0;
        if(node.right !=null){
            rightH= this.height(node.right.data);
        }
        if(node.left !=null){
            leftH= this.height(node.left.data);
        }
            let diffH =Math.abs((rightH-leftH));
        
        if( diffH ==0|| diffH ==1 ){
            if(node.left!= null){
                return this.isBalanced(node.left);
            }
            if(node.right!=null){
                return this.isBalanced(node.right);
            }
            return true
        }else{
            return false
        }
    }
    rebalance(){
        let nodes = this.preOrderForEach(this.root);
        let nodesVal=[];
        nodes.forEach(element => {
            nodesVal.push(element.data);
        });
        function compareNumbers(a,b){
            return a-b;
        }
        nodesVal.sort(compareNumbers);
        this.root = this.buildTree(nodesVal,0,nodesVal.length-1);
            
    }
}
let test = new Tree([1, 2, 3, 4, 5, 6, 7]);
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

