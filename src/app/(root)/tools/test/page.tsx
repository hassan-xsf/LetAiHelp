"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function SimpleAIStream() {
  const [streamData, setStreamData] = useState("");

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    try {
      const response = await axios.post("/api/test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });
      console.log(response.data);
      const url = URL.createObjectURL(response.data);
      console.log(url);
      setStreamData(url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl">
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
        <img src={streamData} alt="Stream Data" />
      </div>
    </div>
  );
}
