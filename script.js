// Enhanced event data with real image URLs, categories, and proper dates
const events = [
    {
        id: 1,
        name: "Local Music Festival",
        date: "2023-06-15",
        time: "18:00",
        location: "Central Park",
        description: "Enjoy a night of live music from local bands across various genres.",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "music"
    },
    {
        id: 2,
        name: "Art Exhibition",
        date: "2023-06-18",
        time: "10:00",
        location: "Downtown Gallery",
        description: "Explore works from emerging artists in our community.",
        image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1504&q=80",
        category: "art"
    },
    {
        id: 3,
        name: "Food Truck Fair",
        date: "2023-06-20",
        time: "12:00",
        location: "Riverside Plaza",
        description: "Sample delicious cuisine from a variety of local food trucks.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "food"
    },
    {
        id: 4,
        name: "Tech Meetup",
        date: "2023-06-22",
        time: "19:00",
        location: "Innovation Hub",
        description: "Network with tech professionals and hear talks about the latest trends.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "tech"
    },
    {
        id: 5,
        name: "Yoga in the Park",
        date: "2023-06-25",
        time: "08:00",
        location: "Greenfield Park",
        description: "Start your day with a relaxing outdoor yoga session for all levels.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80",
        category: "sports"
    },
    {
        id: 6,
        name: "24-Hour Code Fest | Hackathon",
        date: "2024-04-12",
        time: "20:00",
        location: "DigiClub",
        description: "Round-the-clock coding challenge where developers compete to build innovative solutions. Food, drinks, and prizes provided!",
        image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "tech"
    }
];

// Function to format date for display
function formatDisplayDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to simulate API fetch with loading state
async function fetchEvents() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    loadingSpinner.style.display = 'none';
    return [...events]; // Return a copy of the events
}

// Function to filter and sort events
async function getFilteredEvents() {
    const events = await fetchEvents();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    
    return events
        .filter(event => {
            // Search filter
            const matchesSearch = 
                event.name.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = 
                categoryFilter === 'all' || event.category === categoryFilter;
            
            // Date range filter
            const eventDate = new Date(event.date);
            const matchesDateFrom = !dateFrom || eventDate >= new Date(dateFrom);
            const matchesDateTo = !dateTo || eventDate <= new Date(dateTo + 'T23:59:59');
            
            return matchesSearch && matchesCategory && matchesDateFrom && matchesDateTo;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending
}

// Enhanced event card rendering
function renderEvents(eventsToRender) {
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = '';
    
    if (eventsToRender.length === 0) {
        eventsContainer.innerHTML = '<p class="no-events">No events found matching your criteria.</p>';
        return;
    }
    
    eventsToRender.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card'; 
        
        eventCard.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}')"></div>
            <div class="event-info">
                <span class="event-category category-${event.category}">
                    ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                <h3>${event.name}</h3>
                <div class="event-meta">
                    <p>${formatDisplayDate(event.date)} at ${event.time}</p>
                    <p>${event.location}</p>
                </div>
                <p class="event-description">${event.description}</p>
                <a href="#" class="register-btn">Register</a>
            </div>
        `;
        
        eventsContainer.appendChild(eventCard);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    // Set default date range to current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear() - 5, today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    document.getElementById('dateFrom').valueAsDate = firstDay;
    document.getElementById('dateTo').valueAsDate = lastDay;
    
    // Initial render
    const initialEvents = await getFilteredEvents();
    renderEvents(initialEvents);
    
    // Set up event listeners for filtering
    document.getElementById('searchInput').addEventListener('input', async () => {
        const filteredEvents = await getFilteredEvents();
        renderEvents(filteredEvents);
    });
    
    document.getElementById('searchButton').addEventListener('click', async () => {
        const filteredEvents = await getFilteredEvents();
        renderEvents(filteredEvents);
    });
    
    document.getElementById('categoryFilter').addEventListener('change', async () => {
        const filteredEvents = await getFilteredEvents();
        renderEvents(filteredEvents);
    });
    
    document.getElementById('dateFrom').addEventListener('change', async () => {
        const filteredEvents = await getFilteredEvents();
        renderEvents(filteredEvents);
    });
    
    document.getElementById('dateTo').addEventListener('change', async () => {
        const filteredEvents = await getFilteredEvents();
        renderEvents(filteredEvents);
    });
    
    document.getElementById('resetFilters').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('dateFrom').valueAsDate = firstDay;
        document.getElementById('dateTo').valueAsDate = lastDay;
        
        getFilteredEvents().then(events => renderEvents(events));
    });
});