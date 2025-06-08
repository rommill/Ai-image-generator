const form = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const galleryGrid = document.querySelector(".gallery-grid");
const themeToggleBtn = document.querySelector(".theme-toggle");

const randomPrompts = [
    "A cyberpunk city at night with neon lights",
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
    "A surreal forest made of glass",
    "A steampunk dragon flying over mountains",
    "An astronaut riding a horse on Mars",
    "A futuristic Tokyo street during a thunderstorm"
];

// Toggle dark theme
themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");

    themeToggleBtn.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
});


// Set random prompt
document.querySelector(".prompt-btn").addEventListener("click", () => {
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    promptInput.value = randomPrompt;
});

// Simulate image generation
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = promptInput.value.trim();
    const model = modelSelect.value;
    const count = parseInt(countSelect.value);
    const ratio = ratioSelect.value;

    if (!prompt || !model || !count || !ratio) return;

    // Clear previous images
    galleryGrid.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const card = document.createElement("div");
        card.className = "img-card loading";
        card.innerHTML = `
            <div class="status-container">
                <div class="spinner"></div>
                <p class="status-text">Generating Image...</p>
            </div>
        `;
        galleryGrid.appendChild(card);

        try {
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

            // Dummy image for now (you can later replace with real API)
            const img = document.createElement("img");
            img.className = "result-img";
            img.src = `https://picsum.photos/seed/${Date.now() + i}/400/400`;
            img.alt = prompt;

            const overlay = document.createElement("div");
            overlay.className = "img-overlay";
            overlay.innerHTML = `
                <button class="img-download-btn">
                    <i class="fa-solid fa-download"></i>
                </button>
            `;

            const downloadBtn = overlay.querySelector(".img-download-btn");
            downloadBtn.addEventListener("click", () => {
                const a = document.createElement("a");
                a.href = img.src;
                a.download = `generated-image-${i + 1}.jpg`;
                a.click();
            });

            card.classList.remove("loading");
            card.appendChild(img);
            card.appendChild(overlay);
        } catch (err) {
            card.classList.remove("loading");
            card.classList.add("error");
            card.innerHTML = `
                <div class="status-container">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                    <p class="status-text">Failed to generate</p>
                </div>
            `;
        }
    }
});
