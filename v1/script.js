// 🌟 Categories Data (Used for Color Mapping)
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" }
];

// 🌟 Example Facts (Initial Data)
const initialFacts = [
  {
      id: 1,
      text: "React is being developed by Meta (formerly Facebook).",
      source: "https://opensource.fb.com/",
      category: "technology",
      votesInteresting: 24,
      votesMindblowing: 9,
      votesFalse: 4,
      createdIn: 2021
  },
  {
      id: 2,
      text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%.",
      source: "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
      category: "society",
      votesInteresting: 11,
      votesMindblowing: 2,
      votesFalse: 0,
      createdIn: 2019
  },
  {
      id: 3,
      text: "Lisbon is the capital of Portugal.",
      source: "https://en.wikipedia.org/wiki/Lisbon",
      category: "society",
      votesInteresting: 8,
      votesMindblowing: 3,
      votesFalse: 1,
      createdIn: 2015
  }
];

// 🌟 Selecting DOM Elements
const btn = document.querySelector(".btn-open"); 
const form = document.querySelector(".fact_form");
const factsList = document.querySelector(".facts-list");

// 🌟 Create DOM Elements: Render Facts in List
factsList.innerHTML = "";

// 🌟 Load Data from Supabase
loadFacts();

async function loadFacts() {
  const res = await fetch("https://eplvslaknoesemxzgimf.supabase.co/rest/v1/facts", {
      headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbHZzbGFrbm9lc2VteHpnaW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDg3NTQsImV4cCI6MjA1MjYyNDc1NH0.oC0J_kvwqJ0JprCqmZKCy0U1TU_3J2dw8Jl80NW0SKk",
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbHZzbGFrbm9lc2VteHpnaW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDg3NTQsImV4cCI6MjA1MjYyNDc1NH0.oC0J_kvwqJ0JprCqmZKCy0U1TU_3J2dw8Jl80NW0SKk"
      }
  });

  const data = await res.json();
  createFactsList(data);
}

// 🌟 Function to Render Facts in List
function createFactsList(dataArray) {
  // Generate fact elements
  const htmlArr = dataArray.map(fact => `
      <li class="fact">
          <p>${fact.text} 
              <a class="source" href="${fact.source}" target="_blank" rel="noopener noreferrer">(Source)</a>
          </p>
          <span class="tag" style="background-color: ${getCategoryColor(fact.category)}">
              ${fact.category}
          </span>
          <div class="vote_buttons">
              <button>👍 ${fact.votesInteresting}</button>
              <button>🤯 ${fact.votesMindblowing}</button>
              <button>⛔️ ${fact.votesFalse}</button>
          </div>
      </li>
  `);

  // Insert generated HTML into the list
  factsList.insertAdjacentHTML("afterbegin", htmlArr.join(""));
}

// 🌟 Helper Function: Get Category Color
function getCategoryColor(categoryName) {
  const category = CATEGORIES.find(cat => cat.name === categoryName);
  return category ? category.color : "#ccc"; // Default color if category not found
}

// 🌟 Toggle Form Visibility on Button Click
btn.addEventListener('click', () => {
  form.classList.toggle("hidden");
  btn.textContent = form.classList.contains("hidden") ? "Share a fact" : "Close";
});
