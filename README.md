# Angular Firebase Scheduler

This project is an Angular application that integrates a Syncfusion Scheduler component with Firebase Firestore for data storage and real-time updates.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (v15.x or later)

## Setup

1. Clone the repository: `git clone https://github.com/SyncfusionExamples/ej2-angular-scheduler-with-firebase.git`
2. Install dependencies: `npm install`
3. Firebase Configuration:

- Create a new Firebase project at https://console.firebase.google.com/
- Enable Firestore in your Firebase project
- In the Firebase console, go to Project Settings and copy your web app's Firebase configuration
- Open `src/main.ts` and replace the `firebaseConfig` object with your configuration:

  ```typescript
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };
  ```

4. Firestore Setup:
- In the Firebase console, go to Firestore Database
- Create two collections: `Data` and `ResourceData`
- The `Data` collection will store scheduler events
- The `ResourceData` collection will store resource information for the scheduler

## Running the Application

1. Start the development server: `ng serve`