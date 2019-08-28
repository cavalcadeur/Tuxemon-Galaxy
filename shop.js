class Shop extends Object {
    
    constructor(img,taille,pos,mass){
        super(img,taille,pos,mass);

        this.isShop = true;
    }
    
    draw(Painter){
        Painter.imgObj(this.img,this.position[0],this.position[1],this.size,this.r,true);
    }
    
    act(t,keyBoard,objects,g){
        let force = this.getForce(objects);
        this.r += this.rotSpeed * 0.1 * Math.abs(this.dir[0] + this.dir[1]);
        this.dir[0] += force[0] * g; this.dir[1] += force[1] * g;
        this.position[0] += this.dir[0]; this.position[1] += this.dir[1];
    }
    
};
