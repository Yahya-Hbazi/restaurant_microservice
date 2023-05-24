const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const restaurantProtoPath = "restaurant.proto";
const restaurantProtoDefinition = protoLoader.loadSync(restaurantProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const restaurantProto = grpc.loadPackageDefinition(restaurantProtoDefinition).restaurant;

const restaurants = [
  {
    id: "1",
    title: "Example Restaurant 1",
    description: "This is the first example restaurant.",
  },
  {
    id: "2",
    title: "Example Restaurant 2",
    description: "This is the second example restaurant.",
  },
];

let global_id = restaurants.length;

const restaurantService = {
  getRestaurant: (call, callback) => {
    const update_id = restaurants.indexOf(
      restaurants.find((element) => element.id == call.request.restaurant_id)
    );
    const restaurant = {
      id: call.request.restaurant_id,
      title: restaurants[update_id].title,
      description: restaurants[update_id].description,
    };
    callback(null, { restaurant });
  },

  searchRestaurants: (call, callback) => {
    const { query } = call.request;
    callback(null, { restaurants });
  },

  createRestaurant: (call, callback) => {
    const { query } = call.request;
    const restaurant = {
      id: ++global_id,
      title: call.request.title,
      description: call.request.description,
    };
    restaurants.push(restaurant);
    callback(null, { restaurant });
  },

  updateRestaurant: (call, callback) => {
    const restaurant = {
      id: call.request.restaurant_id,
      title: call.request.title,
      description: call.request.description,
    };
    const update_id = restaurants.indexOf(
      restaurants.find((element) => element.id == restaurant.id)
    );
    restaurants[update_id] = restaurant;
    callback(null, { restaurant });
  },

  deleteRestaurant: (call, callback) => {
    const { query } = call.request;
    const restaurant = {
      id: call.request.restaurant_id,
    };
    const delete_id = restaurants.indexOf(
      restaurants.find((element) => element.id == restaurant.id)
    );
    restaurants.splice(delete_id, 1);
    callback(null, { restaurant });
  },
};

const server = new grpc.Server();
server.addService(restaurantProto.RestaurantService.service, restaurantService);
const port = 50051;
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
console.log(`Restaurant microservice running on port ${port}`);
