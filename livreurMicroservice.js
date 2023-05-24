const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const clientRestaurants = require("./apiGateway.js").clientRestaurants;
const livreurProtoPath = "livreur.proto";
const livreurProtoDefinition = protoLoader.loadSync(livreurProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const livreurProto = grpc.loadPackageDefinition(livreurProtoDefinition).livreur;
const livreurs = [
  {
    id: "1",
    name: "Example Livreur 1",
    restaurant: {
      id: "1",
      title: "Example restaurant 2",
      description: "This is the second example restaurant.",
    },
  },
  {
    id: "2",
    name: "Example Livreur 2",
    restaurant: {
      id: "2",
      title: "Example restaurant 2",
      description: "This is the second example restaurant.",
    },
  },
];
let global_id = livreurs.length;

const livreurService = {
  getLivreur: (call, callback) => {
    const get_id = livreurs.indexOf(livreurs.find(element => element.id == call.request.livreur_id));

    if (get_id < 0) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: 'NOT FOUND',
      });
    }
    const livreur = {
      
      id: call.request.livreur_id,
      name: livreurs[get_id].name,
      restaurant: livreurs[get_id].restaurant,
  
    };
    callback(null, {livreur});
  },
  searchLivreurs: (call, callback) => {
    const { query } = call.request;

    callback(null, { livreurs });
  },

  createLivreur: (call, callback) => {
    const { query } = call.request;
    const livreur = {
      id: ++global_id,
      name: call.request.name,
    };
    clientRestaurants.getRestaurant({ restaurant_id: call.request.restaurant_id }, (err, response) => {
      if (!err) {
        livreur.restaurant = response.restaurant;
        livreurs.push(livreur);
        callback(null, { livreur });
      } else {
        callback(null, { livreur });
      }
    });
  },
  deleteLivreur: (call, callback) => {
    const { query } = call.request;
    const livreur = {
      id: call.request.livreur_id,
    };
    const delete_id = livreurs.indexOf(
      livreurs.find((element) => element.id == livreur.id)
    );
    livreurs.splice(delete_id, 1);
    callback(null, { livreur });
  },
  /*
  updateLivreur: (call, callback) => {
    console.log(call.request.livreur_id);

    const livreur = {
      id: call.request.livreur_id,
      title: call.request.title,
      description: call.request.description
  
    };
    console.log(livreur);
    livreurs[call.request.livreur_id] = livreur;
    callback(null, {livreur});
  },

  deleteLivreur: (call, callback) => {
    const { query } = call.request;
    const livreur = {
      id: call.request.livreur_id,

    };
    console.log(livreur);
    livreurs.pop(livreur);
    callback(null, {livreur});
  }
*/
};

const server = new grpc.Server();
server.addService(livreurProto.LivreurService.service, livreurService);
const port = 50052;
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
      return;
    }

    console.log(`Server is running on port ${port}`);
    server.start();
  }
);
console.log(`Livreur microservice running on port ${port}`);
