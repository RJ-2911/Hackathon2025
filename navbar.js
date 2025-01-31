        // JavaScript to toggle dropdown visibility
        document.getElementById('account-btn').addEventListener('click', function(event) {
            const dropdownMenu = document.getElementById('dropdown-menu');
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            
            // Close the dropdown if clicked outside
            window.addEventListener('click', function(event) {
                if (!event.target.matches('#account-btn') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-content a')) {
                    dropdownMenu.style.display = 'none';
                }
            });
        });