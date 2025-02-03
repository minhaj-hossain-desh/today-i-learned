// 🌟 Importing Required Modules
import "./style.css";
import { useState, useEffect } from "react";
import supabase from "./supabase"; // Supabase for backend database

// 🌟 Initial Facts (Hardcoded Data)
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly Facebook).",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%.",
    source: "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal.",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// 🌟 Functional Component: Counter (For Testing React State)
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

// 🌟 Main App Component
function App() {
  const [showForm, setShowForm] = useState(false); // Controls fact form visibility
  const [facts, setFacts] = useState([]); // Stores facts
  const [isLoading, setIsLoading] = useState(false); // Loading state for fetching
  const [currentCategory, setCurrentCategory] = useState("all"); // Stores selected category

  // 🌟 Fetch Facts from Supabase (Runs on Category Change)
  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      let query = supabase.from("facts").select("*");

      if (currentCategory !== "all") query = query.eq("category", currentCategory);

      const { data: facts, error } = await query.limit(1000);
      setFacts(facts);
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm && <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} />}
      </main>
    </>
  );
}

// 🌟 Loader Component (Displays While Fetching Data)
function Loader() {
  return <p className="message">Loading....</p>;
}

// 🌟 Header Component (Includes Logo and Form Toggle Button)
function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>
      <button className="btn btn_large btn-open" onClick={() => setShowForm((show) => !show)}>
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

// 🌟 Category List with Colors
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// 🌟 Helper Function: Validate URL
function isValidHttpUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// 🌟 Fact Component (Handles Displaying a Single Fact)
function Fact({ fact, setFacts }) {
  // Check if the fact is disputed (More "false" votes than total positive votes)
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  // 🌟 Handle Voting Logic
  async function handleVote(columnName) {
    const { data: updatedFact } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();

    setFacts((facts) =>
      facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
    );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed && <span className="disputed">[⛔️ DISPUTED]</span>} {fact.text}
        <a className="source" href={fact.source} target="_blank" rel="noopener noreferrer">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{ backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category).color }}
      >
        {fact.category}
      </span>
      <div className="vote_buttons">
        <button onClick={() => handleVote("votesInteresting")}>👍 {fact.votesInteresting}</button>
        <button onClick={() => handleVote("votesMindblowing")}>🤯 {fact.votesMindblowing}</button>
        <button onClick={() => handleVote("votesFalse")}>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

// 🌟 New Fact Form Component
function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();

    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      setIsUploading(true);
      const { data: newFact } = await supabase.from("facts").insert([{ text, source, category }]).select();
      setIsUploading(false);
      setFacts((facts) => [newFact[0], ...facts]);
      setText("");
      setSource("");
      setCategory("");
      setShowForm(false);
    }
  }

  return (
    <form className="fact_form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Share a fact..." value={text} onChange={(e) => setText(e.target.value)} disabled={isUploading} />
      <span>{200 - textLength}</span>
      <input type="text" placeholder="Trustworthy source..." value={source} onChange={(e) => setSource(e.target.value)} disabled={isUploading} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn_large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

// 🌟 Category Filter Component
function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li>
          <button className="btn btn_large_categories" onClick={() => setCurrentCategory("all")}>
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button className="btn btn_category" style={{ backgroundColor: cat.color }} onClick={() => setCurrentCategory(cat.name)}>
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// 🌟 Fact List Component
function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return <p className="message">No facts for this category yet! Maybe create the first one?</p>;
  }
  return (
    <section>
      <ul className="facts-list">{facts.map((fact) => <Fact key={fact.id} fact={fact} setFacts={setFacts} />)}</ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

export default App;
