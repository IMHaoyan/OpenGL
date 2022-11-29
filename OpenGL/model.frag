#version 330 core
out vec4 FragColor;

in vec3 Normal;
in vec3 Position;

uniform vec3 cameraPos;
uniform samplerCube skybox;
uniform Material material;
void main()
{             
    vec3 viewDir = normalize(cameraPos - Position);
    vec3 normal = normalize(Normal);

    vec3 R = reflect(- viewDir, normal);
    vec3 reflectMap = vec3(texture(material.texture_diffuse1, TexCoord));
    vec3 reflection = vec3(texture(material.texture1, R).rgb) * reflectMap;

    float diff = max(normalize(dot(normal, viewDir)), 0.0f);
    vec3 diffuse = diff * vec3(texture(material.texture_diffuse1, TexCoord));

    FragColor = vec4(diffuse + reflection, 1.0f);
}


����texture_reflection1��Material�Y���Y�ģ����d�½o��ģ�ͣ���model.h������λ�Ì�
std::vector<texture> reflectionTexture= loadMaterialTexture(material, aiTextureType_AMBIENT, "texture_reflection");
�Kinsert��textures�С�

�K��mesh.h����λ�Ì���else if (name == "texture_reflection") number = std::to_string(reflectionNr ++ );

߀�о�������Ⱦ������shader.use()֮�᣺
shader.setInt("material.texture1", 3);
glActiveTexture(GL_TEXTURE3);
glBindTexture(GL_TEXTURE_CUBE_MAP, skyboxTextures);
�@�ӾͰ���պе�texture���뵽FragmentShader���ˡ