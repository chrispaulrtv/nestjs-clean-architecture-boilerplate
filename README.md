# NestJS Clean Architecture Boilerplate 🏗️

A production-ready REST API boilerplate following **Domain-Driven Design (DDD)** and **Clean Architecture** principles. Designed for scalability, testability, and maintainability.

> **Maintained by:** [Christian Reinoso (ChrisPaulRTV)](https://chrispaulrtv.rinnotec.com) - Senior Consultant Developer

---

## 🚀 Features

- **Clean Architecture Layers:** Strict separation of concerns (Domain, Application, Infrastructure, Presentation).
- **Dependency Injection:** Repositories are injected via interfaces (Ports & Adapters pattern), allowing easy database swapping.
- **TypeORM & PostgreSQL:** configured with robust migrations support.
- **Docker Ready:** Multi-stage `Dockerfile` and `docker-compose` for local development.
- **Config Management:** Environment variable validation using `Joi`.
- **Swagger Documentation:** Auto-generated API docs.

## 📂 Project Structure

```text
src/
├── modules/
│   └── user/
│       ├── domain/          # Pure business logic & Interfaces (No framework dependencies)
│       ├── application/     # Use Cases orchestrating the domain
│       ├── infrastructure/  # Database implementation (TypeORM adapters)
│       └── presentation/    # REST Controllers / GraphQL Resolvers

```

## 🛠️ Tech Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Validation:** class-validator
* **Docs:** Swagger (OpenAPI)

## 🏃‍♂️ Getting Started

1. **Clone the repo**

> git clone [https://github.com/chrispaulrtv/nestjs-clean-architecture-boilerplate.git](https://github.com/chrispaulrtv/nestjs-clean-architecture-boilerplate.git)



2. **Run Infrastructure**
```bash
docker-compose up -d
```


3. **Install & Run**
```bash
pnpm install
pnpm start:dev
```



## 🤝 Contributing

This project is a Proof of Concept for Enterprise Architecture. Feel free to fork and improve.