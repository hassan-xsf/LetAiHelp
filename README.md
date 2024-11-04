<p align="center">
  <img src = "https://github.com/user-attachments/assets/f6ebf98e-ad32-4183-bc25-03c1fa681433" alt = "LetAIHelp.me"/>
</p>


## Version v0.5 🟢
### Live Preview (Click below)

[![Live Preview](https://img.shields.io/badge/Live%20Preview-LetAIHelp-4ade80?style=for-the-badge)](https://letaihelp.me/)

### Video Preview:

### Things I learned in this project:
1. Handling complex API routes.
2. Streaming AI responses.
3. Image Generation using AI.
4. Prompt Engineering.


# INTRODUCTION 
This project 




## Installation 🚀

1. **Clone the repository:**

    ```bash
    git clone https://github.com/hassan-xsf/ThreadIt.git
    ```
2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables for backend:**

    Create a `.env` file in the root of the server directory, Or edit .env.sample that is provided.

    ```env
    GITHUB_ID= xxxxx
    GITHUB_SECRET= xxxxx  
    NEXTAUTH_URL= http://localhost:3000
    NEXTAUTH_SECRET= your_nextauth_secret
    DATABASE_URL= "xxxxxxxx"
    CLOUDFLARE_ACCOUNT_ID= xxxxx
    CLOUDFLARE_API_TOKEN= xxxxxx
    BLACKBOX_API_KEY= xxxxxxx
    ```
4. **Database Migration**
   Run the following command to create the necessary tables in your PostgreSQL database:
   
   ```bash
   npx prisma migrate dev --name init
   ```
    
   This will generate your database schema and run the migration.

5. **Run the application:**
   Start your NextJS project using

    ```bash
    npm run dev
    # or
    yarn run dev
    ```
    
## How to Contribute 🤝

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page on GitHub.

2. **Create a feature branch**:

    ```bash
    git checkout -b feat/your-feature
    ```

3. **Make your changes**: Edit or add files as needed.

4. **Commit your changes**:

    ```bash
    git commit -m 'Add new feature'
    ```

5. **Push to the branch**:

    ```bash
    git push origin feat/your-feature
    ```

6. **Create a Pull Request**: Go to the GitHub repository and click "New Pull Request."
