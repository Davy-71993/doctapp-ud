
# DocApp UG - Health Super-App

DocApp UG is a modern, full-stack web application designed to be an all-in-one health super-app for Uganda. It connects patients, specialists, and administrators through a unified platform, streamlining healthcare management from appointment booking to health data tracking.

## ✨ Features

The application is divided into three distinct user roles, each with a tailored dashboard and set of features.

### Patient Portal (`/patient`)
- **Dashboard**: Get a quick overview of your health data, recent activities, and quick links to other sections.
- **My Specialists**: View and manage your connected healthcare specialists.
- **Find a Specialist**: Search for new specialists by name, specialty, or location.
- **Appointments**: Manage upcoming and view past appointments.
- **Health Trackers**: Log and monitor key health metrics like blood pressure, blood sugar, body temperature, and menstrual cycles.
- **AI Health Assistant**: Get personalized health advice based on your tracked data using a built-in AI chatbot.
- **Order Medicine**: Upload prescriptions to order medication.
- **Browse Services**: Discover and access various healthcare services like ambulance, home-based care, and more.

### Specialist Portal (`/specialist`)
- **Dashboard**: View an overview of patient statistics, critical alerts, and recent activities.
- **Schedule Management**: Manage your availability and view appointments on a full-featured calendar.
- **Patient Management**: Access a list of your patients, view their details, and monitor their vitals.
- **Refer & Report**: Refer patients to other specialists or report issues to administrators.
- **My Facilities**: Register and manage the hospitals, clinics, or pharmacies you operate.
- **Service Management**: Define and manage the medical services you offer.

### Admin Portal (`/admin`)
- **Dashboard**: A central hub to monitor platform growth, including user and specialist counts, and specialist distribution by specialty.
- **User & Specialist Management**: View all users and manage specialist verification and approvals.
- **Facility & Service Approval**: Review and approve new healthcare facilities and services submitted by specialists.
- **Complaints Management**: Review and resolve complaints filed against patients or specialists.
- **Inbox**: Communicate with specialists and other platform users.

## 🚀 Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
- **Charts**: [Recharts](https://recharts.org/)
- **Calendar**: [Schedule-X](https://schedule-x.dev/)

## 🏁 Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
```

This will start the application, and you can view it in your browser at `http://localhost:9002`.

## 📁 Project Structure

The project follows a feature-based structure, organized by user roles within the `src/app` directory.

```
src/app/
├── (admin)          # Routes and pages for the Admin role
│   ├── dashboard/
│   ├── specialists/
│   └── ...
├── (patient)        # Routes and pages for the Patient role
│   ├── dashboard/
│   ├── appointments/
│   └── ...
├── (specialist)     # Routes and pages for the Specialist role
│   ├── dashboard/
│   ├── patients/
│   └── ...
├── api/             # API routes for backend data handling
├── ai/              # Genkit flows for AI features
└── ...
```

- **Role-Based Routes**: Pages are grouped into `(admin)`, `(patient)`, and `(specialist)` route groups. This keeps the concerns for each user type separate and organized.
- **API Layer**: The `src/app/api` directory contains all backend endpoints that serve data to the frontend, creating a clear separation between client and server logic.
- **Components**: Reusable components are located in `src/components`, with UI primitives in `src/components/ui`.
- **Mock Data**: All mock data is centralized in the `src/lib` directory and served through the API layer.
