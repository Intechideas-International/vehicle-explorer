# Vehicle Explorer — Take-Home Project

A Next.js application for exploring truck manufacturers and their vehicle models, powered by the [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api/).

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

- **Next.js 16** (Pages Router) with TypeScript
- **Axios** for API calls
- **CSS Modules** for styling
- **NHTSA Vehicle API** (free, no API key required)

## Project Structure

```
src/
├── pages/              # Next.js pages (Pages Router)
│   ├── _app.tsx        # App wrapper with context providers
│   ├── index.tsx       # Home page — search + popular makes
│   ├── results.tsx     # Browse/search results page
│   └── make/
│       └── [makeId].tsx  # Make detail — models list with filters
├── components/         # Reusable UI components
├── contexts/           # React contexts (search, favorites)
├── services/           # API client functions
├── types/              # TypeScript type definitions
└── styles/             # CSS modules
```

## App Overview

The app has three main pages:

1. **Home** (`/`) — A hero section with a search bar and a grid of popular truck makes.
2. **Browse** (`/results`) — All truck makes with search filtering.
3. **Make Detail** (`/make/[makeId]`) — All models for a specific make, with a year dropdown filter.

Users can also favorite makes (persisted in localStorage), visible via the star counter in the header.

---

## Your Tasks

This project is functional but has **two bugs** and is missing **two features**. Your job is to fix the bugs and implement the features described below.

**Time expectation**: 1–2 hours total.

---

### Bug Fix 1: Year Filter Ignored on Direct Page Load

**Steps to reproduce**:
1. Go to any make detail page (e.g., click on Ford from the home page).
2. Select a year from the dropdown (e.g., 2024). Notice the models update and the URL changes to include `?year=2024`.
3. Now **copy the full URL** and open it in a new tab (or just refresh the page).
4. The year dropdown correctly shows "2024", but the model list shows **all models** instead of only 2024 models.

**Expected behavior**: When loading a URL like `/make/460?name=FORD&year=2024`, the page should fetch and display only models for that year.

---

### Bug Fix 2: Cannot Unfavorite a Make

**Steps to reproduce**:
1. Go to any page showing make cards (Home or Browse).
2. Click the star icon on a make (e.g., Ford) to add it to favorites. Notice the star fills in and the counter in the header increases.
3. Click the same star again to unfavorite the make.
4. The star **stays filled** and the counter doesn't decrease — the make is still in your favorites.

**Expected behavior**: Clicking the star on an already-favorited make should remove it from favorites (toggle behavior).

---

### Feature 1: Sort Makes by Name

The results page (`/results`) displays makes in the order returned by the API. Add the ability to sort makes alphabetically.

**Requirements**:
- Add a sort toggle or dropdown near the results count (where the comment `FEATURE 1` is in the code).
- Support two options: **A–Z** and **Z–A**.
- The current sort preference should be reflected in the URL as a query parameter (e.g., `?sort=asc` or `?sort=desc`) so it persists on page refresh.
- Default behavior (no sort param) should keep the original API order.

---

### Feature 2: Vehicle Type Filter on Make Detail Page

The make detail page shows all models in a flat list. The NHTSA API provides information about what vehicle types a make produces (e.g., Truck, Passenger Car, Multipurpose Passenger Vehicle).

**Requirements**:
- On the make detail page, fetch the available vehicle types for the current make using the API endpoint: `GET /GetVehicleTypesForMakeId/{makeId}?format=json`
- Display the vehicle types as clickable filter buttons or tabs (where the comment `FEATURE 2` is in the code).
- When a vehicle type is selected, fetch models filtered by that type using the existing `getModelsForMakeYear` function in `services/api.ts` (it already supports a `vehicleType` parameter).
- An "All" option should show all models (current behavior).
- The selected type filter should work in combination with the year filter.

---

### Bonus 1: UX Improvement (Open-Ended)

If you have extra time, pick **one thing** about the app that you think could be improved from a user experience perspective, and implement it. There is no right answer here — we want to see how you think about product and UX.

Examples might include (but are not limited to): loading states, error handling, pagination, empty states, responsive design improvements, keyboard navigation, etc.

---

### Bonus 2: Dockerize the Project

Set up a `docker-compose.yml` (and any necessary Dockerfiles) so the entire project can be run with:

```bash
docker-compose up
```

The app should be accessible at `http://localhost:3000` after running the command.

---

## Submission Guidelines

1. **Fork this repository** to your own GitHub account.
2. Create a new branch in your fork for your work.
3. **Make meaningful commits** as you work — we want to see your thought process, not just the final result. Aim for one commit per logical change (e.g., one for each bug fix, one for each feature).
4. **Do not squash your commits** into a single one.
5. When finished, push your branch and share your fork's repository link.

## API Reference

The app uses the free NHTSA Vehicle API. No API key is needed. Here are the endpoints used:

| Endpoint | Description |
|---|---|
| `GET /GetMakesForVehicleType/truck?format=json` | List all truck makes |
| `GET /GetModelsForMake/{make}?format=json` | All models for a make |
| `GET /GetModelsForMakeYear/make/{make}/modelyear/{year}?format=json` | Models filtered by year |
| `GET /GetModelsForMakeYear/make/{make}/modelyear/{year}/vehicletype/{type}?format=json` | Models filtered by year and type |
| `GET /GetVehicleTypesForMakeId/{makeId}?format=json` | Vehicle types for a make |

Base URL: `https://vpic.nhtsa.dot.gov/api/vehicles`
