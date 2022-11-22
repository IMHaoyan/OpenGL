#version 460 core
in vec3 Normal;
in vec3 FragPos;
in vec2 TexCoords;

out vec4 FragColor;

struct Light {
    vec3 position;

    float constant;
    float linear;
    float quadratic;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
}; 
struct Material {
    sampler2D diffuse;
    sampler2D specular;
    float shininess;
}; 

uniform Light light;
uniform Material material;
uniform vec3 viewPos;

void main()
{
    vec3 norm = normalize(Normal);
    vec3 frag_to_light = light.position - FragPos;
    vec3 lightDir = normalize(frag_to_light);
    float distance = length(frag_to_light);
    float attenuation = 1.0 / (light.constant + light.linear * distance + 
                light.quadratic * (distance * distance));

    float diff = max(dot(norm, lightDir), 0.0f);
    vec3 diffuse = diff * light.diffuse * vec3(texture(material.diffuse, TexCoords));
   
    vec3 ambient = light.ambient * vec3(texture(material.diffuse, TexCoords));

    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0f), material.shininess);
    vec3 specular = spec * light.specular * vec3(texture(material.specular, TexCoords));

    vec3 result = (ambient + diffuse + specular) * attenuation;
    FragColor = vec4(result, 1.0);
}