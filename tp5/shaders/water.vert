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
uniform sampler2D waterTexture;
uniform sampler2D waterMap;
uniform float timeFactor;
varying float verticalOffset;
varying float animationOffset;


void main() {
	animationOffset = timeFactor/100.0;
    verticalOffset = texture2D(waterMap, vec2(0,animationOffset) + aTextureCoord).b / 20.0;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xy, aVertexPosition.z + verticalOffset, 1.0);

	vTextureCoord = aTextureCoord;

}

