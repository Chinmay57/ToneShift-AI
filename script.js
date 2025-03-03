async function summarizeArticle() {
    const articleUrl = document.getElementById("articleUrl").value;
    const summaryTitle = document.getElementById("summaryTitle");
    const summaryText = document.getElementById("summaryText");

    if (!articleUrl) {
        alert("Please enter a valid article link.");
        return;
    }

    // Show loading state
    summaryTitle.innerText = "Fetching summary...";
    summaryText.innerText = "Please wait...";

    try {
        const response = await fetch("/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: articleUrl }) // Send URL as JSON
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            summaryTitle.innerText = "Summary Error";
            summaryText.innerText = "Failed to retrieve the summary.";
            return;
        }

        summaryTitle.innerText = data.title;
        summaryText.innerText = data.summary;
    } catch (error) {
        console.error("Error fetching summary:", error);
        alert("Failed to summarize the article. Please try again.");
        summaryTitle.innerText = "Summary Error";
        summaryText.innerText = "An error occurred while fetching the summary.";
    }
}

async function shiftTone() {
    const selectedTone = document.querySelector('input[name="tone"]:checked')?.value;
    const currentSummary = document.getElementById("summaryText").innerText;
    const summaryTitle = document.getElementById("summaryTitle");

    if (!currentSummary || currentSummary === "Please wait..." || currentSummary === "Summary will appear here...") {
        alert("Please summarize an article first.");
        return;
    }

    if (!selectedTone) {
        alert("Please select a tone.");
        return;
    }

    // Show loading state
    summaryTitle.innerText = "Shifting tone...";
    document.getElementById("summaryText").innerText = "Please wait...";

    try {
        const response = await fetch("/shift-tone", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tone: selectedTone, summary: currentSummary }) // Ensure JSON format is correct
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            summaryTitle.innerText = "Tone Shift Error";
            summaryText.innerText = "Failed to shift the tone.";
            return;
        }

        summaryText.innerText = data.summary; // Fix key name to match Flask response
    } catch (error) {
        console.error("Error shifting tone:", error);
        alert("Failed to shift the tone. Please try again.");
        summaryTitle.innerText = "Tone Shift Error";
        summaryText.innerText = "An error occurred while shifting the tone.";
    }
}
