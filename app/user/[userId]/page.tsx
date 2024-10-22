import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/providers";

// Change this to an async function
async function page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const robohashUrl = `https://robohash.org/${userId}?set=set3`;

  // Get the session server-side
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex px-5">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48 rounded-full border-2 border-gray-200 dark:border-gray-700"
              src={robohashUrl}
              alt="Profile"
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
            <p className="uppercase tracking-wide text-indigo-500 dark:text-indigo-400 font-semibold text-2xl">
              {session?.user?.name || "Anonymous User"}
            </p>
            <h1 className="mt-2 text-xl leading-8 font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              User Profile
            </h1>
          </div>
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
            {[1, 2, 3].map((template) => (
              <div
                key={template}
                className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow"
              >
                <h3 className="font-semibold text-lg mb-2 dark:text-white">
                  Template {template}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A brief description of this amazing template.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
