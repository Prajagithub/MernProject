// const express = require("express");
// require('dotenv').config();
// console.log("MONGO_URI from .env:", process.env.MONGO_URI); // Debugging

// const { ApolloServer } = require("apollo-server-express");
// const typeDefs = require("./schema");
// const resolvers = require("./resolvers");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const fetch = require("node-fetch");
// const FormData = require("form-data");
// const dotenv = require("dotenv");

// const connectToDatabase = require("./database");
// dotenv.config();

// async function query(data) {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0",
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}`,
//       },
//       method: "POST",
//       body: JSON.stringify(data),
//     }
//   );
//   const result = await response.json();
//   return result;
// }

// async function startServer() {
//   // Connect to the database
//   await connectToDatabase();

//   //Create an Express app
//   const app = express();
//   app.use(cors());
//   app.use(bodyParser.json({ limit: "50mb" }));
//   app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//   // Create an Apollo server
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   await server.start();

//   // Apply the Apollo middleware to the Express app
//   server.applyMiddleware({ app });

//   app.post("/upload-to-imgbb", async (req, res) => {
//     // console.log(req.body);
//     const { image } = req.body;
//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const imgbbResponse = await fetch(
//         "https://api.imgbb.com/1/upload?" + `key=${process.env.IMGBB_KEY}`,
//         {
//           method: "POST",
//           headers: {
//             "access-control-allow-origin": "*",
//           },
//           body: formData,
//         }
//       );
//       const imgbbData = await imgbbResponse.json();
//       res.json(imgbbData);
//     } catch (error) {
//       console.error("Error uploading image to ImgBB:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Get recipe from huggingface model
//   app.post("/generate-recipe", async (req, res) => {
//     try {
//       const response = await query(req.body);
//       res.json(response);
//     } catch (error) {
//       console.error("Error querying Hugging Face API:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   app.get("/", function (req, res) {
//     res.send("Hello World!");
//   });

//   // Start the Express server
//   app.listen({ port: 4000 }, () => {
//     console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
//   });
// }

// startServer();

// const mongoose = require('mongoose');

// const mongoURI = process.env.MONGO_URI;
// console.log("Connecting to MongoDB...", mongoURI); // Debugging line

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected!"))
//   .catch(err => console.error("❌ MongoDB Connection Error:", err.message));



// const express = require("express");
// require("dotenv").config(); // Load environment variables at the top
// const { ApolloServer } = require("apollo-server-express");
// const typeDefs = require("./schema");
// const resolvers = require("./resolvers");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const fetch = require("node-fetch");
// const FormData = require("form-data");
// const mongoose = require("mongoose");

// // MongoDB Connection Function
// async function connectToDatabase() {
//   const mongoURI = process.env.MONGO_URI;
//   if (!mongoURI) {
//     console.error("❌ MONGO_URI is not defined in .env file!");
//     process.exit(1); // Exit process if no URI
//   }
//   console.log("Connecting to MongoDB...");

//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected!");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1); // Exit if connection fails
//   }
// }

// // Function to query Hugging Face API
// async function query(data) {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0",
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}`,
//       },
//       method: "POST",
//       body: JSON.stringify(data),
//     }
//   );
//   return await response.json();
// }

// // Start Server Function
// async function startServer() {
//   await connectToDatabase(); // Connect to MongoDB before starting server

//   const app = express();
//   app.use(cors());
//   app.use(bodyParser.json({ limit: "50mb" }));
//   app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//   // Create Apollo Server
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   await server.start();
//   server.applyMiddleware({ app }); // Apply middleware before listening

//   // ImgBB Image Upload API
//   app.post("/upload-to-imgbb", async (req, res) => {
//     const { image } = req.body;
//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const imgbbResponse = await fetch(
//         `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,
//         {
//           method: "POST",
//           headers: { "access-control-allow-origin": "*" },
//           body: formData,
//         }
//       );
//       const imgbbData = await imgbbResponse.json();
//       res.json(imgbbData);
//     } catch (error) {
//       console.error("Error uploading image to ImgBB:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Hugging Face Recipe Generation API
//   app.post("/generate-recipe", async (req, res) => {
//     try {
//       const response = await query(req.body);
//       res.json(response);
//     } catch (error) {
//       console.error("Error querying Hugging Face API:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Test Route
//   app.get("/", (req, res) => res.send("Hello World!"));
//   server.applyMiddleware({ app });


//   // Start Express Server
//   app.listen({ port: 4000 }, () => {
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
//   });
// }

// startServer();




