# Professional Portfolio & Admin CMS

![Portfolio Interface](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Angular%20|%20Node%20|%20PostgreSQL-blue?style=for-the-badge)
![Mobile Responsive](https://img.shields.io/badge/UI-Mobile%20First-orange?style=for-the-badge)

A premium, dynamic personal portfolio built with a modern tech stack. This project features a full-scale Admin Dashboard (CMS) for real-time content management, secure authentication, and a sleek, mobile-responsive design.

## 🚀 Key Features

### 💻 Public Portfolio
- **Dynamic Content**: Every section (About, Skills, Projects, Mission) is driven by the backend database.
- **Premium Aesthetics**: Glassmorphism, smooth animations, and tailored color palettes.
- **Project Showcase**: A dedicated space for academic and professional projects with high-resolution image support.
- **Interactive Contact**: A functional contact form for visitors to send direct messages.

### 🔐 Admin Dashboard (CMS)
- **Live Content Management**: Effortlessly update your profile details, bio, and mission statement.
- **Project Manager**: Add, edit, or delete projects with support for high-quality image uploads (up to 50MB).
- **Skill Control**: Manage professional traits and technical expertise categories in real-time.
- **Inbox Management**: View, reply to, or delete messages received from your portfolio.
- **Secure Session Control**: JWT-based authentication with a 10-minute auto-expiry and dynamic session renewal.

### 📱 Mobile Excellence
- **Responsive Navigation**: A toggleable mobile sidebar in the Admin CMS to maximize workspace.
- **Adaptive Grids**: All layouts automatically reflow for standard smartphones and tablets.
- **Touch-Friendly UI**: Always-visible control icons on mobile for seamless editing.

## 🛠️ Technology Stack

- **Frontend**: Angular 18+, Tailwind CSS, RxJS, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL.
- **Deployment**: Docker & Docker Compose.
- **Auth**: JWT (JSON Web Tokens) with Bcrypt password hashing.

## 📦 Installation & Setup

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 1. Clone the Repository
```bash
git clone https://github.com/DDHDDHD3/portfolio.git
cd portfolio
```

### 2. Environment Configuration
Create a `.env` file in the root directory (optional, system uses defaults in docker-compose):
```env
PORT=3000
DATABASE_URL=postgres:
```

### 3. Start the Application
Run the following command to build and launch all services (PostgreSQL, Backend, Frontend):
```bash
docker compose up --build
```

### 4. Access the Ports
- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:4200/#/admin](http://localhost:4200/#/admin)

## 🔑 Admin Credentials (Default)
- **Username**: ``
- **Password**: ``

---

Developed with ❤️ by **Abdullahi Muse Isse**
