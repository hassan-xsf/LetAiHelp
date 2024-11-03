"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { Textarea } from "../ui/textarea";
import { Blend, Download, ImageIcon, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { imageFormType, imageSchema } from "@/schemas/imageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageService } from "@/services/image";
import { textLimits } from "@/constants/textLimits";
import { imageModels, imageTypes } from "@/constants/image";

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
      if (!session.data) return null;

      toast.success("Your image is ready");
      console.log(getValues("model"));
      if (getValues("model") === "@cf/black-forest-labs/flux-1-schnell") {
        setGeneratedImage(
          "data:image/png;base64," + res.data.data.result.image,
        );
      } else {
        const url = URL.createObjectURL(res.data);
        setGeneratedImage(url);
      }
      const newCredits = session.data.user.credits - Credits.TextToImage;
      session.update({
        credits: newCredits === 0 ? 1 : newCredits,
      });
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
      return toast.error(
        "You don't have enough credits to perform this action",
      );

    if (imageGeneration.isPending) return;
    imageGeneration.mutate(data);
    toast.info("Generating image, Please wait...");
  };

  return (
    <div className="mt-5 min-h-[65vh] rounded-md bg-white p-6 text-white dark:bg-zinc-950/50">
      <div className="flex items-center justify-center gap-3"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-6xl">
        <div className="flex flex-col">
          <h1 className="text-sm text-black dark:text-white sm:text-base">
            <Blend className="mr-2 inline size-6 rounded-full bg-green-400 p-1" />
            SELECT MODEL
          </h1>
          <Select
            defaultValue={imageModels[0]}
            onValueChange={(value: (typeof imageModels)[number]) =>
              setValue("model", value)
            }
          >
            <SelectTrigger
              aria-label="Select Model"
              className="my-2 w-[200px] border-2 border-green-400 text-black dark:text-white sm:w-[360px]"
            >
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
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="flex flex-col rounded-lg border-2 border-zinc-800 bg-white p-6 dark:bg-zinc-800">
            <Textarea
              placeholder="Write your desired text, make sure to refine your prompt using our AI tools for better results"
              {...register("text")}
              maxLength={textLimits.TextToImage}
              className="sm:min-h-30 mb-6 min-h-20 w-full border-green-400 bg-white text-xs text-black placeholder-zinc-400 dark:bg-zinc-900 dark:text-white sm:text-base md:min-h-40"
            />

            {errors.text ? (
              <p className="text-xs text-red-500">{errors.text.message}</p>
            ) : (
              <p className="text-xs text-green-500">
                Minimum input prompt is 5
              </p>
            )}

            <div className="mb-6">
              <h2 className="text-md mb-3 font-semibold text-black dark:text-white sm:text-xl">
                Styles
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {imageTypes.map((image) => (
                  <div
                    key={image.toLowerCase()}
                    onClick={() => setValue("type", image)}
                    className={`cursor-pointer overflow-hidden rounded-lg border ${
                      styleType.toLowerCase() === image.toLowerCase()
                        ? "border-2 border-green-400"
                        : "border-zinc-800 dark:border-white"
                    }`}
                  >
                    <img
                      src={`/${image.toLowerCase()}.png`}
                      alt={image}
                      className="min-h-14 w-full object-cover lg:min-h-24"
                    />
                    <div className="p-2 text-center text-xs text-black dark:bg-black dark:text-white sm:text-sm">
                      {image}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              aria-label="Generate Image"
              type="submit"
              className="mt-auto w-full bg-green-500 text-white hover:bg-green-700"
            >
              {imageGeneration.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="ml-2 size-7 animate-spin text-white" />
                  Generating Image
                </div>
              ) : (
                "Generate Image"
              )}
            </Button>
          </div>

          <div className="flex flex-col rounded-lg border-2 border-zinc-800 bg-white p-6 dark:bg-zinc-800">
            <div className="items-c enter mb-4 flex justify-between">
              <h2 className="text-xs font-semibold md:text-lg xl:text-xl">
                Generated Image
              </h2>
              <a
                target="_blank"
                href={generatedImage || "#"}
                download={
                  generatedImage ? `letaihelp.me${Date.now()}.png` : undefined
                }
                className={`flex items-center rounded bg-green-500 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700 ${
                  generatedImage ? "cursor-pointer" : "pointer-events-none"
                }`}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </div>
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="h-auto w-full flex-grow rounded-lg object-cover"
              />
            ) : (
              <div className="flex flex-grow items-center justify-center rounded-lg border-2 border-dashed border-zinc-700">
                <div className="text-center">
                  <ImageIcon className="mx-auto mb-4 min-h-48 w-16 text-zinc-600" />
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
