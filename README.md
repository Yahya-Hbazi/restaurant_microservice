GET /restaurants

Description: Retrieves a list of all restaurants.
Response:
200 OK: Returns an array of restaurant objects in the response body.
500 Internal Server Error: If there is an error while retrieving the restaurants.
POST /restaurant

Description: Creates a new restaurant.
Request Body:
id: The ID of the restaurant (string)
title: The title of the restaurant (string)
description: The description of the restaurant (string)
Response:
200 OK: Returns the created restaurant object in the response body.
500 Internal Server Error: If there is an error while creating the restaurant.
PUT /restaurants/:id

Description: Updates an existing restaurant.
Request Parameters:
id: The ID of the restaurant to update (string)
Request Body:
title: The updated title of the restaurant (string)
description: The updated description of the restaurant (string)
Response:
200 OK: Returns the updated restaurant object in the response body.
500 Internal Server Error: If there is an error while updating the restaurant.
DELETE /restaurants/:id

Description: Deletes an existing restaurant.
Request Parameters:
id: The ID of the restaurant to delete (string)
Response:
200 OK: Returns the deleted restaurant object in the response body.
500 Internal Server Error: If there is an error while deleting the restaurant.
GET /restaurants/:id

Description: Retrieves a specific restaurant by its ID.
Request Parameters:
id: The ID of the restaurant to retrieve (string)
Response:
200 OK: Returns the requested restaurant object in the response body.
500 Internal Server Error: If there is an error while retrieving the restaurant.
GET /livreurs

Description: Retrieves a list of all livreurs.
Response:
200 OK: Returns an array of livreur objects in the response body.
500 Internal Server Error: If there is an error while retrieving the livreurs.
GET /livreurs/:id

Description: Retrieves a specific livreur by its ID.
Request Parameters:
id: The ID of the livreur to retrieve (string)
Response:
200 OK: Returns the requested livreur object in the response body.
500 Internal Server Error: If there is an error while retrieving the livreur.
DELETE /livreurs/:id

Description: Deletes an existing livreur.
Request Parameters:
id: The ID of the livreur to delete (string)
Response:
200 OK: Returns the deleted livreur object in the response body.
500 Internal Server Error: If there is an error while deleting the livreur.
POST /livreur

Description: Creates a new livreur.
Request Body:
name: The name of the livreur (string)
restaurant_id: The ID of the restaurant associated with the livreur (string)
Response:
200 OK: Returns the created livreur object in the response body.
500 Internal Server Error: If there is an error while creating the livreur.
Note: The server is running on port 3000.
