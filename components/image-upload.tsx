'use client';

import { uploadImages } from '@/app/profile/actions';
import { Dropzone, DropzoneContent, DropzoneEmptyState, DropzoneProps } from '@/components/ui/shadcn-io/dropzone';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

interface Prop {
  onChange?: (filesNames?: string) => void;
}

export default function ImageUpload({onChange, ...props}: Prop & DropzoneProps) {
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string[]>([]);
  const handleDrop = async (files: File[]) => {
    
    setFiles(files);
    if (files.length > 0) {
      const res = await uploadImages(files);
      if (!res.ok) {
        console.error(res.message);
        toast.error(res.message);
        return;
      }
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   if (typeof e.target?.result === 'string') {
      //     setFilePreview(e.target?.result);
      //   }
      // };
      // reader.readAsDataURL(files[0]);
      setFilePreview(res.fileNames || [])
      if (onChange !== undefined) {
        onChange(res.fileNames ? JSON.stringify(res.fileNames) : "");
      }
      toast.success(res.message);
    }
  };

  const handleError = (error: Error) => {
    if (onChange !== undefined) {
      onChange("");
    }
    setFilePreview([]);
    toast.error(error.message);
  }
  return (
    <Dropzone
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] }}
      onDrop={handleDrop}
      onError={handleError}
      src={files}
      maxSize={5 * 1024 * 1024}
      className={filePreview.length > 0 ? "p-2" : ""}
      {...props}
    >
      <DropzoneEmptyState />
      <DropzoneContent>
        <div className="h-[150px] flex justify-center gap-4 flex-grow">
          {filePreview && filePreview.map((src, index) => (
            <Image
              key={index}
              alt="Preview"
              className={cn(
                "aspect-video !h-full !w-auto object-cover",
                props.multiple && "aspect-square"
              )}
              width={150}
              height={150}
              src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}${src}`}
              style={{
                width: 'auto',
                height: 'auto'
              }}
            />
          ))}
        </div>
      </DropzoneContent>
    </Dropzone>
  );
};