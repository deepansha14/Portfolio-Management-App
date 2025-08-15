// This is a test script to verify the login functionality
// You can run it in the browser console after loading the login page

function testLoginPage() {
  console.log("Testing login page functionality");

  // Check if we're on the login page
  if (!window.location.pathname.includes("login")) {
    console.error("Not on the login page. Please navigate there first.");
    return;
  }

  // Check if the role is correctly stored in session storage
  const roleInStorage = sessionStorage.getItem("selectedRole");
  console.log("Role in session storage:", roleInStorage);

  // Check if the LoginForm component is rendered
  const loginForm = document.querySelector("form");
  if (!loginForm) {
    console.error("Login form not found on the page.");
    return;
  }

  console.log("Login form found on page.");

  // Test login functionality with test credentials
  // For demo purposes only - real app should use secure authentication
  if (roleInStorage === "admin") {
    console.log(
      "Using admin test credentials: advisor@portfoliomanager.com / admin123"
    );
  } else {
    console.log(
      "Using investor test credentials: investor@example.com / demo123"
    );
  }

  console.log(
    "Login test complete. You can now manually submit the form with the credentials above."
  );
}

// Run the test
testLoginPage();
