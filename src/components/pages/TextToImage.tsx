"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { Textarea } from "../ui/textarea";
import { Blend, Copy, Download, ImageIcon, Link, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  imageFormType,
  imageModels,
  imageSchema,
  imageTypes,
} from "@/schemas/imageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageService } from "@/services/image";
import { textLimits } from "@/constants/textLimits";

export default function TextToImage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<imageFormType>({
    defaultValues: {
      text: "",
      model: imageModels[0],
      type: imageTypes[0],
    },
    resolver: zodResolver(imageSchema),
  });
  const styleType = watch("type");
  const imageGeneration = useMutation({
    mutationFn: imageService,
    onSuccess: (res) => {
      toast.success("Your image is ready");

      console.log(getValues("model"));
      console.log(res.data);
      if (getValues("model") === "@cf/black-forest-labs/flux-1-schnell") {
        setGeneratedImage(
          "data:image/png;base64," + res.data.data.result.image
        );
      } else {
        const url = URL.createObjectURL(res.data);
        setGeneratedImage(url);
      }
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error("There was a problem, Error code: 500");
    },
  });
  const session = useSession();
  if (!session.data) return null;

  const onSubmit = async (data: imageFormType) => {
    if (session.data.user.credits < Credits.TextToImage)
      toast.error("You don't have enough credits to perform this action");

    if (imageGeneration.isPending) return;
    imageGeneration.mutate(data);
    toast.info("Generating image, Please wait...");

    const newCredits = session.data.user.credits - Credits.TextToImage;
    session.update({
      credits: newCredits === 0 ? 1 : newCredits,
    });
  };

  return (
    <div className="bg-white rounded-md dark:bg-zinc-950/50 text-white p-8 mt-10 h-[65vh]">
      <div className="flex items-center gap-3 justify-center "></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto mt-10"
      >
        <div className="flex flex-col">
          <h1 className="text-black dark:text-white">
            <Blend className="size-6 rounded-full bg-green-400 p-1 mr-2 inline" />
            SELECT MODEL
          </h1>
          <Select
            defaultValue={imageModels[0]}
            onValueChange={(value: (typeof imageModels)[number]) =>
              setValue("model", value)
            }
          >
            <SelectTrigger className="w-[360px] border-green-400 border-2 text-black dark:text-white my-2">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {imageModels.map((value, index) => (
                  <SelectItem key={index} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-zinc-800 dark:bg-zinc-800 rounded-lg p-6 flex flex-col">
            <Textarea
              placeholder="Write your desired text, make sure to refine your prompt using our AI tools for better results"
              {...register("text")}
              maxLength={textLimits.TextToImage}
              className="w-full h-40 bg-white dark:bg-zinc-900 border-green-400 text-white placeholder-zinc-400 mb-6"
            />
            {errors.text && (
              <p className="text-red-500">{errors.text.message}</p>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
                Styles
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {imageTypes.map((image, indx) => (
                  <div
                    key={indx}
                    onClick={() => setValue("type", image)}
                    className={`cursor-pointer rounded-lg overflow-hidden border ${
                      styleType.toLowerCase() === image.toLowerCase()
                        ? "border-green-400 border-2"
                        : "border-zinc-800 dark:border-white"
                    }`}
                  >
                    <img
                      src={`/${image.toLowerCase()}.png`}
                      alt={image}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-2 text-sm text-center text-black dark:bg-black dark:text-white">
                      {image}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white mt-auto"
            >
              {imageGeneration.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-7 ml-2 text-white animate-spin" />
                  Generating Image
                </div>
              ) : (
                "Generate Image"
              )}
            </Button>
          </div>

          <div className="bg-white border-2 border-zinc-800 dark:bg-zinc-800 rounded-lg p-6 flex flex-col">
            <div className="flex justify-between items-c enter mb-4">
              <h2 className="text-xl font-semibold">Generated Image</h2>
              <a
                target="_blank"
                href={generatedImage || "#"}
                download={
                  generatedImage ? `letaihelp.me${Date.now()}.png` : undefined
                }
                className={`flex items-center bg-green-500 text-sm hover:bg-green-700 text-white px-3 py-1 rounded transition-colors ${
                  generatedImage ? "cursor-pointer" : "pointer-events-none"
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </div>
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-auto rounded-lg flex-grow object-cover"
              />
            ) : (
              <div className="flex-grow border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">
                    Your generated image will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary); // Convert binary string to Base64
}
