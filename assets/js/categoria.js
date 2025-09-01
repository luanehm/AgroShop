// Product data and filter options
const productData = {
  products: [
    {
      id: 1,
      name: "Batata-Doce",
      image: "🍠",
      category: "raizes",
      producer: "Fazenda São João",
      location: "São Paulo",
      availability: "Disponível",
      format: "Avulso",
      harvest_date: "2025-06-10",
      delivery: "Expressa",
    },
    {
      id: 2,
      name: "Batata Inglesa",
      image: "🥔",
      category: "tuberculos",
      producer: "Sítio Verde",
      location: "Minas Gerais",
      availability: "Disponível",
      format: "Saco 2kg",
      harvest_date: "2025-06-12",
      delivery: "Normal",
    },
    {
      id: 3,
      name: "Mandioca (Aipim)",
      image: "🥖",
      category: "raizes",
      producer: "Agricultura Familiar",
      location: "Bahia",
      availability: "Disponível",
      format: "Avulso",
      harvest_date: "2025-06-08",
      delivery: "Expressa",
    },
    {
      id: 4,
      name: "Inhame",
      image: "🥔",
      category: "tuberculos",
      producer: "Cooperativa Rural",
      location: "Rio de Janeiro",
      availability: "Limitado",
      format: "Avulso",
      harvest_date: "2025-06-15",
      delivery: "Normal",
    },
    {
      id: 5,
      name: "Cará",
      image: "🥔",
      category: "tuberculos",
      producer: "Fazenda Orgânica",
      location: "São Paulo",
      availability: "Disponível",
      format: "Avulso",
      harvest_date: "2025-06-11",
      delivery: "Expressa",
    },
    {
      id: 6,
      name: "Nabo",
      image: "🥕",
      category: "raizes",
      producer: "Horta Urbana",
      location: "Rio Grande do Sul",
      availability: "Disponível",
      format: "Maço",
      harvest_date: "2025-06-13",
      delivery: "Normal",
    },
    {
      id: 8,
      name: "Rabanete",
      image: "🥕",
      category: "raizes",
      producer: "Sítio Verde",
      location: "Minas Gerais",
      availability: "Disponível",
      format: "Maço",
      harvest_date: "2025-06-14",
      delivery: "Normal",
    },
    {
      id: 10,
      name: "Batata Baroa (Mandioquinha)",
      image: "🥖",
      category: "raizes",
      producer: "Cooperativa Rural",
      location: "Rio de Janeiro",
      availability: "Disponível",
      format: "Avulso",
      harvest_date: "2025-06-07",
      delivery: "Normal",
    },
    {
      id: 11,
      name: "Cará-Moela",
      image: "🥔",
      category: "tuberculos",
      producer: "Fazenda Orgânica",
      location: "São Paulo",
      availability: "Disponível",
      format: "Avulso",
      harvest_date: "2025-06-12",
      delivery: "Expressa",
    },
    {
      id: 12,
      name: "Mangarito",
      image: "🥔",
      category: "tuberculos",
      producer: "Horta Urbana",
      location: "Rio Grande do Sul",
      availability: "Limitado",
      format: "Avulso",
      harvest_date: "2025-06-10",
      delivery: "Normal",
    },
  ],
  filters: {
    producers: [
      "Todos",
      "Fazenda São João",
      "Sítio Verde",
      "Agricultura Familiar",
      "Cooperativa Rural",
      "Fazenda Orgânica",
      "Horta Urbana",
      "Fazenda do Norte",
    ],
    locations: [
      "Todos",
      "São Paulo",
      "Minas Gerais",
      "Bahia",
      "Rio de Janeiro",
      "Rio Grande do Sul",
      "Ceará",
    ],
    availability: ["Todos", "Disponível", "Limitado"],
    formats: ["Todos", "Avulso", "Saco 2kg", "Maço", "Unidade"],
    delivery: ["Todos", "Expressa", "Normal"],
  },
};

// Filter only products that are roots and tubers
const relevantProducts = productData.products.filter(
  (product) =>
    product.category === "raizes" || product.category === "tuberculos",
);

// Application state
let currentFilters = {
  producer: "",
  location: "",
  availability: "",
  format: "",
  harvest_date: "",
  delivery: "",
};

let currentSort = "name-asc";
let filteredProducts = [...relevantProducts];

// DOM elements
let productGrid;
let productCountElement;
let filterDropdowns;
let sortDropdown;

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeDOM();
  initializeFilters();
  initializeEventListeners();
  renderProducts();
  updateProductCount();
});

function initializeDOM() {
  productGrid = document.getElementById("products-grid");
  productCountElement = document.getElementById("product-count");
  filterDropdowns = document.querySelectorAll(".filter-dropdown");
  sortDropdown = document.getElementById("sort-dropdown");
}

