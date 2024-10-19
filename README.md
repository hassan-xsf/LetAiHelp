# 🚀 Next.js Starter Kit with NextAuth, Prisma, PostgreSQL + TypeScript

This repository is a starter kit for building a full-stack application using **Next.js** with **NextAuth** for authentication, **Prisma** as the ORM, **PostgreSQL** as the database, and **Zod** for schema validation. It also includes authentication with GitHub via NextAuth, And new OAuth providers can be very easily added.
A perfect kit for freelancing projects.

## 📚 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Migration](#database-migration)
- [Usage](#usage)
  - [Running the Development Server](#running-the-development-server)
  - [Authentication](#authentication)
  - [Schema Validation](#schema-validation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Next.js**: The React framework for production.
- **NextAuth**: Authentication solution with built-in GitHub OAuth provider and credential-based login.
- **Prisma**: ORM for database access, migrations, and management.
- **PostgreSQL**: Powerful, open-source object-relational database system.
- **Zod**: TypeScript-first schema declaration and validation library.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
  
## 🛠 Getting Started

### 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/nextjs-nextauth-prisma-starter.git
   cd nextjs-nextauth-prisma-starter

2. **Install dependencies**
    ```bash
    npm install

3. **Environment Variables**
  
   Create a `.env` file in the root of your project and add the following environment variables:
    
    ```env
    DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/YOUR_DATABASE_NAME
    NEXTAUTH_SECRET=your-secret
    NEXTAUTH_URL=http://localhost:3000
    GITHUB_ID=your-github-client-id
    GITHUB_SECRET=your-github-client-secret

### **🗄 Database Migration**

  Run the following command to create the necessary tables in your PostgreSQL database:
    
    ```bash
    npx prisma migrate dev --name init
  This will generate your database schema and run the migration.
    
### **🚀 Usage**

  🔥 Running the Development Server
  To start the development server, run:
    
    ```bash
    Copy code
    npm run dev
  Open your browser and navigate to http://localhost:3000 to view the application.
    
### **🔐 Authentication**

  This starter kit comes pre-configured with NextAuth for both GitHub OAuth and credentials-based authentication. The following authentication methods are available:
    
  Sign in with GitHub: Click on the "Sign in with GitHub" button on the sign-in page.
  Credentials-based Sign in: Use the form to sign in with an email and password.
  And new OAuth can be easily added.

### **✅ Schema Validation**

  This project uses Zod for validating the incoming request data. You can find and modify the validation schemas in the relevant API routes.
      
## **🤝 Contributing**

  Contributions are always welcome :)

