[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://grandstack.io/deploy-starter-netlify) [![Deploy to Vercel](https://vercel.com/button)](https://grandstack.io/deploy-starter-vercel) [![Provision Neo4j](https://grandstack.io/img/provision-neo4j.png)](https://sandbox.neo4j.com/?usecase=blank-sandbox)

# GRANDstack Starter

```
npx create-grandstack-app myNewApp
```

This project is a starter for building a [GRANDstack](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database) application. There are two components to the starter, the web frontend application (in React and Angular flavors) and the API app (GraphQL server).

The starter represents a **business reviews dashboard**. You need to adjust the GraphQL schema, the seed data, database index creation, and the UI components for your use-case.

[![Hands On With The GRANDstack Starter](http://img.youtube.com/vi/rPC71lUhK_I/0.jpg)](http://www.youtube.com/watch?v=1JLs166lPcA 'Hands On With The GRANDstack Starter')

_Hands On With The GRANDstack Starter Video_

## Quickstart

The easiest way to get started with the GRANDstack Starter is to create a Neo4j Sandbox instance and use the `create-grandstack-app` command line tool.

(If you have a running Neo4j database on localhost via Neo4j Desktop or a Neo4j server installation, change the password in `api/.env`)

### 1. Create A Neo4j Instance

#### Option :one: - Sandbox

[Neo4j Sandbox](https://neo4j.com/sandbox) allows you to create a free hosted Neo4j instance private to you that can be used for development.

After singing in to Neo4j Sandbox, click the `+ New Project` button and select the "Blank Sandbox" option. In the next step we'll use the connection credentials from the "Connection details" tab to connect our GraphQL API to this Neo4j instance.

![Neo4j Sandbox connection details](img/neo4j-sandbox.png)

#### Option :two: - Desktop

If you instead would like to use [Neo4j Desktop](https://neo4j.com/download/). The process will be almost the same with a minor detour. Install Neo4j Desktop for your chosen OS and then make a new blank graph for your project. It will require you to put in a password and username. Remember those.

Next you need to go to open the manage screen from the options in the 3 dot stack menu

![New desktop graph, manage tab](img/desktop-new-graph.png)

And install the apoc plugin, green button at the top of the list.

![Plugins](img/apoc-install.png)

After that you can return to setting up your app with the credentials from the prior steps.

### 2. Run the `create-grandstack-app` CLI

```
npx create-grandstack-app myNewApp
```

or with Yarn

```
yarn create grandstack-app myNewApp
```

![create grandstack app output](img/create-grandstack-app.png)

This will create a new directory `myNewApp`, download the latest release of the GRANDstack Starter, install dependencies and prompt for your connection credentials for Neo4j to connect to the GraphQL API.

### 3. Seed the database (optional)

Make sure your application is running locally with `npm start` or `yarn start`, open another terminal and run

```
npm run seedDb
```

or with Yarn

```
yarn run seedDb
```

### 4. Open In Browser

![Grandstack app running in browser](img/grandstack-app.png)

## <a name="overview"></a> Overview

The GRANDstack Starter is a monorepo that includes a GraphQL API application and client web applications for React (default) and Angular for a business reviews dashboard.

### `/` - Project Root

The root directory contains some global configuration and scripts:

- `npm run start` and `npm run build`
- ESLint (.eslintrc.json) for code linting
- Prettier (.prettierrc.json) for code formatting
- Git hooks for applying formatting on commit

### [`/api`](./api)

![](img/graphql-playground.png)

This directory contains the GraphQL API application using Apollo Server and neo4j-graphql.js.

- Change environment variable settings in `.env`:

```
# Use this file to set environment variables with credentials and configuration options
# This file is provided as an example and should be replaced with your own values
# You probably don't want to check this into version control!

NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=letmein

# Uncomment this line to enable encrypted driver connection for Neo4j
#NEO4J_ENCRYPTED=true

# Uncomment this line to specify a specific Neo4j database (v4.x+ only)
#NEO4J_DATABASE=neo4j

GRAPHQL_SERVER_HOST=0.0.0.0
GRAPHQL_SERVER_PORT=4001
GRAPHQL_SERVER_PATH=/graphql

```

### [`/web-react`](./web-react)

![](img/grandstack-app.png)

The frontend React web application is found in this directory.

It includes:

- Material UI
- React router
- Apollo Client / React Hooks
- Create React App

### [`/web-angular`](./web-angular)

![](web-angular/img/angular-ui.jpg)

A UI built with [Angular](https://angular.io), [Apollo](https://www.apollographql.com/docs/angular/) and the [Clarity Design System](https://clarity.design) is also available.

_Start the Angular UI server_

```
cd ./web-angular && npm start
```

### [`/mobile_client_flutter`](./mobile_client_flutter)

![](img/grandstack-flutter.png)

A mobile client built with [Flutter](https://flutter.dev) which supports Android, iOS, and web. See the [README](./mobile_client_flutter/README.md) for detailed setup instructions.

```
cd ./mobile_client_flutter && flutter run
```

### [`/web-react-ts`](./web-react-ts)

A UI built with [CRA](https://reactjs.org/docs/create-a-new-react-app.html)

_Start the React dev server_

```
cd ./web-react-ts && npm start
```

## Deployment

### Netlify

This monorepo can be deployed to Netlify. The frontend application will be served over Netlify's CDN and the GraphQL API will be provisioned as a serverless GraphQL API lambda function deployed to AWS (via Netlify). A netlify.toml file is included with the necessary build configurations. The following environment variables must be set in Netlify (either via the Netlify web UI or via the command line tool)

```
NEO4J_URI
NEO4J_USER
NEO4J_PASSWORD
```

See the "Hands On With The GRANDStack Starter" video linked at the beginning of this README for a walkthrough of deploying to Netlify.

### Vercel

Vercel can be used with monorepos such as grand-stack-starter. [`vercel.json`](https://github.com/grand-stack/grand-stack-starter/blob/master/vercel.json) defines the configuration for deploying with Vercel.

1. get [vercel cli](https://vercel.com/download)
2. Set the vercel secrets for your Neo4j instance:

```
vercel secret add grand_stack_starter_neo4j_uri bolt://<YOUR_NEO4J_INSTANCE_HERE>
vercel secret add grand_stack_starter_neo4j_user <YOUR_DATABASE_USERNAME_HERE>
vercel secret add grand_stack_starter_neo4j_password <YOUR_DATABASE_USER_PASSWORD_HERE>
```

3. Run `vercel`

## Docker Compose

You can quickly start via:

```
docker-compose up -d
```

If you want to load the example DB after the services have been started:

```
docker-compose run api npm run seedDb
```

See [the project releases](https://github.com/grand-stack/grand-stack-starter/releases) for the changelog.

You can find instructions for other ways to use Neo4j (Neo4j Desktop, Neo4j Aura, and other cloud services) in the [Neo4j directory README.](./neo4j)


# The App: Where Are We Going?
Requirements Engineering

## PHASE 1: Directory (Filemaker Replacement - State of the Flock Part 1)
    1. Be able to hold all membership and leadership records (Bacenta and Basonta).
    2. Be able to search and filter all membership records based on selected criteria.
    3. Be able to display information on one member
    4. Display registration numbers at all levels (Town/Campus/School, Community/Hall, Centre, Bacenta, Basonta)
    5. Be able to import data in a csv file, and export data in a csv file.
    6. An extensive transaction log of leadership histories.
    7. Database Backups implementation. 

## PHASE 2: Attendance and Income Records (Keynote Replacement - State of the Flock Part 2)
    1. Replacing all current forms for accepting income and attendance for all services and Basonta Meetings (treasurers & picture uploads)
    2. Accepting all data from all services weekly.
        * Centre Service 
        * GSO Service
        * First Love Federal Services (Gathering Service and Revival)
    3. Integrate a way of sending broadcast reminders (SMS and WhatsApp) to leaders/admins who haven’t filled their forms and such
    4. Monitor outstanding penalties for Centres who default
        * A Way to Integrate with Bank to confirm if offering payments have been made. 
    5. Generating monthly graph reports at the apostolic level.
    6. Requesting records on any leader in the church (Graphs)
        1. Apostolic Monthly Report
        2. Monthly GSO Reports per Campus, Town
    7. Requesting records on any centre in the church.
    8. Monitoring the tithes of leaders* (think about how to achieve this)

## PHASE 3: Bacenta Registration and Monitoring (Technification of Arrivals -  Bacenta Proliferation)
1. Maintain an accurate Bacenta Directory
2. Accept Bacenta Records of Attendance, Cost, Offering Raised, Amount Paid from the Church
3. Close Down any Bacenta/IC that busses under 8 for four consecutive weeks
4. Registration of ICs
5. Graduate IC to Bacenta after bussing above 8 for 

4 consecutive weeks. 
6. Accept IC Records of Attendance, Cost, Offering Raised, Amount Paid from the Church
7. IC Training Attendance Tracking. Attendance to be filled by IC Trainers.

## PHASE 4: Records of the Campaigns (SSMG)
    1. Replacing all current forms for SSMG
        1. All Campaign Forms
    2. Generating monthly and annual reports for all campaigns
    3. Understanding School Data per member

## PHASE 5: Geolocation (Google Earth Replacement) (Sheep Seeking)
    1. Plot centres on a map
    2. Plot leaders and members on a map
    3. Plot outreach venues on a map with information on area populations, cost
    4. Import Data in a CSV file.

## PHASE 6: The Building Projects
1. A directory to hold building projects.
2. Linking building projects to pastors.
3. Generate summaries and reports on projects. 

## PHASE 7: Futuristic Works 
Phase 7 would mark the end of the replacement program and would mean that the entire church is running fully on our system. At this point we can begin to consider future works. 
- Facial Recognition Attendance system
 

This project is licensed under the Apache License v2.
Copyright (c) 2020 Neo4j, Inc.
