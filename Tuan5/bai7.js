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
    
    //thông tin hình
    var vertices = []; //mảng sẽ lưu 3 điểm x,y,z
    var step = 2*3.14 /150; //bước quay để chia đều thành 1000 đỉnh
    var bankinh = 0.5; //bán kính của nón và trụ

    //Hình nón (tạo 150 đỉnh)
    vertices.push(0.0,0.8,0.0); //đẩy vào mảng 1 đỉnh đầu
    //Điểm này là đỉnh của mặt nón (điểm cao nhất) 
    //và các đoạn thẳng từ đỉnh này sẽ kết nối đến các điểm 
    //trên chu vi đáy của hình nón để tạo nên các tam giác.
    

    //càng nhiều đỉnh thì càng dày 
    // càng ít thì khoảng cách giữa các đường càng thưa
    for (var i = 0;i<=150;i++){
        if (i%2==0 && i!=0)
            //câu lệnh này là để thêm vào đỉnh trùng với đỉnh gốc
            vertices.push(0.0,0.8,0.0); // tạo đỉnh top
        var angle = i * step;// thay đổi góc 
        var x = bankinh * Math.cos(angle);
        var y = bankinh * Math.sin(angle);
        vertices.push(x,0.0,y); // tạo đỉnh đáy
    }
    //Mỗi lần chạy sẽ push vào 1 đỉnh ở bên 
    // 1 đỉnh thỉ là gốc trên
    // 1 đỉnh thì là đỉnh đã được tạo ở i -2




    //Hình trụ
    var bankinhtru = 0.3;
    for (var i = 0;i<=150;i++){
        var angle = i * step;
        var x = bankinhtru * Math.cos(angle);
        var y = bankinhtru * Math.sin(angle);
        //đỉnh trên(z=0) nằm trên gốc tọa độ
        vertices.push(x,0.0,y);
        //đỉnh dưới (z=-z)
        vertices.push(x,-0.8,y);
    }
    
    var xformMatrix = new Matrix4(); 

    xformMatrix.setRotate(45, 1.0, 0, 1.0)
    xformMatrix.translate(-0.2,0.4,0)

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    var u_xformMatrix = gl.getUniformLocation(gl.program,'u_xformMatrix');

    gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);

    var vertexBuffer = gl.createBuffer();

    var tick = function(){
        currentAngle += 0.5
        xformMatrix.setRotate(currentAngle,1.0,1.0,1.0);
        gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);
        //xoa hinh cu
        gl.clear(gl.COLOR_BUFFER_BIT);
        //ve hinh moi

        for (var i = 0;i<151;i++){
            gl.drawArrays(gl.LINE_LOOP,i,10)
        }
           gl.drawArrays(gl.LINE_LOOP,152,vertices.length-151);
        
        requestAnimationFrame(tick);
    }
    tick();




    gl.bindBuffer (gl.ARRAY_BUFFER,vertexBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program,'a_Position')


    gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    
    
}

