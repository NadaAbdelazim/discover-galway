function filterExperiences() {
  var category = document.getElementById("categoryFilter").value;
  var priceRange = document.getElementById("priceFilter").value;
  var cards = document.getElementsByClassName("card");
  var count = 0;

  for (var i = 0; i < cards.length; i++) {
    var cardCategory = cards[i].getAttribute("data-category");
    var price = Number(cards[i].getAttribute("data-price"));
    var categoryMatches = category === "all" || category === cardCategory;
    var priceMatches = priceRange === "all";

    if (priceRange === "under50" && price < 50) {
      priceMatches = true;
    }
    if (priceRange === "50to100" && price >= 50 && price <= 100) {
      priceMatches = true;
    }
    if (priceRange === "over100" && price > 100) {
      priceMatches = true;
    }

    if (categoryMatches && priceMatches) {
      cards[i].style.display = "block";
      count++;
    } else {
      cards[i].style.display = "none";
    }
  }
  document.getElementById("resultsCount").textContent = "Showing " + count + " experiences.";
}

function updateChecklist() {
  var packed = document.querySelectorAll(".packing-item:checked").length;
  document.getElementById("packingStatus").textContent = packed + " of 3 items packed.";
}

// form validation
function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var queryType = document.getElementById("queryType").value;
  var message = document.getElementById("message").value.trim();
  var response = document.getElementById("formResponse");
  var error = "";
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^\+?[0-9\s()-]+$/;
  var phoneDigits = phone.replace(/\D/g, "");

  if (name === "" || email === "" || phone === "" || queryType === "" || message === "") {
    error = "Please complete all fields.";
  } else if (!emailPattern.test(email)) {
    error = "Please enter a valid email address.";
  } else if (!phonePattern.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    error = "Please enter a valid phone number with 7 to 15 digits.";
  } else if (message.length < 20) {
    error = "Please enter a message with at least 20 characters.";
  }

  if (error !== "") {
    response.className = "error";
    response.textContent = error;
  } else {
    response.className = "success";
    response.textContent = "Thank you, " + name + ". Your enquiry details are valid. This practice form does not send them.";
  }
  return false;
}