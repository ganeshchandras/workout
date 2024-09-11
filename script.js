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

// Handle weight tracking form submission
document.getElementById('weight-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const exercise = document.getElementById('exercise-select').value;
    const weight = document.getElementById('weight').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;

    const progressTracker = document.getElementById('progress');
    
    if (exercise && weight && sets && reps) {
        // Save to local storage
        const record = { exercise, weight, sets, reps };
        let records = JSON.parse(localStorage.getItem('workoutRecords')) || [];
        records.push(record);
        localStorage.setItem('workoutRecords', JSON.stringify(records));

        // Display progress
        let progressHtml = '<h2>Progress Tracker</h2>';
        records.forEach(record => {
            progressHtml += `<p>Exercise: ${record.exercise} - Weight: ${record.weight} lbs, Sets: ${record.sets}, Reps: ${record.reps}</p>`;
        });
        progressTracker.innerHTML = progressHtml;
    } else {
        alert('Please fill in all fields.');
    }
});

// Load progress on page load
window.addEventListener('load', function () {
    const progressTracker = document.getElementById('progress');
    let records = JSON.parse(localStorage.getItem('workoutRecords')) || [];
    let progressHtml = '<h2>Progress Tracker</h2>';
    records.forEach(record => {
        progressHtml += `<p>Exercise: ${record.exercise} - Weight: ${record.weight} lbs, Sets: ${record.sets}, Reps: ${record.reps}</p>`;
    });
    progressTracker.innerHTML = progressHtml;
});
