### Readme For MR Developer Test

#### Prerequisites

- Node.js (>=14.17.0)
- npm (>=6.14.13) or yarn (>=1.22.10)

### Installation

- Clone the repository: git clone https://github.com/julesodea/product-mr.git
- Install dependencies: npm install or yarn install
- Start the development server: npm run dev or yarn dev

#### Project Structure

- `src/` Source code for the application
- `cypress/`: End-to-end tests using Cypress
- `node_modules/`: Dependencies installed by npm or yarn

#### Important Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run test`: Run Cypress end-to-end tests

####

Dependencies
@tanstack/react-query: For data fetching and caching this allowed me to cache the api call for future users. After 1 hour the cache will be stale and new data will be fetched.
@tanstack/query-sync-storage-persister: As above this adds to the functionality for persisting query data to local storage.

- `React Vite`: For building the user interface
- `TypeScript`: For building the user interface
- `Tailwindcss`: For styling the application
- `Cypress`: Used for testing product page
