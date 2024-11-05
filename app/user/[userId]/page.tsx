import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/providers";
import Link from "next/link";
import ContactInfo from "@/components/sections/ContactInfo";

export const metadata = {
  title: "User Profile",
  description: "User Profile",
};

// Change this to an async function
async function page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  // Dynamic placeholder for the user's avatar
  const robohashUrl = `https://robohash.org/${userId}?set=set3`;

  // Get the session server-side
  const session = await getServerSession(authOptions);

  const user = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const userData = await user.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-muted shadow-lg rounded-lg overflow-hidden py-5">
        <div className="md:flex justify-between px-5">
          <div className="flex gap-4">
            <div className="md:flex-shrink-0">
              <Image
                className="h-48 w-full object-cover md:w-48 rounded-full border-2 border-gray-200 dark:border-gray-700"
                src={userData.avatar || robohashUrl}
                alt="Profile"
                width={192}
                height={192}
              />
            </div>
            <div className="p-8">
              <p className="uppercase tracking-wide text-indigo-500 dark:text-indigo-400 font-semibold text-2xl">
                {userData.name || "Anonymous User"}
              </p>
              <p className="text-muted-foreground text-sm">{userData.email}</p>
            </div>
          </div>
          {(session?.user?.id === userId ||
            session?.user?.role === "admin") && <ContactInfo />}
        </div>

        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Hi there! I'm a passionate developer who loves creating beautiful
            and functional web applications. When I'm not coding, you can find
            me exploring new technologies or contributing to open-source
            projects.
          </p>
        </div>

        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            My Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.authored.map((template: any) => (
              <Link
                href={`/templates/${template.id}`}
                key={template.id}
                className="hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow">
                  <Image
                    src={template.image}
                    alt={template.name}
                    width={100}
                    height={100}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold text-lg mb-2 dark:text-white line-clamp-1 pt-3">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {template.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
