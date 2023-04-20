#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTexture;
uniform sampler2D heightMap;
uniform sampler2D altimetryTexture;

varying float heightOffset;

void main() {
	vec4 terrainColor = texture2D(terrainTexture, vTextureCoord);
	vec4 heightColor = texture2D(altimetryTexture,vec2(0,1.0-heightOffset));
	gl_FragColor = 0.7*terrainColor + 0.3*heightColor;
}