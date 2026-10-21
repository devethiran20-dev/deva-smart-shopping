// ========================================
// DEVA SMART SHOPPING - COMPLETE SCRIPT
// ========================================

const products = [
  {
    id: 1,
    name: "Fast Charging Adapter",
    category: "Mobile Accessories",
    price: 499,
    emoji: "🔌",
    badge: "TECH PICK",
    desc: "Check wattage, charging standard and device compatibility.",
    bg: "#eaf2ed",
    link: ""
  },
  {
    id: 2,
    name: "Everyday Mobile Cover",
    category: "Mobile Accessories",
    price: 249,
    emoji: "📱",
    badge: "POPULAR",
    desc: "Choose the exact phone model and preferred material.",
    bg: "#e9eef5",
    link: ""
  },
  {
    id: 3,
    name: "USB-C Charging Cable",
    category: "Mobile Accessories",
    price: 199,
    emoji: "〰️",
    badge: "DAILY ESSENTIAL",
    desc: "Check connector type, supported power and cable length.",
    bg: "#f1f0dc",
    link: ""
  },
  {
    id: 4,
    name: "Portable Power Bank",
    category: "Power Banks",
    price: 999,
    emoji: "🔋",
    badge: "TRAVEL PICK",
    desc: "Compare capacity, output wattage, ports and warranty.",
    bg: "#eaf2ed",
    link: ""
  },
  {
    id: 5,
    name: "Cotton Everyday Kurti",
    category: "Women's Fashion",
    price: 699,
    emoji: "👗",
    badge: "STYLE PICK",
    desc: "Review fabric, size chart, length and return policy.",
    bg: "#f8e9e5",
    link: ""
  },
  {
    id: 6,
    name: "Men's Casual T-Shirt",
    category: "Men's Wear",
    price: 399,
    emoji: "👕",
    badge: "CASUAL STYLE",
    desc: "Check fabric, fit, size chart and wash instructions.",
    bg: "#e9eef5",
    link: ""
  },
  {
    id: 7,
    name: "Everyday Sneakers",
    category: "Shoes",
    price: 1199,
    emoji: "👟",
    badge: "COMFORT PICK",
    desc: "Review size guide, sole material and return options.",
    bg: "#f3e9d9",
    link: ""
  },
  {
    id: 8,
    name: "Classic Wrist Watch",
    category: "Watches",
    price: 899,
    emoji: "⌚",
    badge: "TIMELESS",
    desc: "Compare movement, strap, water resistance and warranty.",
    bg: "#f1f0dc",
    link: ""
  },
  {
    id: 9,
    name: "Daily Skincare Set",
    category: "Beauty",
    price: 549,
    emoji: "🧴",
    badge: "SELF-CARE",
    desc: "Check ingredients, skin suitability and product authenticity.",
    bg: "#eee8f4",
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
  link: "YOUR_EXISTING_AMAZON_AFFILIATE_LINK"
  },
  {
    id: 11,
    name: "Women's Embroidery Anarkali Dress",
    category: "Women's Fashion",
    price: 689,
    emoji: "👗",
    badge: "STYLE PICK",
    desc: "Check available sizes, fabric details and current price on Amazon.",
    bg: "#f8e9e5",

    // Dress image
    image: "https://m.media-amazon.com/images/I/81wQ0dt8GnL._SX679_.jpg",

    // Amazon affiliate link
    link: "https://www.amazon.in/Nermosa-Women-Embroidery-Anarkali-Dupatta/dp/B0FT1981L8?crid=TNARD6XTWRJX&dib=eyJ2IjoiMSJ9._sZG-0s606aXQqC8Ow7qRJWz1fxoLBIo2WmNsetgP8BGf7uTmm2w0BSMNVaCzdb6-hxOUP9zp3BhZzpI8cJmxqQ-hCET7ujUM_pfZlgP36jIzGMWKy0n3teTczB80pOP1sre92D16jzFuNi8sYsKphPiGS1W9RY91WoZyGpZEYouhus-8PhW__gEPXvhNfyD2-2xkvyNPox0tMO6yuE-nbq3HSwHRN7Ve_3O3nwR0U2yg_5bxDq2Eqx-AHBYtsxqWMDW3yjeHfti7rUEvNlFzWRlWYZ-B_gnE7Gr36zXN-A.2pmjCYmScin7N0wyLNVN1Aaw5L8dLdnLSjzf9axdyus&dib_tag=se&keywords=kurta+sets+for+woman&qid=1792493148&sprefix=ku%2Caps%2C414&sr=8-3-spons&aref=kHRvQL5D6f&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=ll2&tag=devasmartshop-21&linkId=acb733719c667b8efb17eccfa0551f09&ref_=as_li_ss_tl"
  }
];

