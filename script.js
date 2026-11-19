function filterExperiences() {
  var category = document.getElementById("categoryFilter").value;
  var priceRange = document.getElementById("priceFilter").value;
  var cards = document.querySelectorAll("#experienceList .col");
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

// Show a specific error near each invalid field.
function showFieldError(id, message) {
  var input = document.getElementById(id);
  var error = document.getElementById(id + "Error");
  input.classList.toggle("is-invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
  error.textContent = message;
}

function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var queryType = document.getElementById("queryType").value;
  var message = document.getElementById("message").value.trim();
  var response = document.getElementById("formResponse");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^\+?[0-9\s()-]+$/;
  var digits = phone.replace(/\D/g, "");
  var errors = {
    name: name ? "" : "Please enter your name.",
    email: !email ? "Please enter your email address." : (!emailPattern.test(email) ? "Please enter a valid email address." : ""),
    phone: !phone ? "Please enter a phone number." : (!phonePattern.test(phone) || digits.length < 7 || digits.length > 15 ? "Enter a valid phone number with 7 to 15 digits." : ""),
    queryType: queryType ? "" : "Please choose a query type.",
    message: !message ? "Please enter a message." : (message.length < 20 ? "Please write at least 20 characters." : "")
  };
  var firstInvalid = "";
  for (var id in errors) {
    showFieldError(id, errors[id]);
    if (!firstInvalid && errors[id]) { firstInvalid = id; }
  }
  if (firstInvalid) {
    response.className = "error mt-3";
    response.textContent = "Please correct the highlighted fields.";
    document.getElementById(firstInvalid).focus();
  } else {
    response.className = "success mt-3";
    response.textContent = "Thank you, " + name + ". Your enquiry details are valid. This practice form does not send them.";
  }
  return false;
}

// Calculate an estimated holiday cost from the visitor's inputs.
function calculateBudget(event) {
  event.preventDefault();
  var ids = ["travellers", "days", "rooms", "accommodation", "food", "activities", "transport"];
  var values = {};
  var error = document.getElementById("budgetError");
  var result = document.getElementById("budgetResult");
  error.textContent = "";
  result.hidden = true;
  for (var i = 0; i < ids.length; i++) {
    var field = document.getElementById(ids[i]);
    var value = Number(field.value);
    if (field.value.trim() === "" || !field.checkValidity() || !Number.isFinite(value)) {
      error.textContent = "Please enter valid numbers in every budget field.";
      field.focus();
      return;
    }
    values[ids[i]] = value;
  }
  var nights = Math.max(0, values.days - 1);
  var stay = nights * values.rooms * values.accommodation;
  var meals = values.travellers * values.days * values.food;
  var activities = values.travellers * values.days * values.activities;
  var travel = values.travellers * values.transport;
  var total = stay + meals + activities + travel;
  function euros(amount) { return amount.toLocaleString("en-IE", {style: "currency", currency: "EUR"}); }
  document.getElementById("budgetBreakdown").textContent = "Accommodation: " + euros(stay) + " | Food: " + euros(meals) + " | Activities: " + euros(activities) + " | Transport: " + euros(travel);
  document.getElementById("budgetTotal").textContent = "Total estimated cost: " + euros(total);
  document.getElementById("budgetPerPerson").textContent = "Estimated cost per person: " + euros(total / values.travellers);
  result.hidden = false;
}

// Only register the calculator on Plan Your Trip.
var budgetForm = document.getElementById("budgetForm");
if (budgetForm) {
  budgetForm.addEventListener("submit", calculateBudget);
  budgetForm.addEventListener("reset", function () {
    document.getElementById("budgetError").textContent = "";
    document.getElementById("budgetResult").hidden = true;
  });
}
