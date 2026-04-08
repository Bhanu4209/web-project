// ==========================
// ELEMENT SELECTORS
// ==========================
const themeToggle = document.querySelector(".theme-toggle");
const promptBtn = document.querySelector(".prompt-btn");
const promptInput = document.querySelector(".prompt_input");
const promptForm = document.querySelector(".prompt-form");

const modelSelect = document.querySelector(".model-select"); 
const countSelect = document.querySelector(".count-select"); 
const ratioSelect = document.querySelector(".ratio-select"); 

const gridGallery = document.querySelector(".gallery-grid");

// ⚠️ Replace with your own key (or backend)
const API_KEY = "YOUR_API_KEY_HERE";

// ==========================
// EXAMPLE PROMPTS
// ==========================
const examplePrompts = [
  "A magic forest with glowing plants and fairy homes",
  "A dragon sleeping on gold in a crystal cave",
  "A cyberpunk city with neon lights",
  "A floating island with waterfalls",
  "A robot painting in a sunny studio",
];

// ==========================
// THEME LOAD
// ==========================
(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPreferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkTheme = savedTheme === "dark" || (!savedTheme && systemPreferDark);
    document.body.classList.toggle("dark-theme", isDarkTheme);

    themeToggle.querySelector("i").className =
        isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

// ==========================
// TOGGLE THEME
// ==========================
const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle("dark-theme");

    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");

    themeToggle.querySelector("i").className =
        isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
};

// ==========================
// IMAGE SIZE BASED ON RATIO
// ==========================
const getImageDimensions = (aspectRatio) => {
    switch (aspectRatio) {
        case "16/9":
            return { width: 768, height: 432 };
        case "9/16":
            return { width: 432, height: 768 };
        default:
            return { width: 512, height: 512 };
    }
};

// ==========================
// CREATE LOADING CARDS
// ==========================
const createImageCards = (imageCount, aspectRatio) => {
    gridGallery.innerHTML = "";

    for (let i = 0; i < imageCount; i++) {
        gridGallery.innerHTML += `
        <div class="img-card loading" id="img-card-${i}" style="aspect-ratio:${aspectRatio}">
            <div class="status-container">
                <div class="spinner"></div>
                <p class="status-text">Generating...</p>
            </div>
            <img src="" class="result-img"/>
        </div>`;
    }
};

// ==========================
// GENERATE IMAGES (API)
// ==========================
const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
    const { width, height } = getImageDimensions(aspectRatio);

    const MODEL_URL = `https://api-inference.huggingface.co/models/${selectedModel}`;

    for (let i = 0; i < imageCount; i++) {
        try {
            const response = await fetch(MODEL_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: promptText,
                    parameters: { width, height }
                }),
            });

            const blob = await response.blob();
            const imgURL = URL.createObjectURL(blob);

            const imgCard = document.getElementById(`img-card-${i}`);
            const img = imgCard.querySelector(".result-img");

            img.src = imgURL;
            imgCard.classList.remove("loading");

        } catch (error) {
            console.error("Error:", error);
        }
    }
};

// ==========================
// FORM SUBMIT
// ==========================
const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedModel = modelSelect.value;
    const imageCount = parseInt(countSelect.value) || 1;
    const aspectRatio = ratioSelect.value || "1/1";
    const promptText = promptInput.value.trim();

    if (!promptText) return;

    createImageCards(imageCount, aspectRatio);

    generateImages(selectedModel, imageCount, aspectRatio, promptText);
};

// ==========================
// RANDOM PROMPT BUTTON
// ==========================
promptBtn.addEventListener("click", () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
});

// ==========================
// EVENT LISTENERS
// ==========================
promptForm.addEventListener("submit", handleFormSubmit);
themeToggle.addEventListener("click", toggleTheme);