// pages/index.tsx
import Head from "next/head";
import Image from "next/image";
import { PROPERTYLISTINGSAMPLE, HERO_IMAGE } from "@/constants";
import { PropertyProps } from "@/interfaces";
import Pill from "@/components/Pill";

export default function Home() {
  // Example filters array
  const filters = [
    "Top Villa",
    "Self Checkin",
    "Beachfront",
    "Mountain View",
    "City Center",
    "Free Parking",
    "Pet Friendly",
    "Fireplace"
  ];

  return (
    <>
      <Head>
        <title>My Listing App</title>
      </Head>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[400px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
        }}
      >
        <div className="bg-black bg-opacity-40 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-bold mb-2">Find your favorite place here!</h1>
          <p className="text-lg">The best prices for over 2 million properties worldwide.</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <Pill key={index} label={filter} onClick={() => console.log(filter)} />
          ))}
        </div>
      </section>

      {/* Listing Section */}
      <section className="py-8 px-6">
        <h2 className="text-2xl font-semibold mb-4">Property Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PROPERTYLISTINGSAMPLE.map((property: PropertyProps, index: number) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-48">
                {/* Image can be rendered with next/image if allowed */}
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {property.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {property.discount}% OFF
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{property.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{`${property.address.city}, ${property.address.state}, ${property.address.country}`}</p>
                <p className="text-sm text-gray-600 mb-2">Rating: {property.rating}</p>
                <p className="text-md font-semibold mb-2">${property.price} / night</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {property.category.map((cat, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-700">
                  {property.offers.bed} Beds | {property.offers.shower} Showers | For {property.offers.occupants}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
