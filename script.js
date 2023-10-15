let details = [
    { UserName: "U1$ername", Password: "P@ssw0rd" },
    { UserName: "L@stUs3rname ", Password: "Secr3t@123" },
    { UserName: "G0ld3nUs3r ", Password: "P@$$w0rd123" },
    { UserName: "S@mpl3User", Password: "Qwerty!234"},
    { UserName: "Eclip$3", Password: "MyP@ssw0rd!23" },
    { UserName: "C@ptainU", Password: "U$erP@$$word12"},
    { UserName: "R3gul@rUs3r", Password: "7est@123P@ss"},
    { UserName: "Pr0f3ssion@l", Password: "P@ssw0rd!987"},
    { UserName: "M@st3rM1nd", Password: "Pa$$w0rd987!"},
    { UserName: "Sp3cial!User", Password: "Dev@987P@ssword"},
  ];



  let buttons = document.querySelectorAll("button");
  let tableBody = document.querySelector("tbody");

  // To add people to the table

let addPeople = (list = details) => {
    tableBody.innerHTML = "";
    list.forEach((e) => {
      let tableRow = document.createElement("tr");
  
      tableRow.innerHTML = `<td>${e.UserName}</td>
          <td>${e.Password}</td>`;
  
      tableBody.appendChild(tableRow);
    });
  };


  // To check the validity of the UserName and Password

let AtoZ = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let userInput = document.querySelector("#username");
let password = document.querySelector("#password");

let checkUsername = (f) => {
    let normalChar = 0;
    let numCount = 0;
    let specialCharCount = 0;
    if(!(AtoZ.includes(f[0]))){
        return false;
    }

    if(f.length < 8){
        return false;
    }

    for (let i = 1; i < f.length; i++) {
      if (
        (f.charCodeAt(i) >= 65 && f.charCodeAt(i) <= 90) ||
        (f.charCodeAt(i) >= 97 && f.charCodeAt() <= 122)
      ) {
        normalChar++;
      }

      if(f.charCodeAt(i) >= 48 && f.charCodeAt(i) <= 57){
        numCount++;
      }
      
      if((f.charCodeAt(i) >= 35 && f.charCodeAt(i) <= 38) || f.charCodeAt(i) == 33 || f.charCodeAt(i) == 64){
        specialCharCount++;
      }
    }

    if(normalChar >= 1 && numCount >= 1 && specialCharCount >= 1){
        return true;
    }else{
        return false;
    }
  }

  let checkPassword = (p) => {
    if(p.length < 8 || p.length > 20){
        return false;
    }

    let passSpecial = 0;
    for(let i = 0; i < p.length; i++){
        if((p.charCodeAt(i) >= 35 && p.charCodeAt(i) <= 38) || p.charCodeAt(i) == 33 || p.charCodeAt(i) == 64){
            passSpecial++;
        }
    }

    if(passSpecial >= 1){
        return true;
    }else{
        return false;
    }
  }


  let inputValue = "";
  let passwordValue = "";

userInput.addEventListener("input", () => inputValue = userInput.value);

password.addEventListener("input", () => passwordValue = password.value);

let login = document.querySelector(".login");

login.addEventListener("click", () => {
    let invalidP = document.querySelector(".errorPass");
    let invalidU = document.querySelector(".errorName");
    invalidU.style.display = "none";
    invalidP.style.display = "none";
    if(checkUsername(inputValue) && checkPassword(passwordValue)){
        invalidU.style.display = "none";
        invalidP.style.display = "none";
        alert(`UserName: ${inputValue} \n Password: ${passwordValue}`);
        let newObject = {UserName: inputValue, Password: passwordValue};
        details.push(newObject)
        addPeople();
        userInput.value = "";
        inputValue = "";
        passwordValue = "";
        password.value = "";
    }else if(!(checkUsername(inputValue)) && checkPassword(passwordValue)){
        invalidU.style.display = "block";
        invalidP.style.display = "none";
        invalidU.innerText = "Atleast 8 characters, Must Contain first captial letter, 1 special character, 1 number";
    }else if(!(checkPassword(passwordValue)) && checkUsername(inputValue)){
        invalidP.style.display = "block";
        invalidU.style.display = "none";
        invalidP.innerText = "Atleast 8 characters, Must contains a special character";
    }else{
        invalidU.style.display = "block";
        invalidU.innerText = "Atleast 8 characters, Must Contain first captial letter, 1 special character, 1 number";
        invalidP.style.display = "block";
        invalidP.innerText = "Atleast 8 characters, Must contains a special character";
    }
})



//   For sorting 
  
  buttons.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.classList.contains("sortU")) {
        details.sort((a, b) => {
          let fa = a.UserName,
            fb = b.UserName;
  
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        addPeople();
      } else {
        details.sort((a, b) => {
          let fa = a.Password.toLowerCase(),
            fb = b.Password.toLowerCase();
  
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        addPeople();
      }
    });
  });



  // To filter the list

let search = document.querySelector("#search-box");

let filter = (search) => {
  let filteredList = details.filter((e) => {
    if (e.UserName.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (e.Password.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
  });
  //   console.log(filteredList);
  addPeople(filteredList);
};

search.addEventListener("input", () => {
    filter(search.value);
  });


  let forgot = document.querySelector(".forgot");

  forgot.addEventListener("click", () => {
    alert("Search for your password in the list");
  });

  
window.onload = () => addPeople();