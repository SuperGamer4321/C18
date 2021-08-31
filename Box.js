//template
class Ball{
    /*Create the object for us 
    obj is made up of prop and methods
    */ 

    constructor(x,y,r){
        //defines the properties for the object
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = "blue";
    }

    display(){
        rectMode(CENTER);
        fill(this.color);
        circle(this.x,this.y,this.radius)
    }

    set_speed(v){
        this.x = this.x + v;
    } 
    set_color(col){
     this.color = col

    }

    set_speedy(speed){
     this.y = this.y - speed  
    }
    
}

