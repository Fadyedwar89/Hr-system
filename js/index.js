const ul = document.querySelector("ul");
const search = document.querySelector(".searchTerm");

async function api() {
  let response = await fetch("http://localhost:3000/db");
  let data = await response.json();
  display(data.customers, data.transactions);
  search.addEventListener("keyup", function () {
    display(data.customers, data.transactions, this.value);
  });
}

api();

function display(arr1, arr2, e = "") {
  let id ;
  let container = ` <li class="table-header">
                <div class=" col-1">Customer Id</div>
                <div class=" col-2">Customer Name</div>
                <div class=" col-3">Date</div>
                <div class=" col-4">Amount</div>
            </li>`;
  for (let i = 0; i < arr1.length; i++) {
    if (
      arr1[i].name.toLowerCase().includes(e.toLowerCase()) ||
      e == "" ||
      searchamount(arr2, e) == arr1[i].id
    ) {
       id=arr1[i].id;
      container += ` 
            <li class="table-row ">
                <div class="col col-1" data-label="Job Id">${arr1[i].id}</div>
                <div class="col col-2" data-label="Customer Name">${
                  arr1[i].name
                }</div>
                <div class="col col-4" data-label=" date">
                    ${displaydate(i, arr2)}
                </div>
                <div class="col col-3" data-label="Amount">
                   ${displayamount(i, arr2)} 
                </div>
            </li>`;
    }
  }
  drow(id, arr2);
  ul.innerHTML = container;
}

function displaydate(index, arr) {
  let container = ``;
  let f;
  for (let i = 0; i < arr.length; i++) {
    f = arr[i].date.split("-");
    if (index + 1 == arr[i].customer_id)
      container += `  <div class="inner">${f[2]}-${f[2]}-${f[0]}</div>`;
  }
  return container;
}

function displayamount(index, arr) {
  let container = ``;
  for (let i = 0, j = 1; i < arr.length; i++, j = 1) {
    if (index + 1 == arr[i].customer_id) {
      container += `  <div class="inner"> $ ${arr[i].amount}</div>`;
    }
  }
  return container;
}

function searchamount(arr, e) {
  for (let i = 0, j = 1; i < arr.length; i++, j = 1) {
    if (arr[i].amount == e) return arr[i].customer_id;
  }
}

function drow(id, arr ) {
  let xValues = ["01-01-2022", "02-01-2022"];
  let yValues = [];
  let barColors = ["#b91d47", "#00aba9"];
yValues=graghamount(id, arr);

    new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
      options: {
        title: {
          display: true,
        },
      },
    });
}

function graghamount(id, arr) {
  let container = [];

  for (let i = 0, j = 1; i < arr.length; i++, j = 1) {
    if (id == arr[i].customer_id) {
      container.push(arr[i].amount);
    }
  }

  return container;
}
