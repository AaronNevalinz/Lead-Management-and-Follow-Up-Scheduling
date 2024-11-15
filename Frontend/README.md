# Lead Management and Follow-Up Scheduling

This project is the frontend for theLeadHub, a lead management application built with React. It provides a user interface for managing leads and their follow-ups.

## Features

* **User Authentication:**  Supports user registration and login.
* **Dashboard:** Displays an overview upon successful login.
* **Lead Management:**
    * View a list of leads.
    * Create new leads.
    * View details of individual leads.
* **Follow-up Management:**
    * View follow-ups.


## Technologies Used

* React
* React Router
* React-Bootstrap
* Bootstrap

## Dependencies

The project has several dependencies managed by npm. See `package.json` for the complete list.  Key dependencies include:

* `react-router-dom` for routing.
* `react-bootstrap` and `bootstrap` for UI components and styling.

## Project Structure

* **`src/App.jsx`:** The main application component, handling routing and user authentication.
* **`src/components`:** Contains reusable components like `Layout`, `LeadsList`, `FollowUps`, `Dashboard`, and `CreateLead`.
* **`src/Auth`:** Contains components for registration (`Register`) and login (`Login`).
* **`src/Context`:** Likely contains the `AppContext` for managing global state, such as user authentication.


## Installation

1. Clone the repository:  `git clone <repository-url>`
2. Navigate to the project directory: `cd theLeadHub-Frontend`
3. Install dependencies: `npm install`

## Running the Application

1. Start the development server: `npm start`
2. The application will be available at `http://localhost:3000` in your browser.

## Context and State Management

The application uses a React Context (`AppContext`) to manage global state, including user authentication.  This allows components to access and update shared data efficiently.

## Authentication

The application provides routes for `/register` and `/login`. Users need to authenticate to access features like lead and follow-up management.  Upon successful authentication, they are redirected to the dashboard.


