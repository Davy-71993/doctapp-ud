"use client";

import { ImagePlaceholder } from "@/components/image-placeholder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useAppStore } from "@/lib/store";
import { getProfile } from "@/server-actions/auth";
import {
  fetchDocuments,
  uploadDocuments,
  uploadFiles,
} from "@/server-actions/fetch";
import { Description } from "@radix-ui/react-dialog";
import { LoaderCircle, UploadCloud } from "lucide-react";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

export const UploadDocumentDialog = ({
  onNewDocumenst,
}: {
  onNewDocumenst: (urls: string[]) => void;
}) => {
  const [newDocuments, setNewDocuments] = useState<File[]>([]);
  const [open, setOpen] = useState<boolean>();
  const [uploading, setUploading] = useState(false);
  const { profile } = useAppStore();

  const handleUpload = async () => {
    setUploading(true);
    if (newDocuments.length === 0) {
      toast({
        title: "Error.",
        description: "Select atleast one file to upload",
        variant: "destructive",
      });
      setUploading(false);
      return;
    }

    if (!profile) {
      setUploading(false);
      toast({
        title: "Error.",
        description: "Authentication error.",
        variant: "destructive",
      });

      return;
    }

    const res = await uploadFiles(newDocuments, "documents", profile.id);

    const newUrls = res
      .filter((r) => typeof r.url === "string")
      .map((r) => r.url);
    setUploading(false);
    onNewDocumenst(newUrls);
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button className="absolute right-6">Upload documents</Button>
      </DialogTrigger>
      <Description />
      <DialogContent>
        <DialogTitle>Upload documents</DialogTitle>
        <Dropzone
          maxFiles={5}
          onDrop={(acceptedFiles) => setNewDocuments(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border-2 border-dotted p-5 rounded-md text-muted-foreground text-center h-60 w-full flex flex-col gap-5 justify-center items-center"
            >
              <input {...getInputProps()} accept="image/*" />
              {newDocuments.length > 0 ? (
                newDocuments.map((d, i) => (
                  <p key={i} className="text-lg">
                    {d.name}
                  </p>
                ))
              ) : (
                <>
                  <UploadCloud size={40} />
                  <p className="">
                    Drag and drop the document files here, or click to select a
                    files
                  </p>
                </>
              )}
            </div>
          )}
        </Dropzone>
        <DialogFooter className="">
          <Button variant={"outline"}>Cancel</Button>
          <Button disabled={newDocuments.length < 1} onClick={handleUpload}>
            {uploading ? (
              <>
                <LoaderCircle className="animate-spin" /> Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<string[]>([]);

  let { profile, setProfile } = useAppStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) {
        const { data } = await getProfile();
        setProfile(data ?? null);
        profile = data ?? null;
      }
      const { data, error } = await fetchDocuments();
      if (error) {
        toast({
          title: "Error.",
          description:
            "An error occured while fetching your profiessional documents",
          variant: "destructive",
        });
      }
      setDocuments(data?.documents ?? []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleNewDocuments = (newUrls: string[]) => {
    setDocuments([...documents, ...newUrls]);
    uploadDocuments([...documents, ...newUrls], profile?.doctor?.id ?? "");
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-2xl">Professional documents</h1>
        <UploadDocumentDialog onNewDocumenst={handleNewDocuments} />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [1, 2, 3].map((e) => <Skeleton key={e} className="w-full h-60" />)
        ) : documents.length > 0 ? (
          documents.map((d, i) => (
            <ImagePlaceholder key={i} id={i.toString()} image={{ url: d }} />
          ))
        ) : (
          <div className="bg-muted col-span-1 md:col-span-2 gap-4 lg:col-span-3 p-5 flex flex-col justify-center items-center">
            <p className="text-lg text-muted-foreground ">
              Oops! no documents uploaded
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
