# CareConnect – College Health Center Web Application

CareConnect is a full-stack web application designed for college health centers, enabling students, doctors, and administrators to manage appointments, health records, and communication efficiently. The project features a modern React frontend (Material-UI), a secure Node.js/Express backend, and a MongoDB Atlas database. It is deployed with Netlify (frontend) and Render (backend).

---

## Features


- **User Authentication**: Secure JWT-based login/signup for students, doctors, and admins
- **Role-Based Access**: Admin, doctor, and patient dashboards with tailored features
- **Appointment Management**: Book, view, and manage appointments
- **Doctor & Patient Profiles**: View and edit personal and professional information
- **Chat & Notifications**: Real-time chat and notification system
- **Activity Logs & Analytics**: Admin tools for monitoring and reporting
- **Responsive UI**: Modern, accessible design using Material-UI with dark/light mode

---

## Tech Stack

- **Frontend**: React, Material-UI (MUI), Axios
- **Backend**: Node.js, Express, JWT, Mongoose
- **Database**: MongoDB Atlas
- **Deployment**: Netlify (frontend), Render (backend)

---

## Project Structure

```
CareConnect/
  backend/    # Express API, controllers, models, routes, middleware
  frontend/   # React app, components, pages, contexts, services
```

---

## Getting Started (Development)

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas account (or local MongoDB for dev)

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/CareConnect.git
cd CareConnect
```

### 2. Backend Setup
```sh
cd backend
npm install
# Create .env file (see .env.example)
# Example .env:
# MONGODB_URI=your_mongodb_atlas_uri
# JWT_SECRET=your_jwt_secret
# FRONTEND_URL=http://localhost:3000
npm run dev
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
# Create .env (see .env.production for example)
# REACT_APP_API_URL=http://localhost:5001/api
npm start
```

---

## Deployment

- **Frontend**: Deploy `/frontend` to Netlify. Set `REACT_APP_API_URL` to your Render backend URL.
- **Backend**: Deploy `/backend` to Render. Set environment variables for MongoDB, JWT, and allowed origins.



## API Overview
- `/api/auth/login` – User login
- `/api/auth/signup` – User registration
- `/api/appointments` – Appointment management
- `/api/profile` – User profile endpoints
- `/api/chat` – Real-time chat
- `/api/analytics` – Admin analytics

---

## License
MIT

---

## Research Paper (`paper/`)

The `paper/` directory contains an IEEE two-column conference article,
**"From Sliding Windows to Transformers: A Survey of Object Detection
Architectures"**, written in LaTeX using the `IEEEtran` document class.

### Compiling the paper

Prerequisites: a standard TeX Live or MiKTeX installation with
`IEEEtran`, `tikz`, `pgfplots`, and `hyperref` packages.

```sh
cd paper
pdflatex main.tex
pdflatex main.tex   # run twice to resolve cross-references
```

Or with `latexmk`:

```sh
cd paper
latexmk -pdf main.tex
```

### Figures

All figures in the paper are self-contained **TikZ / PGFPlots diagrams**
defined inline in `paper/main.tex`—no external image files are needed.

| Label                        | Figure description                         | Location in `main.tex`              |
|------------------------------|--------------------------------------------|-------------------------------------|
| `fig:traditional_pipeline`   | Classical sliding-window pipeline          | After Introduction (§ I)            |
| `fig:twostage_pipeline`      | Two-stage detector (RPN → RoI → head)      | Two-Stage Detectors section (§ II)  |
| `fig:onestage_pipeline`      | One-stage dense prediction + NMS           | One-Stage Detectors section (§ III) |
| `fig:detr_pipeline`          | DETR set-prediction + Hungarian matching   | Transformer section (§ IV)          |
| `fig:pareto`                 | Speed–accuracy Pareto frontier (PGFPlots)  | Speed–Accuracy section (§ V)        |

### Adding or replacing figures

**Option A — Edit the inline TikZ code (no external files):**

Locate the figure by its `\label{fig:xxx}` and edit the `tikzpicture`
environment directly inside `main.tex`.

**Option B — Use an external image:**

1. Place your image (PDF, PNG, or EPS) under `paper/fig/`:
   ```
   paper/fig/my_diagram.pdf
   ```
2. In `main.tex`, replace the `tikzpicture` block with:
   ```latex
   \includegraphics[width=\columnwidth]{fig/my_diagram}
   ```
   (No file extension needed for PDF/EPS; include extension for PNG/JPEG.)

**Option C — Add a new figure:**

```latex
\begin{figure}[t]
  \centering
  \includegraphics[width=\columnwidth]{fig/new_figure}
  % or inline TikZ:
  % \begin{tikzpicture} ... \end{tikzpicture}
  \caption{Your caption text.}
  \label{fig:new_label}
\end{figure}
```

Then reference it in the text with `Figure~\ref{fig:new_label}`.

---

## Contributors
- [Kumar Prateek](https://github.com/prateek2105)
- [Aaryan Kuntal](https://github.com/schroder0)

---

## Acknowledgements
- Material-UI
- Netlify
- Render
- MongoDB Atlas
