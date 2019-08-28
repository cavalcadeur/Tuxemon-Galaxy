class Object {
    
    constructor(img,taille,pos,mass,dir){
        this.r = Math.random()*6.28;
        this.rotSpeed = Math.random()*0.02 - 0.01;
        if (img == "tuto"){
            this.r = 0; this.rotSpeed = 0;
        }
        this.img = new Image();
        this.img.src = "images/" + img + ".png";
        this.size = taille;
        this.position = pos;
        if (mass == undefined){
            this.mass = taille*10;
        }
        else this.mass = mass;
        this.vanishing = false; this.dead = false;
        if (dir == undefined) this.dir = [0,0];
        else this.dir = dir;
    }

    pos(){
        return this.position;
    }

    goTo(pos){
        this.position = pos;
    }

    getR(){
        return this.r;
    }

    isDead(){
        return this.dead;
    }

    slowDown(n,dir){
        // Slow down the object relatively to the speed in dir
        // So the player isn't startled when the object doesn't match is speed anymore
        if (dir != undefined) {this.dir[0] -= dir[0]; this.dir[1] -= dir[1];}
        this.dir[0] *= n; this.dir[1] *= n;
        if (dir != undefined) {this.dir[0] += dir[0]; this.dir[1] += dir[1];}
    }
    
    getMass(){
        return this.mass;
    }

    capturable(){
        return !this.vanishing;
    }

    getSize(){
        return this.size;
    }
    
    draw(Painter){
        Painter.imgObj(this.img,this.position[0],this.position[1],this.size,this.r);
    }

    getDist(loc){
        return Math.hypot(this.position[0] - loc[0], this.position[1] - loc[1]);
    }

    getInfo(){
        return [this.img,this.size];
    }

    applyForce(force){
        this.dir[0] += force[0]; this.dir[1] += force[1];
    }
    
    getForce(objects){
        let force = [0,0];
        for (let i = 0; i < objects.length; i ++){
            let pos = objects[i].pos();
            let dist = this.getDist(pos);
            if (dist*4 > this.size + objects[i].getSize()){
                let newVect = [pos[0] - this.position[0],pos[1] - this.position[1]];
                dist = 1 / (dist**3);
                newVect[0] = newVect[0] * objects[i].getMass() * dist;
                newVect[1] = newVect[1] * objects[i].getMass() * dist;                
                force[0] += newVect[0];
                force[1] += newVect[1];
            }
        }
        return force;
    }

    vanish(){
        this.vanishing = true; this.mass = 0;
    }
    
    act(t,keyBoard,objects,g){
        if (this.vanishing){
            this.r += 0.1;
            this.size *= 0.9;
            if (this.size <= 1) this.dead = true;
        }
        else{
            let force = this.getForce(objects);
            this.r += this.rotSpeed * 0.1 * Math.abs(this.dir[0] + this.dir[1]);
            this.dir[0] += force[0] * g; this.dir[1] += force[1] * g;
            this.position[0] += this.dir[0]; this.position[1] += this.dir[1];
        }
    }
    
};
