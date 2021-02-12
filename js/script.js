/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const itemPerPage = 9;
const studentList = document.querySelector(".student-list"); // select the element with a class of `student-list` and assign it to a variable
const linkList = document.querySelector("ul.link-list"); // select the element with a class of `link-list` and assign it to a variable

function showPage(list, page) {
  let startIndex = page * itemPerPage - itemPerPage; // index for the first student
  let endIndex = page * itemPerPage; // index of last student on the page
  const listLength = list.length;
  studentList.innerHTML = ""; // set the innerHTML property of the variable you just created to an empty string

  for (let i = 0; i < listLength; i++) {
    if (i >= startIndex && i < endIndex) {
      const studentItem = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${list[i].picture.medium}></img>
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email} </span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
      `;
      studentList.insertAdjacentHTML("beforeend", studentItem);
    }
  }
}
/* Create searchBar function */
function searchBar() {
  const header = document.querySelector(".header");
  const bar = `
    <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
  `;
  header.insertAdjacentHTML("beforeend", bar);

  // Event Listener
  //Search input when user types...
  const searchInput = document.querySelector("#search"); // select the input in search box

  searchInput.addEventListener("keyup", (e) => {
    const input = e.target.value;
    const searchResults = [];
    for (let i = 0; i < data.length; i++) {
      const name = `${data[i].name.first} ${data[i].name.last}`;
      //if the name in the object matches the input...
      if (name.toLowerCase().includes(input.toLowerCase())) {
        searchResults.push(data[i]);
        showPage(searchResults, 1);
        addPagination(searchResults);
      }
    }
    //If no results were found
    if (searchResults.length === 0) {
      studentList.innerHTML = `
        <li class="student.item" cf>
          <div class="no-results">
            <h3>No results found</h3>
          </div>
        </li>
      `;
      linkList.innerHTML = "";
    }
  });
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const numOfPages = Math.ceil(list.length / itemPerPage); // create a variable to calculate the number of pages needed
  linkList.innerHTML = " "; // set the innerHTML property of the variable you just created to an empty string
  for (let i = 1; i <= numOfPages; i++) {
    const button = `
     <li>
         <button type="button">${[i]}</button>
     </li>
     `;
    linkList.insertAdjacentHTML("beforeend", button); // insert the above elements
    const active = document.querySelector(".link-list button:first-child"); // give the first pagination button a class of "active"
    active.className = "active";
  }

  linkList.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      const firstElementActive = document.querySelector(".active");
      firstElementActive.className = "";
      e.target.className = "active";
      page = e.target.textContent;

      showPage(list, page);
    }
  });
}

// Call functions
searchBar();
showPage(data, 1);
addPagination(data);
