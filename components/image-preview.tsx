'use client';

import { uploadImages } from '@/app/profile/actions';
import { Dropzone, DropzoneContent, DropzoneEmptyState, DropzoneProps } from '@/components/ui/shadcn-io/dropzone';
import { cn, isValidJSON } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Prop {
  initialValue?: string | null;
}

export default function ImagePreview({ initialValue }: Prop & DropzoneProps) {
  const [filePreview, setFilePreview] = useState<string[]>([]);

  useEffect(() => {
    if (initialValue) {
      const initialPreview: string[] = isValidJSON(initialValue) ? JSON.parse(initialValue) : [];
      console.log("INITIAL IMAGE", initialPreview)
      setFilePreview(initialPreview)
    }
  }, [initialValue]);

  return (
    <div className="h-[150px] flex justify-center gap-4 flex-grow">
      {filePreview && filePreview.map((src, index) => (
        <Image
          key={index}
          alt="Preview"
          className={cn(
            "aspect-square !h-full !w-auto object-cover",
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
  );
};