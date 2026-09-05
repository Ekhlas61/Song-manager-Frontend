# 🎵 Song Manager — Frontend

A modern and responsive music management interface built with **React, TypeScript, Redux Toolkit, Redux-Saga, Emotion, and Styled System**.

The application allows users to manage songs, search and filter their music library, view statistics, and perform CRUD operations through a RESTful backend API.

## 🚀 Live Application

**Live Demo:**
https://magical-moxie-e947d6.netlify.app/

## 📦 Repository

**Frontend Repository:**
https://github.com/Ekhlas61/Song-manager-Frontend

**Backend Repository:**
https://github.com/Ekhlas61/song-manager-backend

---

## ✨ Features

### 🎶 Song Management

* View all songs in the music library
* Add new songs
* Edit existing songs
* Delete songs with confirmation
* Display success messages after successful operations
* Automatically update the UI after CRUD operations without requiring a page reload

### 🔎 Search & Filtering

* Search songs by title, artist, or album
* Filter songs by genre
* Filter songs by artist
* Filter songs by album

### 📊 Statistics

The application provides an overview of the music collection, including:

* Total number of songs
* Total number of artists
* Total number of albums
* Total number of genres
* Songs grouped by genre
* Songs and albums grouped by artist
* Songs grouped by album

### 🎨 User Interface

* Responsive design
* Modern music-themed interface
* Responsive song cards
* Interactive buttons and controls
* Add/Edit form
* Confirmation dialog for destructive actions
* Non-blocking success notifications
* Responsive layout for different screen sizes

---

## 🛠️ Technologies

### Frontend

* **React**
* **TypeScript**
* **Vite**
* **Redux Toolkit**
* **Redux-Saga**
* **Axios**
* **Emotion**
* **Styled System**

### Backend Integration

The frontend communicates with the backend through RESTful APIs.

Backend API:

`https://song-manager-backend-2.onrender.com`

---

## 📁 Project Structure

```text
src/
├── api/
│   └── songApi.ts
│
├── components/
│   ├── FilterBar.tsx
│   ├── Layout.tsx
│   ├── Loading.tsx
│   ├── SongCard.tsx
│   ├── SongForm.tsx
│   ├── SongList.tsx
│   └── Statistics.tsx
│
├── features/
│   └── songs/
│       ├── songSaga.ts
│       ├── songSlice.ts
│       └── types.ts
│
├── store/
│   └── index.ts
│
├── styles/
│   ├── GlobalStyles.tsx
│   └── theme.ts
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ekhlas61/Song-manager-Frontend.git
```

### 2. Navigate to the project

```bash
cd Song-manager-Frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the API URL

Create a `.env` file in the project root:

```env
VITE_API_URL=https://song-manager-backend-2.onrender.com/api/songs
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at the local Vite development URL.

---

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
React UI
 │
 ▼
Redux Toolkit
 │
 ▼
Redux-Saga
 │
 ▼
Axios API Layer
 │
 ▼
REST API
 │
 ▼
Node.js / Express Backend
 │
 ▼
MongoDB
```

---

## 🔐 API Integration

The frontend uses the backend REST API for all song operations.

### Main endpoints

```text
GET    /api/songs
GET    /api/songs/:id
POST   /api/songs
PUT    /api/songs/:id
DELETE /api/songs/:id
GET    /api/songs/stats
```

---

## 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

## 🌐 Deployment

The frontend is deployed using **Netlify**.

**Live Application:**
https://magical-moxie-e947d6.netlify.app/

---

## 👨‍💻 Author

**Ekhlas Abdulmelik**

GitHub:
https://github.com/Ekhlas61