// const express = require("express");
// require("dotenv").config(); // Load environment variables first
// const { ApolloServer } = require("apollo-server-express");
// const typeDefs = require("./schema");
// const resolvers = require("./resolvers");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const fetch = require("node-fetch");
// const FormData = require("form-data");
// const mongoose = require("mongoose");



// // MongoDB Connection Function
// async function connectToDatabase() {
//   const mongoURI = process.env.MONGO_URI;

//   if (!mongoURI) {
//     console.error("❌ MONGO_URI is not defined in .env file!");
//     process.exit(1); // Exit process if no URI
//   }

//   console.log("Connecting to MongoDB...");

//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected!");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1); // Exit if connection fails
//   }
// }

// // Function to query Hugging Face API
// async function query(data) {
//   try {
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0",
//       {
//         headers: {
//           Authorization: Bearer `${process.env.HUGGINGFACE_KEY}`,
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(data),
//       }
//     );
//     return await response.json();
//   } catch (error) {
//     console.error("Error querying Hugging Face API:", error);
//     throw new Error("Failed to fetch response from Hugging Face API");
//   }
// }

// // Start Server Function
// async function startServer() {
//   await connectToDatabase(); // Connect to MongoDB before starting server

//   const app = express();
//   app.use(cors());
//   app.use(bodyParser.json({ limit: "50mb" }));
//   app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//   // Create Apollo Server
//   // const server = new ApolloServer({
//   //   typeDefs,
//   //   resolvers,

//   // });
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     introspection: true,  // Allow schema inspection
//     playground: true,     // Enable GraphQL Playground
//   });
  
//   async function startServer() {
//     await server.start(); // Start the Apollo Server
//     server.applyMiddleware({ app }); // Apply middleware correctly
//   }
 
  

//   await server.start();
//   server.applyMiddleware({ app }); // Apply GraphQL middleware

//   // ImgBB Image Upload API
//   app.post("/upload-to-imgbb", async (req, res) => {
//     const { image } = req.body;

//     if (!image) {
//       return res.status(400).json({ error: "No image provided" });
//     }

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const imgbbResponse = await fetch(
//         https="//api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       const imgbbData = await imgbbResponse.json();
//       res.json(imgbbData);
//     } catch (error) {
//       console.error("Error uploading image to ImgBB:", error);
//       res.status(500).json({ error: "Failed to upload image to ImgBB" });
//     }
//   });

//   // Hugging Face Recipe Generation API
//   app.post("/generate-recipe", async (req, res) => {
//     try {
//       const response = await query(req.body);
//       res.json(response);
//     } catch (error) {
//       console.error("Error querying Hugging Face API:", error);
//       res.status(500).json({ error: "Failed to generate recipe" });
//     }
//   });

//   // Test Route
//   app.get("/", (req, res) => res.send("Hello World!"));
//   server.applyMiddleware({ app });
//   // Start Express Server
//   app.listen(4000, () => {
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
//   });
// }

// startServer();




const express = require("express");
require("dotenv").config(); // Load environment variables first
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const FormData = require("form-data");
const mongoose = require("mongoose");

// MongoDB Connection Function
async function connectToDatabase() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("❌ MONGO_URI is not defined in .env file!");
    process.exit(1); // Exit process if no URI
  }

  console.log("Connecting to MongoDB...");

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit if connection fails
  }
}

// Function to query Hugging Face API
async function query(data) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}`, // Fixed syntax
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error querying Hugging Face API:", error);
    throw new Error("Failed to fetch response from Hugging Face API");
  }
}

// Start Server Function
async function startServer() {
  await connectToDatabase(); // Connect to MongoDB before starting server

  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Allow schema inspection
    playground: true, // Enable GraphQL Playground
  });

  await server.start();
  server.applyMiddleware({ app }); // Apply GraphQL middleware ONCE

  // ImgBB Image Upload API
  app.post("/upload-to-imgbb", async (req, res) => {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`, // Fixed interpolation
        {
          method: "POST",
          body: formData,
        }
      );
      const imgbbData = await imgbbResponse.json();
      res.json(imgbbData);
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      res.status(500).json({ error: "Failed to upload image to ImgBB" });
    }
  });

  // Hugging Face Recipe Generation API
  app.post("/generate-recipe", async (req, res) => {
    try {
      const response = await query(req.body);
      res.json(response);
    } catch (error) {
      console.error("Error querying Hugging Face API:", error);
      res.status(500).json({ error: "Failed to generate recipe" });
    }
  });

  // Test Route
  app.get("/", (req, res) => res.send("Hello World!"));

  app.get("/api/recipes", (req, res) => {
    res.json({ message: "Recipes API is working!" });
  });
  

  // Start Express Server
  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

// Call the function to start the server
startServer();
