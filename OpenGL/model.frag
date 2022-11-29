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


其中texture_reflection1是Material結構裏的，下載新給的模型，在model.h中相應位置寫
std::vector<texture> reflectionTexture= loadMaterialTexture(material, aiTextureType_AMBIENT, "texture_reflection");
並insert到textures中。

並在mesh.h相應位置寫上else if (name == "texture_reflection") number = std::to_string(reflectionNr ++ );

還有就是在渲染流程中shader.use()之後：
shader.setInt("material.texture1", 3);
glActiveTexture(GL_TEXTURE3);
glBindTexture(GL_TEXTURE_CUBE_MAP, skyboxTextures);
這樣就把天空盒的texture傳入到FragmentShader中了。