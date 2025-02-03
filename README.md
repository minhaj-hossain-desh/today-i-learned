# 🌟 Today I Learned

**Today I Learned** is a web application that allows users to **share interesting facts**, categorize them, and vote on them.  
The project has two versions:
1. **Version 1 (`v1/`)**: A **vanilla JavaScript** version.
2. **Version 2 (`v2/`)**: A **React-powered version** with better performance and UI/UX improvements.

🚀 **Live Demo**:  
🔗 **[Try it here](https://today-i-learned-minhaj.netlify.app/)**

---

## 🚀 Features
- 📝 **Post Interesting Facts**: Users can submit facts with a **trustworthy source**.
- 🗂️ **Categorization**: Facts are grouped under **Technology, Science, Finance, Society, and more**.
- 👍 **Voting System**: Users can vote facts as **Interesting (`👍`)**, **Mind-Blowing (`🤯`)**, or **False (`⛔`)**.
- 🌐 **Version 2 Uses React**: Improved interactivity and performance.
- 🔄 **Data Persistence**: Facts are stored in **Supabase** and fetched dynamically.

---

## 🔄 **Differences Between v1 (Vanilla JS) & v2 (React)**
| Feature                 | v1 (Vanilla JavaScript) | v2 (React) |
|-------------------------|------------------------|------------|
| 🏗 **Architecture**      | DOM Manipulation       | React Components |
| ⚡ **Performance**      | Re-renders entire page | Only updates changed components |
| 🎨 **UI Updates**       | Manual event listeners | React state (`useState`, `useEffect`) |
| 📦 **Data Handling**    | Basic Fetch API       | Supabase + Dynamic Queries |
| 🔄 **State Management** | None                   | `useState`, `useEffect` |
