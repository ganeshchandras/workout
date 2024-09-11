// Exercise data for each routine
const routines = {
    "upper-body": [
        { name: "Bench Press", id: "bench-press" },
        { name: "Dumbbell Rows", id: "dumbbell-rows" },
        { name: "Overhead Shoulder Press", id: "shoulder-press" },
        { name: "Lat Pulldowns", id: "lat-pulldowns" },
        { name: "Bicep Curls", id: "bicep-curls" },
        { name: "Tricep Dips", id: "tricep-dips" },
        { name: "Face Pulls", id: "face-pulls" }
    ],
    "lower-body": [
        { name: "Squats", id: "squats" },
        { name: "Leg Press", id: "leg-press" },
        { name: "Romanian Deadlifts", id: "romanian-deadlifts" },
        { name: "Lunges", id: "lunges" },
        { name: "Leg Curls", id: "leg-curls" },
        { name: "Calf Raises", id: "calf-raises" }
    ],
    "cardio-core": [
        { name: "Cardio", id: "cardio" },
        { name: "Planks", id: "planks" },
        { name: "Russian Twists", id: "russian-twists" },
        { name: "Leg Raises", id: "leg-raises" },
        { name: "Bicycle Crunches", id: "bicycle-crunches" }
    ],
    "full-body": [
        { name: "Deadlifts", id: "deadlifts" },
        { name: "Bench Press", id: "bench-press" },
        { name: "Pull-Ups", id: "pull-ups" },
        { name: "Goblet Squats", id: "goblet-squats" },
        { name: "Dumbbell Shoulder Press", id: "shoulder-press" },
        { name: "Plank Variations", id: "plank-variations" }
    ]
};

// Function to update daily routine based on the day of the week
function updateDailyRoutine() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const routinesList = ['upper-body', 'lower-body', 'cardio-core', 'full-body'];
    const routine = routinesList[dayOfWeek % routinesList.length];
    const routineDisplay = document.getElementById('routine-display');
    routineDisplay.textContent = `Today's Routine: ${routine.replace('-', ' ')}`;
}

// Load exercises based on selected routine
document.getElementById('routine-select').addEventListener('change', function () {
    const routine = this.value;
    const exerciseSelect = document.getElementById('exercise-select');
    const exerciseList = document.getElementById('exercise-list');
    
    exerciseSelect.innerHTML = ''; // Clear previous options
    if (routines[routine]) {
        routines[routine].forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.id;
            option.textContent = exercise.name;
            exerciseSelect.appendChild(option);
        });
        
        exerciseList.innerHTML = `<h2>Exercises for ${routine.replace('-', ' ')}</h2>`;
    }
});

// Add new set input fields
document.getElementById('add-set').addEventListener('click', function () {
    const container = document.getElementById('sets-container');
    const setDiv = document.createElement('div');
    setDiv.classList.add('set-input');
    setDiv.innerHTML = `
        <label>Weight (lbs):</label>
        <input type="number" class="weight" required>
        <label>Reps:</label>
        <input type="number" class="reps" required>
        <button type="button" class="remove-set">Remove</button>
    `;
    container.appendChild(setDiv);
});

// Remove set input fields
document.getElementById('sets-container').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-set')) {
        event.target.parentElement.remove();
    }
});

// Handle weight tracking form submission
document.getElementById('weight-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const exercise = document.getElementById('exercise-select').value;
    const day = document.getElementById('day').value;
    const setsElements = document.querySelectorAll('.set-input');

    if (exercise && day) {
        // Collect all sets data
        const sets = Array.from(setsElements).map(set => ({
            weight: set.querySelector('.weight').value,
            reps: set.querySelector('.reps').value
        }));

        // Save to local storage
        const record = { exercise, day, sets };
        let records = JSON.parse(localStorage.getItem('workoutRecords')) || [];
        records.push(record);
        localStorage.setItem('workoutRecords', JSON.stringify(records));

        // Display progress
        let progressHtml = '<h2>Progress Tracker</h2>';
        records.forEach(record => {
            progressHtml += `<h3>Exercise: ${record.exercise} on ${record.day}</h3>`;
            record.sets.forEach((set, index) => {
                progressHtml += `<p>Set ${index + 1}: Weight: ${set.weight} lbs, Reps: ${set.reps}</p>`;
            });
        });
        document.getElementById('progress').innerHTML = progressHtml;
    } else {
        alert('Please fill in all fields.');
    }
});

// Handle deleting records
document.getElementById('delete-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const day = document.getElementById('delete-day').value;

    let records = JSON.parse(localStorage.getItem('workoutRecords')) || [];
    records = records.filter(record => record.day !== day);
    localStorage.setItem('workoutRecords', JSON.stringify(records));

    // Update progress display
    let progressHtml = '<h2>Progress Tracker</h2>';
    records.forEach(record => {
        progressHtml += `<h3>Exercise: ${record.exercise} on ${record.day}</h3>`;
        record.sets.forEach((set, index) => {
            progressHtml += `<p>Set ${index + 1}: Weight: ${set.weight} lbs, Reps: ${set.reps}</p>`;
        });
    });
    document.getElementById('progress').innerHTML = progressHtml;
});

// Load progress on page load
window.addEventListener('load', function () {
    updateDailyRoutine();

    const progressTracker = document.getElementById('progress');
    let records = JSON.parse(localStorage.getItem('workoutRecords')) || [];
    let progressHtml = '<h2>Progress Tracker</h2>';
    records.forEach(record => {
        progressHtml += `<h3>Exercise: ${record.exercise} on ${record.day}</h3>`;
        record.sets.forEach((set, index) => {
            progressHtml += `<p>Set ${index + 1}: Weight: ${set.weight} lbs, Reps: ${set.reps}</p>`;
        });
    });
    progressTracker.innerHTML = progressHtml;
});
