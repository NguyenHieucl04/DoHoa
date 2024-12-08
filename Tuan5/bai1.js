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
 var goc =0.0;
function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
  var u_matran = gl.getUniformLocation(gl.program, 'u_matran');
  var matran = new Matrix4();
  matran.setRotate(goc, 0, 0, 1);
  matran.translate(0.35, 0, 0, 1);
  
  var n = initVertexBuffers(gl);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
  var tick = function(){
		goc = goc + 0.5;
		matran.setRotate(goc, 0, 0, 1);
        matran.translate(0.35, 0, 0, 1);
		gl.uniformMatrix4fv(u_matran, false, matran.elements);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLES, 0, n);
		requestAnimationFrame(tick);
  }
  tick();  
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,   0.5, -0.5
  ]);
  var n = 3; // The number of vertices  
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return n;
}
