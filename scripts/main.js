class PhysAnim {
    constructor(dt) {
        this.orbs={};
        this.orbKey=0;
        this.coolOffCount=0;
        this.coolOffMax=30;
        this.directOrb=false;
        this.dt=dt;
        this.step=this.stepEat;
    }

    stepAnim() {
        this.step();
        this.updatePicture();
        if(!this.directOrb) {
            if(mouseIsPressed) {
                this.directOrb=true;
                this.orbs[this.orbKey]=new Orb([mouseX,mouseY],50,this.orbKey);
            }
        } else {
            if(!mouseIsPressed) {
                this.directOrb=false;
                this.orbKey++;
            }
        }
    }

    stepNoEat() {
        for(var key in this.orbs) {
            this.orbs[key].step(this.gravFunc,this.dt);
        }
    }

    stepEat() {
        for(var key in this.orbs) {
            this.orbs[key].step(this.gravFunc,this.dt);
            let toDelete=false;
            for(var i=0; i<window.gravPoints.length; i++) {
                if(VF.mag(VF.R(this.orbs[key].p,window.gravPoints[i].p))<0.6*window.gravPoints[i].r) {
                    window.gravPoints[i].m=window.gravPoints[i].m+this.orbs[key].m;
                    window.gravPoints[i].setR();
                    toDelete=true;
                }
            }
            if(toDelete) {
                delete this.orbs[key];
            }
        }
    }

    gravFunc(x,v) {
        let a=[0,0];
        let r;
        for(var i=0; i<window.gravPoints.length; i++) {
            r=VF.R(x,window.gravPoints[i].p);
            a=math.add(a,math.multiply(r,window.G*window.gravPoints[i].m/Math.pow(VF.mag(r),3)));
        }
        return [v,a];
    }

    drawStatic() {
        for(var i=0; i<window.gravPoints.length; i++) {
            window.gravPoints[i].draw();
        }
    }

    drawDynamic() {
        for(var key in this.orbs) {
            this.orbs[key].draw();
        }
    }

    updatePicture() {
        if(!keyIsDown(66)) {
            background(0)
        }
        //this.drawUI();
        this.drawDynamic();
        this.drawStatic();
    }

    setupUI() {
        
    }

    drawUI() {
        //updates and draws UI. facilitates interaction
        
    }

    justDrawUI() {
        //for when stepToMouse is active. UI interaction disabled
        
    }
}