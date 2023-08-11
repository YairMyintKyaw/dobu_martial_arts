bindUserData();
function addUserDataToLocalStorage(userObj) {
  //already has data in localstorage then update it other create new one
  let users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    users.push(userObj);

    localStorage.setItem("userData", JSON.stringify(users));
  } else {
    let userData = new Array();
    userData.push(userObj);
    localStorage.setItem("userData", JSON.stringify(userData));
  }
}

function updateDataToLocalStorage(userObj) {
  let users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    let updatedUser = users.map((user) =>
      user.id === userObj.id ? userObj : user
    );
    localStorage.setItem("userData", JSON.stringify(updatedUser));
  }
}

function deletedataFromLocalStorage(UserId) {
  let users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    users.splice(
      users.findIndex((a) => a.id === UserId),
      1
    );
    localStorage.setItem("userData", JSON.stringify(users));
  }
}

function addUser(e) {
  e.preventDefault();
  const txtname = document.getElementById("addName").value;
  const email = document.getElementById("addEmail").value;
  const gender = document.getElementById("gender").value;
  const membership = document.getElementById("membership").value;
  const martialArts = document.getElementById("martial-arts").value;
  if (!txtname) {
    alert("Please enter name!");
    return false;
  }

  if (!email) {
    alert("Please enter email!");
    return false;
  }
  const emailfilter =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailfilter.test(email)) {
    alert("Please enter a valid email address!");
    return false;
  }
  if (!gender) {
    alert("Please enter gender!");
    return false;
  }
  if (!membership) {
    alert("Please enter membership!");
    return false;
  }
  if (!martialArts) {
    alert("Please enter martial art!");
    return false;
  }

  const inputs = [
    ...document.querySelectorAll("tr input"),
    ...document.querySelectorAll("tr select"),
  ];
  const userRegisteration = { id: Date.now() };
  inputs.forEach((input) => {
    userRegisteration[input.name] = input.value;
  });

  addUserDataToLocalStorage(userRegisteration);
  document.getElementById("addName").value = "";
  document.getElementById("addEmail").value = "";
  bindUserData();
}

function bindUserData() {
  let users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    document.getElementById("tblbody").innerHTML = "";
    users.forEach(function (item, index) {
      let btnEditId = "btnedit" + item.id;
      let btnDeleteId = "btndelete" + item.id;
      let tableRow =
        "<tr Id='" +
        item.id +
        "'   data-CustomerID='" +
        item.id +
        "'   data-name='" +
        item.name +
        "' data-email='" +
        item.email +
        "' data-gender='" +
        item.gender +
        "' data-membership='" +
        item.membership +
        "' data-martial-arts='" +
        item["martial arts"] +
        "'>" +
        "<td class='td-data'>" +
        item.id +
        "</td>" +
        "<td class='td-data'>" +
        item.name +
        "</td>" +
        "<td class='td-data'>" +
        item.email +
        "</td>" +
        "<td class='td-data'>" +
        item.gender +
        "</td>" +
        "<td class='td-data'>" +
        item.membership +
        "</td>" +
        "<td class='td-data'>" +
        item["martial arts"] +
        "</td>" +
        "<td class='td-data'>" +
        "<button id='" +
        btnEditId +
        "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" +
        item.id +
        ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
        "<button id='" +
        btnDeleteId +
        "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(" +
        item.id +
        ")'><i class='fa fa-trash' aria-hidden='true'></i>Delete</button>" +
        "</td>" +
        "</tr>";
      document.getElementById("tblbody").innerHTML += tableRow;
    });
  }
  const AddRow = `
  <form onsubmit="addUser(event)" id="add-row-form">
  <tr>
        <td class='td-data'></td>
        <td class='td-data'><input  form="add-row-form" class="form-control" type='text' id='addName' placeholder='name..' name="name"></td> 
        <td class='td-data'><input  form="add-row-form" class="form-control" type='text' id='addEmail' placeholder='email..' name="email"></td>
        <td class='td-data'><select
        form="add-row-form"
                    name="gender"
                    
                    class="form-select"
                    name="gender"
                    id="gender"
                    aria-label="gender"
                    >
                    <option selected value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    </select></td>
        <td class='td-data'><select
        form="add-row-form"
                    name="membership"
                    
                    class="form-select"
                    id="membership"
                    name="membership"
                    aria-label="membership"
                    >
                    <option selected value="">Membership</option>
                    <option value="Basic Membership">Basic Membership</option>
                    <option value="Intermediate Membership">
                        Intermediate Membership
                    </option>
                    <option value="Advanced Membership">
                        Advanced Membership
                    </option>
                    <option value="Elite Membership">Elite Membership</option>
                    <option value="Junior Membership">Junior Membership</option>
                    </select></td>
        <td class='td-data'>
            <select
            form="add-row-form"
                name="martial arts"
                
                class="form-select"
                id="martial-arts"
                name="martial arts"
                aria-label="martial arts"
            >
                <option selected value="">Martial Art</option>
                <option value="Karate">Karate</option>
                <option value="Taekwondo">Taekwondo</option>
                <option value="Jiu-Jitsu">Jiu-Jitsu</option>
                <option value="Judo">Judo</option>
                <option value="Muay Thai">Muay Thai</option>
            </select></td>
        <td class='td-data'>
        <button id='btnaddCustomer' type="submit" form="add-row-form" class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>
        </td>
    </tr></form>`;
  document.getElementById("tblbody").innerHTML += AddRow;
}

