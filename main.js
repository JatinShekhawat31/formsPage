document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Send data via AJAX
    fetch('process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('successMessage').classList.remove('hide');
            document.getElementById('errorMessage').classList.add('hide');
            document.getElementById('contactForm').reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                document.getElementById('successMessage').classList.add('hide');
            }, 5000);
        } else {
            document.getElementById('errorMessage').classList.remove('hide');
            document.getElementById('successMessage').classList.add('hide');
            document.getElementById('errorMessage').textContent = data.message || 'There was an error submitting the form. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMessage').classList.remove('hide');
        document.getElementById('successMessage').classList.add('hide');
    });
});