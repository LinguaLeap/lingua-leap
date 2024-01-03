// AboutUs.tsx
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className=" text-white py-8">
      <div className="content-wrapper bg-gray-800 mx-auto mt-8 p-8 rounded-md">
        <h2 className="text-4xl font-bold mb-6 text-cyan-500">About Us</h2>
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

      <div className="content-wrapper bg-gray-800 mx-auto mt-8 p-8 rounded-md">
        <h2 className="text-4xl font-bold mb-6 text-cyan-500">
          Meet Creators!
        </h2>
        <h1 className="text-2xl font-bold mb-6 text-cyan-500">
          Inna movchanchik
        </h1>
        <p className="text-lg mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam nulla
          repellat odit. Numquam reprehenderit beatae necessitatibus quae, non
          fugiat minima voluptate deserunt neque dignissimos aut alias, harum
          temporibus ducimus libero.
        </p>

        <h6 className="text-2xl font-bold mb-6 text-cyan-500">
          Muhammed dilaver
        </h6>
        <p className="text-lg mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam nulla
          repellat odit. Numquam reprehenderit beatae necessitatibus quae, non
          fugiat minima voluptate deserunt neque dignissimos aut alias, harum
          temporibus ducimus libero.
        </p>

        <h6 className="text-2xl font-bold mb-6 text-cyan-500">
          Devanshi Bansal
        </h6>
        <p className="text-lg mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam nulla
          repellat odit. Numquam reprehenderit beatae necessitatibus quae, non
          fugiat minima voluptate deserunt neque dignissimos aut alias, harum
          temporibus ducimus libero.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
