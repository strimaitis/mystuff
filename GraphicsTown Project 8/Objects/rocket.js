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
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var Rocket = undefined;
var SpinningRocket = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    Rocket = function Rocket(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rocket.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["rocket-vs", "rocket-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
        
      
        0.0,  0.7,  0.0,   0.0,  0.4,  0.2,    0.1,  0.4, 0.0,
        0.0,  0.7,  0.0,   0.0,  0.4, -0.2,   -0.1,  0.4, 0.0,
        0.0,  0.7,  0.0,   0.0,  0.4,  0.2,   -0.1,  0.4, 0.0,
        0.0,  0.7,  0.0,   0.0,  0.4, -0.2,    0.1,  0.4, 0.0,
      
        0.0,  0.0,  0.0,   0.0,  0.4,  0.2,    0.1,  0.4, 0.0,
        0.0,  0.0,  0.0,   0.0,  0.4, -0.2,   -0.1,  0.4, 0.0,
        0.0,  0.0,  0.0,   0.0,  0.4,  0.2,   -0.1,  0.4, 0.0,
        0.0,  0.0,  0.0,   0.0,  0.4, -0.2,    0.1,  0.4, 0.0,
        
        -0.05, -0.4,  -0.05,   -0.2, -0.4,  0.0,   0.0,  0.0,  0.0,
        -0.05, -0.4,  -0.05,    0.0, -0.4,  -0.2,  0.0,  0.0,  0.0,
        0.05, -0.4,  0.05,     0.2, -0.4,  0.0,   0.0,  0.0,  0.0,
        0.05, -0.4,  0.05,     0.0, -0.4,   0.2,  0.0,  0.0,  0.0,
        
        -0.05, -0.4,  0.05,     -0.2, -0.4,  0.0,   0.0,  0.0,  0.0,
        -0.05, -0.4,  0.05,     0.0, -0.4,   0.2,  0.0,  0.0,  0.0,
        0.05, -0.4,  -0.05,     0.2, -0.4,   0.0,   0.0,  0.0,  0.0,
        0.05, -0.4,  -0.05,     0.0, -0.4,  -0.2,  0.0,  0.0,  0.0,
                ] },
                
                vnormal : {numComponents:3, data: [

                   //  0.86, -0.28, 0.43,    0.86, -0.28, 0.43,     0.86, -0.28, 0.43,   -0.86, -0.28, -0.43,   -0.86, -0.28, -0.43,  -0.86, -0.28, -0.43,
                   //  0.86, -0.28,-0.43,    0.86, -0.28,-0.43,     0.86, -0.28,-0.43,   -0.86, -0.28,  0.43,   -0.86, -0.28,  0.43,  -0.86, -0.28,  0.43,
                   
                    0.86, 0.28, 0.43,     0.86, 0.28, 0.43,      0.86, 0.28, 0.43,   -0.86,  0.28, -0.43,   -0.86,  0.28, -0.43,  -0.86,  0.28, -0.43,
                    0.86,-0.28,-0.43,     0.86,-0.28,-0.43,      0.86,-0.28,-0.43,   -0.86, -0.28,  0.43,   -0.86, -0.28,  0.43,  -0.86, -0.28,  0.43,
     
                   -0.88, 0.22,-0.44,    -0.88, 0.22,-0.44,     -0.88, 0.22,-0.44,   0.88,  0.22,  0.44,     0.88,  0.22,  0.44,   0.88,  0.22,  0.44,
                   -0.88, -0.22, 0.44,   -0.88, -0.22, 0.44,   -0.88, -0.22, 0.44,   0.88, -0.22, -0.44,     0.88, -0.22, -0.44,   0.88, -0.22, -0.44,
                    
                   
                  -0.31, 0.16, -0.94,    -0.31, 0.16, -0.94,   -0.31, 0.16, -0.94,   0.94, -0.16, 0.31,    0.94, -0.16, 0.31,    0.94, -0.16, 0.31,
                   0.31, 0.16,  0.94,     0.31, 0.16,  0.94,    0.31, 0.16,  0.94,  -0.94, -0.16,-0.31,   -0.94, -0.16,-0.31,   -0.94, -0.16,-0.31,
                   0.31, 0.16, -0.94,     0.31, 0.16, -0.94,    0.31, 0.16, -0.94,  -0.94,  0.16, 0.31,   -0.94,  0.16, 0.31,   -0.94,  0.16, 0.31,
                  -0.31, 0.16,  0.94,    -0.31, 0.16,  0.94,   -0.31, 0.16,  0.94,   0.94,  0.16,-0.31,    0.94,  0.16,-0.31,    0.94,  0.16,-0.31,
                  
                    
                   
                    

                ]}
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }

    };
    Rocket.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
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
    Rocket.prototype.center = function(drawingState) {
        return this.position;
    }


    ////////
    // constructor for Cubes
    SpinningRocket = function SpinningRocket(name, position, size, color, axis) {
        Rocket.apply(this,arguments);
        this.axis = axis || 'X';
    }
    SpinningRocket.prototype = Object.create(Rocket.prototype);
    SpinningRocket.prototype.draw = function(drawingState) {
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
    SpinningRocket.prototype.center = function(drawingState) {
        return this.position;
    }


})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.

grobjects.push(new Rocket("Idle Rocket",[0,4.0, 0],1.85));

grobjects.push(new SpinningRocket("Spinning rocket",[-2,0.5,  2],1.4,  [1,0,0], 'Y'));
grobjects.push(new SpinningRocket("Shooting rocket",[ 2,0.5,  2],1));
