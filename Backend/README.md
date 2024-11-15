# Lead Management and Follow-Up Scheduling

This project provides the backend API for theLeadHub, a lead management application. It uses Laravel and exposes API endpoints for managing users, leads, and follow-ups.

## Features

* **User Authentication:**
    * Registration (`/api/register`)
    * Login (`/api/login`)
    * Logout (`/api/logout`)
* **Lead Management:**
    * Create, Read, Update, and Delete leads (`/api/leads`)
* **Follow-up Management:**
    * Create, Read, Update, and Delete follow-ups (`/api/follow-ups`)
    * Retrieve follow-ups by lead ID (`/api/follow-ups/{lead_id}`)
    * Retrieve all follow-ups

## Technologies Used

* PHP
* Laravel
* Sanctum (for API authentication)

## API Endpoints

| Method | Endpoint           | Description                                           | Authentication |
| :----- | :---------------- | :---------------------------------------------------- | :------------- |
| GET    | `/api/user`        | Retrieves authenticated user information.                | Required       |
| POST   | `/api/register`   | Registers a new user.                                 | Not Required   |
| POST   | `/api/login`      | Logs in an existing user.                             | Not Required   |
| POST   | `/api/logout`     | Logs out the current user.                            | Required       |
| GET    | `/api/leads`      | Retrieves all leads.                                  | Required       |
| POST   | `/api/leads`      | Creates a new lead.                                   | Required       |
| GET    | `/api/leads/{lead}` | Retrieves a specific lead.                            | Required       |
| PUT    | `/api/leads/{lead}` | Updates a specific lead.                            | Required       |
| DELETE | `/api/leads/{lead}` | Deletes a specific lead.                            | Required       |
| GET    | `/api/follow-ups` | Retrieve all follow ups                             | Required       |
| POST   | `/api/follow-ups` | Creates a follow up                                 | Required       |
| GET    | `/api/follow-ups/{lead_id}` | Retrieve follow ups by lead id                    | Required       |
| PUT    | `/api/follow-ups/{follow-up}` | Updates a follow up                            | Required       |
| DELETE | `/api/follow-ups/{follow-up}` | Deletes a follow up                            | Required       |

## Authentication

The API uses Sanctum for authentication.  A bearer token is required for all endpoints except register and login.  The token is obtained after successful login.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd theLeadHub-Backend`
3. Install dependencies: `composer install`
4. Copy the `.env.example` file to `.env` and configure the database and other environment variables.
5. Generate an application key: `php artisan key:generate`
6. Run migrations: `php artisan migrate`

## Running the Application

1. Start the development server: `php artisan serve`
2. The API will be available at `http://localhost:8000/api`


## Contributing


Contributions are welcome.  Please fork the repository and submit a pull request.
