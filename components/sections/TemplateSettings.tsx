import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cog } from "lucide-react";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

type Props = {};

const TemplateSettings = () => {
  const { status, setStatus, setImageUrl, getTemplate, imageUrl } =
    useTemplateBuilderStore();
  const { isUploading, error, uploadImage } = useCloudinaryUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setImageUrl(imageUrl);
    }
  }, [imageUrl, setImageUrl]);

  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-2">
        Settings <Cog size={20} />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit your Template Settings</SheetTitle>
          <SheetDescription className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-lg text-primary font-semibold">Status</p>
              <Select
                onValueChange={(value) =>
                  setStatus(value as "draft" | "published")
                }
                defaultValue={status}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Template Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg text-primary font-semibold">
                Template Feature Image
              </p>
              <Input
                type="file"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              {isUploading && <p>Uploading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="w-full">
                <Image
                  src={imageUrl || "/placeholders/template_img.png"}
                  alt="Feature Image"
                  className="object-cover w-full h-full border rounded-lg"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TemplateSettings;
