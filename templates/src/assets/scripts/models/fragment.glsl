in vec3 vertexColor;
varying vec2 v_uv;
uniform sampler2D u_image;

void main() {
    vec4 image = texture2D(u_image, v_uv);

	// Calculate greyscale
    float grey = (image.r + image.g + image.b)/3.0;

	// Mixing the greyscale and the image
    gl_FragColor = mix( image, vec4(vec3(grey), 1.0), vertexColor.b);
}