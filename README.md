# Photine

Open source digital photo frame, powered by Framium

## Running Photine
Photine is not currently in production, so you need to run the dev environment to play with it.

Download this repo. Copy ~/.env-sample to ~/.env and change the express port details if you need to.

Install all dependencies with yarn:
```
yarn
```
Run the express app and webpack in watch mode with:
```
yarn start
```
You can now visit the site at http://localhost:3005 or whichever port you specified

## Development scripts˜
Here's a list of the npm scripts and what they do:

- `start`: Runs and restarts the express app with nodemon, and runs webpack in watch mode for front end views
- `webpack`: Runs webpack dev server
- `express:watch`: Run express with nodemon, so automatically restarts with changes
- `webpack:watch`: Run webpack in watch mode
- `git`: Helper to run common git commands and integrates with Trello cards
- `test`: Runs eslint and jest tests
- `test:checklist`: Run the manual checklist, of best practices
- `test:watch`: Run jest in watch mode
- `test:jestupdate`: Update the jest snapshots
- `test:jest`: Run jest
- `test:lint`: Run eslint
- `precommit`: Git hook that runs before commiting
- `commitmsg`: Git hook that runs when commiting, contains the commit message
