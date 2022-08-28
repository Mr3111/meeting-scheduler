# Meeting scheduler 

> Use this app to schedule meetings. It internally  uses GraphQL to communicate with the backend. 

## [Live Demo!](https://meeting-scheduler-3111.vercel.app/)

This is a meeting scheduler app. It contains 2 modes:
1. **Normal** - Create a meeting and see all meetings.
2. **Admin** - Create meeting rooms in different buildings.

Note: This backend resets automatically after some time.

# Installation

```
npx degit Mr3111/meeting-scheduler myapp
```

### yarn

```sh
cd myapp
yarn install
yarn validate # The installation was successful if no error occurs after running 'validate'.
yarn dev
```

### npm

```sh
cd myapp
npm install
npm run validate # The installation was successful if no error occurs after running 'validate'.
npm run dev
```

### Commands

```sh
yarn dev       # start development server
yarn validate  # run test,lint,build,typecheck concurrently
yarn lint      # run eslint
yarn lint:fix  # run eslint with --fix option
yarn typecheck # run TypeScript compiler check
yarn build     # build production bundle to 'dist' directly
yarn prettier  # run prettier for json|yml|css|md|mdx files
yarn clean     # remove 'node_modules' 'yarn.lock' 'dist' completely
yarn serve     # launch server for production bundle in local
yarn serve     # uses codegen to generate hooks by using react-query
```


# Background

This is using an alternative to [create-react-app](https://github.com/facebook/create-react-app), based on [Vite](https://github.com/facebook/create-react-app).  
This project contains a very opinionated setup. 😀

# License

MIT

## Contributors ✨

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
