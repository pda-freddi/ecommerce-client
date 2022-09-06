# E-commerce Client Project Plan

## Table of Contents
1. [Summary](#summary)
2. [Implementation](#implementation)
3. [Development Tasks](#development-tasks)
4. [Folder Structure](#folder-structure)

## Summary

This project is a follow-up on the [E-commerce RESTful API Project](https://github.com/Pedro-Freddi/ecommerce-api), with the goal of designing a user interface that communicates with the API and allows users to:

- Browse categories and products;
- Create an account and login/logout; 
- Manage their information and orders;
- Add, update and remove items from the shopping cart;
- Place an order.

The result will be a client-side rendered clothing e-commerce website.

## Implementation

The [React](https://reactjs.org/) library will be used to design the components that make up the UI. 

Global application state will be managed with the [Redux](https://redux.js.org/) library, which offers a way to centralize access to - and modification of - state, resulting in a clean and predictable state flow throughout the application's execution. 

The [React Router](https://reactrouter.com/en/main) library will provide routing and navigation between different pages, controlling which components render on each path.

Component's styles will be written using [CSS modules](https://github.com/css-modules/css-modules), so each component will have its own styles module file and for production all files get bundled into a single one.

Regarding the design of the UI, the idea is to build simple and elegant components with flat design and soft colors in mind so that they blend well with each other once the UI is assembled into the final product. Additionally, using CSS Flexbox and media queries, the application will be responsive and display appropriately on all screen sizes.

## Development Tasks

The development will take place following a few high-level tasks laid out in this planning phase:

- Initialize project with create-react-app and redux template.
- Set up a GitHub repository and sync with the local git repository.
- Perform basic initial configuration (package.json, boilerplate cleanup, file structure and public assets).
- Write API client to fetch resources.
- Write Redux slice logic for each feature of the app.
- Define and configure routes with React Router.
- Write and style components.
- Adjust styles to make the website's design fully responsive.
- Deploy.

## Folder Structure

The /src directory is organized to keep related files together:

- /api contains the client that handles the network communication with the API;
- /components contains all React components and is further organized according to the feature each component implements;
- /features contains the Redux logic for each feature (in a "slice" file), defining the global state and how it is managed;
- /hooks contains any custom hooks used by components;
- /store contains the Redux store configuration, which imports the reducer function from each feature "slice" file.

In the top-level project directory, index.js imports App.js and renders it on the root element defined in the index.html file, while also providing the Redux store to App.js and configuring React Router's Browser router.