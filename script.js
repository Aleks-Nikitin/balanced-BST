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
         for (let i = 0; i < this.arr.length; i++) {
            const element = this.arr[i];
            if(this.arr.indexOf(element) != this.arr.lastIndexOf(element)){
                this.arr.splice(i,1);
                i=-1;
            }
            function compareNumbers(a,b){
            return a-b;
        }
            this.arr.sort(compareNumbers);
                
            }
        }
    buildTree(array,start,end){
        if(start>end) return null
        let mid = start+Math.floor((end-start)/2);
        let root = new Node(array[mid]);
        root.left = this.buildTree(array,start,mid-1);
        root.right = this.buildTree(array,mid+1,end);
        return  root;

    }
    insert(value,tree){
        if(value > tree.data & tree.right !=null){
            return this.insert(value,tree.right)
        }
        if(value < tree.data & tree.left !=null){
            return this.insert(value,tree.left)
        }
        if(value > tree.data & tree.right ==null){
            return tree.right = new Node(value);
        }
        if(value < tree.data & tree.left ==null){
            return tree.left = new Node(value);
            
        }

    }
    deleteItem(value,tree,prev,stack=[]){
        // prev needs to be removed cuz there is stack for it
        if(value == tree.data){
            if(tree.right !=null & tree.left !=null){
                if(tree.right.left == null){
                    tree.data = tree.right.data;
                    tree.right =null;
                    return 
                  
                } 
                if(tree.right.left !== null){ 
                    
                    let n = tree.right.left
                 
                    let parentRem = tree.right;
            
                    while (n.left != null) {
                        if(n.left != null){
                            parentRem = n;
                            n = n.left
                        }
                    }
                    tree.data = n.data;
                    parentRem.left = null;
              
                    return
                   
                }
            }
            if(tree.right != null || tree.left !=null){
                let childNode=null;
                let parent = stack[stack.length-1];
                let parentLink=null;
                parent.right == tree.data? parentLink = parent.right: parentLink= parent.left;
                if(tree.right != null){
                    childNode= tree.right;
                    tree.right = null;
                    parentLink = childNode;
                }
                else{
                    childNode= tree.left;
                    tree.left = null;
                    parentLink =childNode;
                }
                tree.data = childNode.data

                return

            }
            if(tree.right == null && tree.left == null){
                //prev needs to be changed to stack
                for(let i =0; i<stack.length;i++){
                    let node = stack[i];
                }
                if(prev.left != null && Object.values(prev.left).includes(value)){
                    prev.left = null
                    return
                }
                prev.right = null
                return
            }
        }
        if(value > tree.data & tree.right !=null){
            stack.push(tree);
            return this.deleteItem(value,tree.right,tree,stack)
        }
        if(value < tree.data & tree.left !=null){
            stack.push(tree);
            return this.deleteItem(value,tree.left,tree,stack)
        }
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
}
let test = new Tree([5,99,2,2,2,2,2,2,2,2,2,28,7,7,7]);
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
//console.log(test.root);
//prettyPrint(test.root)
test.insert(1,test.root);
test.insert(22,test.root);
test.insert(18,test.root);
test.insert(24,test.root);
test.insert(17,test.root);
test.insert(17.8,test.root);
test.insert(3,test.root);
test.insert(6,test.root);
test.insert(23,test.root);
//console.log(test.root);
prettyPrint(test.root);
test.deleteItem(2,test.root);
prettyPrint(test.root);
console.log(test.find(3,test.root))

