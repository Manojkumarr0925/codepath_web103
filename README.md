# Creatorverse ✨

A full-stack React app to manage your favorite content creators. Built with React, Vite, React Router, and Supabase.

## Features

- [x] Display at least five content creators on the homepage
- [x] Each creator item includes name, URL link, and description
- [x] API calls use async/await via Supabase client
- [x] Clicking a creator takes you to their detail page
- [x] Each creator has a unique URL (`/creator/:id`)
- [x] Edit a creator's name, URL, description, and image
- [x] Delete a creator
- [x] Add a new creator with name, URL, and description
- [x] New creator appears in the list after adding
- [x] Show image of each creator on their card (stretch)
- [x] Creative card layout (stretch)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a project named `creatorverse`
2. Create a table called `creators` with these columns:
   - `id` (int8, primary key, auto-generated)
   - `name` (text)
   - `url` (text)
   - `description` (text)
   - `imageURL` (text, nullable)
3. Disable Row Level Security on the table
4. Enable Realtime on the table

### 3. Add your Supabase credentials

Open `src/client.js` and replace the placeholder values:

```js
const URL = 'YOUR_SUPABASE_PROJECT_URL';
const API_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Find these in: Supabase Dashboard → Settings → API

### 4. Run the app

```bash
npm run dev
```

## Tech Stack

- React 18
- Vite
- React Router v6
- Supabase
