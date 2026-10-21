// ==========================================
// DEVA SMART SHOPPING
// Affiliate Product Catalogue
// ==========================================

const products = [
  {
    id: 1,
    name: "Fast Charging Adapter",
    category: "Mobile Accessories",
    price: 499,
    emoji: "🔌",
    badge: "TECH PICK",
    desc: "Check charging speed, wattage and device compatibility.",
    bg: "#eaf2ed",
    image: "",
    link: ""
  },
  {
    id: 2,
    name: "Mobile Cover",
    category: "Mobile Accessories",
    price: 199,
    emoji: "📱",
    badge: "POPULAR",
    desc: "Choose a cover that fits your phone model.",
    bg: "#f2eafa",
    image: "",
    link: ""
  },
  {
    id: 3,
    name: "Charging Cable",
    category: "Mobile Accessories",
    price: 149,
    emoji: "🔋",
    badge: "DAILY USE",
    desc: "Check cable type, length and charging compatibility.",
    bg: "#eaf2ed",
    image: "",
    link: ""
  },
  {
    id: 4,
    name: "Power Bank",
    category: "Electronics",
    price: 799,
    emoji: "🔋",
    badge: "TRAVEL PICK",
    desc: "Compare capacity, charging speed and portability.",
    bg: "#e8f1fc",
    image: "",
    link: ""
  },
  {
    id: 5,
    name: "Women's Kurti",
    category: "Women's Fashion",
    price: 599,
    emoji: "👗",
    badge: "FASHION PICK",
    desc: "Check fabric, size chart and customer reviews.",
    bg: "#fcecf2",
    image: "",
    link: ""
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 999,
    emoji: "🎧",
    badge: "TECH PICK",
    desc: "Compare battery life, sound quality and comfort.",
    bg: "#e8f1fc",
    image: "",
    link: ""
  },
  {
    id: 7,
    name: "Laptop Accessories",
    category: "Electronics",
    price: 399,
    emoji: "💻",
    badge: "WORK ESSENTIAL",
    desc: "Choose accessories compatible with your laptop.",
    bg: "#f0ecff",
    image: "",
    link: ""
  },
  {
    id: 8,
    name: "Women's Handbag",
    category: "Women's Fashion",
    price: 699,
    emoji: "👜",
    badge: "STYLE PICK",
    desc: "Compare design, storage and material.",
    bg: "#fcecf2",
    image: "",
    link: ""
  },
  {
    id: 9,
    name: "Smart Watch",
    category: "Electronics",
    price: 1299,
    emoji: "⌚",
    badge: "SMART PICK",
    desc: "Check features, battery life and phone compatibility.",
    bg: "#e8f1fc",
    image: "",
    link: ""
  },
  {
    id: 10,
    name: "Beard & Hair Trimmer",
    category: "Grooming",
    price: 692,
    emoji: "✂️",
    badge: "GROOMING PICK",
    desc: "Compare runtime, charging time, blades and warranty.",
    bg: "#eaf2ed",
    image: "https://m.media-amazon.com/images/I/71Ze4lFS2UL._SL1500_.jpg",
    link: "https://www.amazon.in/Trimmer-Runtime-Stainless-Settings-VHTH-38/dp/B0CBMTG6D5?crid=16TTUAWYKCCAD&dib=eyJ2IjoiMSJ9.Di5rdGpr732Lcog7_dm6QsKtWJEjwUFgfzTJsskN_bSgB3bJkeK3eLoV5m8Xuea2ZUZt6fxW5mAcFxD9b4zWd3i-X3S3CCKcBk57MOcaiQlA4aLM8lV63UztwCxmZ9cxgXGux9muHWi9kvMc8bKVbTOVqP3RKl59vyI_5QoG8ZbfY0sXMcAH9NPgda4TaHTC6vhvK2J3VCtregnQkgx5_GXtF7uJUTAyt2xINJ_Zic_ndIJ1HqZxAbLRxQshXQaX-9ujJ_wPxi8X2f6nAnD-rtUxEAa0caPDG3bNP8PFBc.J_ArOHfh5GfBtAwsU4ByY65PymGaJFGhxl0L0wgZiHE&dib_tag=se&keywords=Beard+%26+Hair+Trimmer&qid=1792561737&sprefix=beard+%26+hair+trimmer%2Caps%2C626&sr=8-3-spons&aref=HkYtKViAUx&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=ll2&tag=devasmartshop-21&linkId=564e6c8a65e2459cd154544771345d0c&ref_=as_li_ss_tl"
  },
  {
    id: 11,
    name: "Women's Embroidery Anarkali Dress",
    category: "Women's Fashion",
    price: 689,
    emoji: "👗",
    badge: "FASHION PICK",
    desc: "Check available sizes, fabric, design and customer reviews.",
    bg: "#fcecf2",
    image: "https://m.media-amazon.com/images/I/81wQ0dt8GnL._SX679_.jpg",
    link: "https://www.amazon.in/Nermosa-Women-Embroidery-Anarkali-Dupatta/dp/B0FT1981L8?linkCode=ll2&tag=devasmartshop-21"
  }
];

