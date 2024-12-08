var VSHADER_SOURCE =
  'uniform mat4 u_matran;\n'+
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
    '  gl_Position = u_matran * a_Position;\n' +
  '}\n';
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';
 var goc = 0.0;
 var Q = 0.5;
function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
  var u_matran = gl.getUniformLocation(gl.program, 'u_matran');
  var matran = new Matrix4();
  matran.setRotate(goc, 1, 1, 1);
//   matran.translate(0.35, 0, 0, 1);
  
  var n = initVertexBuffers(gl);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (var i=0; i<=20; i+=4){
    gl.drawArrays(gl.LINE_LOOP, i, 4);
}
  var tick = function(){
		goc = goc + Q;
		matran.setRotate(goc, 1, 1, 1);
        // matran.translate(0.35, 0, 0, 1);
		gl.uniformMatrix4fv(u_matran, false, matran.elements);
		gl.clear(gl.COLOR_BUFFER_BIT);
		for (var i=0; i<=20; i+=4){
            gl.drawArrays(gl.LINE_LOOP, i, 4);
        }
		requestAnimationFrame(tick);
  }
  tick();  
//   setTimeout(dung, 5000);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    //front 
		-0.5, -0.5,  0.5,
		0.5, -0.5,  0.5,
		0.5,  0.5,  0.5,
	   -0.5,  0.5,  0.5,

	  // Back face
	   -0.5, -0.5, -0.5,
	   -0.5,  0.5, -0.5,
		0.5,  0.5, -0.5,
		0.5, -0.5, -0.5,

	   // Top face
	   -0.5,  0.5, -0.5,
	   -0.5,  0.5,  0.5,
		0.5,  0.5,  0.5,
		0.5,  0.5, -0.5,

	   // Bottom face
	   -0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5,  0.5,
	   -0.5, -0.5,  0.5,

	   // Right face
		0.5, -0.5, -0.5,
		0.5,  0.5, -0.5,
		0.5,  0.5,  0.5,
		0.5, -0.5,  0.5,

	   // Left face
	   -0.5, -0.5, -0.5,
	   -0.5, -0.5,  0.5,
	   -0.5,  0.5,  0.5,
	   -0.5,  0.5, -0.5,		
  ]);
//   var n = 3; // The number of vertices  
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
//   return n;
}
function trai(){
    Q = 0.5;
}
function phai(){
    Q = -0.5;
}
function dung(){
    Q = 0.0;
}