This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React Node Template

This repository combines the default app created by create-react-app with a "Hello World" Node backend.
This is meant to be used as a starting point for creating a React app that has some backend functionality, but
not yet enought to warrant breaking out into its own project.

This has been created to work in a cloud IDE development environment. If using it to develop locally,
see the `DANGEROUSLY_DISABLE_HOST_CHECK=true` in the section below.

The changes I have made outside of the `server` directory are as follows:
- Changed favicon.ico, logo192.png, logo512.png to be blank/transparent instead of React logo.
- Changed commands in package.json to account for `server` directory.
- Changed App.js to add two buttons to send an example request to the server.
- Changed App.css to add styling for buttons.
- Added this and next section to the README.md.

Otherwise, the files should be the same as what would be produced by this version of create-react-app.

## Node Server

The Node server runs on port 8081. This can be changed by changing `react-node-template/package.json` on two lines.
The first line starts with "proxy" and specifies the URL that the React dev server proxies a request to when it cannot
resolve it itself. Change 8081 to a new port.
The second line starts with "start-server" and specifies the command used to start the server in development. Once
again, change 8081 to a new port.

This project can be run within a production environment. Assuming `npm install` has been ran,
to build the assets for production to serve, do: `npm run build` in the `react-node-template` directory.
Then, to run in production do: `npm run start-prod` in the `react-node-template` directory.
You may wish to run `npm install && npm run build` on one server, and then copy the `build` and `server` directory
to the actual production server, where `npm run start-prod` can be run from within the `server` directory.

The Node server is meant to be the bare minimum needed to serve a production React app in the same vein of:
[[https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework]].
It has not been optimized to increase the difficulty of DOS attacks against it (i.e. by limiting number of concurrent
requests, reducing request timeouts/payloads, or preventing bad input from crashing the server).
It does not set security-related headers:
[[https://blog.risingstack.com/node-hero-node-js-security-tutorial/]]

For more information about security, see [[https://itnext.io/how-we-improved-our-node-js-application-security-grade-from-f-to-a-cd42b48192e3]]

### DANGEROUSLY_DISABLE_HOST_CHECK=true

In package.json, you man notice the ominously named "DANGEROUSLY_DISABLE_HOST_CHECK" environment variable.
This is set to `true` for development in cloud IDE environments. If you are developing locally, it can be removed.
It has no effect in the production environment.

webpack-dev-server (which is used by create-react-app) is exploitable since
it can serve arbitrary files on the host computer and when used with "proxy" in
package.json, can pass requests to arbitrary services running on the computer.

To help protect against these threats, the server checks a HOST header.
However, since cloud IDE development environments tend to be complicated networks where the host is unknown,
I disable this check in package.json.

This is still secure because any request to the server should already be authenticated with your credentials
used to login to your cloud environment. To test this, navigate to a URL served within the cloud development
environment (a "preview" URL) in an incognito/private window. It should not be accessible. Otherwise, it would be
publicly accessible and insecure.

Even if you are developing locally, disabling the check should not by itself make your computer vulnerable to attack
(in my opinion) but would be dangerous in combination with another exploit.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
