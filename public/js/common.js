const { response } = require("express");

async function adoptOrCancel(animalid){
  await fetch('http://localhost:3000/animals', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify({
        id: animalid
    })
  }).then((response) => {
    if (response.ok) {
      const resData = 'Operation carried out';
      location.reload();
      return Promise.resolve(resData);
    }
    return Promise.reject(response);
  }).catch((response) => {
    alert(response.statusText);
  });
};

async function updateSpecies(speciesid){
    newSpecies = prompt("Update species")
    await fetch('http://localhost:3000/species/update', {
      method: 'POST',
      headers: {
        'content-type': 'application/JSON'
      },
      body: JSON.stringify({
          id: speciesid,
          name: newSpecies
      })
    }).then((response) => {
      if (response.ok) {
        const resData = 'Species updated';
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    }).catch((response) => {
      alert(response.statusText);
    });
};

async function deleteSpecies(speciesid){
  await fetch('http://localhost:3000/species/delete', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify({
        id: speciesid
    })
  }).then((response) => {
    if (response.ok) {
      const resData = 'Species deleted';
      location.reload();
      return Promise.resolve(resData);
    }
    return Promise.reject(response);
  }).catch((response) => {
    alert(response.statusText);
  });
};

async function addSpecies(){
  let speciesname = prompt("Provide the new species' name");
  await fetch('http://localhost:3000/species/add', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify({
        name: speciesname
    })
  }).then((response) => {
    if (response.ok) {
      const resData = 'Species added';
      location.reload();
      return Promise.resolve(resData);
    }
    return Promise.reject(response);
  }).catch((response) => {
    alert(response.statusText);
  });
};

async function updateTemperament(temperamentid){
  newTemperament = prompt("Update temperament")
  await fetch('http://localhost:3000/temperament/update', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify({
        id: temperamentid,
        name: newTemperament
    })
  }).then((response) => {
    if (response.ok) {
      const resData = 'Temperament updated';
      location.reload();
      return Promise.resolve(resData);
    }
    return Promise.reject(response);
  }).catch((response) => {
    alert(response.statusText);
  });
};

async function deleteTemperament(temperamentid){
  await fetch('http://localhost:3000/temperament/delete', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify({
        id: temperamentid
    })
  }).then((response) => {
    if (response.ok) {
      const resData = 'Temperament deleted';
      location.reload();
      return Promise.resolve(resData);
    }
    return Promise.reject(response);
  }).catch((response) => {
    alert(response.statusText);
  });
};

async function addTemperament(){
  let temperamentname = prompt("Provide the new temperament's name");
  await fetch('http://localhost:3000/temperament/add', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    },
    body: JSON.stringify({
        name: temperamentname
    })
  }).then((response) => {
    if (response.ok) {
      const resData = 'Temperament added';
      location.reload();
      return Promise.resolve(resData);
    }
    return Promise.reject(response);
  }).catch((response) => {
    alert(response.statusText);
  });
};

async function populateDatabase() {
  await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'content-type': 'application/JSON'
    }
  }).then((response) => {
    if (response.ok) {
      const resData = 'Population carried out';
      location.reload();
      return Promise.resolve(resData);
    }
    return Promise.reject(response);
  }).catch((response) => {
    alert(response.statusText);
  });
};

function open_new_window(location) {
  window.location.href = location;
};

async function sortByDateRange() {
  let pattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
  
  let startDate = prompt("Please provide starting date in format YYYY-MM-DD")
  if(!pattern.test(startDate)) {
      alert("Wrong date format");
      return;
  };

  let endDate = prompt("Please provide ending date in format YYYY-MM-DD")
  if(!pattern.test(endDate)) {
      alert("Wrong date format");
      return;
  };

  await fetch("http://localhost:3000/animals/byDateRange"+"/"+startDate+"/"+endDate, {
    method: 'GET',
    headers: {
      'content-type': 'application/JSON'
    }
  }).then((response) => {
      if (response.ok) {
          const resData = 'Sorting carried out';
          location.reload();
          return Promise.resolve(resData);
      }
      return Promise.reject(response);
  })
  .catch((response) => {
      alert(response.statusText)
  })

  open_new_window("http://localhost:3000/animals/byDateRange"+"/"+startDate+"/"+endDate)

};

async function sortBySize() {
  await fetch("http://localhost:3000/animals/BySize", {
    method: 'GET',
    headers: {
      'content-type': 'application/JSON'
    }
  }).then((response) => {
      if (response.ok) {
          const resData = 'Sorting carried out';
          location.reload();
          return Promise.resolve(resData);
      }
      return Promise.reject(response);
  })
  .catch((response) => {
      alert(response.statusText)
  });

  open_new_window("http://localhost:3000/animals/BySize");
};
