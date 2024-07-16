import React from "react";

import "./Contact.css";

function Contact() {
  const submitHandler = (e) => {
    e.preventDefault();

    // Get the form data from the event object
    const form = e.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;

    // Define the Google Form URL and form data
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSfhbCLjhzxs1Jx4lRK9JxydL8YWLZtxPSp_RnNViEos_pDfDA/formResponse";
    const formData = {
      "entry.1455858768": name,
      "entry.1161861206": email,
      "entry.1264184915": message,
    };

    // Construct the URL with the form data
    let url = formUrl + "?submit=Submit";
    for (let key in formData) {
      url +=
        "&" + encodeURIComponent(key) + "=" + encodeURIComponent(formData[key]);
    }

    // Send a POST request to the URL
    fetch(url, {
      method: "POST",
      mode: "no-cors",
    })
      .then(function (response) {
        console.log("Form submission successful!");
        form.reset();

        const submitBtn = form.querySelector(".submit-btn");
        submitBtn.innerHTML = "&#10003; SENT";
        submitBtn.classList.add("success");

        setTimeout(() => {
          submitBtn.classList.remove("success");
          submitBtn.innerHTML = "SEND";
        }, 2000);
      })
      .catch(function (error) {
        console.error("Form submission failed:", error);
      });
  };

  return (
    <div className="Contact">
      <h1 className="section-header">Get In Touch</h1>
      <form action="" method="post" onsubmit={submitHandler}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="NAME"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="EMAIL"
            required
          />
        </div>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="3"
          placeholder="MESSAGE"
          required
        ></textarea>
        <input type="submit" value="SEND" class="submit-btn" />
      </form>
    </div>
  );
}

export default Contact;
