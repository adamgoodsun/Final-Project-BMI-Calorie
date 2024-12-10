
//Links to videos with JavaCript not used in class in sources.html along with sources from the text
//they can be viewed on the webpage by clicking sources in the nav

let dayIndex = parseInt(localStorage.getItem('currentDay')) || 0;
let foodLog = JSON.parse(localStorage.getItem('foodLog')) || [[]];
let totalCalories = parseInt(localStorage.getItem('totalCalories')) || 0;
let totalProtein = parseInt(localStorage.getItem('totalProtein')) || 0;
let totalFat = parseInt(localStorage.getItem('totalFat')) || 0;
let totalCarbs = parseInt(localStorage.getItem('totalCarbs')) || 0;

function updateTotals() {
 let totalsBody = document.querySelector("#totals tbody");
 totalsBody.innerHTML = `
   <tr>
     <td>${totalCalories}</td>
     <td>${totalProtein}</td>
     <td>${totalFat}</td>
     <td>${totalCarbs}</td>
   </tr>
 `;
}

document.addEventListener('DOMContentLoaded', () => {
 const logButton = document.querySelector("#logButton");
 
 if (logButton) {
   logButton.addEventListener("click", () => {
     let foodName = document.querySelector("#foodName").value.trim();
     let calories = parseInt(document.querySelector("#calories").value) || 0;
     let protein = parseInt(document.querySelector("#protein").value) || 0;
     let fat = parseInt(document.querySelector("#fat").value) || 0;
     let carbs = parseInt(document.querySelector("#carbs").value) || 0;

     if (!foodName || calories < 0 || protein < 0 || fat < 0 || carbs < 0) {
       alert("Please fill in all fields correctly.");
       return;
     }

     if (!foodLog[dayIndex]) {
       foodLog[dayIndex] = [];
     }

     foodLog[dayIndex].push({ foodName, calories, protein, fat, carbs });

     totalCalories += calories;
     totalProtein += protein;
     totalFat += fat;
     totalCarbs += carbs;

     let tableBody = document.querySelector("#foodLog tbody");
     let row = tableBody.insertRow();
     row.innerHTML = `
       <td>${foodName}</td>
       <td>${calories}</td>
       <td>${protein}</td>
       <td>${fat}</td>
       <td>${carbs}</td>
     `;

     updateTotals();

     localStorage.setItem('foodLog', JSON.stringify(foodLog));
     localStorage.setItem('totalCalories', totalCalories);
     localStorage.setItem('totalProtein', totalProtein);
     localStorage.setItem('totalFat', totalFat);
     localStorage.setItem('totalCarbs', totalCarbs);

     document.querySelector("#foodName").value = '';
     document.querySelector("#calories").value = '';
     document.querySelector("#protein").value = '';
     document.querySelector("#fat").value = '';
     document.querySelector("#carbs").value = '';
   });
 }

 document.querySelector("#resetButton").addEventListener("click", () => {
   foodLog[dayIndex] = [];
   totalCalories = 0;
   totalProtein = 0;
   totalFat = 0;
   totalCarbs = 0;

   let tableBody = document.querySelector("#foodLog tbody");
   tableBody.innerHTML = "";

   updateTotals();

   localStorage.setItem('foodLog', JSON.stringify(foodLog));
   localStorage.setItem('totalCalories', totalCalories);
   localStorage.setItem('totalProtein', totalProtein);
   localStorage.setItem('totalFat', totalFat);
   localStorage.setItem('totalCarbs', totalCarbs);
 });

 document.querySelector("#undoButton").addEventListener("click", () => {
   if (foodLog[dayIndex].length === 0) {
     alert("No entries to undo.");
     return;
   }

   let lastEntry = foodLog[dayIndex].pop();

   totalCalories -= lastEntry.calories;
   totalProtein -= lastEntry.protein;
   totalFat -= lastEntry.fat;
   totalCarbs -= lastEntry.carbs;

   let tableBody = document.querySelector("#foodLog tbody");
   tableBody.deleteRow(tableBody.rows.length - 1);

   updateTotals();

   localStorage.setItem('foodLog', JSON.stringify(foodLog));
   localStorage.setItem('totalCalories', totalCalories);
   localStorage.setItem('totalProtein', totalProtein);
   localStorage.setItem('totalFat', totalFat);
   localStorage.setItem('totalCarbs', totalCarbs);
 });

 document.querySelector("#newDayButton").addEventListener("click", () => {
   dayIndex++;
   foodLog[dayIndex] = [];

   totalCalories = 0;
   totalProtein = 0;
   totalFat = 0;
   totalCarbs = 0;

   let tableBody = document.querySelector("#foodLog tbody");
   tableBody.innerHTML = "";

   localStorage.setItem('currentDay', dayIndex);
   localStorage.setItem('foodLog', JSON.stringify(foodLog));
   localStorage.setItem('totalCalories', totalCalories);
   localStorage.setItem('totalProtein', totalProtein);
   localStorage.setItem('totalFat', totalFat);
   localStorage.setItem('totalCarbs', totalCarbs);

   updateTotals();
   loadDayData();
 });

 document.querySelector("#viewPreviousDayButton").addEventListener("click", () => {
   if (dayIndex <= 0) {
     alert("No previous day.");
     return;
   }

   dayIndex--;
   loadDayData();
   localStorage.setItem('currentDay', dayIndex);
 });

 document.querySelector("#viewNextDayButton").addEventListener("click", () => {
   if (dayIndex >= foodLog.length - 1) {
     alert("No next day.");
     return;
   }

   dayIndex++;
   loadDayData();
   localStorage.setItem('currentDay', dayIndex);
 });

 loadDayData();
});

function loadDayData() {
 let dayData = foodLog[dayIndex];

 totalCalories = 0;
 totalProtein = 0;
 totalFat = 0;
 totalCarbs = 0;

 let tableBody = document.querySelector("#foodLog tbody");
 tableBody.innerHTML = "";

 dayData.forEach(entry => {
   totalCalories += entry.calories;
   totalProtein += entry.protein;
   totalFat += entry.fat;
   totalCarbs += entry.carbs;

   let row = tableBody.insertRow();
   row.innerHTML = `
     <td>${entry.foodName}</td>
     <td>${entry.calories}</td>
     <td>${entry.protein}</td>
     <td>${entry.fat}</td>
     <td>${entry.carbs}</td>
   `;
 });

 updateTotals();
}

