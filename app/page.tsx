import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-20 py-20">
      <div className="flex w-full items-center justify-center">
        <div className="w-1/2">
          <h1 className="text-4xl font-semibold">
            Looking for a easy and elegant way to run a Campaign?
          </h1>
          <p>
            Half A Form is a platform that allows you to create, manage, and
            analyze your campaigns in a simple and intuitive way.
          </p>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <Image src="/hero_img.svg" alt="hero" width={500} height={500} />
        </div>
      </div>
    </main>
  );
}
