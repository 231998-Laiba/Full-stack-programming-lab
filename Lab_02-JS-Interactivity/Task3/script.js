// Get all task divs
const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    const completeBtn = task.querySelector('.completeBtn');
    const removeBtn = task.querySelector('.removeBtn');
    const inputField = task.querySelector('input');

    // Mark as complete
    completeBtn.addEventListener('click', () => {
        inputField.classList.toggle('completed');
    });

    // Remove task
    removeBtn.addEventListener('click', () => {
        task.style.display = 'none';
    });
});
