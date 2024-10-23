"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "/api/test",
        {},
        {
          responseType: "blob",
        }
      );
      console.log(response.data);
      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
    } catch (err) {
      setError("An error occurred while generating the image");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div>
        <Button
          onClick={generateImage}
          className="mb-4 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </Button>
        {error && <p className="text-destructive mb-4">{error}</p>}
        {imageUrl && (
          <div className="relative w-full aspect-square">
            <Image
              src={imageUrl}
              alt="Generated landscape with mountains and a lake"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