function GetUserID() {
  const ID = Date.now();
  return ID;
}

function showEditRow(UserID) {
  let userRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
  let trdata = userRow.querySelectorAll(".td-data");
  /*returns array of all elements with
        "row-data" class within the row with given id*/
  let userID = trdata[0].innerHTML;
  let userName = trdata[1].innerHTML;
  let useremail = trdata[2].innerHTML;
  let userGender = trdata[3].innerHTML;
  let userMembership = trdata[4].innerHTML;
  let userMartialArts = trdata[5].innerHTML;

  trdata[0].innerHTML =
    '<input name="txtuserid" class="form-control"  disabled id="txtuserid" value="' +
    userID +
    '"/>';
  trdata[1].innerHTML =
    '<input name="txtname" class="form-control" id="txtname" value="' +
    userName +
    '"/>';
  trdata[2].innerHTML =
    '<input name="txtemail" class="form-control" id="txtemail" value="' +
    useremail +
    '"/>';

  trdata[3].innerHTML = `
  <select id="ddlgender" class="form-select">
    <option ${
      userGender === "female" && "selected"
    } value="female">female</option>
    <option ${userGender === "male" && "selected"} value="male">male</option>
  </select>
  `;

  trdata[4].innerHTML = `
  <select
  required
  class="form-select"
  id="membership"
  name="membership"
  aria-label="membership"
>
    <option ${
      userMembership === "Basic Membership" && "selected"
    } value="Basic Membership">Basic Membership</option>
    <option ${
      userMembership === "Intermediate Membership" && "selected"
    } value="Intermediate Membership">
        Intermediate Membership
    </option>
    <option ${
      userMembership === "Advanced Membership" && "selected"
    } value="Advanced Membership">
        Advanced Membership
    </option>
    <option ${
      userMembership === "Elite Membership" && "selected"
    } value="Elite Membership">Elite Membership</option>
    <option value="Junior Membership">Junior Membership</option>
</select>
  `;
  trdata[5].innerHTML = `
  <select
    required
    class="form-select"
    id="martial-arts"
    name="martial arts"
    aria-label="martial arts"
  >
    <option ${
      userMartialArts === "Karate" && "selected"
    } value="Karate">Karate</option>
    <option ${
      userMartialArts === "Taekwondo" && "selected"
    } value="Taekwondo">Taekwondo</option>
    <option ${
      userMartialArts === "Jiu-Jitsu" && "selected"
    } value="Jiu-Jitsu">Jiu-Jitsu</option>
    <option ${
      userMartialArts === "Judo" && "selected"
    } value="Judo">Judo</option>
    <option ${
      userMartialArts === "Muay Thai" && "selected"
    } value="Muay Thai">Muay Thai</option>
  </select>
  `;

  trdata[6].innerHTML =
    "<button class='btn btn-primary btn-xs btn-updateCustomer' onclick='updateUser(" +
    userID +
    ")'>" +
    "<i class='fa fa-pencil' aria-hidden='true'></i>Update</button>" +
    "<button class='btn btn-warning btn-xs btn-cancelupdate' onclick='cancel(" +
    userID +
    ")'><i class='fa fa-times' aria-hidden='true'></i>Cancel</button>" +
    "<button class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(" +
    userID +
    ")'>" +
    "<i class='fa fa-trash' aria-hidden='true'></i> Delete</button>";
}
function cancel(UserID) {
  debugger;
  let btneditId = "btnedit" + UserID;
  let btndeleteId = "btndelete" + UserID;

  let CustomerRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
  let data = CustomerRow.querySelectorAll(".td-data");

  let name = CustomerRow.getAttribute("data-name");
  let email = CustomerRow.getAttribute("data-email");
  let gender = CustomerRow.getAttribute("data-gender");
  let membership = CustomerRow.getAttribute("data-membership");
  let martialArt = CustomerRow.getAttribute("data-martial-arts");

  data[0].innerHTML = UserID;
  data[1].innerHTML = name;
  data[2].innerHTML = email;
  data[3].innerHTML = gender;
  data[4].innerHTML = membership;
  data[5].innerHTML = martialArt;

  let actionbtn =
    "<button id='" +
    btneditId +
    "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" +
    UserID +
    ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
    "<button id='" +
    btndeleteId +
    "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(" +
    UserID +
    ")'><i class='fa fa-trash' aria-hidden='true'></i> Delete</button>";
  data[6].innerHTML = actionbtn;
}
function updateUser(UserID) {
  let userRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
  let data = userRow.querySelectorAll(".td-data");
  let name = data[1].querySelector("#txtname").value;
  let email = data[2].querySelector("#txtemail").value;
  let gender = data[3].querySelector("#ddlgender").value;
  let membership = data[4].querySelector("#membership").value;
  console.log(data[5]);
  let martialArt = data[5].querySelector("#martial-arts").value;
  let userObj = {
    id: UserID,
    name: name,
    email: email,
    gender: gender,
    membership: membership,
    "martial arts": martialArt,
  };
  updateDataToLocalStorage(userObj);
  bindUserData();
}
function deleteRow(UserID) {
  deletedataFromLocalStorage(UserID);
  bindUserData();
}
