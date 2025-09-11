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
    height(value,queue=[[this.find(value,this.root)]],current=0){
        let root= this.find(value,this.root); 
        if(root.data ==null) return 0
        if(root.right == null && root.left ==null) return 0
        current++;
       if(root.right != null || root.left != null){
            queue[current]=[];// empties array that contains previous value
                                // so not all values are there in the end
            if(root.left !=null){
                queue[current].push(root.left)
                this.height(root.left.data,queue,current)
            }
            if(root.right!=null){
                queue[current].push(root.right)
                this.height(root.right.data,queue,current)
            }
       }
       return queue.length-1
    }
    depth(value){
        let rootHeight = this.height(this.root.data);
        let elemHeight = this.height(value);
        return rootHeight - elemHeight;
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
test.insert(0,test.root)
prettyPrint(test.root);
console.log(test.depth(0));
