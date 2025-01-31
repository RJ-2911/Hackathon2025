const { ApolloServer, gql } = require('apollo-server');

// Define your types (GraphQL Schema)
const typeDefs = gql`
  type Product {
    id: ID
    title: String
    description: String
    price: Float
    category: String
    image: String
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    addToCart(productId: ID!): String
  }
`;

// Define resolvers (How to fetch the data)
const resolvers = {
  Query: {
    products: () => [
      { id: '1', title: 'Imperfect Apples', description: 'Perfect for cooking.', price: 60, category: 'Ugly Products', image: 'https://example.com/apple.jpg' },
      { id: '2', title: 'Mixed Vegetable Pack', description: 'A mix of assorted vegetables.', price: 120, category: 'Ugly Products', image: 'https://example.com/vegetable.jpg' },
      { id: '3', title: 'Herb Garden Starter Kit', description: 'Start your own herb garden.', price: 499, category: 'Home Garden', image: 'https://example.com/herb.jpg' },
      { id: '4', title: 'Organic Potting Soil', description: 'Premium organic soil.', price: 299, category: 'Home Garden', image: 'https://example.com/soil.jpg' },
    ]
  },
  Mutation: {
    addToCart: (parent, { productId }) => {
      // Simple simulation of adding to cart
      return `Product with ID: ${productId} has been added to the cart!`;
    }
  }
};

// Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
