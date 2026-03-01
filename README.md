# devfolio-pro
mine journey will showcase through mine workflow

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1c9FaJTOrBkaRnDwf1Uw7NteEipBGJFrt

## 🛠️ Tech Stack

This portfolio is built using a modern, performance-focused technology stack to ensure a seamless, interactive, and visually stunning user experience.

| Technology | Usage | Purpose & Necessity |
| :--- | :--- | :--- |
| **React 18** | Core Framework | Used for building the component-based UI. Its virtual DOM ensures efficient updates, and the ecosystem provides vast libraries for faster development. React 18's concurrent features improve responsiveness. |
| **TypeScript** | Language | Provides static typing to catch errors during development, improving code quality and maintainability. Essential for a robust and scalable codebase. |
| **Vite** | Build Tool | A blazing fast build tool that offers instant server start and hot module replacement (HMR). It significantly reduces development time compared to traditional bundlers like Webpack. |
| **Tailwind CSS** | Styling | A utility-first CSS framework that allows for rapid UI development directly in the markup. It ensures consistent design tokens and small bundle sizes by purging unused styles. |
| **Framer Motion** | Animations | Used for complex animations and page transitions. It provides a simple API for declarative animations, essential for the "futuristic" feel of the portfolio. |
| **Three.js / R3F** | 3D Graphics | Powers the immersive 3D background elements and effects. `react-three-fiber` is used to declaratively render Three.js scenes within the React component tree. |
| **Lucide React** | Icons | A consistent and lightweight icon set. Used to enhance UI elements without adding significant weight to the bundle. |
| **Google Gen AI** | AI Features | Powers the interactive AI chatbot assistant, allowing visitors to ask questions about the portfolio owner. Adds a unique, cutting-edge interactive element. |

## 🚀 How to Run Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher)
- **npm** (usually comes with Node.js)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devfolio-pro.git
   cd devfolio-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Configuration

1. **Set up Environment Variables**
   - Create a file named `.env.local` in the root directory (if it doesn't exist).
   - Add your Gemini API key:
     ```env
     GEMINI_API_KEY=your_actual_api_key_here
     ```
     > **Note:** You can get your API key from [Google AI Studio](https://aistudio.google.com/).

### Running the Application

1. **Start the Development Server**
   ```bash
   npm run dev
   ```
   open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

2. **Build for Production**
   To create a production-ready build:
   ```bash
   npm run build
   ```

3. **Preview Production Build**
   To check the production build locally:
   ```bash
   npm run preview
   ```