// ==========================================
// DOM ELEMENTS
// ==========================================

const productGrid =
  document.querySelector("#productGrid") ||
  document.querySelector(".product-grid") ||
  document.querySelector("#products");

const searchInput =
  document.querySelector("#searchInput") ||
  document.querySelector("#search");

const sortSelect =
  document.querySelector("#sortSelect") ||
  document.querySelector("#sort");

const clearButton =
  document.querySelector("#clearFilters") ||
  document.querySelector("#clear-filters");

let activeCategory = "all";

// ==========================================
// PRODUCT RENDERING
// ==========================================

function renderProducts(list) {
  if (!productGrid) {
    console.error("Product grid element was not found.");
    return;
  }

  if (list.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No products found</h3>
        <p>Try another product name or category.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = list.map(product => {
    const safeImage = product.image
      ? `
        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-image"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
        >
        <span
          class="product-emoji"
          style="display:none; background:${product.bg}"
        >${product.emoji}</span>
      `
      : `
        <span
          class="product-emoji"
          style="background:${product.bg}"
        >${product.emoji}</span>
      `;

    const safeLink = product.link || "#";

    return `
      <article class="product-card">

        <div class="product-image-wrap">
          ${safeImage}
          <span class="product-badge">${product.badge}</span>
        </div>

        <div class="product-info">

          <p class="product-category">
            ${product.category}
          </p>

          <h3 class="product-name">
            ${product.name}
          </h3>

          <p class="product-description">
            ${product.desc}
          </p>

          <div class="product-bottom">
            <span class="product-price">
              ₹${Number(product.price).toLocaleString("en-IN")}
            </span>

            <a
              class="product-button"
              href="${safeLink}"
              ${product.link ? 'target="_blank" rel="nofollow sponsored noopener"' : 'aria-disabled="true"'}
              ${product.link ? '' : 'onclick="return false;"'}
            >
              View Product ↗
            </a>
          </div>

        </div>
      </article>
    `;
  }).join("");
}

// ==========================================
// SEARCH + CATEGORY FILTER + SORT
// ==========================================

function applyFilters() {
  let filteredProducts = [...products];

  // Category filter
  if (activeCategory !== "all") {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  // Search filter
  const searchTerm = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.desc.toLowerCase().includes(searchTerm)
    );
  }

  // Sorting
  const sortValue = sortSelect ? sortSelect.value : "featured";

  if (sortValue === "price-low" || sortValue === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (
    sortValue === "price-high" ||
    sortValue === "high-to-low"
  ) {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderProducts(filteredProducts);
}

// ==========================================
// SEARCH EVENT
// ==========================================

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

// ==========================================
// SORT EVENT
// ==========================================

if (sortSelect) {
  sortSelect.addEventListener("change", applyFilters);
}

// ==========================================
// CATEGORY BUTTONS
// ==========================================

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category || "all";

    document.querySelectorAll("[data-category]").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    applyFilters();
  });
});

// ==========================================
// CLEAR FILTERS
// ==========================================

if (clearButton) {
  clearButton.addEventListener("click", () => {
    activeCategory = "all";

    if (searchInput) {
      searchInput.value = "";
    }

    if (sortSelect) {
      sortSelect.value = "featured";
    }

    document.querySelectorAll("[data-category]").forEach(button => {
      button.classList.remove("active");

      if (button.dataset.category === "all") {
        button.classList.add("active");
      }
    });

    renderProducts(products);
  });
}

// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle =
  document.querySelector("#menuToggle") ||
  document.querySelector(".menu-toggle");

const navMenu =
  document.querySelector("#navMenu") ||
  document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

// ==========================================
// INITIAL DISPLAY
// ==========================================

renderProducts(products);
