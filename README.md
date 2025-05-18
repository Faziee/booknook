# Fazie's BookNook - Your Personal Reading Tracker 📚

![Deployed on Vercel](https://booknook-six.vercel.app/)

A modern book tracking website built with Next.js that helps you manage your reading journey. Track books you want to read (TBR), record books you've completed, and discover new reads.

![BookNook Screenshot](/public/homepage.png)

## Features ✨

### Reading Management
- **To-Be-Read (TBR) List**: Track books you plan to read
- **Read Books**: Maintain a history of completed reads
- **Reading Stats**: View your reading progress and history

### Reading Journal
- **Rating System**: 1-5 star ratings for completed books
- **Review Notes**: Record your thoughts and impressions
- **Reading Dates**: Track when you finished each book

### Book Discovery
- **Google Books API Integration**: Search millions of titles
- **Genre Filtering**: Find books by your preferred genres
- **Random Book Generator**: Get surprise recommendations

## Tech Stack ⚙️

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **API**: [Google Books API](https://developers.google.com/books)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started 🚀

### Prerequisites
- Node.js (v18 or later)
- npm/yarn/pnpm
- Google Books API key (optional)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/Faziee/booknook.git
   cd booknook
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Create environment file**
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in your browser**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---