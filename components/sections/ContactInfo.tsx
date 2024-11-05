"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useContactInfo from "@/hooks/useContactInfo";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ContactFormProps {
  setIsOpen: (open: boolean) => void;
  setContactInfo: (contact: any) => void;
}

const ContactForm = ({ setIsOpen, setContactInfo }: ContactFormProps) => {
  const { saveContactInfo, isLoading, error } = useContactInfo();
  const { data: session } = useSession();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const accountData = {
      Name: session?.user?.name as string,
      Site: formData.get("website") as string,
      Phone: formData.get("phone") as string,
      Website: formData.get("website") as string,
      Type: "Prospect",
      ContactInfo: {
        FirstName: formData.get("firstName") as string,
        LastName: formData.get("lastName") as string,
        Title: formData.get("title") as string,
        Email: formData.get("email") as string,
        Phone: formData.get("phone") as string,
        MobilePhone: formData.get("mobile") as string,
      },
    };

    const data = await saveContactInfo(accountData);
    setContactInfo(data);

    setIsOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form
      className="border px-3 py-4 rounded-md flex flex-col gap-4"
      onSubmit={handleFormSubmit}
    >
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" name="firstName" placeholder="John" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" name="lastName" placeholder="Doe" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-1/4">
          <Label htmlFor="title">Title (optional)</Label>
          <Input type="text" name="title" placeholder="Dr." />
        </div>
        <div className="flex flex-col gap-2 w-3/4">
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" name="email" placeholder="john.doe@example.com" />
        </div>
      </div>
      <div>
        <Label htmlFor="website">Personal Website</Label>
        <Input type="url" name="website" placeholder="www.johndoe.com" />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input type="tel" name="phone" placeholder="+1 (555) 123-4567" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input type="tel" name="mobile" placeholder="+1 (555) 987-6543" />
      </div>
      <Button type="submit">Save this information</Button>
    </form>
  );
};

interface ContactEditFormProps {
  contactInfo: any;
  setIsOpen: (open: boolean) => void;
  setContactInfo: (contact: any) => void;
}

const ContactEditForm = ({
  contactInfo,
  setIsOpen,
  setContactInfo,
}: ContactEditFormProps) => {
  const { updateContactInfo } = useContactInfo();

  const [contact, setContact] = useState(contactInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = await updateContactInfo(contactInfo.id, contact);

    setContactInfo(updatedData);
    setIsOpen(false);
  };

  return (
    <form
      className="border px-3 py-4 rounded-md flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            name="FirstName"
            placeholder="John"
            defaultValue={contact.FirstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            name="LastName"
            placeholder="Doe"
            defaultValue={contact.LastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-1/4">
          <Label htmlFor="title">Title (optional)</Label>
          <Input
            type="text"
            name="Title"
            placeholder="Dr."
            defaultValue={contact.Title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-3/4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="Email"
            placeholder="john.doe@example.com"
            defaultValue={contact.Email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="website">Personal Website</Label>
        <Input
          type="url"
          name="website"
          placeholder="www.johndoe.com"
          defaultValue={contact.website}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          type="tel"
          name="phone"
          placeholder="+1 (555) 123-4567"
          defaultValue={contact.phone}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input
          type="tel"
          name="MobilePhone"
          placeholder="+1 (555) 987-6543"
          defaultValue={contact.MobilePhone}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Update information</Button>
    </form>
  );
};

const ContactInfo = () => {
  const { saveContactInfo, getContactInfo, isLoading, error } =
    useContactInfo();
  const { data: session } = useSession();
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (session?.accessToken) {
      getContactInfo().then((data) => setContactInfo(data));
    }
  }, [session?.accessToken]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (contactInfo) {
    return (
      <div className="flex gap-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Edit Contact</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="pb-4">
              <DialogTitle>Edit your contact information</DialogTitle>
            </DialogHeader>
            <ContactEditForm
              contactInfo={contactInfo}
              setIsOpen={setIsOpen}
              setContactInfo={setContactInfo}
            />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Contact</Button>
          </DialogTrigger>
          <DialogContent className="bg-muted">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-2xl">
                View your contact information
              </DialogTitle>
              <DialogDescription>
                View your contact information.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between ">
                <div className="flex flex-col gap-2 w-1/2">
                  <span className="font-bold text-sm">First Name:</span>
                  <span className="">{contactInfo.FirstName}</span>
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <span className="font-bold text-sm">Last Name:</span>
                  <span className="">{contactInfo.LastName}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 w-1/2">
                  <span className="font-bold text-sm">Email:</span>
                  <span className="">{contactInfo.Email}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 w-1/2">
                  <span className="font-bold text-sm">Phone:</span>
                  <span className="">{contactInfo.phone || "N/A"}</span>
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <span className="font-bold text-sm">Mobile:</span>
                  <span className="">{contactInfo.MobilePhone || "N/A"}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-sm">Website:</span>
                <span className="">
                  {contactInfo.website ? (
                    <Link href={contactInfo.website} target="_blank">
                      {contactInfo.website}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-sm">Description:</span>
                <span className="">{contactInfo.description || "N/A"}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-4">
          <DialogTitle>Add your contact information</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add your contact information to your profile.
          </p>
        </DialogHeader>
        <ContactForm setIsOpen={setIsOpen} setContactInfo={setContactInfo} />
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfo;
