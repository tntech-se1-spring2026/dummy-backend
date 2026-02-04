# Range Sentinel Web API

Below is an outline of the api the frontend will need in order to be a functional website:

Note that all endpoints begin with `/web` to denote routes made for the frontend.

## Installation

Install dependencies with `npm install`.

Run this backend with `node app.js`.

## GET Endpoints

- `/web/ping`
  - Status: 200
  - Response: `text/plain` "pong"

- `/web/nodes`
  - Status: 200
  - Response: `application/json` _A JSON array detailing all nodes information_

- `/web/node?id={node id}`
  - Status: 200
  - Request:
    - Required: query string specifying node id
  - Response: `application/json` _A json object detailing specified node_
