# DocApp UG - API Documentation for Database Design

## 1. Introduction

This document provides a complete specification for the DocApp UG API. It is intended for the database engineer to design and implement the database schema that will support the application's backend. The document outlines the data models (entities), their attributes, and the relationships between them.

## 2. Data Models (Entities)

The following models represent the core entities of the application.

---

### 2.1. User

Represents any individual who can log in to the system. The `role` attribute determines their access level and portal (Patient, Specialist, or Admin).

| Field         | Data Type      | Description                                     | Notes                               |
|---------------|----------------|-------------------------------------------------|-------------------------------------|
| `id`          | String / UUID  | Unique identifier for the user.                 | Primary Key                         |
| `firstName`   | String         | User's first name.                              | Required                            |
| `lastName`    | String         | User's last name.                               | Required                            |
| `email`       | String         | User's email address for login and communication. | Required, Unique                    |
| `password`    | String (Hashed)| Hashed password for authentication.             | Required                            |
| `role`        | Enum           | Determines user type (`patient`, `specialist`, `admin`). | Required                            |
| `dateJoined`  | DateTime       | Timestamp when the user registered.             | Required                            |
| `phone`       | String         | User's phone number.                            | Optional                            |
| `avatar`      | String / URL   | URL to the user's profile picture.              | Optional                            |
| `bloodGroup`  | String         | User's blood group (e.g., 'O+').                | Optional, relevant for patients.    |
| `district`    | String         | User's district of residence.                   | Optional, relevant for patients.    |

**Relationships:**
-   A `User` with `role: 'specialist'` has a one-to-one relationship with a `Doctor` profile.
-   A `User` with `role: 'patient'` has a one-to-one relationship with a `Patient` profile.

---

### 2.2. Doctor (Specialist Profile)

Represents the professional profile of a specialist. This is linked to a `User` with the `specialist` role.

| Field         | Data Type      | Description                               | Notes                               |
|---------------|----------------|-------------------------------------------|-------------------------------------|
| `id`          | String / UUID  | Unique identifier for the doctor profile. | Primary Key                         |
| `userId`      | String / UUID  | Foreign key linking to the `User` table.  | Foreign Key (`User.id`)             |
| `name`        | String         | Full name of the doctor.                  | Required                            |
| `specialty`   | String         | Medical specialty (e.g., 'Cardiologist'). | Required                            |
| `hospital`    | String         | Primary hospital affiliation.             | Optional                            |
| `rating`      | Float          | Average patient rating (1.0 - 5.0).       | Calculated field                    |
| `reviews`     | Integer        | Total number of reviews.                  | Calculated field                    |
| `image`       | String / URL   | URL to the doctor's professional photo.   | Optional                            |
| `location`    | String         | Primary city/town of practice.            | Required                            |
| `verified`    | Boolean        | Admin verification status.                | Defaults to `false`                 |

**Relationships:**
-   **`User`**: One-to-one with `User` (`userId` -> `User.id`).
-   **`Appointment`**: One-to-many with `Appointment` (a doctor has many appointments).
-   **`DoctorComment`**: One-to-many with `DoctorComment` (a doctor has many comments/reviews).
-   **`Facility`**: Many-to-many (a specialist can operate at or be linked to multiple facilities).

---

### 2.3. Patient (Patient Profile)

Represents patient-specific data, linked to a `User` with the `patient` role.

| Field         | Data Type      | Description                                 | Notes                               |
|---------------|----------------|---------------------------------------------|-------------------------------------|
| `id`          | String / UUID  | Unique identifier for the patient profile.  | Primary Key                         |
| `userId`      | String / UUID  | Foreign key linking to the `User` table.    | Foreign Key (`User.id`)             |
| `name`        | String         | Full name of the patient.                   | Required                            |
| `avatar`      | String / URL   | URL to the patient's profile picture.       | Optional                            |
| `lastCheckup` | Date           | Date of the last recorded checkup.          | Optional                            |
| `status`      | Enum           | Health status (`Stable`, `Critical`, `Needs Review`). | Set by specialist.                  |
| `vitals`      | JSON / Text    | A JSON object storing latest vitals data.   | Example: `{"bloodPressure": "120/80"}` |
| `healthData`  | JSON / Text    | A JSON object for all tracked health metrics. | See Section 2.11 for structure.     |

**Relationships:**
-   **`User`**: One-to-one with `User` (`userId` -> `User.id`).
-   **`Appointment`**: One-to-many with `Appointment` (a patient has many appointments).
-   **`Prescription`**: One-to-many with `Prescription` (a patient has many prescriptions).

---

### 2.4. Appointment

Represents a scheduled appointment between a patient and a doctor.

| Field       | Data Type     | Description                                  | Notes                                    |
|-------------|---------------|----------------------------------------------|------------------------------------------|
| `id`        | String / UUID | Unique identifier for the appointment.       | Primary Key                              |
| `patientId` | String / UUID | Foreign key linking to the `Patient` table.  | Foreign Key (`Patient.id`), Required     |
| `doctorId`  | String / UUID | Foreign key linking to the `Doctor` table.   | Foreign Key (`Doctor.id`), Required      |
| `date`      | DateTime      | The date and time of the appointment.        | Required                                 |
| `status`    | Enum          | Status (`upcoming`, `past`, `cancelled`).    | Required                                 |
| `reason`    | Text          | The reason for the visit.                    | Optional                                 |

