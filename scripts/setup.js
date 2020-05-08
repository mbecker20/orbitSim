function setup() {
    //colors
    window.TEAL=color('hsl(160, 100%, 50%)')
    window.LIGHTBLUE=color(50,150,255)
    window.G=10000;

    const GP1=new GravPoint([600,400],1000)
    const GP2=new GravPoint([450,400],1000)
    const GP3=new GravPoint([750,400],1000)
    window.gravPoints=[GP2,GP3];

    const dt=.02;

    createCanvas(windowWidth,windowHeight);
    window.anim=new PhysAnim(dt);
}

function draw() {
    window.anim.stepAnim();
}
