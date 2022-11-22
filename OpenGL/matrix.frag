#version 460 core

in vec2 TexCoords;

out vec4 FragColor;

uniform sampler2D emit;
uniform vec3 offset;
void main()
{
    //FragColor = vec4(vec3(1.0f,0,0), 1.0f);
    FragColor = vec4(5.0f*vec3(texture(emit, TexCoords + vec2(offset))), 1.0f);
}