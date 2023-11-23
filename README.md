# WordCurrent

Fast game about getting as many words correct as you can in the shortest time
possible.

- [WordCurrent](#wordcurrent)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
      - [Server Configuration](#server-configuration)
      - [Game Configuration](#game-configuration)
      - [Database Configuration and Set Up](#database-configuration-and-set-up)
  - [Usage](#usage)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Built With](#built-with)
  - [License](#license)

## Getting Started

You can get the latest code from
[here](https://github.com/vmbdev/wordcurrent/archive/refs/heads/main.zip)
or through Git:

```bash
git clone https://github.com/vmbdev/wordcurrent.git
```

### Prerequisites

Word Current requires [Node.js](https://nodejs.org/) 18 or later installed on
your system.

### Installation

First of all, we need to install its dependencies. Open a terminal and get to
the directory where it's installed and run the following command:

```bash
npm install
```

Rename **backend/config/wordcurrent.config.example.js** to
**wordcurrent.config.js** and open it.

```javascript
export const server = {
  port: 5010,
  enableCors: false,
  corsOrigin: 'http://localhost:3000'
};

export const game = {
  wordpacks: ['castellano', 'english'],
  time: 60,
  flow: {
    4: {
      words: 3,
      points: 1
    },
    5: {
      words: 3,
      points: 2
    },
    6: {
      words: -1,
      points: 3
    }
  }
};
```

#### Server Configuration

- **server.port**: The port where the server will listen to.

- **server.enableCors** and **server.corsOrigin**: Whether the server should
care about cross-origin resource sharing and from where.

#### Game Configuration

- **game.wordpacks**: The lists of words that will be available. They need to
be in **/backend/assets/lists**.

- **game.time**: Duration of each game.

- **game.flow**: The progress of the game.

  - **game.flow.[length]**: The length of the word.

    - **game.flow.[length].words**: Number of words of [length] to be
    displayed.

    - **game.flow.[length].points**: Number of points to be awarded at
    [length].

The default game flow will show 3 words of 4 characters, each valued at
1 point, then 3 words of 5 characters at 2 points each and then 6 character
words valued at 3 points until time runs out.

#### Database Configuration and Set Up

Database is managed with [Knex.js](https://knexjs.org/) through the
**backend/config/knexfile.js**. Theres an example file in the same directory
that you can rename and use. Create a user in your database and fill in your
connection data.

Once the database is running and the knexfile is completed, run the following
command to create the necessary tables:

```bash
npm run db:up
```

## Usage

### Backend

Backend runs over Fastify.

To run the server in a production environment, run:

```bash
npm run server:production
```

To run the server in a development environment (with logging), run:

```bash
npm run server:dev
```

### Frontend

Frontend is made with Vue 3.

To build the frontend and serve it with our backend, run:

```bash
npm run ui:build
```

To serve it with Vite dev server, run:

```bash
npm run ui:dev
```

To preview it:

```bash
npm run ui:preview
```

## Built With

- [Node.js](https://nodejs.org/) - JavaScript Runtime Environment
- [Vue](https://vuejs.org/) - JavaScript Framework
- [Vue I18n](https://vue-i18n.intlify.dev/) - i18n for Vue
- [Knex.js](https://knexjs.org/) - SQL Query Builder
- [Fastify](https://fastify.dev/) - Web Server Framework
- [Nanoid](https://github.com/ai/nanoid) - ID generator

## License

Word Current is licensed under the MIT License - see the
[LICENSE](https://github.com/vmbdev/wordcurrent/blob/main/LICENSE)
file for more details.
