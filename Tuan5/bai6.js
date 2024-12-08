var VSHADER_SOURCE = 
'attribute vec4 a_Position;\n'+
'uniform mat4 u_xformMatrix;\n'+
'void main() {\n'+
    'gl_Position = u_xformMatrix*a_Position;\n'+
    // 'gl_Position = a_Position;\n'+
    'gl_PointSize = 10.0;\n'+
'}\n';

var FSHADER_SOURCE = 
'void main() {\n' +
    'gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);\n' +
  '}\n';

var currentAngle = 0.0;
function main(){
    var canvas = document.getElementById("cava");
    var gl = getWebGLContext(canvas);
    

    var vertices = new Float32Array([
        -0.5, 0.0, 0.0, //v0
        0.0, 0.5, 0.0, //v1
        0.0, 0.0, 0.5, //v2
        0.5, 0.0, 0.0, //v3
        0.0, 0.5, 0.0, //v4
        0.0, 0.0, -0.5, //v5
        -0.5, 0.0, 0.0 //v6
    
    ]);


    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    
    //b3
    var u_xformMatrix = gl.getUniformLocation(gl.program,'u_xformMatrix');
    
    var xformMatrix = new Matrix4();
    //tao bo dem doi tuong
    var vertexBuffer = gl.createBuffer();
    //Tuan 5
    var tick = function(){
        currentAngle += 0.5
        xformMatrix.setRotate(currentAngle,1.0,1.0,1.0);
        gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);
        //xoa hinh cu
        gl.clear(gl.COLOR_BUFFER_BIT);
        //ve hinh moi
        for(var i = 0; i < 5; i++)
            gl.drawArrays(gl.LINE_LOOP, i, 3);
        
        requestAnimationFrame(tick);
    }
    tick();

    gl.bindBuffer (gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program,'a_Position')

    gl.vertexAttrib3f(a_Position, 0.5,0.5, 0.0);
    gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    
}