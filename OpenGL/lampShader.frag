#version 460 core
out vec4 FragColor;
uniform vec3 lightEmit;
void main()
{
    FragColor = vec4(lightEmit, 1.0f); // ���������ĸ�����ȫ������Ϊ1.0
}