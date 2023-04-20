#ifdef GL_ES
precision highp float;
#endif


attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D terrainTexture;
uniform sampler2D heightMap;
varying float z;


void main() {
    float verticalOffset = texture2D(heightMap, aTextureCoord).b;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy, aVertexPosition.z + verticalOffset, 1.0);
	z = verticalOffset + aVertexPosition.z;
	vTextureCoord = aTextureCoord;
}

