function validateRegisterForm() {
  let isValid = true;
  const usernameInput = document.getElementById('registerUsername');
  const emailInput = document.getElementById('registerEmail');
  const passwordInput = document.getElementById('registerPassword');
  const confirmPasswordInput = document.getElementById('registerConfirmPassword');
  const usernameError = document.getElementById('registerUsernameError');
  const emailError = document.getElementById('registerEmailError');
  const passwordError = document.getElementById('registerPasswordError');
  const confirmPasswordError = document.getElementById('registerConfirmPasswordError');

  usernameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';

  if (usernameInput.value.trim() === '') {
      usernameError.textContent = 'Username is required.';
      isValid = false;
  }

  if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required.';
      isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Invalid email format.';
      isValid = false;
  }

  if (passwordInput.value === '') {
      passwordError.textContent = 'Password is required.';
      isValid = false;
  } else if (passwordInput.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters long.';
      isValid = false;
  }

  if (confirmPasswordInput.value === '') {
      confirmPasswordError.textContent = 'Confirm Password is required.';
      isValid = false;
  } else if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = 'Passwords do not match.';
      isValid = false;
  }

  if (isValid) {
      console.log('Registration successful!');
      document.getElementById('authContainer').style.display = 'none';
      document.getElementById('shoppingCartContainer').style.display = 'block';
      loadProducts();
  }

  return isValid;
}

function validateLoginForm() {
  let isValid = true;
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const emailError = document.getElementById('loginEmailError');
  const passwordError = document.getElementById('loginPasswordError');

  emailError.textContent = '';
  passwordError.textContent = '';

  if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required.';
      isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Invalid email format.';
      isValid = false;
  }

  if (passwordInput.value === '') {
      passwordError.textContent = 'Password is required.';
      isValid = false;
  }

  if (isValid) {
      console.log('Login successful!');
      document.getElementById('authContainer').style.display = 'none';
      document.getElementById('shoppingCartContainer').style.display = 'block';
      loadProducts();
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

let cart = [];

function addToCart(productId, productName, price) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
      existingItem.quantity++;
  } else {
      cart.push({ id: productId, name: productName, price: price, quantity: 1 });
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cartItems');
  cartItemsDiv.innerHTML = '';
  if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is currently empty.</p>';
      return;
  }

  const cartList = document.createElement('ul');
  cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('cart-item');
      listItem.innerHTML = `
          <span>${item.name} (${item.quantity} x ₹${item.price.toFixed(2)})</span>
          <span>₹${(item.quantity * item.price).toFixed(2)}</span>
      `;
      cartList.appendChild(listItem);
  });
  cartItemsDiv.appendChild(cartList);

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalElement = document.createElement('p');
  totalElement.classList.add('cart-total');
  totalElement.textContent = `Total: ₹${total.toFixed(2)}`;
  cartItemsDiv.appendChild(totalElement);
}

function loadProducts() {
  const productListDiv = document.getElementById('productList');
  productListDiv.innerHTML = '';

  const products = [
      { id: 1, name: 'Laptop', price: 50000, image: 'laptop.jpg' },
      { id: 2, name: 'Headphones', price: 2000, image: 'headphones.jpg' },
      { id: 3, name: 'Smartphone', price: 30000, image: 'smartphone.jpg' },
      { id: 4, name: 'Smartwatch', price: 5000, image: 'smartwatch.jpg' },
  ];

  products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-item');
      productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: ₹${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
      `;
      productListDiv.appendChild(productDiv);
  });
}

function checkout() {
  if (cart.length > 0) {
      const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
      alert(`Checkout initiated! Total amount: ₹${total.toFixed(2)}. Functionality will be implemented here.`);
      cart = []; // Clear the cart after checkout
      updateCartDisplay();
  } else {
      alert('Your cart is empty. Add items to checkout.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('authContainer').style.display = 'block';
  document.getElementById('shoppingCartContainer').style.display = 'none';

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      validateRegisterForm();
  });

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      validateLoginForm();
  });

  const showCartButton = document.getElementById('showCart');
  showCartButton.addEventListener('click', () => {
      document.getElementById('productListContainer').style.display = 'none';
      document.getElementById('cartView').style.display = 'block';
  });

  const showProductsButton = document.getElementById('showProducts');
  showProductsButton.addEventListener('click', () => {
      document.getElementById('productListContainer').style.display = 'block';
      document.getElementById('cartView').style.display = 'none';
  });
});