function initializeFilters() {
  // Initialize producer filter
  const producerDropdown = document.querySelector(
    '[data-filter="producer"] .dropdown-menu',
  );
  productData.filters.producers.forEach((producer) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.dataset.value = producer === "Todos" ? "" : producer;
    option.textContent = producer;
    producerDropdown.appendChild(option);
  });

  // Initialize location filter
  const locationDropdown = document.querySelector(
    '[data-filter="location"] .dropdown-menu',
  );
  productData.filters.locations.forEach((location) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.dataset.value = location === "Todos" ? "" : location;
    option.textContent = location;
    locationDropdown.appendChild(option);
  });

  // Initialize availability filter
  const availabilityDropdown = document.querySelector(
    '[data-filter="availability"] .dropdown-menu',
  );
  productData.filters.availability.forEach((availability) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.dataset.value = availability === "Todos" ? "" : availability;
    option.textContent = availability;
    availabilityDropdown.appendChild(option);
  });

  // Initialize format filter
  const formatDropdown = document.querySelector(
    '[data-filter="format"] .dropdown-menu',
  );
  productData.filters.formats.forEach((format) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.dataset.value = format === "Todos" ? "" : format;
    option.textContent = format;
    formatDropdown.appendChild(option);
  });

  // Initialize harvest date filter (simplified - just showing unique dates)
  const harvestDropdown = document.querySelector(
    '[data-filter="harvest_date"] .dropdown-menu',
  );
  const uniqueDates = [
    ...new Set(relevantProducts.map((p) => p.harvest_date)),
  ].sort();
  const todosOption = document.createElement("div");
  todosOption.className = "dropdown-option";
  todosOption.dataset.value = "";
  todosOption.textContent = "Todos";
  harvestDropdown.appendChild(todosOption);

  uniqueDates.forEach((date) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.dataset.value = date;
    option.textContent = formatDate(date);
    harvestDropdown.appendChild(option);
  });

  // Initialize delivery filter
  const deliveryDropdown = document.querySelector(
    '[data-filter="delivery"] .dropdown-menu',
  );
  productData.filters.delivery.forEach((delivery) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.dataset.value = delivery === "Todos" ? "" : delivery;
    option.textContent = delivery;
    deliveryDropdown.appendChild(option);
  });
}

function initializeEventListeners() {
  // Filter dropdown events
  filterDropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropdown-trigger");
    const menu = dropdown.querySelector(".dropdown-menu");
    const options = menu.querySelectorAll(".dropdown-option");
    const valueSpan = dropdown.querySelector(".dropdown-value");
    const filterType = dropdown.dataset.filter;

    // Toggle dropdown
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllDropdowns();
      dropdown.classList.toggle("active");
    });

    // Select option
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();

        // Update visual selection
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // Update display value
        valueSpan.textContent = option.textContent;

        // Update filter state
        currentFilters[filterType] = option.dataset.value;

        // Close dropdown
        dropdown.classList.remove("active");

        // Apply filters
        applyFilters();
      });
    });
  });

  // Sort dropdown events
  const sortTrigger = sortDropdown.querySelector(".dropdown-trigger");
  const sortMenu = sortDropdown.querySelector(".dropdown-menu");
  const sortOptions = sortMenu.querySelectorAll(".dropdown-option");
  const sortValue = sortDropdown.querySelector(".dropdown-value");

  sortTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    sortDropdown.classList.toggle("active");
  });

  sortOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();

      // Update visual selection
      sortOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");

      // Update display value
      sortValue.textContent = option.textContent;

      // Update sort state
      currentSort = option.dataset.value;

      // Close dropdown
      sortDropdown.classList.remove("active");

      // Apply sorting
      applySort();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", closeAllDropdowns);

  // Close dropdowns on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns();
    }
  });
}

function closeAllDropdowns() {
  document
    .querySelectorAll(".filter-dropdown, .sort-dropdown")
    .forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
}

function applyFilters() {
  filteredProducts = relevantProducts.filter((product) => {
    return (
      (!currentFilters.producer ||
        product.producer === currentFilters.producer) &&
      (!currentFilters.location ||
        product.location === currentFilters.location) &&
      (!currentFilters.availability ||
        product.availability === currentFilters.availability) &&
      (!currentFilters.format || product.format === currentFilters.format) &&
      (!currentFilters.harvest_date ||
        product.harvest_date === currentFilters.harvest_date) &&
      (!currentFilters.delivery || product.delivery === currentFilters.delivery)
    );
  });

  applySort();
}

function applySort() {
  const sortedProducts = [...filteredProducts];

  switch (currentSort) {
    case "name-asc":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "harvest-desc":
      sortedProducts.sort(
        (a, b) => new Date(b.harvest_date) - new Date(a.harvest_date),
      );
      break;
    case "availability":
      sortedProducts.sort((a, b) => {
        if (a.availability === "Disponível" && b.availability !== "Disponível")
          return -1;
        if (a.availability !== "Disponível" && b.availability === "Disponível")
          return 1;
        return a.name.localeCompare(b.name);
      });
      break;
  }

  filteredProducts = sortedProducts;
  renderProducts();
  updateProductCount();
}

function renderProducts() {
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <p>Nenhum produto encontrado com os filtros selecionados.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
    <div class="product-card animate-in" data-product-id="${product.id}">
      <div class="product-image">${product.image}</div>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-details">
        <div>${product.producer}</div>
        <div>${product.location}</div>
        <div>${product.format}</div>
      </div>
      <div class="availability-badge ${product.availability.toLowerCase().replace("í", "i")}">${product.availability}</div>
    </div>
  `,
    )
    .join("");

  // Add click events to product cards
  const productCards = productGrid.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.dataset.productId;
      const product = relevantProducts.find((p) => p.id == productId);
      showProductDetails(product);
    });

    // Add keyboard accessibility
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
}

function showProductDetails(product) {
  alert(`Detalhes do Produto:
    
Nome: ${product.name}
Produtor: ${product.producer}
Localização: ${product.location}
Disponibilidade: ${product.availability}
Formato: ${product.format}
Data da Colheita: ${formatDate(product.harvest_date)}
Tipo de Entrega: ${product.delivery}`);
}

function updateProductCount() {
  productCountElement.textContent = filteredProducts.length;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Utility function to debounce filter applications
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Export functions for potential external use
window.ProductCatalog = {
  applyFilters,
  applySort,
  renderProducts,
  updateProductCount,
  getCurrentFilters: () => currentFilters,
  getCurrentSort: () => currentSort,
  getFilteredProducts: () => filteredProducts,
};
