import { memo } from "react";

const AboutUs = memo(() => {
  return (
    <div className="w-full text-deep-navy-blue dark:text-white dark:text-opacity-85 py-8 min-h-full">
      <div className="container mx-auto mt-8 p-8">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg mb-4">
          Welcome to Lingualeap, where language is a bridge to understanding,
          connecting hearts and minds across borders.
        </p>
        <p className="text-lg mb-4">
          At Lingualeap, our mission is inspired by the shared experiences of
          three immigrants who, upon arriving in Canada, recognized the
          transformative power of language. As a testament to our journey, we've
          developed an app that transcends linguistic boundaries, making
          language learning an accessible and enjoyable endeavor for everyone.
        </p>
        <p className="text-lg mb-4">
          Our vision is to create a vibrant community where individuals can
          effortlessly connect, exchange languages, and embrace cultural
          diversity. Lingualeap is more than an app; it's a platform that
          empowers users to leap into new languages, fostering meaningful
          connections that span the globe.
        </p>
        <p className="text-lg mb-6">
          Thank you for choosing us! Feel free to reach out if you have any
          questions or if there's anything we can assist you with.
        </p>
      </div>

      <div className="container mx-auto mt-8 p-8 rounded-md">
        <h2 className="text-4xl font-bold mb-6 ">Meet Creators!</h2>
        <div className="flex flex-col xl:flex-row justify-center items-stretch gap-16">
          <div className="flex-1 bg-sky-blue-200 dark:bg-sky-blue-700 p-6">
            <h1 className="text-2xl font-bold mb-6 ">Inna Movchan</h1>
            <p className="text-lg text-justify">
              Meet Inna, the team's mood magician with a knack for nail-biting
              suspense, especially when deadlines loom large. Her nervous habits
              have the team on edge, thinking she's got a secret angry alter
              ego. Little do they know, Inna's just spicing up the workplace
              with her unique, unpredictable energy. Who needs a daily soap
              opera when you've got Inna turning the office into a sitcom of
              quirks? She's the flavor we never knew we needed!
            </p>
          </div>
          <div className="flex-1 bg-sky-blue-200 dark:bg-sky-blue-700 p-6">
            <h6 className="text-2xl font-bold mb-6 ">Muhammed Dilaver</h6>
            <p className="text-lg mb-4 text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
              nulla repellat odit. Numquam reprehenderit beatae necessitatibus
              quae, non fugiat minima voluptate deserunt neque dignissimos aut
              alias, harum temporibus ducimus libero.
            </p>
          </div>

          <div className="flex-1 bg-sky-blue-200 dark:bg-sky-blue-700 py-6 px-8">
            <h6 className="text-2xl font-bold mb-6 ">Devanshi Bansal</h6>
            <p className="text-lg mb-4 text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
              nulla repellat odit. Numquam reprehenderit beatae necessitatibus
              quae, non fugiat minima voluptate deserunt neque dignissimos aut
              alias, harum temporibus ducimus libero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
export default AboutUs;
