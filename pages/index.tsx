// pages/index.tsx
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { PropertyProps } from "@/interfaces";
import Pill from "@/components/Pill";
import { filterProperties } from "@/utils/filterProperties";

interface WPPropertyImageSize {
  url: string;
}

interface WPPropertyImage {
  full_url: string;
  sizes?: {
    [key: string]: WPPropertyImageSize;
  };
}

interface WPPropertyMeta {
  REAL_HOMES_property_price?: string;
  REAL_HOMES_property_address?: string;
  REAL_HOMES_property_images?: WPPropertyImage[];
  inspiry_delivery_date_?: string; // Added this field
}

interface WPProperty {
  title?: { rendered?: string };
  class_list?: string[];
  property_meta?: WPPropertyMeta;
}

interface HomeProps {
  properties: PropertyProps[];
}

export default function Home({ properties }: HomeProps) {
  // Extract all categories from the properties
  const allCategories = Array.from(
    new Set(properties.map((prop) => prop.category).flat())
  );

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Pagination: number of properties visible
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
    // Reset pagination when filters change
    setVisibleCount(12);
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setVisibleCount(12);
  };

  const filteredProperties = filterProperties(properties, activeFilters);

  // Slice the filtered properties to show only up to visibleCount
  const visibleProperties = filteredProperties.slice(0, visibleCount);

  const showLoadMore = visibleCount < filteredProperties.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      <Head>
        <title>Discover Latest Properties By Affsquare</title>
      </Head>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[400px] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(https://affsquare.com/wp-content/uploads/2024/12/dejoya-clinic-2.png)` }}
      >
        <div className="bg-black bg-opacity-40 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-bold mb-2">Find your favorite place here!</h1>
          <p className="text-lg">The best prices for properties worldwide.</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {allCategories.map((cat, index) => (
            <Pill key={index} label={cat} onClick={() => toggleFilter(cat)} />
          ))}
        </div>
        <button
          onClick={resetFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Reset Filters
        </button>
      </section>

      {/* Listing Section */}
      <section className="py-8 px-6">
        <h2 className="text-2xl font-semibold mb-4">Discover Latest Properties By Affsquare</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProperties.map((property: PropertyProps, index: number) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-48">
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
                <p className="text-sm text-gray-500 mb-1">
                  {`${property.address.city}, ${property.address.state}, ${property.address.country}`}
                </p>
                {/* Replaced Rating with Delivery Date */}
                <p className="text-sm text-gray-600 mb-2">
                  Delivery Date: {property.deliveryDate || "N/A"}
                </p>
                <p className="text-md font-semibold mb-2">{property.price} EGP</p>
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
                  {property.offers.bed} Beds | {property.offers.shower} Showers | For{" "}
                  {property.offers.occupants}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {showLoadMore && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://affsquare.com/wp-json/wp/v2/properties?per_page=100");
  const data = await res.json();

  // Ensure data is an array
  const wpProperties: WPProperty[] = Array.isArray(data) ? data : [];

  const properties: PropertyProps[] = wpProperties.map((wpProp) => {
    const classList = Array.isArray(wpProp.class_list) ? wpProp.class_list : [];

    // Extract categories from class_list (property-feature-* entries)
    const categories = classList
      .filter((c: string) => c.startsWith("property-feature-"))
      .map((f: string) => f.replace("property-feature-", "").replace(/-/g, " "));

    const price = parseInt(wpProp.property_meta?.REAL_HOMES_property_price ?? "0", 10);

    const fullAddress = wpProp.property_meta?.REAL_HOMES_property_address ?? "";
    const addressParts = fullAddress.split(",").map((part: string) => part.trim());
    const [city = "", state = "", country = ""] = addressParts;

    // Choose an image
    let image = "/images/no-image.jpg";
    const images = wpProp.property_meta?.REAL_HOMES_property_images;
    if (images && images.length > 0) {
      const firstImage = images[0];
      if (firstImage.sizes && firstImage.sizes["modern-property-child-slider"]) {
        image = firstImage.sizes["modern-property-child-slider"].url;
      } else {
        image = firstImage.full_url;
      }
    }

    const offers = {
      bed: "2",
      shower: "1",
      occupants: "2-3"
    };

    // Extract delivery date
    const deliveryDate = wpProp.property_meta?.inspiry_delivery_date_ || "";

    return {
      name: wpProp.title?.rendered ?? "Untitled Property",
      address: {
        state,
        city,
        country
      },
      category: categories,
      price,
      offers,
      image,
      discount: "",
      deliveryDate, // Add deliveryDate to match the replaced field
    } as PropertyProps;
  });

  return {
    props: {
      properties
    }
  };
}
