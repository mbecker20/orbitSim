class P5F {
    static lineFromMat(mat) { //draws line from 2 points given in mat
        line(mat[0][0],
            mat[0][1],
            mat[1][0],
            mat[0][1]);
    };

    static lineFromVec(vec0,vec1) {
        line(vec0[0],
            vec0[1],
            vec1[0],
            vec1[1]);
    };

    static boxFromMat(mat) {
        quad(mat[0][0],mat[0][1],
            mat[1][0],mat[1][1],
            mat[2][0],mat[2][1],
            mat[3][0],mat[3][1]);
    }

    static linesFromMat(mat) { 
        //draws lines between points in order from mat of points
        for(let i=0; i<mat.length-1; i++) {
            line(mat[i][0],
                mat[i][1],
                mat[i+1][0],
                mat[i+1][1]);
        }
    }

    static dottedLine(start,end,N) {
        //N must be even
        const line=VF.linspace2D(start,end,N);
        for(var i=0; i<line.length; i=i+2) {
            P5F.lineFromVec(line[i],line[i+1]);
        }
    }

    static dottedCurve(curve) {
        //curve must have even number points
        for(var i=0; i<curve.length; i=i+2) {
            P5F.lineFromVec(curve[i],curve[i+1]);
        }
    }

    static arrow(start,end,spreadMult) {
        P5F.lineFromVec(start,end);
        const r=VF.R(start,end);
        const negR=math.multiply(r,-1);
        const leftP=math.multiply(math.multiply(r,[[0,1],[-1,0]]),spreadMult);
        const rightP=math.multiply(leftP,-1);
        const a1=math.add(end,math.add(math.multiply(negR,spreadMult),leftP));
        const a2=math.add(end,math.add(math.multiply(negR,spreadMult),rightP));
        P5F.lineFromVec(end,a1);
        P5F.lineFromVec(end,a2);
    }
}