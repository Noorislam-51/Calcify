// Toggle menu visibility and adjust main container width
let menu = document.querySelector(".menubutton");
let menubar = document.querySelector(".menubar");
let maincontainer = document.querySelector(".maincontainer");
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
  swiper.slideTo(currentSlideIndex);
});



//darkmode
// Select the dark mode toggle button and the menu bar element
const darkModeToggle = document.querySelector('.mode-button');
const calcBtns = document.querySelectorAll('.btn'); // Use plural for multiple buttons
const calcScreen = document.getElementById('screen');
const darkModeIcon = darkModeToggle.querySelector('i');
const menuicon = document.querySelector('.menubutton i');


let menulinks = document.querySelectorAll(".menu-links a");

// Toggle dark mode for the menu bar when the mode button is clicked
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Toggle the icon based on the theme
  if (document.body.classList.contains('dark-theme')) {
    darkModeIcon.classList.remove('fa-moon'); // Remove the moon icon
    darkModeIcon.classList.add('fa-sun');     // Add the sun icon 
    calcScreen.style.background = 'linear-gradient(315deg, #2d3436 0%, #000000 74%)';
    menulinks.forEach(link => {
      link.style.color = 'white';
    });
    
   


    // Change the background color of all buttons to blue
    calcBtns.forEach(btn => {
      btn.style.background = 'linear-gradient(315deg, #2d3436 0%, #000000 74%)';
      btn.style.color = 'white';
    });
    
  } else {
    darkModeIcon.classList.remove('fa-sun');  // Remove the sun icon
    darkModeIcon.classList.add('fa-moon');     // Add the moon icon
    calcScreen.style.background = 'white';
    menulinks.forEach(link => {
      link.style.color = 'black ';
    });


    // Change the background color of all buttons to white
    calcBtns.forEach(btn => {
      btn.style.background = 'white';
      btn.style.color = 'black';
    });

  }
});

// basic calc

// Basic Calculator Functions
var basicScreen = document.querySelector('#basiccalc .box #screen');
var basicBtns = document.querySelectorAll('#basiccalc .box .btn');

// Event Listener for Basic Calculator Buttons
for (let btn of basicBtns) {
  btn.addEventListener('click', (e) => {
    let btntext = e.target.innerText;

    if (btntext === '×') {
      btntext = '*';
    }
    if (btntext === '÷') {
      btntext = '/';
    }
    basicScreen.value += btntext;
  });
}

function basicBackspace() {
  basicScreen.value = basicScreen.value.slice(0, -1);
}

function basicEvaluateExpression() {
  try {
    let expression = basicScreen.value.replace(/×/g, '*').replace(/÷/g, '/');
    basicScreen.value = eval(expression);
  } catch (error) {
    basicScreen.value = 'Error';
  }
}

// Advanced Calculator Functions
var advancedScreen = document.querySelector('#advancecalc .box #screen');
var advancedBtns = document.querySelectorAll('#advancecalc .box .btn');

// Event Listener for Advanced Calculator Buttons
for (let btn of advancedBtns) {
  btn.addEventListener('click', (e) => {
    let btntext = e.target.innerText;

    if (btntext === '×') {
      btntext = '*';
    }
    if (btntext === '÷') {
      btntext = '/';
    }
    advancedScreen.value += btntext;
  });
}

function sin() {
  advancedScreen.value = Math.sin(advancedScreen.value);
}

function cos() {
  advancedScreen.value = Math.cos(advancedScreen.value);
}

function tan() {
  advancedScreen.value = Math.tan(advancedScreen.value);
}

function pow() {
  advancedScreen.value = Math.pow(advancedScreen.value, 2);
}

function sqrt() {
  advancedScreen.value = Math.sqrt(advancedScreen.value);
}

function log() {
  advancedScreen.value = Math.log(advancedScreen.value);
}

function pi() {
  advancedScreen.value = Math.PI;
}

function e() {
  advancedScreen.value = Math.E;
}

function fact() {
  let num = parseInt(advancedScreen.value, 10);
  let f = 1;
  for (let i = 1; i <= num; i++) {
    f *= i;
  }
  advancedScreen.value = f;
}

function advancedBackspace() {
  advancedScreen.value = advancedScreen.value.slice(0, -1);
}


// bmi calulator
document.addEventListener('DOMContentLoaded', function () {
  // Select the form element and result display elements
  const form = document.getElementById('bmi-form');
  const bmiValueElement = document.getElementById('bmi-value');
  const bmiCategoryElement = document.getElementById('bmi-category');

  // Function to calculate BMI
  function calculateBMI(weight, height) {
    // Convert height from cm to meters
    height = height / 100;
    // Calculate BMI
    const bmi = weight / (height * height);
    return bmi.toFixed(1); // Return BMI rounded to 1 decimal place
  }

  // Function to determine BMI category
  function getBMICategory(bmi) {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  }

  // Handle form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from form inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }

    // Calculate BMI and get category
    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);

    // Display the results
    bmiValueElement.textContent = `Your BMI is ${bmi}`;
    bmiCategoryElement.textContent = `Category: ${category}`;
  });
});


// currency calulator

// Fixed exchange rates relative to USD
const exchangeRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.82,
  JPY: 144.41,
  INR: 83.15 // Example rate for INR relative to USD
  // Add more currencies and their rates as needed
};

// Function to convert currency based on user input
function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById('result').innerText = 'Please enter a valid amount.';
    return;
  }

  // Perform conversion using fixed exchange rates
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];

  if (!fromRate || !toRate) {
    document.getElementById('result').innerText = 'Currency not supported.';
    return;
  }

  const result = amount * (toRate / fromRate);
  document.getElementById('result').innerText = `Converted Amount: ${result.toFixed(2)} ${toCurrency}`;
}
