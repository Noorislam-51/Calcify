// Toggle menu visibility and adjust main container width
const menu = document.querySelector(".menubutton");
const menubar = document.querySelector(".menubar");
const maincontainer = document.querySelector(".maincontainer");
menubar.style.display = 'none';

menu.addEventListener('click', () => {
  if (menubar.style.display === 'none') {
    menubar.style.display = 'flex';
    maincontainer.style.width = '80vw';
  } else {
    menubar.style.display = 'none';
    maincontainer.style.width = '100vw';
  }
});

// Initialize Swiper instance
const swiper = new Swiper('.swiper-container', {
  effect: 'cube',
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  speed: 1000, // Transition speed between slides (in milliseconds)
  loop: false, // Disable looping
  autoplay: false, // Disable auto-rotation
  navigation: false, // Disable navigation buttons
  allowTouchMove: false,
});

// Handle menu link clicks to change Swiper slide
document.querySelectorAll('.menu-links a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    const slideIndex = parseInt(link.getAttribute('data-slide'), 10);
    swiper.slideTo(slideIndex); // Slide to the index specified in the data-slide attribute
  });
});

// Update Swiper on window resize to prevent issues with slide positions
window.addEventListener('resize', () => {
  swiper.update();
});

// Dark Mode Functionality
const darkModeToggle = document.querySelector('.mode-buttons .mode-button');
const highlightButton = document.querySelector('.mode-buttons .hightlight-button');
const calcBtnsContainer = document.querySelectorAll('.btns');
const calcScreens = document.querySelectorAll('.display input');
const darkModeIcon = darkModeToggle.querySelector('i');
const menuicon = document.querySelector('.navbar .menubutton i');
const menulinks = document.querySelectorAll(".menu-links a");
const currencyInput = document.querySelectorAll('#currencycalc input');
const bmiInputs = document.querySelectorAll('#bmicalc input');
const currencyHeading = document.querySelector('#currencycalc h1');
const bmiHeading = document.querySelector('#bmicalc h1');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  const isDarkMode = document.body.classList.contains('dark-theme');

  // Toggle highlight button visibility
  highlightButton.style.display = isDarkMode ? 'inline-block' : 'none';

  // Toggle icons based on the theme
  darkModeIcon.classList.toggle('fa-sun', isDarkMode);
  darkModeIcon.classList.toggle('fa-moon', !isDarkMode);

  // Change styles for dark/light mode
  const screensBackground = isDarkMode ? 'linear-gradient(315deg, #2d3436 0%, #000000 74%)' : 'white';
  const screensColor = isDarkMode ? 'white' : 'black';
  const headingColor = isDarkMode ? 'white' : 'black';

  // Update calculator screens and buttons
  [...calcScreens, ...currencyInput, ...bmiInputs].forEach(input => {
    input.style.background = screensBackground;
    input.style.color = screensColor;
  });

  // Update calculator buttons
  calcBtnsContainer.forEach(container => {
    container.querySelectorAll('button').forEach(btn => {
      btn.style.background = screensBackground;
      btn.style.color = screensColor;
    });
  });

  // Update headings
  currencyHeading.style.color = headingColor;
  bmiHeading.style.color = headingColor;

  // Update menu links and icons
  menulinks.forEach(link => {
    link.style.color = screensColor;
  });
  menuicon.style.color = screensColor;
});

// Highlight button logic
// Basic Calculator Functions
const basicScreen = document.querySelector('#basiccalc .box #screen');
const basicBtns = document.querySelectorAll('#basiccalc .box .btn');

basicBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const btntext = { '×': '*', '÷': '/' }[e.target.innerText] || e.target.innerText; // Simplified if-else
    basicScreen.value += btntext;
  });
});

function basicBackspace() {
  basicScreen.value = basicScreen.value.slice(0, -1);
}

function basicEvaluateExpression() {
  try {
    const expression = basicScreen.value.replace(/×/g, '*').replace(/÷/g, '/');
    basicScreen.value = eval(expression);
  } catch {
    basicScreen.value = 'Error';
  }
}

// Advanced Calculator Functions
const advancedScreen = document.querySelector('#advancecalc .box #screen');
const advancedBtns = document.querySelectorAll('#advancecalc .box .btn');

advancedBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const btntext = { '×': '*', '÷': '/' }[e.target.innerText] || e.target.innerText; // Simplified if-else
    advancedScreen.value += btntext;
  });
});

const advancedFunctions = {
  sin: () => { advancedScreen.value = Math.sin(advancedScreen.value); },
  cos: () => { advancedScreen.value = Math.cos(advancedScreen.value); },
  tan: () => { advancedScreen.value = Math.tan(advancedScreen.value); },
  pow: () => { advancedScreen.value = Math.pow(advancedScreen.value, 2); },
  sqrt: () => { advancedScreen.value = Math.sqrt(advancedScreen.value); },
  log: () => { advancedScreen.value = Math.log(advancedScreen.value); },
  pi: () => { advancedScreen.value = Math.PI; },
  e: () => { advancedScreen.value = Math.E; },
  fact: () => {
    const num = parseInt(advancedScreen.value, 10);
    advancedScreen.value = Array.from({ length: num }, (_, i) => i + 1).reduce((f, val) => f * val, 1);
  },
};

function advancedBackspace() {
  advancedScreen.value = advancedScreen.value.slice(0, -1);
}

// BMI Calculator
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bmi-form');
  const bmiValueElement = document.getElementById('bmi-value');
  const bmiCategoryElement = document.getElementById('bmi-category');

  function calculateBMI(weight, height) {
    return (weight / ((height / 100) ** 2)).toFixed(1);
  }

  function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obesity';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }

    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);

    bmiValueElement.textContent = `Your BMI is ${bmi}`;
    bmiCategoryElement.textContent = `Category: ${category}`;
  });
});

// Currency Calculator
const exchangeRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.82,
  JPY: 144.41,
  INR: 83.15, // Example rate for INR relative to USD
};

function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById('result').innerText = 'Please enter a valid amount.';
    return;
  }

  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];

  if (!fromRate || !toRate) {
    document.getElementById('result').innerText = 'Currency not supported.';
    return;
  }

  const result = amount * (toRate / fromRate);
  document.getElementById('result').innerText = `Converted Amount: ${result.toFixed(2)} ${toCurrency}`;
}
