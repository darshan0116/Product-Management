# Product Managment

This project includes both frontend and backend components developed using modern technologies.

## Frontend (React)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).

## Backend (Node.js with TypeScript and Prisma)

The backend is developed using Node.js, TypeScript, and Prisma ORM.

### Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Prisma**: Modern database toolkit for TypeScript and Node.js.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.

### Project Structure

- **`src/`**: Contains all the source code files.
- **`src/controllers/`**: Handles the application logic.
- **`src/models/`**: Defines data models using Prisma.
- **`src/routes/`**: Defines API routes using Express.js.
- **`src/services/`**: Implements business logic and interacts with the database.
- **`src/utils/`**: Contains utility functions.
- **`src/index.ts`**: Entry point of the application.

### Running the Backend

1. **Install Dependencies**: Run `npm install` to install all required dependencies.
2. **Run in Development Mode**: Use `npm run dev` to start the server in development mode using Nodemon.
3. **Run Tests**: Use `npm test` to run tests using your preferred testing framework.

### Deployment

- The backend is ready to be deployed to a cloud platform such as Heroku, AWS, or any other suitable provider.
