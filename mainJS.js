
const dummyProducts = [
  {
    name: "iPhone 15 Pro Max",
    image: "product1.png",
    price: 299.99,
    Capacity: "128 GB, 256 GB, 512 GB, 1 TB",
    Year: 2023,
    Screen: 6.7
  },
  {
    name: "iPhone 15 Plus",
    image: "product2.png",
    price: 209.99,
    Capacity: "128 GB, 256 GB, 512 GB",
    Year: 2023,
    Screen: 6.7

  },
  {
    name: "iPhone 14 Pro Max",
    image: "product3.png",
    price: 200.99,
    Capacity: "128 GB, 256 GB, 512 GB, 1 TB",
    Year: 2022,
    Screen: 6.7

  },
  {
    name: "iPhone 13 Pro Max",
    image: "product4.png",
    price: 200.99,
    Capacity: "128 GB, 256 GB, 512 GB, 1 TB",
    Year: 2021,
    Screen: 6.7

  },
  {
    name: "iPhone 11 Pro",
    image: "product5.jpg",
    price: 150.99,
    Capacity: "64, 256, 512 GB",
    Year: 2019,
    Screen: 5.8

  },
  {
    name: "iPhone 13",
    image: "product6.jpg",
    price: 160.99,
    Capacity: "128, 256, 512 GB",
    Year: 2021,
    Screen: 6.1

  },
  {
    name: "iPhone XR",
    image: "product7.jpg",
    price: 100.99,
    Capacity: "64, 128, 256 GB",
    Year: 2018,
    Screen: 6.1

  },
  {
    name: "iPhone 12",
    image: "product8.png",
    price: 140.99,
    Capacity: "64, 128, 256 GB",
    Year: 2020,
    Screen: 6.1

  },
];
const sliderContainer = document.getElementById("sliderContainer");

function createSlide(product) {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  slide.innerHTML = `
  <h3>${product.name} - $${product.price}</h3>
    <img src="${product.image}" alt="${product.name}">
  `;
  const img = slide.querySelector("img");
  img.addEventListener("mousemove", e => {
    showTooltip(e, product);
  });
  img.addEventListener("mouseleave", () => {
    hideTooltip();
  });
  return slide;
}

function renderSlider() {
  sliderContainer.innerHTML = `
  <button class="prev" onclick="prevSlide()">❮</button>
  <button class="next" onclick="nextSlide()">❯</button>
  `;
  dummyProducts.forEach(product => {
    sliderContainer.appendChild(createSlide(product));
  });
}

renderSlider();

function showTooltip(event, product) {
  const tooltip = document.getElementById("tooltip");
  if (!tooltip) {
    const tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    tooltip.classList.add("tooltip");
    document.body.appendChild(tooltip);
  }
  tooltip.innerHTML = `
  <p>Name: ${product.name}</p>
  <p>Price: $${product.price}</p>
  <p>Year: ${product.Year}</p>
  <p>Screen: ${product.Screen}</p>
  <p>Capacity: ${product.Capacity}</p>
`;
  tooltip.style.top = event.clientY + 15 + "px";
  tooltip.style.left = event.clientX + 15 + "px";
  tooltip.style.display = "block";
}

// Function to hide tooltip
function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  if (tooltip) {
    tooltip.style.display = "none";
  }
}

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

// Show initial slide
showSlide(currentIndex);


const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchButton = document.getElementById("searchButton");
function searchForProduct() {
  const searchText = searchInput.value.toLowerCase();
  const filteredProducts = dummyProducts.filter(product =>
    product.name.toLowerCase().includes(searchText)
  );
  displaySearchResults(filteredProducts);
};

function displaySearchResults(results) {
  searchResults.innerHTML = '';

  if (results.length > 0) {
    results.forEach(result => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${result.image}" class="product-image">
        <div class="product-name">${result.name}</div>
        <div class="product-price">$${result.price.toFixed(2)}</div>
      `;
      li.addEventListener("mousemove", e => {
        showTooltip(e, result);
      });
      li.addEventListener("mouseleave", () => {
        hideTooltip();
      });
      li.addEventListener("click", () => {
        showSelectedSlide(result);
      });
      searchResults.appendChild(li);
    });
  } else {
    searchResults.innerHTML = `<p style="text-align: center; font-weight: bold;">No Result Found</p>`;
  }
}

document.body.addEventListener("click", (event) => {
  const target = event.target;
  if (target !== searchInput && target !== searchButton && !searchResults.contains(target)) {
    searchResults.innerHTML = '';
  }
});


function showSelectedSlide(product) {
  sliderContainer.innerHTML = '';
  sliderContainer.appendChild(createSlide(product));
}

if (window.innerWidth <= 768) {
  const newElement = document.createElement('nav');
  newElement.classList.add("navbar");
  newElement.innerHTML = `
  <button class="hamburger-btn">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <ul class="snav-links">
    <li><a href="#" onclick="window.location.reload();">Home</a></li>
    <li><a href="#" onclick="window.location.reload();">Products</a></li>
    <li><a href="#">Contact</a></li>
  </ul>`;

  // Get the header element
  const headerElement = document.querySelector('header');

  // Append the new element to the header
  headerElement.appendChild(newElement);
} else {
  const newElement = document.createElement('nav');
  newElement.innerHTML = `<ul class="nav-links">
        <a class="header-link" href="#" onclick="window.location.reload();">
          <li class="header-items">Home</li>
        </a>
        <a class="header-link" href="#" onclick="window.location.reload();">
          <li class="header-items">Products</li>
        </a>
        <a class="header-link" href="#">
          <li class="header-items">Contact</li>
        </a>
      </ul>`;

  // Get the header element
  const headerElement = document.querySelector('header');

  // Append the new element to the header
  headerElement.appendChild(newElement);
}

const btn = document.querySelector('.hamburger-btn');
const links = document.querySelector('.snav-links');

btn.addEventListener('click', () => {
  if (links.style.display === 'block') {
    links.style.display = 'none';
  } else {
    links.style.display = 'block';
  }
});