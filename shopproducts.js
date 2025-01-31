import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const { ApolloClient, InMemoryCache, gql } = ApolloClient;

const client = new ApolloClient({
  uri: 'http://localhost:4000',  // Your Apollo Server URL
  cache: new InMemoryCache()
});

// GraphQL query to get products
const GET_PRODUCTS = gql`
  query {
    products {
      id
      title
      description
      price
      category
      image
    }
  }
`;

// Fetch products and display them
client
  .query({ query: GET_PRODUCTS })
  .then(response => {
    const products = response.data.products;
    const productGrid = document.querySelector('.product-grid');

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-content">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${product.title}</h3>
          <p>${product.description}</p>
          <div class="product-price">₹${product.price}</div>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;

      productGrid.appendChild(productCard);
    });

    // Add event listeners for "Add to Cart"
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        addToCart(productId);
      });
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });

// Add to Cart Mutation
function addToCart(productId) {
  client
    .mutate({
      mutation: gql`
        mutation {
          addToCart(productId: "${productId}")
        }
      `
    })
    .then(response => {
      alert(response.data.addToCart);
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
    });
}

const GET_PRODUCTS_BY_CATEGORY = gql`
  query($category: String) {
    products(category: $category) {
      id
      title
      description
      price
      category
      image
    }
  }
`;

// Filter products when category is selected
function filterProducts(category) {
  client
    .query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: { category }
    })
    .then(response => {
      // Display filtered products (same as above)
    });
}
