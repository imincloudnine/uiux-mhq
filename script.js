const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}
// Variables to keep track of current question and user responses
const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking so slowly that others notice",
    "Thoughts that you would be better off dead or hurting yourself"
];
const scores = [];
let currentQuestion = 0;

// DOM elements
const questionText = document.getElementById("question-text");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");
const submitButton = document.getElementById("submit-btn");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// Function to update the question and progress
//function updateQuestion() {
//    document.getElementById("question-title").innerText = `Question ${currentQuestion + 1}`;
//    questionText.innerText = questions[currentQuestion];
//    backButton.style.display = currentQuestion === 0 ? "none" : "block";
//    nextButton.style.display = currentQuestion === questions.length - 1 ? "none" : "block";
//    submitButton.style.display = currentQuestion === questions.length - 1 ? "block" : "none";
//    updateProgress();
//    clearSelection();
//}

// Function to update the question and progress
function updateQuestion() {
    document.getElementById("question-title").innerText = `Question ${currentQuestion + 1}`;
    questionText.innerText = questions[currentQuestion];
    backButton.style.display = currentQuestion === 0 ? "none" : "block";
    nextButton.style.display = currentQuestion === questions.length - 1 ? "none" : "block";
    submitButton.style.display = currentQuestion === questions.length - 1 ? "block" : "none";

    // Clear all radio button selections
    const options = document.querySelectorAll('input[name="response"]');
    options.forEach(option => {
        option.checked = false;
    });

    // Restore previously selected answer if available
    if (scores[currentQuestion] !== undefined) {
        const savedValue = scores[currentQuestion];
        options.forEach(option => {
            if (parseInt(option.value, 10) === savedValue) {
                option.checked = true;
                nextButton.disabled = false; // Enable the Next button
            }
        });
    } else {
        nextButton.disabled = true; // Disable the Next button if no answer is selected
    }

    // Update progress based on answered questions
    updateProgress();
}

// Function to handle progress bar 
//function updateProgress() {
//    const progress = ((currentQuestion + 1) / questions.length) * 100;
//    progressBar.style.width = `${progress}%`;
//    progressText.innerText = `${Math.round(progress)}% to complete`;
//
//      if (progress < 33) {
//        progressBar.style.backgroundColor = "red"; // < 33% - Merah
//    } else if (progress < 66) {
//        progressBar.style.backgroundColor = "orange"; // 33% - 66% - Oranye
//    } else if (progress < 100) {
//        progressBar.style.backgroundColor = "#ffcc00"; // 66% - 99% - Kuning
//    } else {
//        progressBar.style.backgroundColor = "green"; // 100% - Hijau
//    }
//}

// Function to handle progress bar
function updateProgress() {
    // Calculate progress based on the number of answered questions
    const answeredQuestions = scores.filter(score => score !== undefined).length;
    const progress = (answeredQuestions / questions.length) * 100;

    progressBar.style.width = `${progress}%`;
    progressText.innerText = `${Math.round(progress)}% to complete`;

    if (progress < 33) {
        progressBar.style.backgroundColor = "red"; // < 33% - Red
    } else if (progress < 66) {
        progressBar.style.backgroundColor = "orange"; // 33% - 66% - Orange
    } else if (progress < 100) {
        progressBar.style.backgroundColor = "#ffcc00"; // 66% - 99% - Yellow
    } else {
        progressBar.style.backgroundColor = "green"; // 100% - Green
    }
}

// Function to clear selection when changing questions
//function clearSelection() {
//    const options = document.querySelectorAll('input[name="response"]');
//    options.forEach(option => (option.checked = false));
//}

// Function to move to the next question
//function nextQuestion() {
//    const selectedOption = document.querySelector('input[name="response"]:checked');
//    if (selectedOption) {
//        scores[currentQuestion] = parseInt(selectedOption.value, 10);
//        currentQuestion++;
//        updateQuestion();
//        nextButton.disabled = true;
//    }
//}

// Function to move to the next question
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="response"]:checked');
    if (selectedOption) {
        scores[currentQuestion] = parseInt(selectedOption.value, 10); // Save the selected answer
        currentQuestion++;
        updateQuestion();
    }
}

// Function to move to the previous question
function previousQuestion() {
    currentQuestion--;
    updateQuestion();
}

// Function to enable the next button when an option is selected
//function triggerProgress() {
//    nextButton.disabled = false;
//}

// Function to enable the Next button when an option is selected
function triggerProgress() {
    const selectedOption = document.querySelector('input[name="response"]:checked');
    if (selectedOption) {
        scores[currentQuestion] = parseInt(selectedOption.value, 10); // Save the answer immediately
        nextButton.disabled = false; // Enable Next button
        updateProgress(); // Update the progress bar immediately
    }
}

// Function to handle submission
function submitSurvey() {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    sessionStorage.setItem("phqScore", totalScore);
    window.location.href = "result_page.html";
}

// Function to display results on the result page
function displayResults() {
    const score = parseInt(sessionStorage.getItem("phqScore"), 10);
    const scoreContainer = document.getElementById("score");
    const resultInfo = document.getElementById("result-info");
    const treatmentInfo = document.getElementById("treatment-info");
    const summaryResult = document.getElementById("summary-result");

    scoreContainer.innerText = score;

    // Provide result interpretations
    if (score <= 4) {
        resultInfo.innerText = "Minimal or no depression.";
        treatmentInfo.innerText = "No specific treatment is recommended.";
        summaryResult.innerText = "You seem to be in a good mental state. Continue maintaining a healthy lifestyle.";
    } else if (score <= 9) {
        resultInfo.innerText = "Mild depression.";
        treatmentInfo.innerText = "Consider monitoring symptoms and consulting a mental health professional.";
        summaryResult.innerText = "Your score indicates mild depression. While it may not require immediate intervention, don't hesitate to seek support.";
    } else if (score <= 14) {
        resultInfo.innerText = "Moderate depression.";
        treatmentInfo.innerText = "Consult a healthcare provider for a professional diagnosis.";
        summaryResult.innerText = "You may be experiencing moderate depression. It’s important to reach out for support and take steps toward recovery.";
    } else if (score <= 19) {
        resultInfo.innerText = "Moderately severe depression.";
        treatmentInfo.innerText = "Seek help from a mental health professional.";
        summaryResult.innerText = "Your results indicate moderately severe depression. Professional support is highly recommended.";
    } else {
        resultInfo.innerText = "Severe depression.";
        treatmentInfo.innerText = "Immediate medical attention is recommended.";
        summaryResult.innerText = "Your score suggests severe depression. Please seek immediate help from a qualified professional.";
    }
}

// Call the function when the page loads
window.onload = displayResults;
