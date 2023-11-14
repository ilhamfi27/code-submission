# Chat Application

## Answers

### Date Submission

November 14 2023

### Time Spent

Around 14 hours

### Assumptions made

1. User Registration: Users begin by visiting the platform's registration page, where they provide essential information such as a unique username, a valid email address, and a secure password.
   The registration process may also include additional steps like email verification or captcha to enhance security and confirm the user's identity.
2. User Authentication: Once registered, users can log in using their chosen username and password. The system verifies this information against the stored credentials in the database to authenticate the user.
   To enhance security, multi-factor authentication methods, such as email or SMS verification, may be implemented to add an extra layer of protection.
3. Chat Initialization: To start a new chat, users typically navigate to a chat interface or a dedicated section within the platform.
   They may have the option to search for specific users by username or browse through a list of available users based on shared interests, preferences, or other criteria.
4. Messaging Features: The chat interface allows users to send and receive messages in real-time. It may support various multimedia elements such as images, videos, and emojis to enrich the communication experience.
   Additional features like read receipts, typing indicators, and message timestamps contribute to a more interactive and engaging conversation.
5. Notification System: A notification system informs users about new messages or chat requests, ensuring they are promptly aware of any incoming communication.
   Users may have the option to customize their notification preferences based on their activity and availability.

### What key steps would you take to ensure application security?

The chats should have encryption and the one can open the encryption is the sender and the target of the chat. The key should not be sent to another person.

# Application Setup Guide

This Application is a web application with two main sections: the backend and the frontend. Follow the instructions below to set up and run both sides of the application.

## Backend Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Yarn](https://yarnpkg.com/) package manager installed
- [Docker](https://www.docker.com/) installed

### Steps

1. Open a terminal and navigate to the `backend` directory.

2. Run the following commands to set up and start the backend application:

   ```bash
   yarn install
   yarn docker-compose build chatapp
   yarn docker-compose up -d
   ```

3. The backend application will now be running on [http://localhost:8000](http://localhost:8000). You can access the API documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

## Frontend Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Yarn](https://yarnpkg.com/) package manager installed

### Steps

1. Open a new terminal window and navigate to the `frontend` directory.

2. Run the following commands to set up and start the frontend application:

   ```bash
   yarn install
   yarn dev
   ```

3. The frontend application will now be running, and you can access it at [http://localhost:3000](http://localhost:3000).

Congratulations! You have successfully set up and run both the backend and frontend sides of the MyApp application. If you encounter any issues or have questions, please refer to the documentation or reach out to our support team.