**Relationships:**
-   **`Patient`**: Many-to-one with `Patient` (`patientId` -> `Patient.id`).
-   **`Doctor`**: Many-to-one with `Doctor` (`doctorId` -> `Doctor.id`).

---

### 2.5. Facility

Represents a healthcare facility like a hospital, clinic, or pharmacy.

| Field         | Data Type      | Description                                      | Notes                               |
|---------------|----------------|--------------------------------------------------|-------------------------------------|
| `id`          | String / UUID  | Unique identifier for the facility.              | Primary Key                         |
| `name`        | String         | Name of the facility.                            | Required                            |
| `type`        | Enum           | Type of facility (`Hospital`, `Clinic`, `Pharmacy`, etc.). | Required                            |
| `location`    | String         | Location of the facility (e.g., 'Kampala').      | Required                            |
| `specialistId`| String / UUID  | Foreign key to the specialist who registered it. | Foreign Key (`User.id`), Required     |
| `documents`   | Text / JSON    | URLs or references to verification documents.    | Stored as a JSON array of strings.  |
| `verified`    | Boolean        | Admin verification status.                       | Defaults to `false`                 |

**Relationships:**
-   **`User (Specialist)`**: Many-to-one with `User` (`specialistId` -> `User.id`).
-   **`SpecialistService`**: Many-to-many (a facility offers many services). A join table `FacilityServices` would be appropriate (`facilityId`, `serviceId`).

---

### 2.6. SpecialistService

Represents a specific medical service offered by a specialist (e.g., ECG Test).

| Field         | Data Type     | Description                               | Notes                         |
|---------------|---------------|-------------------------------------------|-------------------------------|
| `id`          | String / UUID | Unique identifier for the service.        | Primary Key                   |
| `name`        | String        | Name of the service.                      | Required                      |
| `description` | Text          | Detailed description of the service.      | Required                      |
| `duration`    | Integer       | Duration of the service in minutes.       | Required                      |
| `price`       | Decimal       | Price of the service in UGX.              | Required                      |
| `specialistId`| String / UUID | Foreign key to the specialist offering it.| Foreign Key (`User.id`), Required |

**Relationships:**
-   **`User (Specialist)`**: Many-to-one with `User` (`specialistId` -> `User.id`).
-   **`Facility`**: Many-to-many with `Facility`.

---

### 2.7. Prescription & Medicine

A `Prescription` is a collection of `Medicine` items issued by a specialist to a patient.

**Prescription Table**
| Field       | Data Type     | Description                             | Notes                                 |
|-------------|---------------|-----------------------------------------|---------------------------------------|
| `id`        | String / UUID | Unique identifier for the prescription. | Primary Key                           |
| `patientId` | String / UUID | Foreign key to the `Patient` table.     | Foreign Key (`Patient.id`), Required  |
| `doctorId`  | String / UUID | Foreign key to the `Doctor` table.      | Foreign Key (`Doctor.id`), Required   |
| `date`      | DateTime      | Date the prescription was issued.       | Required                              |

**Medicine Table** (or JSON field in Prescription)
| Field           | Data Type     | Description                        | Notes                                 |
|-----------------|---------------|------------------------------------|---------------------------------------|
| `id`            | String / UUID | Unique identifier for the medicine entry. | Primary Key. Composite key with `prescriptionId` can also be used. |
| `prescriptionId`| String / UUID | Foreign key to the `Prescription` table. | Foreign Key, Required               |
| `name`          | String        | Name of the medicine.              | Required                              |
| `dosage`        | String        | Dosage (e.g., '500mg').            | Required                              |
| `frequency`     | String        | How often to take it (e.g., 'Twice a day'). | Required                              |
| `duration`      | String        | How long to take it for (e.g., '7 days').   | Required                              |

---

### 2.8. Complaint

Represents a complaint filed against a patient or a specialist.

| Field       | Data Type     | Description                                  | Notes                                |
|-------------|---------------|----------------------------------------------|--------------------------------------|
| `id`        | String / UUID | Unique identifier for the complaint.         | Primary Key                          |
| `targetId`  | String / UUID | ID of the user being reported (`User.id`).   | Required                             |
| `targetType`| Enum          | Type of user reported (`patient`, `specialist`).| Required                             |
| `reporterId`| String / UUID | ID of the user who filed the report (`User.id`). | Required                             |
| `reason`    | Text          | Detailed reason for the complaint.           | Required                             |
| `date`      | DateTime      | Timestamp when the complaint was filed.      | Required                             |
| `status`    | Enum          | Status of the complaint (`Pending`, `Resolved`). | Required, defaults to `Pending`.     |

---

### 2.9. DoctorComment (Review)

Represents a review or comment left by a patient for a doctor.

