// Demo product catalogue. Replace demo prices and add your approved affiliate URLs before publishing.
const products = [
  {id:1,name:"Fast Charging Adapter",category:"Mobile Accessories",price:499,emoji:"🔌",badge:"TECH PICK",desc:"Check wattage, charging standard and device compatibility.",bg:"#eaf2ed",link:""},
  {id:2,name:"Everyday Mobile Cover",category:"Mobile Accessories",price:249,emoji:"📱",badge:"POPULAR",desc:"Choose the exact phone model and preferred material.",bg:"#e9eef5",link:""},
  {id:3,name:"USB-C Charging Cable",category:"Mobile Accessories",price:199,emoji:"〰️",badge:"DAILY ESSENTIAL",desc:"Check connector type, supported power and cable length.",bg:"#f1f0dc",link:""},
  {id:4,name:"Portable Power Bank",category:"Power Banks",price:999,emoji:"🔋",badge:"TRAVEL PICK",desc:"Compare capacity, output wattage, ports and warranty.",bg:"#eaf2ed",link:""},
  {id:5,name:"Cotton Everyday Kurti",category:"Women's Fashion",price:699,emoji:"👗",badge:"STYLE PICK",desc:"Review fabric, size chart, length and return policy.",bg:"#f8e9e5",link:""},
  {id:6,name:"Men's Casual T-Shirt",category:"Men's Wear",price:399,emoji:"👕",badge:"CASUAL STYLE",desc:"Check fabric, fit, size chart and wash instructions.",bg:"#e9eef5",link:""},
  {id:7,name:"Everyday Sneakers",category:"Shoes",price:1199,emoji:"👟",badge:"COMFORT PICK",desc:"Review size guide, sole material and return options.",bg:"#f3e9d9",link:""},
  {id:8,name:"Classic Wrist Watch",category:"Watches",price:899,emoji:"⌚",badge:"TIMELESS",desc:"Compare movement, strap, water resistance and warranty.",bg:"#f1f0dc",link:""},
  {id:9,name:"Daily Skincare Set",category:"Beauty",price:549,emoji:"🧴",badge:"SELF-CARE",desc:"Check ingredients, skin suitability and product authenticity.",bg:"#eee8f4",link:""},
  {id:10,name:"Beard & Hair Trimmer",category:"Grooming",price:799,emoji:"✂️",badge:"GROOMING PICK",desc:"Compare runtime, charging time, blades and warranty.",bg:"#eaf2ed",link:""},
  {id:11,name:"Women's Embroidery Anarkali Dress",category:"Women's Fashion",price:689,emoji:"👗",badge:"STYLE PICK",desc:"Check available sizes, fabric details and current price on Amazon.",bg:"#f8e9e5",link:"https://www.amazon.in/Nermosa-Women-Embroidery-Anarkali-Dupatta/dp/B0FT1981L8?crid=TNARD6XTWRJX&dib=eyJ2IjoiMSJ9._sZG-0s606aXQqC8Ow7qRJWz1fxoLBIo2WmNsetgP8BGf7uTmm2w0BSMNVaCzdb6-hxOUP9zp3BhZzpI8cJmxqQ-hCET7ujUM_pfZlgP36jIzGMWKy0n3teTczB80pOP1sre92D16jzFuNi8sYsKphPiGS1W9RY91WoZyGpZEYouhus-8PhW__gEPXvhNfyD2-2xkvyNPox0tMO6yuE-nbq3HSwHRN7Ve_3O3nwR0U2yg_5bxDq2Eqx-AHBYtsxqWMDW3yjeHfti7rUEvNlFzWRlWYZ-B_gnE7Gr36zXN-A.2pmjCYmScin7N0wyLNVN1Aaw5L8dLdnLSjzf9axdyus&dib_tag=se&keywords=kurta+sets+for+woman&qid=1792493148&sprefix=ku%2Caps%2C414&sr=8-3-spons&aref=kHRvQL5D6f&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1&linkCode=ll2&tag=devasmartshop-21&linkId=acb733719c667b8efb17eccfa0551f09&ref_=as_li_ss_tl"}
];
let activeCategory = "All";
let searchTerm = "";
let sortMode = "featured";
const grid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");
const productsTitle = document.getElementById("productsTitle");

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR",maximumFractionDigits:0}).format(price);
}
function getVisibleProducts() {
  let list = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(searchTerm)
  );
  if (sortMode === "price-low") list.sort((a,b)=>a.price-b.price);
  if (sortMode === "price-high") list.sort((a,b)=>b.price-a.price);
  if (sortMode === "name") list.sort((a,b)=>a.name.localeCompare(b.name));
  return list;
}
function renderProducts() {
  const list = getVisibleProducts();
  grid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-visual" style="background:${p.bg}">
        <span class="badge">${p.badge}</span>
        <span class="emoji" role="img" aria-label="${p.name}">${p.emoji}</span>
      </div>
      <div class="product-content">
        <div class="product-category">${p.category}</div>
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-bottom">
          <span class="price">${formatPrice(p.price)}</span>
          <a class="buy-button" href="${p.link || '#affiliate-setup'}" ${p.link ? 'target="_blank" rel="sponsored noopener noreferrer"' : 'data-demo-link="true"'}>Buy Now ↗</a>
        </div>
      </div>
    </article>`).join("");
  noResults.hidden = list.length !== 0;
  grid.hidden = list.length === 0;
  resultsCount.textContent = `Showing ${list.length} sample product${list.length === 1 ? "" : "s"}`;
  productsTitle.textContent = activeCategory === "All" ? "Popular picks to explore" : activeCategory;
}
function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".category-link").forEach(btn => btn.classList.toggle("active", btn.dataset.category === category));
  renderProducts();
  if (window.innerWidth <= 650) document.getElementById("categoryNav").classList.remove("open");
}
document.querySelectorAll("[data-category]").forEach(btn => btn.addEventListener("click", () => {
  setCategory(btn.dataset.category);
  if (btn.classList.contains("tile")) document.getElementById("products").scrollIntoView({behavior:"smooth"});
}));
document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  renderProducts();
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
});
document.getElementById("searchInput").addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderProducts();
});
document.getElementById("sortSelect").addEventListener("change", event => {
  sortMode = event.target.value;
  renderProducts();
});
document.getElementById("clearFilters").addEventListener("click", () => {
  activeCategory = "All"; searchTerm = ""; sortMode = "featured";
  document.getElementById("searchInput").value = "";
  document.getElementById("sortSelect").value = "featured";
  setCategory("All");
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("categoryNav");
  const open = nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", event => {
  const link = event.target.closest("[data-demo-link]");
  if (link) {
    event.preventDefault();
    alert("This is a demo button. Add your approved Amazon, Flipkart or Meesho affiliate URL in script.js before publishing.");
  }
});
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
