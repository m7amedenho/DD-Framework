# DD Framework

## Overview
DD Framework is an open-source, metadata-driven framework designed to help developers and businesses build robust applications efficiently through a low-code, and eventually no-code, approach. 

In an industry where relying heavily on AI for code generation can sometimes result in broken, inconsistent, or unmaintainable codebases, DD Framework provides a solid, predictable foundation. By defining your business logic and architecture through simple JSON metadata (Entities), the framework automatically handles database schema generation, API routing, and frontend rendering, ensuring standard and error-free execution.

## Core Philosophy
* Predictability over Guesswork: Stop relying on black-box generated code. Define your data structures strictly, and let the engine handle the rest.
* Low-Code / No-Code Ready: Focus entirely on business requirements rather than writing repetitive boilerplate code for databases and APIs.
* Unified JavaScript Stack: Built entirely with modern JavaScript. The backend is powered by Node.js, Fastify, and Knex, while the frontend utilizes Vue.js.
* Open Source: Free to use, modify, distribute, and build upon.

## Project Structure
the repository is divided into distinct, manageable segments:

* `@client_ui/`: The frontend application built with Vue.js and Vite. It consumes the dynamically generated APIs to render user interfaces, forms, and data tables on the fly.
* `engine/`: The core backend logic. It contains the database connection manager (`database.js`), the metadata memory loader (`metadata.js`), and the schema generator (`schema.js`).
* `modules/`: The modular business applications (e.g., `core`, `crm`). Each module contains an `entities` folder where the JSON metadata files are stored.
* `server.js`: The main entry point for the backend server.

## Getting Started

### Backend Setup
1. Navigate to the root directory of the framework.
2. Install the necessary dependencies:
   npm install
3. Configure your database credentials in the `.env.local` file.
4. Start the backend server:
   node --env-file=.env.local server.js

### Frontend Setup
1. Navigate to the frontend directory:
   cd @client_ui
2. Install the frontend dependencies:
   npm install
3. Start the development server:
   npm run dev

## Contributing and Collaboration
We strongly believe in the power of the open-source community and welcome developers of all skill levels to collaborate with us. If you want to help improve DD Framework, please follow these guidelines:

1. Fork the repository to your own account.
2. Create a new branch for your feature, enhancement, or bug fix (e.g., `git checkout -b feature/dynamic-router`).
3. Write clean, documented code that aligns with the framework's metadata-driven philosophy.
4. Commit your changes with clear, descriptive messages.
5. Push to your branch and open a Pull Request detailing the changes you have made and the problem they solve.

For major architectural changes, please open an issue first to discuss your ideas with the core maintainers.

## License
This project is open-source and available under the GPL-3.0 license.
