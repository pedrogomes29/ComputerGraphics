#ifdef GL_ES
precision highp float;
#endif


attribute vec3 aVertexPosition;
uniform float timeFactor;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float normScale;


varying float y;

void main() {
    float offset=normScale*sin(timeFactor);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    gl_Position.x += offset;
	y = gl_Position.y;
}

