# MyReads

MyReads is a bookshelf app that allows you to select and categorise books you
have read, are currently reading, or want to read. I've built this app as part
of [Udacity's React Nanodegree.](https://www.udacity.com/course/react-nanodegree--nd019)

## Running the App

You can check out a [production build of the app on GitHub Pages.](https://tobiasziegler.github.io/reactnd-p1-myreads/)

Or, to run, test and develop MyReads on your local computer:

- Fork, clone or download this repository
- Install all project dependencies with `npm install` (requires
    [Node.js](https://nodejs.org/) installed on your system)
- Start the development server with `npm start`

## Deploying Your Own Production Build

You can deploy your own version of the app to GitHub Pages:

- Edit the `homepage` in `package.json` to point to the URL you'll deploy to.
- Build and deploy the app with `npm run deploy`

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
