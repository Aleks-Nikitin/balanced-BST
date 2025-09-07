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

}
let test = new Tree([5,99,2,2,2,2,2,2,2,2,2,28,7,7,7]);
console.log(test.root)
