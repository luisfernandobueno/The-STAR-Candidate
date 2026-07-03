const formatCommands = {
    bold: "bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "strikeThrough"
};

let activeHighlight = null;

function formatText(command) {
    document.execCommand(command, false, null);
    updateToolbar();
}

function highlightText(color, button) {

    if (activeHighlight === button) {
        document.execCommand("hiliteColor", false, "transparent");
        activeHighlight = null;
    } else {
        document.execCommand("hiliteColor", false, color);
        activeHighlight = button;
    }

    updateToolbar();
}

function removeHighlight() {
    document.execCommand("hiliteColor", false, "transparent");
    activeHighlight = null;
    updateToolbar();
}

function updateToolbar() {

    // ---------- Formatting buttons ----------
    document.querySelectorAll(".circleButton").forEach(button => {

        button.classList.remove("active-button");

        const onclick = button.getAttribute("onclick");

        for (const key in formatCommands) {

            if (onclick.includes(key)) {

                if (document.queryCommandState(formatCommands[key])) {
                    button.classList.add("active-button");
                }

                break;
            }
        }

    });

    // ---------- Highlight buttons ----------
    document.querySelectorAll(".highlight-button").forEach(button => {
        button.classList.remove("active-button");
    });

    if (activeHighlight) {
        activeHighlight.classList.add("active-button");
    }

    // ---------- Eraser ----------
    const eraser = document.querySelector(".removeStyle");

    if (activeHighlight === null) {
        eraser.classList.add("active-button");
    } else {
        eraser.classList.remove("active-button");
    }
}

document.addEventListener("selectionchange", updateToolbar);
document.addEventListener("mouseup", updateToolbar);
document.addEventListener("keyup", updateToolbar);

updateToolbar();