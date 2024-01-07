import { Link } from "react-router-dom";
import IMAGES from "../images/Images";
import { TiArrowRightOutline } from "react-icons/ti";
import { memo } from "react";

const MainPage = memo(() => {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <section className="w-full bg-sky-blue-100 dark:bg-rich-navy h-hwh flex flex-col justify-center items-center px-6">
        <div className="text-deep-navy-blue dark:text-white dark:text-opacity-85 text-center flex flex-col  justify-center items-center w-2/3 z-10">
          <h1 className="text-4xl font-bold mb-8">
            Language Exchange Platform
          </h1>
          <p className="text-lg mb-8">
            Connect with language learners worldwide.
          </p>
          <Link to="/login" className="button">
            Get Started
          </Link>
        </div>
        <div className="w-2/3 opacity-25 absolute">
          <img src={IMAGES.world} />
        </div>
      </section>

      <section className="bg-white dark:bg-deeper-sea-blue py-24 shadow-md z-20 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-deep-navy-blue dark:text-white dark:text-opacity-85">
            How It Works
          </h2>
          <div className="flex flex-col xl:flex-row justify-center items-stretch gap-8">
            <div className="bg-light-beige dark:bg-rich-navy p-6 rounded-md shadow-md flex flex-col flex-1 items-start justify-center">
              <h3 className="text-deep-navy-blue dark:text-white dark:text-opacity-85 text-xl font-semibold mb-2">
                Step 1
              </h3>
              <p className="text-deep-navy-blue dark:text-white dark:text-opacity-85">
                Sign up for an account.
              </p>
            </div>
            <TiArrowRightOutline
              size={64}
              className="text-teal-700 self-center rotate-90 xl:rotate-0 dark:text-white dark:text-opacity-85"
            />

            <div className="bg-light-beige dark:bg-rich-navy  p-6 rounded-md shadow-md flex flex-col flex-1 items-start justify-center">
              <h3 className="text-deep-navy-blue text-xl font-semibold mb-2 dark:text-white dark:text-opacity-85">
                Step 2
              </h3>
              <p className="text-deep-navy-blue dark:bg-rich-navy  dark:text-white dark:text-opacity-85">
                Choose the language you want to learn.
              </p>
            </div>
            <TiArrowRightOutline
              size={64}
              className="text-teal-700 rotate-90 xl:rotate-0 dark:text-white dark:text-opacity-85 self-center"
            />

            <div className="bg-light-beige dark:bg-rich-navy  p-6 rounded-md shadow-md flex flex-col flex-1 items-start justify-center">
              <h3 className="text-deep-navy-blue text-xl font-semibold mb-2 dark:text-white dark:text-opacity-85">
                Step 3
              </h3>
              <p className="text-deep-navy-blue dark:text-white dark:text-opacity-85">
                Connect with language partners and start learning!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-200 dark:dark:bg-sky-blue-700 text-deep-navy-blue dark:text-white dark:text-opacity-85 py-24">
        <div className="container mx-auto">
          <h2 className="text-deep-navy-blue dark:text-white dark:text-opacity-85 text-3xl font-bold mb-8">
            What Our Users Say
          </h2>
          <div className="flex flex-col xl:flex-row justify-center items-stretch gap-8">
            <div className="p-6 rounded-md bg-white dark:bg-rich-navy bg-opacity-75 shadow-md">
              <p className="text-lg text-deep-navy-blue  dark:text-white dark:text-opacity-85">
                "I've made great progress in learning Spanish through this
                platform. Highly recommended!"
              </p>
              <p className="mt-4">- John, United States</p>
            </div>

            <div className="p-6 rounded-md bg-white dark:bg-rich-navy bg-opacity-75 shadow-md">
              <p className="text-lg text-deep-navy-blue dark:text-white dark:text-opacity-85">
                "Meeting people from different cultures has been an amazing
                experience. Thank you!"
              </p>
              <p className="mt-4">- Maria, Brazil</p>
            </div>

            <div className="p-6 rounded-md bg-white dark:bg-rich-navy bg-opacity-75 shadow-md">
              <p className="text-lg text-deep-navy-blue dark:text-white dark:text-opacity-85">
                "A user-friendly platform that makes language exchange enjoyable
                and effective."
              </p>
              <p className="mt-4">- Ahmed, Egypt</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-rich-navy  pt-24 text-center">
        <div className="container mx-auto flex flex-row  gap-x-16 justify-center">
          <div className="pb-24">
            <h2 className="text-2xl font-bold text-deep-navy-blue dark:text-white dark:text-opacity-85 mb-8">
              Ready to start your language learning journey?
            </h2>
            <Link to="/login" className="button">
              Get Started
            </Link>
          </div>
          <div className="w-1/5 dark:hidden">
            <img src={IMAGES.people} />
          </div>
        </div>
      </section>
    </div>
  );
});

export default MainPage;
