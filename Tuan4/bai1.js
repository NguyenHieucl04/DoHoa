var VSHADER_SOURCE =
	'attribute vec4 a_position;\n'+
	'uniform mat4 u_translation;\n' +
	'void main(){\n'+
		'gl_Position = u_translation * a_position;\n'+
	'}\n';
var FSHADER_SOURCE = 
	'precision mediump float;\n'+
	'uniform vec4 u_color;\n'+
	'void main(){\n'+
	'	gl_FragColor = u_color;\n'+
	'}\n';
function main(){
	// hinh chu nhat
    // var vertices = new Float32Array([
    //     -0.5, 0.5, 
    //     -0.5, -0.5, 
    //      0.5, -0.5, 
    //      0.5, 0.5 
    // ])
	// hình ngũ giác
	// var vertices = new Float32Array([
	// 	0.0, 0.8,
	// 	-0.8, 0.2,
	// 	-0.5, -0.5,
	// 	0.5, -0.5,
	// 	0.8, 0.2
	// ]);
	
	// hình lục giác
	// var vertices = new Float32Array([
	// 	0.0, -0.5,
	// 	-0.4, -0.25,
	// 	-0.4, 0.25,
	// 	0.0, 0.5,
	// 	0.4, 0.25,
	// 	0.4, -0.25
	// ]);
	
	// hình ngôi sao
	var vertices = [];
	var step = 3.14 / 6.0;
	var i;
	var angle, r;
	for (i = 0; i < 12; ++i) {
	r = (i % 2 == 0 ? 0.5 : 1);
	angle = i * step;
	vertices.push(r * Math.cos(angle));
	vertices.push(r * Math.sin(angle));
	
		}
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	var a_position = gl.getAttribLocation(gl.program, 'a_position');
	var u_color = gl.getUniformLocation(gl.program, 'u_color');

    var u_translation = gl.getUniformLocation(gl.program, 'u_translation');

	var translation = new Float32Array([
		1.0, 0.0, 0.0, 0.0, 
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 
        0.5, 0.5, 0.0, 1.0
	])
	gl.uniformMatrix4fv(u_translation, false, translation)
    
	var Dem = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, Dem);
	// gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); 
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0); 
	gl.enableVertexAttribArray(a_position);

    
	gl.uniform4f(u_color, 1.0, 0.0, 1.0, 1.0);

	gl.clearColor(0.0, 0.5, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
    
	// gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
	// gl.drawArrays(gl.TRIANGLE_FAN, 0, 5);
	// gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 12);
}