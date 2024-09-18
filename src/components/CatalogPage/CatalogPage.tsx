"use client";

import React, { useState, useEffect } from "react";
import FilterOption from "../UI/FilterOption";
import Slider from "../UI/Slider";
import Select, { SelectItem } from "../UI/Select";
import { Loader2 } from "lucide-react";
import { mockProducts } from "../../Mockdata";
import Button from "../UI/Button";
export interface Product {
  image: string | undefined;
  id: number;
  name: string;
  brand: string;
  category: string;
  gender: string;
  price: number;
  color: string;
  discount: number;
  likes: number;
}
// Define types for Filters
type Filters = {
  gender: string[];
  category: string[];
  brand: string[];
  color: string[];
  star: Number[];
  likes: Number[];
  image: string[];
};
const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [discountRate, setDiscountRate] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const [filters, setFilters] = useState<Filters>({
    gender: [],
    category: [],
    brand: [],
    color: [],
    star: [],
    likes: [],
    image: [],
  });
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);
  const handleFilterChange = (filterType: keyof Filters, value: string, isChecked: boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: isChecked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter((item) => item !== value),
    }));
  };
  const filteredProducts = products
    .filter(
      (product) =>
        (filters.gender.length === 0 ||
          filters.gender.includes(product.gender)) &&
        (filters.category.length === 0 ||
          filters.category.includes(product.category)) &&
        (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
        (filters.color.length === 0 || filters.color.includes(product.color)) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.discount >= discountRate
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.likes - a.likes;
        case "price_low_to_high":
          return a.price - b.price;
        case "price_high_to_low":
          return b.price - a.price;
        case "discount":
          return b.discount - a.discount;

        default:
          return 0;
      }
    });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Myntra Catalog</h1>
      <div className="flex">
        <div className="w-1/4 pr-4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <FilterOption
            label="Gender"
            options={["Men", "Women"]}
            selected={filters.gender}
            onChange={(value, checked) =>
              handleFilterChange("gender", value, checked)
            }
          />
          <FilterOption
            label="Category"
            options={["Tops", "Bottoms", "Dresses"]}
            selected={filters.category}
            onChange={(value, checked) =>
              handleFilterChange("category", value, checked)
            }
          />
          <FilterOption
            label="Brand"
            options={["Brand A", "Brand B", "Brand C"]}
            selected={filters.brand}
            onChange={(value, checked) =>
              handleFilterChange("brand", value, checked)
            }
          />
          <FilterOption
            label="Color"
            options={["Red", "Blue", "Green", "Black", "Brown", "Grey", "Pink"]}
            selected={filters.color}
            onChange={(value, checked) =>
              handleFilterChange("color", value, checked)
            }
          />
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Price Range</h4>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Minimum Discount</h4>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[discountRate]}
              onValueChange={([value]) => setDiscountRate(value)}
            />
            <div className="mt-2">
              <span>{discountRate}% and above</span>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price_low_to_high">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price_high_to_low">
                Price: High to Low
              </SelectItem>
              <SelectItem value="discount">Discount</SelectItem>
            </Select>
            {/* <div>
                <button>fdfsfs</button>
              </div> */}
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                {paginatedProducts.map((product) => (
                  <div className="product-card bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-700 mb-1">{product.brand}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-900 font-medium mb-2">
                          ₹{product.price}
                        </p>
                        <p className="text-red-500 font-medium">
                          {product.discount}% off
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                {[...Array(pageCount)].map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(index + 1)}
                    className="mx-1"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
