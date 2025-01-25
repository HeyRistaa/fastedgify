# Fastify & EdgeDB App

> Fastify & EdgeDB starter repository. Ready for deployment on Vercel.

## Installation

### EdgeDB

Create new EdgeDB instance on cloud, by going on https://cloud.edgedb.com/

Login to edgedb cloud by running
```bash
edgedb cloud login
```

After providing needed information, you can start initialization to your project

```bash
edgedb project init
```

Please provide full instance name when cli ask you to "Specify the name of the EdgeDB instance to use with this project".
This means that full instance name is YOUR_USERNAME/YOUR_INSTANCE_NAME. You can find that info in cloud env, too.

## Schema changes

When schema is changed (*.esdl files from folder provided in edgedb.toml), in order to create migration and pass it to your cloud instance, run
```bash
edgedb migration create # create new .edgeql file in migrations folder
edgedb migrate # actually migrates
```

This repo is using [EdgeDB TypeScript Client](https://docs.edgedb.com/libraries/js) for generating interfaces and queries.

To generate interfaces and fully-typed EdgeQL queries for Typescript, this repo is using [edgeql-js generator](https://docs.edgedb.com/libraries/js/generation) and pnpm, so we're running.
```bash
pnpm generate interfaces # Generates interfaces for our queries
pnpm generate edgeql-js # Generates the query builder
```

### Development
```bash
pnpm run dev # Run dev env with --watch flag
```

### Production

```bash
pnpm run build
pnpm run start
```
