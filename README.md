# Anton API

## Branches
- `master` - the master (production) branch
- `develop` - the development branch (active developmeng, staging environment)

## Environment variables
```
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=anton
POSTGRES_USER=user
POSTGRES_PASSWORD=***

OPEN_AI_TOKEN=***
LEONARDO_AI_TOKEN=***
SINGLE_SHOT_AUTHORIZATION_TOKEN=***
SERPAPI_API_KEY=***
```

To get this env variables install 1password cli

and then install globally:

```bash
npm install @mrck-labs/1password-env-integrator@latest --global
```

and the run

```bash
1password-env-integrator env anton-api:local
```

if u want to change the account from which the secrets are fetched, you can use the `--account` flag or run
```bash
op signin
```

## Development

To run when developing
```bash
docker-compose up --build 
```

It will build and run 2 containers
- `app` - the main container with the API on exposed port 3000
- `db` - a container with a postgres database exposed on port 5432 (?)