let activeCategory = "All";
let searchTerm = "";
let sortMode = "featured";

// Website elements
const grid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");
const productsTitle = document.getElementById("productsTitle");

// Format price in Indian Rupees
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

// Filter and sort products
function getVisibleProducts() {
  let list = products.filter(function (product) {
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const searchableText =
      `${product.name} ${product.category} ${product.desc}`.toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  if (sortMode === "price-low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sortMode === "price-high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sortMode === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

// Render products on the website
function renderProducts() {
  if (!grid) {
    console.error('Product grid not found. Check index.html for id="productGrid".');
    return;
  }

  const list = getVisibleProducts();

  grid.innerHTML = list.map(function (product) {
    const productImage = product.image
      ? `
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          style="width:100%;height:220px;object-fit:contain;"
          onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block';"
        >
      `
      : "";

    const imageFallbackStyle = product.image
      ? "display:none;"
      : "display:inline-block;";

    const buyLink = product.link || "#affiliate-setup";

    const buyAttributes = product.link
      ? 'target="_blank" rel="sponsored noopener noreferrer"'
      : 'data-demo-link="true"';

    return `
      <article class="product-card">

        <div
          class="product-visual"
          style="background:${product.bg};"
        >

          <span class="badge">${product.badge}</span>

          ${productImage}

          <span
            class="emoji"
            role="img"
            aria-label="${product.name}"
            style="${imageFallbackStyle}"
          >${product.emoji}</span>

        </div>

        <div class="product-content">

          <div class="product-category">
            ${product.category}
          </div>

          <h3>${product.name}</h3>

          <p class="product-desc">
            ${product.desc}
          </p>

          <div class="product-bottom">

            <span class="price">
              ${formatPrice(product.price)}
            </span>

            <a
              class="buy-button"
              href="${buyLink}"
              ${buyAttributes}
            >Buy Now ↗</a>

          </div>

        </div>

      </article>
    `;
  }).join("");

  // Update product count
  if (resultsCount) {
    resultsCount.textContent =
      `${list.length} ${list.length === 1 ? "product" : "products"}`;
  }

  // Show or hide no-results message
  if (noResults) {
    noResults.style.display = list.length === 0 ? "block" : "none";
  }

  // Update section heading
  if (productsTitle) {
    productsTitle.textContent =
      activeCategory === "All" ? "All Products" : activeCategory;
  }
}

// Search input
const searchInput =
  document.getElementById("searchInput") ||
  document.querySelector('input[type="search"]') ||
  document.querySelector('input[placeholder*="Search" i]');

if (searchInput) {
  searchInput.addEventListener("input", function () {
    searchTerm = this.value.trim().toLowerCase();
    renderProducts();
  });
}

// Category buttons
document.querySelectorAll("[data-category]").forEach(function (button) {
  button.addEventListener("click", function () {
    activeCategory = this.dataset.category || "All";

    document.querySelectorAll("[data-category]").forEach(function (item) {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    this.classList.add("active");
    this.setAttribute("aria-pressed", "true");

    renderProducts();
  });
});

// Sorting dropdown
const sortSelect =
  document.getElementById("sortSelect") ||
  document.getElementById("sortBy") ||
  document.querySelector('select[name="sort"]');

if (sortSelect) {
  sortSelect.addEventListener("change", function () {
    sortMode = this.value;
    renderProducts();
  });
}

// Handle demo product links
document.addEventListener("click", function (event) {
  const demoLink = event.target.closest('[data-demo-link="true"]');

  if (demoLink) {
    event.preventDefault();
    alert(
      "This is a demo product. The Amazon affiliate link has not been added yet."
    );
  }
});

// Initial display
renderProducts();
