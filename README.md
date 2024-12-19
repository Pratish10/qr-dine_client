# QR Dine - Client Application

## Overview

**QR Dine - Client** is the customer-facing side of the QR Dine platform, where customers can seamlessly scan QR codes at restaurant tables to view
menus, place orders, and interact with restaurant services directly from their mobile devices.

This client application is designed to enhance the customer dining experience by allowing them to easily browse menus and order food without the need
to wait for a server.

## Features

### For Customers

- **QR Code Scanning**: Customers can scan a unique QR code placed on the table to access the restaurant’s menu.
- **Browse the Menu**: View the restaurant’s offerings, including categories like appetizers, main courses, desserts, etc.
- **Place Orders**: Add items to the cart and submit the order directly from the mobile device.
- **Real-Time Order Confirmation**: Receive real-time updates on the status of the order placed.

## Installation

### Prerequisites

- **Node.js** (for Next.js application)
- **Admin Application**: The client application requires the admin application to be running locally, as it pulls data from the admin's backend (such
  as menus, tables, and orders).

> [!NOTE]  
> This project uses [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) only as a package manager.

1. Clone the repository:

```bash
git clone https://github.com/Pratish10/qr-dine.git
```

2. Navigate to the project directory:

```bash
cd qr-dine
```

3. Create a .env file:

```bash
Copy `.env.example` and rename it to `.env`.
```

4. Install dependencies:

```bash
yarn install
```

5. Set up the backend (Admin Application):

Since the client application fetches menu and table data from the admin backend, you need to run the admin application locally.

Follow the instructions from the [Admin Application README](https://github.com/Pratish10/qr-dine?tab=readme-ov-file#readme) to run the admin
application locally. Ensure the admin application is running at http://localhost:3000 (or update the .env file in the client app if it's running on a
different port).

6. Start the development server:

```bash
yarn dev
```
