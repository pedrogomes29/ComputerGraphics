#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTexture;
uniform sampler2D heightMap;
varying float z;

void main() {
	vec4 terrainColor = texture2D(terrainTexture, vTextureCoord);
	vec4 heightColor = texture2D(heightMap,vec2(0,z));
	gl_FragColor = heightColor;
}