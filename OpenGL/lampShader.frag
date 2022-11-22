#version 460 core
out vec4 FragColor;
uniform vec3 lightEmit;
void main()
{
    FragColor = vec4(lightEmit, 1.0f); // 将向量的四个分量全部设置为1.0
}