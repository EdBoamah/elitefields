'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useState, useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

// Type for Cloudinary result
interface CloudinaryResult {
  info: {
    secure_url: string;
  };
}

interface ImageUploadProps {
  onChange: (value: string[]) => void; // Expecting an array of image URLs
  value: string[]; // Array of image URLs
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(value);

  // Maximum number of files allowed
  const MAX_FILES = 10;

  // Handle image upload success
  const handleUpload = useCallback(
    (result: CloudinaryResult) => { // Typed result as CloudinaryResult
      // Check if we already have the maximum number of files
      if (uploadedImages.length >= MAX_FILES) {
        alert("You can only upload a maximum of 10 images.");
        return;
      }

      const newImageUrl = result.info.secure_url;

      // Update the uploaded images state by adding the new image URL
      setUploadedImages((prevImages) => {
        const updatedImages = [...prevImages, newImageUrl];

        // Ensure we do not exceed the maximum number of files
        if (updatedImages.length > MAX_FILES) {
          updatedImages.pop(); // Remove the last image to respect the max file limit
        }

        onChange(updatedImages); // Update the parent component with the new array of URLs
        return updatedImages;
      });
    },
    [uploadedImages, onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="skxq5weq" // Your upload preset
      options={{ maxFiles: MAX_FILES - uploadedImages.length }} // Ensure that no more than the allowed number of files are uploaded
    >
      {({ open }) => {
        const handleClick = () => {
          if (open) {
            open();
          } else {
            console.warn("Open function is not available");
          }
        };

        return (
          <div
            onClick={handleClick}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
            items-center
            gap-4
            text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>

            {/* Display preview images if any */}
            {uploadedImages.length > 0 && (
              <div className="flex gap-4 mt-4">
                {uploadedImages.map((imageUrl, index) => (
                  <div key={index} className="w-24 h-24 relative">
                    <Image
                      alt={`Uploaded Image ${index + 1}`}
                      src={imageUrl}
                      width={96}
                      height={96}
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
