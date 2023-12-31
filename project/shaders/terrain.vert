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
uniform sampler2D altimetryTexture;

varying float heightOffset;


void main() {
    heightOffset = (texture2D(heightMap, aTextureCoord).r+texture2D(heightMap, aTextureCoord).g+texture2D(heightMap, aTextureCoord).b)/3.0;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy, aVertexPosition.z + 50.0*heightOffset, 1.0);
	vTextureCoord = aTextureCoord;
}

