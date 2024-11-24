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
    // Ambil opsi yang dipilih
    const response = document.querySelector('input[name="response"]:checked');
    const errorMessage = document.getElementById('error-message');

    // Jika tidak ada opsi yang dipilih, tampilkan pesan kesalahan
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

    // Jika ada pesan kesalahan sebelumnya, hapus
    if (errorMessage) errorMessage.remove();

    // Tambahkan nilai jawaban ke total skor
    totalScore += parseInt(response.value);
    currentQuestionIndex++;

    // Periksa apakah masih ada pertanyaan berikutnya
    if (currentQuestionIndex < questions.length) {
        // Perbarui teks pertanyaan dan reset form
        document.getElementById("question-title").innerText = `Question ${currentQuestionIndex + 1}`;
        document.getElementById("question-text").innerText = questions[currentQuestionIndex];
        document.querySelector("#question-form").reset();
        updateProgressBar(); // Perbarui progress bar di sini
    } else {
        document.getElementById('submit-btn').style.display = 'block'; // Tampilkan tombol submit
        document.getElementById('next-btn').style.display = 'none'; // Sembunyikan tombol next
    }
}

function updateQuestion() {
    const questionTitle = document.getElementById("question-title");
    const questionText = document.getElementById("question-text");
    const optionsBox = document.querySelector(".options-box");

    // Update pertanyaan berdasarkan indeks
    questionTitle.textContent = `Question ${currentQuestionIndex + 1}`;
    questionText.textContent = questions[currentQuestionIndex];


    // Hapus opsi lama
    optionsBox.innerHTML = "";

    // Tambahkan opsi baru
    questions[currentQuestionIndex].options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.innerHTML = `
            <input type="radio" name="option" id="option-${index}" value="${option.score}">
            <label for="option-${index}">${option.text}</label>
        `;
        optionsBox.appendChild(optionElement);
    });
}



function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = document.getElementById("progress-percentage");
    
    // Hitung persentase progress
    const progress = (currentQuestionIndex / questions.length) * 100;

    // Update lebar progress bar
    progressBar.style.width = `${progress}%`;

    
    // Ubah warna progress bar sesuai progress
    if (progress < 33) {
        progressBar.style.backgroundColor = '#ff4c4c'; // merah
    } else if (progress < 66) {
        progressBar.style.backgroundColor = '#ffcc00'; // kuning
    } else {
        progressBar.style.backgroundColor = '#4caf50'; // hijau
    }

    // Update teks persentase progress
    progressPercentage.textContent = `${Math.round(progress)}% to complete`;
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;

        document.getElementById("question-title").innerText = `Question ${currentQuestionIndex + 1}`;
        document.getElementById("question-text").innerText = questions[currentQuestionIndex];
        document.querySelector("#question-form").reset();
        updateProgressBar();
    }
    // Perbarui tombol navigasi (back dan next)
    updateNavigationButtons(currentQuestionIndex, questions.length);
}

function updateNavigationButtons(currentQuestion, totalQuestions) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Pastikan tombol "Previous" dinonaktifkan di pertanyaan pertama
    if (currentQuestion === 0) {
        prevBtn.disabled = true; // Tombol Previous dinonaktifkan
    } else {
        prevBtn.disabled = false; // Tombol Previous diaktifkan
    }

    // Menampilkan tombol "Next" dan "Submit" pada akhir kuis
    if (currentQuestion === totalQuestions - 1) {
        nextBtn.style.display = 'none'; // Sembunyikan tombol Next pada pertanyaan terakhir
        document.getElementById('submit-btn').style.display = 'block'; // Tampilkan tombol Submit
    } else {
        nextBtn.style.display = 'block'; // Tampilkan tombol Next
        document.getElementById('submit-btn').style.display = 'none'; // Sembunyikan tombol Submit
    }
}

function handleQuestionNavigation(currentQuestion, totalQuestions) {
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');

    if (currentQuestion === totalQuestions) {
        submitBtn.style.display = 'block'; // Tampilkan tombol Submit
        nextBtn.style.display = 'none'; // Sembunyikan tombol Next
    } else {
        submitBtn.style.display = 'none'; // Sembunyikan tombol Submit
        nextBtn.style.display = 'block'; // Tampilkan tombol Next
    }
}

function checkSubmitButtonState() {
    const submitBtn = document.getElementById('submit-btn');
    const question9Input = document.querySelector('input[name="question9"]:checked');

    if (question9Input) {
        submitBtn.disabled = false; // Aktifkan tombol Submit
    } else {
        submitBtn.disabled = true; // Nonaktifkan tombol Submit
    }
}

document.querySelectorAll('input[name="question9"]').forEach(input => {
    input.addEventListener('change', checkSubmitButtonState);
});


