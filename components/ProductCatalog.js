import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";

const filters = {
  producers: [
    "Todos",
    ...Array.from(new Set(products.map(p => p.producer))).sort()
  ],
  locations: [
    "Todos",
    ...Array.from(new Set(products.map(p => p.location))).sort()
  ],
  availability: [
    "Todos",
    ...Array.from(new Set(products.map(p => p.availability))).sort()
  ],
  formats: [
    "Todos",
    ...Array.from(new Set(products.map(p => p.format))).sort()
  ],
  delivery: [
    "Todos",
    ...Array.from(new Set(products.map(p => p.delivery))).sort()
  ],
};

const productData = {
  products,
  filters,
};

const relevantProducts = productData.products;

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ProductCatalog() {
  const [filters, setFilters] = useState({
    producer: "",
    location: "",
    availability: "",
    format: "",
    harvest_date: "",
    delivery: "",
  });
  const [sort, setSort] = useState("name-asc");
  const [products, setProducts] = useState(relevantProducts);

  useEffect(() => {
    let filtered = relevantProducts.filter((product) => {
      return (
        (!filters.producer || product.producer === filters.producer) &&
        (!filters.location || product.location === filters.location) &&
        (!filters.availability || product.availability === filters.availability) &&
        (!filters.format || product.format === filters.format) &&
        (!filters.harvest_date || product.harvest_date === filters.harvest_date) &&
        (!filters.delivery || product.delivery === filters.delivery)
      );
    });
    // Sort
    switch (sort) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "harvest-desc":
        filtered.sort((a, b) => new Date(b.harvest_date) - new Date(a.harvest_date));
        break;
      case "availability":
        filtered.sort((a, b) => {
          if (a.availability === "Disponível" && b.availability !== "Disponível") return -1;
          if (a.availability !== "Disponível" && b.availability === "Disponível") return 1;
          return a.name.localeCompare(b.name);
        });
        break;
      default:
        break;
    }
    setProducts(filtered);
  }, [filters, sort]);

  // Helper for dropdowns
  function handleFilterChange(type, value) {
    setFilters((prev) => ({ ...prev, [type]: value }));
  }

  return (
    <section className="products-section">
      <div className="filters-grid">
        {/* Producer Filter */}
        <div className="filter-group">
          <label htmlFor="filter-producer" className="filter-label">Produtor</label>
          <select className="filter-select" id="filter-producer" name="filter-producer" value={filters.producer} onChange={e => handleFilterChange("producer", e.target.value)}>
            {productData.filters.producers.map((producer) => (
              <option key={producer} value={producer === "Todos" ? "" : producer}>{producer}</option>
            ))}
          </select>
        </div>
        {/* Location Filter */}
        <div className="filter-group">
          <label htmlFor="filter-location" className="filter-label">Localização</label>
          <select className="filter-select" id="filter-location" name="filter-location" value={filters.location} onChange={e => handleFilterChange("location", e.target.value)}>
            {productData.filters.locations.map((location) => (
              <option key={location} value={location === "Todos" ? "" : location}>{location}</option>
            ))}
          </select>
        </div>
        {/* Availability Filter */}
        <div className="filter-group">
          <label htmlFor="filter-availability" className="filter-label">Disponibilidade</label>
          <select className="filter-select" id="filter-availability" name="filter-availability" value={filters.availability} onChange={e => handleFilterChange("availability", e.target.value)}>
            {productData.filters.availability.map((availability) => (
              <option key={availability} value={availability === "Todos" ? "" : availability}>{availability}</option>
            ))}
          </select>
        </div>
        {/* Format Filter */}
        <div className="filter-group">
          <label htmlFor="filter-format" className="filter-label">Formato do Lote</label>
          <select className="filter-select" id="filter-format" name="filter-format" value={filters.format} onChange={e => handleFilterChange("format", e.target.value)}>
            {productData.filters.formats.map((format) => (
              <option key={format} value={format === "Todos" ? "" : format}>{format}</option>
            ))}
          </select>
        </div>
        {/* Harvest Date Filter */}
        <div className="filter-group">
          <label htmlFor="filter-harvest-date" className="filter-label">Data Colheita</label>
          <select className="filter-select" id="filter-harvest-date" name="filter-harvest-date" value={filters.harvest_date} onChange={e => handleFilterChange("harvest_date", e.target.value)}>
            <option value="">Todos</option>
            {[...new Set(relevantProducts.map((p) => p.harvest_date))].sort().map((date) => (
              <option key={date} value={date}>{formatDate(date)}</option>
            ))}
          </select>
        </div>
        {/* Delivery Filter */}
        <div className="filter-group">
          <label htmlFor="filter-delivery" className="filter-label">Entrega</label>
          <select className="filter-select" id="filter-delivery" name="filter-delivery" value={filters.delivery} onChange={e => handleFilterChange("delivery", e.target.value)}>
            {productData.filters.delivery.map((delivery) => (
              <option key={delivery} value={delivery === "Todos" ? "" : delivery}>{delivery}</option>
            ))}
          </select>
        </div>
        {/* Sort Dropdown */}
        <div className="filter-group">
          <label htmlFor="filter-sort" className="filter-label">Ordenar por</label>
          <select className="filter-select" id="filter-sort" name="filter-sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="name-asc">Nome A-Z</option>
            <option value="name-desc">Nome Z-A</option>
            <option value="harvest-desc">Data Colheita (mais recente)</option>
            <option value="availability">Disponibilidade</option>
          </select>
        </div>
      </div>
      <div className={`row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 products-grid${products.length === 0 ? ' products-grid--empty' : ''}`}>
        {products.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum produto encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <div className="product-count">Produtos encontrados: {products.length}</div>
    </section>
  );
}
