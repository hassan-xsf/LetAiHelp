"use client";
import { useState, useRef } from "react";
import { Upload, Copy, FileSearch, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { objectDetectionService } from "@/services/objectDetection";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";

export default function ObjectDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<ObjectDetectionResponse | null>(null);

  const [finalFile, setFinalFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const objectDetection = useMutation({
    mutationFn: objectDetectionService,
    onSuccess: (res) => {
      if (!session.data) return;
      const newCredits = session.data.user.credits - Credits.ObjectDetection;
      session.update({
        credits: newCredits === 0 ? 1 : newCredits,
      });
      toast.success("Your object detection report is ready");
      setResults(res.data.data);
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFinalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFinalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (image && finalFile) {
      if (session.data.user.credits < Credits.ObjectDetection)
        return toast.error(
          "You don't have enough credits to perform this action"
        );
      if (objectDetection.isPending) return;

      const formData = new FormData();
      formData.append("image", finalFile);

      objectDetection.mutate(formData);

      toast.info("Detecting Object, Please wait...");
    } else {
      fileInputRef.current?.click();
    }
  };

  const copyResults = () => {
    const text = results?.result
      .filter((r) => r.score * 100 > 1)
      .map((r) => `${r.label}: ${(r.score * 100).toFixed(2)}%`)
      .join("\n");
    navigator.clipboard.writeText(text || "");
  };

  return (
    <div className="bg-white rounded-md dark:bg-zinc-950/90 text-white p-8 mt-10 h-[65vh]">
      <div className="flex items-center gap-3 justify-center ">
        <FileSearch size="20" className="text-black dark:text-white" />
        <h1 className="text-black dark:text-white font-semibold text-lg tracking-tight underline-offset-2 underline decoration-green-400 decoration-2">
          UPLOAD AN IMAGE THEN CLICK ON DETECT OBJECTS, OUR TOOL WILL SHOW YOU
          THE MOST OBVIOUS OBJECTS FOUND IN THE PICTURE.
        </h1>
      </div>
      <div className="max-w-6xl mx-auto pt-24 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[50vh] h-full">
          <div
            className="col-span-2 border-2 border-dashed rounded-lg p-4 dark:bg-zinc-800 flex flex-col items-center justify-center cursor-pointer border-green-400 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleUpload}
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="h-[40vh] w-full object-fill"
              />
            ) : (
              <>
                <Upload className="w-16 h-16 text-zinc-500 mb-4" />
                <p className="text-zinc-500">
                  Drop an image or click to upload
                </p>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              area-label={image ? "Detect Objects" : "Upload Image"}
              onClick={(e) => {
                e.stopPropagation();
                handleUpload();
              }}
              className="mt-3 bg-green-500 hover:bg-green-600 text-white"
            >
              {image ? (
                objectDetection.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={10} className="animate-spin" />
                    Detecting Objects...
                  </div>
                ) : (
                  "Detect Objects"
                )
              ) : (
                "Upload Image"
              )}
            </Button>
            {image && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                  setResults(null);
                }}
                className="mt-2 bg-zinc-700 hover:bg-zinc-600 text-white"
              >
                Upload a new image
              </Button>
            )}
          </div>

          <div className="dark:bg-zinc-800 border-green-400 border-2 rounded-lg p-4 h-[50vh] overflow-auto text-black dark:text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">DETECTION RESULTS</h2>
              <Button
                onClick={copyResults}
                className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            {results?.result && results.result.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-lg pb-2">OBJECT</th>
                    <th className="text-right text-lg pb-2">CONFIDENCE</th>
                  </tr>
                </thead>
                <tbody>
                  {results.result.map(
                    (result, index) =>
                      result.score * 100 > 1 && (
                        <tr
                          key={index}
                          className="border-t font-light border-zinc-700 text-sm"
                        >
                          <td className="py-2">{result.label}</td>
                          <td className="text-right py-2">
                            {(result.score * 100).toFixed(2)}%
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            ) : (
              <p className="text-zinc-500 text-center mt-8">
                Upload an image to see detection results
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
