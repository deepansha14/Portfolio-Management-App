# Portfolio Management App

A comprehensive portfolio management application built with Next.js, TypeScript, and AWS DynamoDB.

## Features

- **User Authentication**: Secure login/registration with OTP verification
- **Role-based Access**: Admin and Investor dashboards
- **Investor Profile Management**: Multi-step form for collecting investor information
- **Portfolio Tracking**: Monitor investments and performance
- **Admin Dashboard**: Overview of all investors and market trends

## Architecture

### DynamoDB Tables

#### 1. Users Table (`DYNAMO_USER_TABLE_NAME`)
- **Primary Key**: `userId` (String)
- **Attributes**:
  - `email` (String)
  - `name` (String)
  - `password` (String) - hashed
  - `userType` (String)
  - `createdAt` (String)
  - `isActive` (Boolean)
  - `otp` (String) - for temporary OTP storage
  - `otpExpires` (Number) - for OTP expiration
  - `otpType` (String) - for OTP type identification
  - `isTempUser` (Boolean) - to identify temporary OTP records

#### 2. Investor Details Table (`DYNAMO_INVESTOR_TABLE_NAME`)
- **Primary Key**: `userId` (String) - same as Users table
- **Attributes**:
  - `personalInfo` (String) - JSON stringified personal information
  - `familyDetails` (String) - JSON stringified family information
  - `nomineeInvestment` (String) - JSON stringified nominee details
  - `incomeDetails` (String) - JSON stringified income information
  - `expenses` (String) - JSON stringified expense details
  - `residual` (String) - JSON stringified residual income
  - `investments` (String) - JSON stringified investment preferences
  - `bonuses` (String) - JSON stringified bonus information
  - `existingAssets` (String) - JSON stringified existing assets
  - `createdAt` (String) - record creation timestamp
  - `updatedAt` (String) - record update timestamp
  - `status` (String) - application status

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# DynamoDB Tables
DYNAMO_USER_TABLE_NAME=Users
DYNAMO_INVESTOR_TABLE_NAME=Investor-details

# JWT Secrets
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# Email Service (Brevo)
BREVO_API_KEY=your_brevo_api_key

# Firebase (optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

## Data Flow

### Registration Process
1. User fills registration form → clicks "Send OTP"
2. System generates temporary userId → stores OTP in DynamoDB Users table
3. User receives email → enters OTP
4. System verifies OTP → from DynamoDB Users table
5. After verification → OTP deleted, user record created with real userId
6. User redirected to investor info form with userId parameter

### Investor Data Collection
1. User completes multi-step investor form
2. Data saved to DynamoDB Investor Details table using same userId
3. Requirement details are excluded as per business logic
4. User redirected to dashboard upon successful submission

## Installation

```bash
npm install
npm run dev
```

## API Endpoints

- `POST /api/send-otp` - Send OTP for registration
- `POST /api/verify-otp` - Verify OTP
- `POST /api/register` - Create user account
- `POST /api/auth/login` - User login
- `POST /api/investor/save-details` - Save investor information

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Secure HTTP-only cookies
- OTP-based email verification
- Input validation and sanitization