| Field       | Data Type     | Description                              | Notes                                 |
|-------------|---------------|------------------------------------------|---------------------------------------|
| `id`        | String / UUID | Unique identifier for the comment.       | Primary Key                           |
| `doctorId`  | String / UUID | Foreign key to the `Doctor` table.       | Foreign Key (`Doctor.id`), Required   |
| `patientId` | String / UUID | Foreign key to the `Patient` table.      | Foreign Key (`Patient.id`), Required  |
| `date`      | DateTime      | Timestamp when the comment was posted.   | Required                              |
| `rating`    | Integer       | Star rating from 1 to 5.                 | Required                              |
| `comment`   | Text          | The text content of the review.          | Required                              |

---

### 2.10. Chat & Message

Represents the real-time chat functionality. This might be better suited for a real-time database like Firestore, but for a relational schema, it would look like this.

**Chat Table** (optional, can be derived)
| Field       | Data Type     | Description                              | Notes                         |
|-------------|---------------|------------------------------------------|-------------------------------|
| `id`        | String / UUID | Unique identifier for the chat session.  | Primary Key                   |
| `participant1Id` | String / UUID | ID of the first user in the chat.   | Foreign Key (`User.id`)       |
| `participant2Id` | String / UUID | ID of the second user in the chat.  | Foreign Key (`User.id`)       |

**Message Table**
| Field         | Data Type     | Description                             | Notes                                 |
|---------------|---------------|-----------------------------------------|---------------------------------------|
| `id`          | String / UUID | Unique identifier for the message.      | Primary Key                           |
| `chatId`      | String / UUID | Foreign key to the `Chat` table.        | Foreign Key (`Chat.id`), Required     |
| `senderId`    | String / UUID | ID of the user who sent the message.    | Foreign Key (`User.id`), Required     |
| `receiverId`  | String / UUID | ID of the user receiving the message.   | Foreign Key (`User.id`), Required     |
| `text`        | Text          | The content of the message.             | Required                              |
| `timestamp`   | DateTime      | Timestamp when the message was sent.    | Required, Indexed                     |


---

### 2.11. HealthData Sub-models

This data is tracked by patients and can be stored in a single JSONB column in the `Patient` table or broken out into separate tables for more complex querying.

-   **PeriodData**: `[{ date: Date }]`
-   **TemperatureData**: `[{ date: Date, temperature: Float }]`
-   **BloodSugarData**: `[{ date: Date, level: Float }]`
-   **BloodPressureData**: `[{ date: Date, systolic: Integer, diastolic: Integer }]`
-   **Allergies**: `[String]`
-   **Pregnancy**: `{ status: Enum('Pregnant', 'Not Pregnant'), dueDate: Date }`

## 3. API Endpoints

The following endpoints are used by the frontend to fetch data.

| Method | Endpoint                             | Data Model Returned  | Description                                        |
|--------|--------------------------------------|----------------------|----------------------------------------------------|
| `GET`  | `/api/users`                         | `User[]`             | Retrieves a list of all users.                     |
| `GET`  | `/api/user-profile`                  | `UserProfile`        | Retrieves the profile of the currently logged-in user. |
| `GET`  | `/api/doctors`                       | `Doctor[]`           | Retrieves a list of all doctors.                   |
| `GET`  | `/api/doctors/:id`                   | `Doctor`             | Retrieves a single doctor by their ID.             |
| `GET`  | `/api/specialists/pending`           | `Doctor[]`           | Retrieves specialists pending verification.        |
| `GET`  | `/api/specialists/verified`          | `Doctor[]`           | Retrieves verified specialists.                    |
| `GET`  | `/api/patients`                      | `Patient[]`          | Retrieves a list of all patients.                  |
| `GET`  | `/api/patients/:id`                  | `Patient`            | Retrieves a single patient by their ID.            |
| `GET`  | `/api/appointments`                  | `Appointment[]`      | Retrieves all appointments.                        |
| `GET`  | `/api/facilities`                    | `Facility[]`         | Retrieves all facilities.                          |
| `GET`  | `/api/facilities/pending`            | `Facility[]`         | Retrieves facilities pending verification.         |
| `GET`  | `/api/facilities/verified`           | `Facility[]`         | Retrieves verified facilities.                     |
| `GET`  | `/api/specialist-services`           | `SpecialistService[]`| Retrieves all specialist services.                 |
| `GET`  | `/api/specialist-services/:id`       | `SpecialistService`  | Retrieves a single service by its ID.              |
| `GET`  | `/api/prescriptions`                 | `Prescription[]`     | Retrieves all prescriptions.                       |
| `GET`  | `/api/prescriptions/:id`             | `Prescription`       | Retrieves a single prescription by its ID.         |
| `GET`  | `/api/complaints/patient`            | `Complaint[]`        | Retrieves all complaints against patients.         |
| `GET`  | `/api/complaints/specialist`         | `Complaint[]`        | Retrieves all complaints against specialists.      |
| `GET`  | `/api/health-data`                   | `HealthData`         | Retrieves all health tracking data for a user.     |
| `GET`  | `/api/chat/messages`                 | `Message[]`          | Retrieves all chat messages.                       |
| `GET`  | `/api/chat/specialists`              | `Contact[]`          | Retrieves a list of specialist contacts for chat.  |

