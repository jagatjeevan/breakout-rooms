var original = [],
  currentState = [];
var teamSize = 5;
var femalesArr = [];
var othersArr = [];
var mapper = {
  Associate: "Associate",
  "Senior Associate": "Sr. Associate",
  Consultant: "Con",
  "Consultant Grad": "Con Grad",
  "Senior Consultant": "Sr. Con",
  "Lead Consultant": "Lead Con",
};

var LocationMapper = {
  Chennai: "Chn",
  Hyderabad: "Hyd",
  "Gurgaon - DLF SEZ": "GGN",
  Mumbai: "Mum",
  "Bangalore - Mahadevapura": "MDP",
  Pune: "Pune",
  Coimbatore: "CBE",
};
var showLocation = false;
var aggregatedPeople = [];

function pass(json_object) {
  original = currentState = json_object;
}

function updateTeamsize() {
  teamSize = document.querySelector("#teamSize").value;
}

function clearTeam() {
  for (let i = 0; i < teamSize; i++) {
    $(`#${i + 1} article`).html("");
  }
}

function toggleLocation() {
  showLocation = !showLocation;
  displayIntoTeams();
}

function generateTeams() {
  let html = "";
  for (let i = 0; i < teamSize; i++) {
    html += `
    <section id="${i + 1}">
        <header>Team ${i + 1}</header>
        <article id="content${i + 1}"></article>
      </section>
    `;
  }

  $("#report-container").html(html);
}

function displayIntoTeams() {
  clearTeam();
  generateTeams();
  const arr = aggregatedPeople;
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

    const location = showLocation
      ? `<span  class="role-location">${
          LocationMapper[arr[i].Location]
        }</span>, `
      : "";
    const html = `
    <div class="${classes}" data=${encodeURIComponent(JSON.stringify(arr[i]))}>
      <span>${arr[i].Name}</span>
      <div>
        ${location}
        <span class="role-location">${mapper[arr[i].Grade]}</span>
      </div>
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

function roleDiversity() {
  const roles = [];
  const seggregateWithRoles = {};
  currentState.forEach((item) => {
    if (!roles.includes(item.Grade)) {
      roles.push(item.Grade);
      seggregateWithRoles[item.Grade] = [item];
    } else {
      seggregateWithRoles[item.Grade].push(item);
    }
  });
  aggregatedPeople = [
    ...femalesArr,
    ...seggregateWithRoles["Associate"],
    ...seggregateWithRoles["Consultant"],
    ...seggregateWithRoles["Senior Consultant"],
    ...seggregateWithRoles["Senior Associate"],
    ...seggregateWithRoles["Lead Consultant"],
    ...seggregateWithRoles["Principal Consultant"],
  ];
}

function copyToClipboard(value) {
  var textArea = document.createElement("textarea");
  textArea.value = `${value.Name}\t${value.Gender}\t${value.Role}\t${value.Grade}\t${value.Location}`;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function attachEventHandler() {
  document.querySelectorAll("#report-container .people").forEach((docElem) =>
    docElem.addEventListener("click", function (e) {
      var value = JSON.parse(
        decodeURIComponent(e.currentTarget.getAttribute("data"))
      );
      copyToClipboard(value);
    })
  );
}

function experienceReport() {
  genderDiversity();
  roleDiversity();
  displayIntoTeams();
  setTimeout(attachEventHandler, 250);
}
