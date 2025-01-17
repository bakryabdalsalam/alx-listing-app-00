import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-96 flex items-center justify-center"
        style={{ backgroundImage: "url('https://affsquare.io/wp-content/uploads/2024/12/dejoya-clinic-2.webp')" }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Find your favorite place here!
          </h1>
          <p className="text-xl">
            The best prices for over 2 million properties worldwide.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto p-6">
        <div className="flex space-x-4 mb-6">
          {["Top Villa", "Self Checkin", "Luxury", "Pool"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Listing Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTYLISTINGSAMPLE.map((property: PropertyProps, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{property.name}</h2>
                <p className="text-gray-700 mb-2">
                  {property.address.city}, {property.address.country}
                </p>
                <p className="text-gray-700 mb-2">${property.price} / night</p>
                <p className="text-gray-700 mb-2">
                  Rating: {property.rating} ⭐
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;