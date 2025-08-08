import React, { useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import allProducts from "../pages/ProductsData";
import { getProducts } from "../services/productService";

function AllProducts() {
  const [filters, setFilters] = useState({
    category: [],
    color: [],
    price: { min: 100, max: 10000 },
  });

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
  
    const fetchProducts = async () => {
      const res = await getProducts({});
      console.log("Products:", res);
      if (res) setProducts(res);
      setLoadingProducts(false);
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({ category: [], color: [], price: { min: 100, max: 10000 } });
  };

  const filteredProducts = products.length ? products.filter((product) => {
    const inCategory =
      filters.category.length === 0 ||
      filters.category.includes(product.category.toLowerCase());

    const inColor =
      filters.color.length === 0 || filters.color.includes(product.color);

    const inPriceRange =
      product.price >= filters.price.min && product.price <= filters.price.max;

    return inCategory && inColor && inPriceRange;
  }) : [];

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <FilterSidebar
            filters={filters}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
        </div>

        <div className="col-md-9">
          <h2 className="mb-2 text-capitalize">All Products</h2>
          <p className="text-muted mb-4 col-md-6">tagline from backend</p>
          <div className="mb-2 fw-bold">{filteredProducts.length} Products</div>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
