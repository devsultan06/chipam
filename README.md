# ![Chipam Logo](frontend/public/icon.svg)
# Chipam

**No more drama over who paid.** Chipam is a premium, student-focused financial tool designed to simplify group contributions. Whether it's departmental dues, birthday pools, or hostel house expenses, Chipam handles the collection, tracking, and reminders so you don't have to be the "bad guy."


## Features

- **Instant Collection Links:** Create a contribution and get a shareable link in seconds. No account required for members to pay.
- **Paystack Integrated:** Secure payments via Card, Bank Transfer, or USSD—optimized for the Nigerian market.
- **Live Ledger:** A premium, real-time dashboard showing exactly who has paid, who is pending, and total progress.
- **Automated Reminders:** Stop chasing people on WhatsApp. Send automated, professional reminders with one click.
- **Premium UI/UX:** A high-end, clean aesthetic with a strict 10px design language, Syne typography, and buttery-smooth Framer Motion transitions.

## Tech Stack

### Frontend

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (Custom Design System)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Typography:** Syne & Inter

### Backend

- **Framework:** Node.js / Express
- **Database:** PostgreSQL (Prisma ORM)
- **Authentication:** JWT with secure cookie storage
- **Payments:** Paystack API Integration
- **Logging:** Pino / Pino-HTTP

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL instance
- Paystack Secret Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/chipam.git
   cd chipam
   ```

2. **Setup Frontend:**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Backend:**
   ```bash
   cd ../backend
   npm install
   # Create a .env file with DATABASE_URL, JWT_SECRET, and PAYSTACK_SECRET_KEY
   npm run dev
   ```

## Design Philosophy

Chipam follows a **"Premium Flat"** design language:

- **Corner Radius:** Strict `10px` across all cards, buttons, and inputs.
- **Color Palette:**
  - `Primary Green:` #1A7A4A
  - `Lime Accent:` #C8F275
  - `Background:` #F7F5EF (Soft Off-white)
- **Typography:** No defaults. We use **Syne** for headlines to give a bold, modern character and **Inter** for legible data.
- **Surface:** Flat surfaces with subtle 1px borders instead of heavy drop shadows.

## 📬 Support

Issues? Contact us at `hello@chipam.com` or chat with us on WhatsApp at `+234 800 CHIPAM`.

---

Built with 💚 for Nigerian students.
