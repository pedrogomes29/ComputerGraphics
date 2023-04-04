#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterTexture;
uniform sampler2D waterMap;
varying float animationOffset;
varying float verticalOffset;

void main() {
	vec4 color = texture2D(waterTexture, vec2(animationOffset, animationOffset) + vTextureCoord);
	gl_FragColor = color;
	gl_FragColor.rgb /= 0.85+7.5*verticalOffset;

}