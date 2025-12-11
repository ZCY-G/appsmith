# Appsmith AI Coding Agent Instructions

## Project Overview

Appsmith is an open-source low-code platform for building internal tools. The codebase is a full-stack monorepo with a React/TypeScript frontend and Java/Spring Boot backend, connected by a plugin architecture for datasource integrations.

## Architecture Fundamentals

### Monorepo Structure

- `app/client/` - React frontend with Yarn workspaces for internal packages
- `app/server/` - Java backend with Maven multi-module setup
- `app/server/appsmith-plugins/` - Plugin system (20+ datasource integrations via PF4J)

### Client Architecture (React + Redux Saga)

**Data Flow**: Widget interactions → Redux actions → Sagas (side effects) → Web Worker evaluation → Redux state → Widget re-render

**Key directories**:

- `src/widgets/` - Widget implementations extending `BaseWidget`
- `src/sagas/` - Redux-Saga side effects (especially `EvaluationsSaga.ts` for expression evaluation)
- `src/workers/Evaluation/` - Web worker that evaluates JavaScript expressions and bindings
- `app/client/packages/` - Internal workspace packages (design system, utils, AST, etc.)

**Critical pattern**: Widgets use dynamic property bindings (e.g., `{{Api1.data}}`) evaluated in a Web Worker using `evaluateTreeSaga`. The evaluation creates a "DataTree" containing all entities (widgets, APIs, JS objects).

### Server Architecture (Spring Boot + Reactive)

- **Spring WebFlux** for reactive, non-blocking I/O
- **Plugin architecture**: Datasource plugins in `appsmith-plugins/` implement the `Plugin` interface
- **MongoDB** with replica sets (required for transactions)
- **Redis** for caching and session management

**Module structure** (from `pom.xml`):

```
appsmith-interfaces → appsmith-plugins → appsmith-server
                  ↘ appsmith-git ↗
reactive-caching
```

## Development Setup

### Client Development

```bash
cd app/client
yarn install
./start-https.sh https://release.app.appsmith.com  # Use staging backend
# Opens https://dev.appsmith.com (must use HTTPS, not localhost:3000)
```

**Important**:

- Frontend MUST run on `https://dev.appsmith.com` (configured via nginx proxy)
- Setup requires `mkcert` for local SSL certificates
- Node 20.11.1, Yarn 3.5.1 required (see `package.json` engines)

### Server Development

```bash
cd app/server
# MongoDB with replica set on localhost:27017
# Redis on localhost:6379
mvn clean install -DskipTests
# Run from IntelliJ or: java -jar appsmith-server/target/server-*.jar
```

### Testing

**Cypress (E2E)**:

```bash
cd app/client
yarn cypress run --browser chrome --headless --spec cypress/e2e/path/to/spec.js
```

- Base URL: `https://dev.appsmith.com` (see `cypress.config.ts`)
- Always execute from `app/client` directory

**Jest (Unit)**:

```bash
cd app/client
yarn g:jest  # Run tests in current workspace package
```

**JUnit (Backend)**:

```bash
cd app/server
mvn test
```

## Code Conventions

### Naming & Structure

**Client**:

- Widget files: `widgets/[WidgetName]/widget/index.tsx` with class extending `BaseWidget`
- Redux actions: Use `ReduxActionTypes` enum from `constants/ReduxActionConstants`
- Sagas: Generator functions using `function*` syntax
- File organization: Feature-based folders (e.g., `pages/Editor/`, `sagas/WidgetOperationSagas.tsx`)

**Server**:

- Plugin naming: `[Datasource]Plugin.java` (e.g., `PostgresPlugin.java`)
- No magic strings/numbers - use `private static final` constants
- Package imports: Avoid wildcards (`xyz.*`), import specific classes
- Follow reactive patterns: Return `Mono<T>` or `Flux<T>` from service methods

### Comments

- Client: Use `/*** */` for derived files (not `//`)
- Commit messages: Start with lowercase verb (`fixes`, `adds`, `updates`)

## Critical Workflows

### Widget Property Evaluation

1. User changes widget property → `updateWidgetPropertySaga`
2. Creates updated widget tree → `evaluateTreeSaga`
3. Web Worker evaluates bindings → `evalWorker.request(EVAL_WORKER_ACTIONS.EVAL_TREE)`
4. Returns evaluated tree → `setEvaluatedTree` action
5. Widgets re-render with computed values

**Key files**: `sagas/EvaluationsSaga.ts`, `workers/Evaluation/handlers/evalTree.ts`

### Adding a New Plugin

1. Create module in `app/server/appsmith-plugins/[pluginName]Plugin/`
2. Extend `PluginExecutor` and implement required methods
3. Add `pom.xml` with parent `<artifactId>appsmith-plugins</artifactId>`
4. Use Testcontainers for integration tests (see `postgresPlugin/src/test`)

### Running Partial Build

**Client only**:

```bash
cd app/client
yarn build  # Creates production build in app/client/build/
```

**Server only**:

```bash
cd app/server
mvn clean install -DskipTests
```

## Integration Points

### Client-Server Communication

- REST APIs via `api/` directory (Axios-based)
- WebSocket for real-time updates
- Plugin execution triggered from client → server executes via plugin framework

### External Dependencies

- **Sentry** for error tracking (`@sentry/react`)
- **Segment** for analytics (`@segment/analytics-next`)
- **OpenTelemetry** for observability
- **TinyMCE** for rich text editing

## Common Pitfalls

1. **Frontend must use HTTPS**: Direct `localhost:3000` access won't work - use `https://dev.appsmith.com`
2. **MongoDB requires replica sets**: Even for local development (see `ServerSetup.md`)
3. **Widget property updates**: Don't mutate Redux state directly - use sagas and proper actions
4. **Evaluation timing**: Understand `SET_EVALUATED_TREE` action timing when working with widget properties
5. **Workspace setup**: Yarn workspaces mean packages reference each other via `workspace:^` protocol

## Reference Documentation

- Comprehensive guides in `.cursor/docs/guides/` (testing, performance, verification)
- Codebase map in `.cursor/docs/references/codebase-map.md`
- Contributing guidelines in `contributions/CodeContributionsGuidelines.md`
- Widget development: `contributions/AppsmithWidgetDevelopmentGuide.md`
- Plugin development: `contributions/ServerCodeContributionsGuidelines/PluginCodeContributionsGuidelines.md`
