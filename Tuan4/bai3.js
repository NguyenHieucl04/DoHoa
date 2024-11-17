var VSHADER_SOURCE =
	'attribute vec4 a_position;\n'+
	// 'uniform mat4 u_xformMatrix;\n'+
	'uniform mat4 u_trans;\n'+
    'uniform mat4 u_rot;\n'+
	'void main(){\n'+
		'gl_Position =u_trans * u_rot * a_position;\n'+
	'}\n';
var FSHADER_SOURCE = 
	'precision mediump float;\n'+
	'uniform vec4 u_color;\n'+
	'void main(){\n'+
	'	gl_FragColor = u_color;\n'+
	'}\n';
function main(){
	var vertices = new Float32Array([
		0.0, 0.5, 
		 -0.5, -0.5, 
		 0.5, -0.5,  

	])
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	var a_position = gl.getAttribLocation(gl.program, 'a_position');
	var u_color = gl.getUniformLocation(gl.program, 'u_color');

	var u_rot = gl.getUniformLocation(gl.program, 'u_rot');
    var u_trans = gl.getUniformLocation(gl.program, 'u_trans');
    
	
	
	var rot = new Float32Array([
        0.7, 0.7, 0.0, 0.0,
        -0.7, 0.7, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.0, 0.0, 0.0, 1.0
    ])
    var trans = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.5, 0.0, 1.0 
    ])
    

    gl.uniformMatrix4fv(u_trans, false, trans);
    gl.uniformMatrix4fv(u_rot, false, rot);
    
	
	var Dem = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, Dem);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); 
	gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0); 
	gl.enableVertexAttribArray(a_position);
	gl.uniform4f(u_color, 1.0, 0.0, 1.0, 1.0);
	gl.clearColor(0.0, 0.5, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}