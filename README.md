# Graph Hierarchy Visualization (React + Vue + Node + TypeScript)
**Developed by:** Praveen Kumar Maddela

## Overview
This project is part of my Full Stack Developer Home Assignment.
I created a small full-stack application that shows a graph hierarchy in a clean and interactive way.
It displays how items are connected — for example:
**A → B, C, D** and **B → B-1, B-2, B-3.**

The graph is clickable, and when a user clicks on any node, it highlights that node and shows its details on the right side.
Clicking outside the nodes or pressing ✕ removes the selection.

I first built the frontend using **Vue 3 + TypeScript** (as the task asked).
But since I have good experience with **React.js**, I also created another version using **React + TypeScript** to show how I can build the same UI in React.

## Tech Stack

**Frontend (Vue version):**
- Vue 3 + Vite + TypeScript
- D3.js (for drawing the graph)
- Axios (to get data from backend)

**Frontend (React version):**
- React + TypeScript (Vite setup)
- D3.js (same logic as Vue)
- Axios (for API calls)

**Backend:**
- Node.js + Express.js
- TypeScript

## Folder Structure
```
Assignment/
├── client/          → Vue frontend
├── client-react/    → React frontend (my version)
├── graph-server/    → Express backend
└── README.md
```

## How to Run

**1. Run backend**
```bash
cd graph-server
npm install
npm run dev
```
Backend runs at: **http://localhost:4000/api/graph**

**2. Run Vue frontend**
```bash
cd client
npm install
npm run dev
```
Frontend runs at: **http://localhost:5173**

**3. Run React frontend (my version)**
```bash
cd client-react
npm install
npm run dev
```
Frontend runs at: **http://localhost:5174** (or similar port)

## Features
- /api/graph endpoint sends hierarchy JSON data  
-  Graph shows clear tree structure left to right  
-  Each node is clickable and gets highlighted  
-  Sidebar shows name and description  
-  Click outside or ✕ to deselect  
-  Built clean UI with D3.js  
-  Works in both Vue and React versions  

## What I Did
- I built both frontend and backend fully by myself.
- Used **TypeScript** everywhere for type safety.
- Used **Axios** for API calls.
- Designed and coded the graph using **D3.js**.
- Followed component-based structure and clean folder setup.
- Tested all the main features mentioned in the assignment.

## Example Output
When the app runs, it shows:
```
A
├── B
│   ├── B-1
│   ├── B-2
│   └── B-3
├── C
└── D
```
When I click on **B-2**, it shows:  
**Name:** B-2  
**Description:** This is a description of B-2  

## Status
- Project Completed Successfully  
Created completely by me — **Praveen Kumar Maddela**  
Frontend made using **React + Vue**, backend using **Node + TypeScript**
