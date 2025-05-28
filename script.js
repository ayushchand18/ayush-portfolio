
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'resume.pdf'; // Place your resume PDF in the same directory
    link.download = 'Ayush_Resume.pdf';
    link.click();
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-mode');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
