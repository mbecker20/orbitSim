function setup() {
    //colors
    window.TEAL=color('hsl(160, 100%, 50%)')
    window.LIGHTBLUE=color(50,150,255)
    window.G=10000;

    const GP1=new GravPoint([600,400],1000)
    const GP2=new GravPoint([windowWidth/3,400],1000)
    const GP3=new GravPoint([2*windowWidth/3,400],1000)
    window.gravPoints=[GP2,GP3];

    const dt=.02;

    window.welcomeText = {text: 'click to create orb, drag to set trajectory'};
    window.welcomeText.exist = function() {
        if (mouseIsPressed) {
            window.welcomeText.exist = function() {}
        } else {
            textAlign(CENTER,CENTER);
            textSize(30);
            noStroke();
            fill(255);
            text(window.welcomeText.text, windowWidth/2, windowHeight/2);
        }
    }

    createCanvas(windowWidth,windowHeight);
    window.anim=new PhysAnim(dt);
}

function draw() {
    window.anim.stepAnim();
    window.welcomeText.exist();
}
