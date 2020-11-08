var original = [],
  currentState = [];
var teamSize = 5;
var femalesArr = [];
var mapper = {
  Consultant: "Con",
  "Senior Consultant": "Sr. Con",
  "Lead Consultant": "Lead Con",
};

function pass(json_object) {
  original = currentState = json_object;
}

function displayIntoTeams(arr) {
  for (let i = 0; i < arr.length; i++) {
    let selector;
    const teamNumber = i % teamSize;
    if (teamNumber === 0 && i !== 0) {
      selector = `section[id="${teamSize}"] article`;
    } else {
      selector = `section[id="${teamNumber}"] article`;
    }
    const classes =
      arr[i].Gender.toLowerCase() === "Female".toLowerCase()
        ? "people female"
        : "people";
    const html = `
    <div class="${classes}">
      <span>${arr[i].Name}</span>
      <span class="role">${mapper[arr[i].Role]}</span>
    </div>
    `;
    $(`#${teamNumber + 1} article`).append(html);
  }
}

function genderDiversity() {
  currentState = currentState.filter((item) => {
    if (item.Gender.toLowerCase() === "Female".toLowerCase()) {
      femalesArr.push(item);
    }
    return item.Gender.toLowerCase() !== "Female".toLowerCase();
  });
}

function experienceReport() {
  genderDiversity();
  const roles = [];
  const seggregateWithRoles = {};
  currentState.forEach((item) => {
    if (!roles.includes(item.Role)) {
      roles.push(item.Role);
      seggregateWithRoles[item.Role] = [item];
    } else {
      seggregateWithRoles[item.Role].push(item);
    }
  });
  const aggregatedPeople = [
    ...femalesArr,
    ...seggregateWithRoles["Consultant"],
    ...seggregateWithRoles["Senior Consultant"],
    ...seggregateWithRoles["Lead Consultant"],
  ];
  displayIntoTeams(aggregatedPeople);
}
