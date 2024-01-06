import { memo } from "react";

const ContactUs = memo(() => {
  return (
    <div className="w-full text-deep-navy-blue dark:text-white dark:text-opacity-85 flex-1">
      <div className="container mx-auto mt-8 p-8">
        <h2 className="text-4xl font-bold mb-6 ">Contact Us</h2>

        <p className="text-lg mb-4">
          Thank you for reaching out to Lingualeap! We're here to assist you in
          any way we can. Feel free to contact us through the following methods:
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-lg">Send us an email at: contact@lingualeap.com</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Phone</h3>
          <p className="text-lg">Call our support line: +1 (555) 123-4567</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          <p className="text-lg">
            Visit our office at: <br />
            123 Language Street, Cityville, Country
          </p>
        </div>

        <p className="text-lg">
          You can also reach out to us through our social media channels. We're
          active on Facebook, Twitter, Instagram, and LinkedIn.
        </p>
      </div>
    </div>
  );
});

export default ContactUs;
