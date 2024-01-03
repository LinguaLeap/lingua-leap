// MainPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section with Image */}
      <section className="bg-blue-200 h-screen flex flex-col justify-center items-center relative">
        {/* Overlay Image */}
        <img
          src="https://ht-blog.oss-cn-hongkong.aliyuncs.com/wordpress/2022/08/83d453d1f4d5199bff441a87e9cfd5b6.png?x-oss-process=image%2Fquality,q_50%2Fresize,m_fill,w_1024,h_576"
          alt="Background"
          className="object-cover w-1/2 h-full absolute top-0 left-0  "
        />

        {/* Text Content */}
        <div className="text-white text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Language Exchange Platform
          </h1>
          <p className="text-lg mb-8">
            Connect with language learners worldwide.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold transition duration-300 hover:bg-blue-400 hover:text-white"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white p-8 rounded-md shadow-md">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Step */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Step 1</h3>
              <p className="text-gray-600">Sign up for an account.</p>
            </div>

            {/* Example Step */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Step 2</h3>
              <p className="text-gray-600">
                Choose the language you want to learn.
              </p>
            </div>

            {/* Example Step */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Step 3</h3>
              <p className="text-gray-600">
                Connect with language partners and start learning!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 text-gray-800 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 ml-4">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Testimonial */}
            <div className="p-6 rounded-md bg-indigo-500 shadow-md">
              <p className="text-lg">
                "I've made great progress in learning Spanish through this
                platform. Highly recommended!"
              </p>
              <p className="mt-4">- John, United States</p>
            </div>

            {/* Example Testimonial */}
            <div className="p-6 rounded-md bg-indigo-500 shadow-md">
              <p className="text-lg">
                "Meeting people from different cultures has been an amazing
                experience. Thank you!"
              </p>
              <p className="mt-4">- Maria, Brazil</p>
            </div>

            {/* Example Testimonial */}
            <div className="p-6 rounded-md bg-indigo-500 shadow-md">
              <p className="text-lg">
                "A user-friendly platform that makes language exchange enjoyable
                and effective."
              </p>
              <p className="mt-4">- Ahmed, Egypt</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-indigo-500 text-white py-8 text-center">
        <div className="container mx-auto">
          <p className="text-xl mb-4">
            Ready to start your language learning journey?
          </p>
          <Link
            to="/signup"
            className="bg-white text-indigo-500 px-8 py-3 rounded-full font-semibold transition duration-300 hover:bg-indigo-400 hover:text-white"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-500 text-white p-4 mt-8">
        <div className="container mx-auto">
          {/* Add footer content */}
          <p>&copy; 2023 Language Exchange App</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
