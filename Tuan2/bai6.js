var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
        'gl_Position = a_Position;\n' +
        'gl_PointSize = 20.0;\n' +
    '}\n';

var FSHADER_SOURCE = 
    'precision mediump float;\n' +
    'uniform vec4 u_color;\n' +
    'void main() {\n' +
        'gl_FragColor = u_color;\n' +
    '}\n';

function main() {
    var canvas = document.getElementById('example');
    var vediem = document.getElementById('tam');
    var gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var u_color = gl.getUniformLocation(gl.program, 'u_color');

    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.uniform4f(u_color, 1.0, 0.0, 1.0, 1.0);
    gl.clearColor(0.0, 0.5, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);

    vediem.onclick = function() {
        var x = myform.tx.value;
        var y = myform.ty.value;
        var r = myform.tr.value;
        var g = myform.tg.value;
        var b = myform.tb.value;

        gl.vertexAttrib3f(a_Position, x, y, 0.0);
        gl.uniform4f(u_color, r, g, b, 1.0);
        gl.clearColor(0.0, 0.5, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
    };
}
