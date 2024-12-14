'use client';
import Image from 'next/image';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image */}
        <div className="flex-shrink-0">
          <Image
            src="/images/elite.jpeg" // Replace with the actual image path
            alt="About Us"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* Description */}
        <div className="lg:flex-1">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            We are a company dedicated to providing top-notch services in the real estate
            industry. Our mission is to make the process of buying, selling, and renting properties
            as seamless as possible for our clients. With a team of experienced professionals, we
            are committed to offering personalized solutions tailored to meet your needs.
          </p>
          <p className="text-lg text-gray-700">
            Our vision is to be a trusted leader in the real estate market, known for our exceptional
            customer service, transparent dealings, and a wide range of property options to suit
            every budget and requirement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
