//Links to videos with JavaCript not used in class in sources.html along with sources from the text
//they can be viewed on the webpage by clicking sources in the nav

let message = "Input all of the following to Calculate your BMI";

function writeResults() {
  document.querySelector("#narration").innerHTML = message;
}

writeResults();

// Handle BMI calculation
document.querySelector('#calculate').addEventListener('click', () => {
  let units = document.querySelector('#units').value;
  let sex = document.querySelector('#sex').value;
  let weight = document.querySelector('#weight').value;
  let height = document.querySelector('#height').value;

  if (!units || !sex || isNaN(weight) || isNaN(height)) {
    message = "Please fill in all fields to calculate BMI.";
  } else {
    message = calculateBMI(units, weight, height);
  }

  writeResults();
});

function calculateBMI(units, weight, height) {
  let bmi;
  if (units === "Cm/Kg") {
    height = height / 100; // Convert to meters
    bmi = weight / (height * height);
  } else if (units === "In/Lbs") {
    bmi = (weight / (height * height)) * 703;
  }

  bmi = bmi.toFixed(2);
  let category = getBMICategory(bmi);
  return generateNarration(bmi, category);
}

function getBMICategory(bmi) {
    bmi = parseFloat(bmi);
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }

function generateNarration(bmi, category) {
    let narration = `Your BMI is ${bmi}. This is considered ${category}. A healthy BMI is between 18.5 and 24.9.`;
  
    if (category === "Underweight") {
      narration += ` <a href="bulking.html" id="bulk">Click here for advice to bulk to a healthy BMI</a>`;
    } else if (category === "Overweight" || category === "Obese") {
      narration += ` <a href="cutting.html" id="cut">Click here for advice to cut to a healthy BMI</a>`;
    }
  
    return narration;
  }
