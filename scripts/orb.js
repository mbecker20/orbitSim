class Orb {
    constructor(p0,m,key) {
        this.p=p0;
        this.m=m;
        this.key=key;
        this.pullScale=1;
        this.step=this.stepHolding;
        this.draw=this.drawHolding;
        this.projSteps=800;
    }

    stepHolding(gravFunc,dt) {
        if(!mouseIsPressed) {
            this.release();
        } else {
            this.projPath=this.projectPath(gravFunc,dt);
        }
    }

    stepFree(gravFunc,dt) {
        const pv=VF.rk4Double(gravFunc,[this.p,this.v],dt);
        this.p=pv[0];
        this.v=pv[1];
    }

    stepFree2(gravFunc,dt) {
        //no correction
        const a=gravFunc(this.p,this.v)[1]
        this.p=math.add(this.p,math.multiply(this.v,dt));
        this.v=math.add(this.v,math.multiply(a,dt));
    }

    release() {
        this.v=math.multiply(VF.R([mouseX,mouseY],this.p),this.pullScale)
        this.step=this.stepFree2;
        this.draw=this.drawFree;
    }

    drawHolding() {
        stroke(window.LIGHTBLUE);
        strokeWeight(2);
        P5F.dottedLine([mouseX,mouseY],this.p,16);
        const toArrow=math.multiply(math.add(this.p,math.multiply([mouseX,mouseY],-1)),this.pullScale);
        const arrowHead=math.add(this.p,toArrow);
        P5F.arrow(this.p,arrowHead,(1/15));
        P5F.dottedCurve(this.projPath);
        stroke(255);
        fill("red");
        circle(this.p[0],this.p[1],20);
    }

    drawFree() {
        stroke(255);
        fill("red");
        circle(this.p[0],this.p[1],20);
    }

    projectPath(gravFunc,dt) {
        let v=math.multiply(VF.R([mouseX,mouseY],this.p),this.pullScale);
        let p=this.p;
        let path=[p];
        let a;
        for(var i=1; i<this.projSteps; i++) {
            a=gravFunc(p,v)[1]
            p=math.add(p,math.multiply(v,dt));
            v=math.add(v,math.multiply(a,dt));
            path.push(p);
        }
        return path;
    }
}

class GravPoint {
    constructor(p,m) {
        this.p=p;
        this.m=m;
        this.rMultiplier=1
        this.setR();
    }

    draw() {
        stroke(255);
        fill(window.LIGHTBLUE);
        circle(this.p[0],this.p[1],this.r);
    }

    setR() {
        this.r=this.rMultiplier*math.sqrt(this.m);
    }
}