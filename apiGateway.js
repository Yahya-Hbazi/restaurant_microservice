const express = require("express");
//const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
//const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const restaurantProtoPath = "restaurant.proto";
const livreurProtoPath = "livreur.proto";

//const resolvers = require("./resolvers");
//const typeDefs = require("./schema");

const app = express();
app.use(bodyParser.json());

const restaurantProtoDefinition = protoLoader.loadSync(restaurantProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const livreurProtoDefinition = protoLoader.loadSync(livreurProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const restaurantProto = grpc.loadPackageDefinition(restaurantProtoDefinition).restaurant;
const livreurProto = grpc.loadPackageDefinition(livreurProtoDefinition).livreur;

const clientRestaurants = new restaurantProto.RestaurantService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const clientLivreurs = new livreurProto.LivreurService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

// const server = new ApolloServer({ typeDefs, resolvers });

// server.start().then(() => {
//   app.use(cors(), bodyParser.json(), expressMiddleware(server));
// });

app.get("/restaurants", (req, res) => {
  clientRestaurants.searchRestaurants({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.restaurants);
    }
  });
});

app.post("/restaurant", (req, res) => {
  const { id, title, description } = req.body;
  clientRestaurants.createRestaurant(
    { restaurant_id: id, title: title, description: description },
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.restaurant);
      }
    }
  );
});

app.put("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  clientRestaurants.updateRestaurant(
    { restaurant_id: id, title: title, description: description },
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.restaurant);
      }
    }
  );
});

app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  clientRestaurants.deleteRestaurant({ restaurant_id: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.restaurant);
    }
  });
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  clientRestaurants.getRestaurant({ restaurant_id: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.restaurant);
    }
  });
});

app.get("/livreurs", (req, res) => {
  clientLivreurs.searchLivreurs({}, (err, response) => {
    console.log(response);
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.livreurs);
    }
  });
});


app.get("/livreurs/:id", (req, res) => {
  const id = req.params.id;
  clientLivreurs.getLivreur({ livreur_id: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.livreur);
    }
  });
});

app.delete("/livreurs/:id", (req, res) => {
  const id = req.params.id;
  clientLivreurs.deleteLivreur({ livreur_id: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.livreur);
    }
  });
});

app.post("/livreur", (req, res) => {
  const {name, restaurant_id } = req.body;
  clientLivreurs.createLivreur(
    {name: name, restaurant_id: restaurant_id },
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(response.livreur);
      }
    }
  );
});



const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
module.exports.clientRestaurants = clientRestaurants;
