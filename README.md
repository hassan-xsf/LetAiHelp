
<br>
<p align="center">
  <a href="https://www.letaihelp.me">
    <img src="https://github.com/user-attachments/assets/6ba0ad80-4b28-4f2b-889d-125c03f9bce7" alt="LetAiHelp Logo" />
  </a>
</p>

<h2 align="center" >One AI Website, 13 Different Tools </h3>
<p align="center">Tools that boosts your productivity and enhances creativity</p>
<p align = "center">Including Chatbots , AI Detector, Image Generation and many more, Made with ❤️</p>

<br />

![](https://i.imgur.com/waxVImv.png)
## Version v0.5 🟢

### Live Preview (Click below)
[![Live Preview](https://img.shields.io/badge/Live%20Preview-LetAIHelp-4ade80?style=for-the-badge)](https://letaihelp.me/)

### Image Previews: 
<p align="center">

  
  <img src = "https://github.com/user-attachments/assets/f96ff01c-116e-45ef-9e85-2820363b6b91"/>

  <img src = "https://github.com/user-attachments/assets/45a34b5e-6522-4ccb-ba4e-65597d5ea8e0"/>


</p>






### Features
* Credits System (Just like SAAS but FREE)
* Use paid tools like ChatGPT 4.0, Claude Sonnet 3.5 and Gemini PRO for FREE.
* 16 Different other chat models to select from, Trained according to your personal needs.
* Image Generation using 3 different models and choose scene as well (Inspired by Canva)
* AI Content Detector, That detects all your AI content and mark it.
* Paraphraser Tool, That converts all your AI content into human language (99% success)
* AI Translation , Summarizer and many more..


### Tech Stack
1. NextJS.
2. Typescript.
3. Prisma ORM with Postgre SQL.
4. NextAuth as authentication system.
5. Cloudfare AI
6. ShadCN as primary component library.



### Things I learned in this project:
1. Handling complex API routes.
2. Streaming AI responses.
3. Image Generation using AI.
4. Prompt Engineering.


# INTRODUCTION 
This project was made as a Hobby Project, It contains 13 different AI tools that boosts your productivity and enhances creativity, I wanted to make something for personal use for creating images , non-ai text generation and later decided to make it as a full fledged fullstack project, That doesn't only help me but my fellow learners as well.


## API Routes 🖥️

- **api/**
  - **ai-detection/**  
  - **auth/**  
  - **caption/**  
  - **chat/**  
  - **code/**  
  - **object-detection/**  
  - **paid/**  
  - **paraphrase/**  
  - **sign-up/**  
  - **summarizer/**  
  - **text-to-image/**  
  - **translator/**  

Each route serves an authenticated API endpoint and serves as their purpose.

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
