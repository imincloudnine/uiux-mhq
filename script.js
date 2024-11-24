const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself—or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed. Or the opposite—being so fidgety or restless that you have been moving a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself"
];

let currentQuestionIndex = 0;
let totalScore = 0;

function nextQuestion() {
    const response = document.querySelector('input[name="response"]:checked');
    const errorMessage = document.getElementById('error-message');

    if (!response) {
        if (!errorMessage) {
            const error = document.createElement('p');
            error.id = 'error-message';
            error.innerText = "Please select an answer";
            error.style.color = "red";
            document.getElementById("question-container").appendChild(error);
        }
        return;
    }

    if (errorMessage) errorMessage.remove();

    totalScore += parseInt(response.value);
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        document.getElementById("question-title").innerText = `Question ${currentQuestionIndex + 1}`;
        document.getElementById("question-text").innerText = questions[currentQuestionIndex];
        document.querySelector("#question-form").reset();
        updateProgressBar();
    } else {
        document.getElementById('submit-btn').style.display = 'block';
        document.getElementById('next-btn').style.display = 'none';
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = document.getElementById("progress-percentage");
    const progress = (currentQuestionIndex / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    if (progress < 33) {
        progressBar.style.backgroundColor = '#ff4c4c';
    } else if (progress < 66) {
        progressBar.style.backgroundColor = '#ffcc00';
    } else {
        progressBar.style.backgroundColor = '#4caf50';
    }

    progressPercentage.textContent = `${Math.round(progress)}% to complete`;
}

function showResults() {
    const resultInfo = document.getElementById('result-info');
    const treatmentInfo = document.getElementById('treatment-info');
    const summaryResult = document.getElementById('summary-result');

    if (totalScore <= 4) {
        resultInfo.textContent = "None-Minimal";
        treatmentInfo.textContent = "Focus on maintaining mental well-being through positive activities.";
        summaryResult.textContent = "A PHQ-9 score of 0 to 4 indicates no or minimal depression symptoms. This is a very good result, but it’s still important to maintain mental health with healthy habits, positive relationships, and seeking support if your situation changes.";
    } else if (totalScore <= 9) {
        resultInfo.textContent = "Mild";
        treatmentInfo.textContent = "Consider self-care strategies like exercise, meditation, or talking with trusted friends or family members.";
        summaryResult.textContent = "A PHQ-9 score of 5 to 9 suggests mild depressive symptoms. These symptoms may be temporary, and proactive steps such as adopting a healthy lifestyle or reaching out to supportive people can help improve your well-being without intensive treatment.";
    } else if (totalScore <= 14) {
        resultInfo.textContent = "Moderate";
        treatmentInfo.textContent = "Consult a healthcare professional for advice on care options such as counseling or evidence-based therapies.";
        summaryResult.textContent = "A PHQ-9 score of 10 to 14 indicates moderate depression. This is a good time to seek guidance from a mental health professional and start developing a plan to manage your symptoms proactively.";
    } else if (totalScore <= 19) {
        resultInfo.textContent = "Moderately Severe";
        treatmentInfo.textContent = "Active treatment with medication (pharmacotherapy) and/or psychotherapy is highly recommended.";
        summaryResult.textContent = "A PHQ-9 score of 15 to 19 suggests moderately severe depression, which may significantly impact your life. The first step is to begin treatment or therapy to help reduce symptoms and improve your quality of life.";
    } else {
        resultInfo.textContent = "Severe";
        treatmentInfo.textContent = "Intensive care through a combination of medication and psychotherapy. Seek emergency help if there’s a risk of harm to yourself.";
        summaryResult.textContent = "A PHQ-9 score of 20 to 27 indicates severe depression. This requires immediate attention from mental health professionals to prevent further complications and begin comprehensive treatment.";
    }

    document.getElementById('results-container').style.display = 'block';
    document.getElementById('question-container').style.display = 'none';
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('question-title').innerText = `Question 1`;
    document.getElementById('question-text').innerText = questions[0];
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('submit-btn').addEventListener('click', showResults);
});
