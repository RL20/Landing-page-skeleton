const form = document.querySelector("form");
const message = document.querySelector(".message");
// const Email = require("./server");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target.email.value;

  try {
    console.log("gggggggggggggg");
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.success) {
      message.innerText = "Thanks for subscribing!";
      message.style.color = "#4CAF50";
    } else {
      message.innerText = "Oops, something went wrong. Please try again later.";
      message.style.color = "#f44336";
    }
  } catch (error) {
    console.error(error);
    message.innerText = "Oops, something went wrong. Please try again later.";
    message.style.color = "#f44336";
  }
});
