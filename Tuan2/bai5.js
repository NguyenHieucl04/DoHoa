var VSHADER_SOURCE =
'attribute vec4 a_position;\n' +
'attribute float a_size;\n' +
'void main() {\n' +
'    gl_Position = a_position;\n' +
'    gl_PointSize = a_size;\n' +
'}\n';
var FSHADER_SOURCE =
'void main() {\n' +
'    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n' +  
'}\n';
function main() {
    var canvas = document.getElementById('webgl');
    var vediem = document.getElementById('tam');
    var gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var a_size = gl.getAttribLocation(gl.program, 'a_size');
    var a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttrib3f(a_position, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_size, 20.0);
    gl.clearColor(0.0, 0.7, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
    vediem.onclick = function() {
        var x = parseFloat(myform.tx.value);
        var y = parseFloat(myform.ty.value);
        gl.vertexAttrib3f(a_position, x, y, 0.0);
        gl.clearColor(0, 1, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
