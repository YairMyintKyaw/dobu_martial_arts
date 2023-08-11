const form = document.querySelector("form");
const inputs = [
  ...document.querySelectorAll("form input"),
  ...document.querySelectorAll("form select"),
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userRegisteration = { id: Date.now() };
  inputs.forEach((input) => {
    userRegisteration[input.name] = input.value;
  });
  addUserDataToLocalStorage(userRegisteration);
  location.href = `Thankyou.html`;
});

function addUserDataToLocalStorage(userObj) {
  //already has data in localstorage then update it other create new one
  var users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    users.push(userObj);

    localStorage.setItem("userData", JSON.stringify(users));
  } else {
    var userData = new Array();
    userData.push(userObj);
    localStorage.setItem("userData", JSON.stringify(userData));
  }
}
