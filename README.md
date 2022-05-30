# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

To install all the dependencies which are required to run application.

### `json-server --watch ./backend/time_slots.json`

Runs the back-end in the development mode.\
It will start running on [http://localhost:3000](http://localhost:3000).

We can consume API's using this URL.

### `npm start`

Runs the front-end in the development mode.\
It will start running on [http://localhost:3001](http://localhost:3001).

#### `Note: Brief description about this timeslot-picker application!`

As per the requirments, I have run the back-end using [json-server](https://www.npmjs.com/package/json-server). It is running on 
PORT:3000. Front-end by default runs on PORT:3000 So, updated front-end port to 3001.\

API | GET\
URL: companies\
APPUrl: http://localhost:3000/companies

Made components in typescript and for styling used styled components using **SASS**. Used service to communicate between components. Didn't used redux for data sharing because there are just 3-4 components and the main thing is we don't have sibling relationship to share data that's why used the company component as a parent component to share data between other/childern components. Used different third-party libraries which are listed in package.json. All the components are generic and self explained. Commented the code for better understanding.
