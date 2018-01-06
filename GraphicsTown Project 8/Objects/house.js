/**
 * Created by gleicher on 10/9/15.
 */
/*
 a second example object for graphics town
 check out "simplest" first

 the cube is more complicated since it is designed to allow making many cubes

 we make a constructor function that will make instances of cubes - each one gets
 added to the grobjects list

 we need to be a little bit careful to distinguish between different kinds of initialization
 1) there are the things that can be initialized when the function is first defined
    (load time)
 2) there are things that are defined to be shared by all cubes - these need to be defined
    by the first init (assuming that we require opengl to be ready)
 3) there are things that are to be defined for each cube instance
 */
 
 // https://c1.staticflickr.com/9/8652/16693081991_883bec4f88_z.jpg
 
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var House = undefined;
var SpinningHouse = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    House = function House(name, position, rotation, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.rotation = rotation || 1.0;
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    
    House.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["house-vs", "house-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vPosition : { numComponents: 3, data: [
     // Back Roof
     0.00000,   1.000000,  0.000000,
     1.100000,  0.750000,  0.000000,
     0.000000,  0.750000,  1.100000,
     // Roof 2
     0.000000,  1.000000,  0.000000,
     1.100000,  0.750000,  0.000000,
     0.000000,  0.750000, -1.100000,
     // Roof 3
     0.000000,  1.000000,  0.000000,
    -1.100000,  0.750000,  0.000000,
     0.000000,  0.750000,  1.100000,
     // Roof 4
     0.000000,  1.000000,  0.000000,
    -1.100000,  0.750000,  0.000000,
     0.000000,  0.750000, -1.100000,
     
    // BACK WALL
     1.000000,  0.750000,  0.000000,
     1.000000,  0.000000,  0.000000,
     0.000000,  0.000000,  1.000000,
     0.000000,  0.750000,  1.000000,
     1.000000,  0.750000,  0.000000,
     0.000000,  0.000000,  1.000000,
     
    // LEFT WALL
     1.000000,  0.750000,  0.000000,
     1.000000,  0.000000,  0.000000,
     0.000000,  0.000000, -1.000000,
     0.000000,  0.750000, -1.000000,
     1.000000,  0.750000,  0.000000,
     0.000000,  0.000000, -1.000000,
      
    // Front edge left
     0.000000,  0.750000, -1.000000,
     0.000000,  0.000000, -1.000000,
    -0.100000,  0.000000, -0.900000,
    -0.100000,  0.000000, -0.900000,
    -0.100000,  0.750000, -0.900000,
     0.000000,  0.750000, -1.000000,
     
    // RIGHT WALL
    -1.000000,  0.750000,  0.000000,
    -1.000000,  0.000000,  0.000000,
     0.000000,  0.000000,  1.000000,
     0.000000,  0.750000,  1.000000,
    -1.000000,  0.750000,  0.000000,
     0.000000,  0.000000,  1.000000,
      
    // Front edge right
    -0.900000,  0.000000, -0.100000,
    -0.900000,  0.750000, -0.100000,
    -1.000000,  0.750000,  0.000000,
    
    -1.000000,  0.000000,  0.000000,
    -0.900000,  0.000000, -0.100000,
    -1.000000,  0.750000,  0.000000,
    
    // GROUND
  //  -1.000000,  0.00000,  0.000000,
  //   1.000000,  0.000000, 0.000000,
  //   0.000000,  0.000000, -1.000000,
  //  -1.000000,  0.00000,  0.000000,
  //   1.000000,  0.000000, 0.000000,
  //   0.000000,  0.000000, 1.000000,
                ] },
                
                vNormal : {numComponents: 3, data: [

     // Back Roof
     0.0,       1.0,    0.0,
    -0.21636,  -0.952, -0.21636,
    -0.21636,  -0.952, -0.21636,

    // Left Roof
     0.0,       1.0,    0.0,
     0.21636,  -0.952, -0.21636,
     0.21636,  -0.952, -0.21636,
    // Right Roof
     0.0,       1.0,    0.0,
    -0.21636,  -0.952, 0.21636,
    -0.21636,  -0.952, 0.21636,
    // Front Roof
     0.0,       1.0,    0.0,
     0.21636,  -0.952, 0.21636,
     0.21636,  -0.952, 0.21636,
     
    // BACK WALL
     0.707107,  0.0,  0.707107,
     0.707107,  0.0,  0.707107,
     0.707107,  0.0,  0.707107,
     0.707107,  0.0,  0.707107,
     0.707107,  0.0,  0.707107,
     0.707107,  0.0,  0.707107,
    
    // LEFT WALL
     0.707107,  0.0,  -0.707107,
     0.707107,  0.0,  -0.707107,
     0.707107,  0.0,  -0.707107,
     0.707107,  0.0,  -0.707107,
     0.707107,  0.0,  -0.707107,
     0.707107,  0.0,  -0.707107,
    
    // Front Left Edge
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
     
    // RIGHT WALL
    -0.707107,  0.0,  0.707107,
    -0.707107,  0.0,  0.707107,
    -0.707107,  0.0,  0.707107,
    -0.707107,  0.0,  0.707107,
    -0.707107,  0.0,  0.707107,
    -0.707107,  0.0,  0.707107,
    
    // Front Right Edge
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
    -0.707107,  0.0,  -0.707107,
     
    // GROUND
    //  0.0, 0.75, 0.0,
     
                ]}              
	
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }

    };
    
    House.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        twgl.m4.rotateY(modelM, this.rotation, modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, model: modelM, lightdir:drawingState.sunDirection,
            cubecolor:this.color, 
            // What to set texSampler1 and textSampler2 to
            });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    House.prototype.center = function(drawingState) {
        return this.position;
    }


	    ////////
    // constructor for Cubes
    SpinningHouse = function SpinningHouse(name, position, size, color, axis) {
        House.apply(this,arguments);
        this.axis = axis || 'X';
    }
    SpinningHouse.prototype = Object.create(House.prototype);
    SpinningHouse.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        var theta = Number(drawingState.realtime)/200.0;
        var y = Number(drawingState.realtime)/400.0;
        if (this.axis == 'X') {
            twgl.m4.rotateX(modelM, theta, modelM);
        } else if (this.axis == 'Z') {
            twgl.m4.rotateZ(modelM, theta, modelM);
        } else {
            twgl.m4.rotateY(modelM, theta, modelM);
            // twgl.m4.translation([0,y,0]);
            
        }
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    SpinningHouse.prototype.center = function(drawingState) {
        return this.position;
    }


})();
// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.

// grobjects.push(new House("Idle House",[0.0, 0.0, 0.0], 3 * Math.PI/4, 1.75, [1.0, 0.0, 1.0]));
grobjects.push(new SpinningHouse("Spinning House",[4.0, 0.1, 0.0], 0.0, 1.0, [1.0, 0.0, 0.0]));