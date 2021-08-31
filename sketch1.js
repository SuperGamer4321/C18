var stu1;
var stu2;
var mark = [];
function setup(){
  stu1 = new Student("John",12,6);
  stu2 = new Student ("Sarah",10,5);
  stu1.display();
  stu2.display();
  mark.push(98);
  mark.push(99);
  mark.push(96);
  console.log(mark[mark.length-1])
}



