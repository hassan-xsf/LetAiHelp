export const imageModels = [
  "@cf/black-forest-labs/flux-1-schnell",
  "@cf/stabilityai/stable-diffusion-xl-base-1.0",
  "@cf/bytedance/stable-diffusion-xl-lightning",
] as const;

export const imageTypes = [
  "None",
  "Watercolor",
  "Dreamy",
  "Anime",
  "Retro",
  "Photo",
] as const;

export const imagePrompts = {
  None: "",
  Watercolor:
    "The following image needs to be generated in a watercolor painting style, with soft, flowing colors blending into one another. Please evoke a dreamy and fluid aesthetic.",
  Dreamy:
    "The following image needs to be generated in a dreamy and ethereal style, with soft pastels and blurred elements to convey a surreal and otherworldly mood.",
  Anime:
    "The following image needs to be generated in an anime style, with bold, expressive lines and vibrant colors. The characters should have exaggerated features and the background should be dynamic and lively.",
  Retro:
    "The following image needs to be generated in a retro style, reminiscent of vintage art from the 70s and 80s. Use grainy textures, muted colors, and nostalgic elements to create a throwback feel.",
  Photo:
    "The following image needs to be generated in a photorealistic style, with high detail and lifelike textures. Ensure the subject is depicted as accurately as possible, with sharp clarity and realistic lighting.",
};
