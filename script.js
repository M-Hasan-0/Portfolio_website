document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const mainSections = document.querySelectorAll('#hero-section, #projects-section, #contact-section');
    const projectDetailPage = document.getElementById('project-detail-page');
    const projectsGrid = document.getElementById('projects-grid');
    const contactForm = document.getElementById('contact-form');
    const currentYearSpan = document.getElementById('current-year');

    const detailTitle = document.getElementById('detail-project-title');
    const detailMediaContainer = document.getElementById('detail-media-container');
    const detailDescription = document.getElementById('detail-project-description');
    const detailPdfDownload = document.getElementById('detail-pdf-download');
    // Removed reference to backToProjectsButton: const backToProjectsButton = document.getElementById('back-to-projects');


    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Project Data (updated with more details for the detail page)
    const projects = [
        {
            id: 1,
            title: 'E-commerce Platform',
            shortDescription: 'A full-stack e-commerce application built with HTML, CSS, and JavaScript.',
            fullDescription: 'This e-commerce platform allows users to browse products, add them to a cart, and complete checkout. It features dynamic product listings, search functionality, and a responsive design. Future plans include user authentication and a basic admin panel.',
            imageUrl: 'https://placehold.co/400x250/3B82F6/FFFFFF?text=Project+1',
            mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=l6e9y7T3nL2r4z4A', // Example YouTube embed
            isIframe: true,
            pdfLink: 'https://www.africau.edu/images/default/sample.pdf', // Sample PDF link
        },
        {
            id: 2,
            title: 'Task Management App',
            shortDescription: 'A responsive task management tool with vanilla JavaScript for interactivity.',
            fullDescription: 'A robust task management application designed to help users organize their daily tasks efficiently. Features include task creation, deletion, marking as complete, and filtering options. It demonstrates local storage usage for persistent data.',
            imageUrl: 'https://placehold.co/400x250/10B981/FFFFFF?text=Project+2',
            mediaUrl: 'https://placehold.co/800x450/10B981/FFFFFF?text=Task+App+Screenshot', // Example larger image
            isIframe: false,
            pdfLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Sample PDF link
        },
        {
            id: 3,
            title: 'Personal Blog Site',
            shortDescription: 'A custom blog platform showcasing HTML structure and CSS design.',
            fullDescription: 'This personal blog platform is a clean and minimalist design, focusing on readability. It supports markdown parsing for blog posts and includes a comment section. The design is fully responsive, adapting to various screen sizes seamlessly.',
            imageUrl: 'https://placehold.co/400x250/EF4444/FFFFFF?text=Project+3',
            mediaUrl: 'https://placehold.co/800x450/EF4444/FFFFFF?text=Blog+Site+Demo',
            isIframe: false,
            pdfLink: 'https://www.africau.edu/images/default/sample.pdf',
        },
        {
            id: 4,
            title: 'Weather Dashboard',
            shortDescription: 'An interactive weather application using Fetch API for data.',
            fullDescription: 'A dynamic weather dashboard that fetches real-time weather data using a public API. Users can search for weather conditions by city name, view current conditions, and a 5-day forecast. It demonstrates asynchronous JavaScript and API consumption.',
            imageUrl: 'https://placehold.co/400x250/F59E0B/FFFFFF?text=Project+4',
            mediaUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY?si=S1X0J6eQ2S1X0J6eQ', // Another YouTube example
            isIframe: true,
            pdfLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
    ];

    // Function to render project cards
    function renderProjects() {
        projectsGrid.innerHTML = ''; // Clear existing projects
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <img
                    src="${project.imageUrl}"
                    alt="${project.title}"
                    onerror="this.onerror=null; this.src='https://placehold.co/400x250/CCCCCC/000000?text=Image+Error';"
                />
                <div class="project-card-content">
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-description">${project.shortDescription}</p>
                    <button class="project-link view-detail-button" data-project-id="${project.id}">
                        View Project
                    </button>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });

        // Add event listeners to the new "View Project" buttons
        document.querySelectorAll('.view-detail-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const projectId = parseInt(event.target.dataset.projectId);
                showProjectDetailPage(projectId);
            });
        });
    }

    // Function to navigate to a main section (Hero, Projects, Contact)
    function navigateToSection(sectionId) {
        // Hide project detail page if it's visible
        projectDetailPage.classList.add('hidden');

        // Show all main sections
        mainSections.forEach(section => {
            section.classList.remove('hidden');
        });

        // Scroll to the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Update active button styling
        navButtons.forEach(button => {
            if (button.dataset.sectionId === sectionId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Ensure projects are rendered when navigating to projects section
        if (sectionId === 'projects-section') {
            renderProjects();
        }
    }

    // Function to display project details page
    function showProjectDetailPage(projectId) {
        const project = projects.find(p => p.id === projectId);

        if (project) {
            // Hide all main sections
            mainSections.forEach(section => {
                section.classList.add('hidden');
            });

            // Populate and show the project detail page
            detailTitle.textContent = project.title;
            detailDescription.textContent = project.fullDescription;

            // Clear previous media
            detailMediaContainer.innerHTML = '';

            // Inject media (image or iframe)
            if (project.isIframe) {
                const iframeWrapper = document.createElement('div');
                iframeWrapper.className = 'iframe-wrapper';
                const iframe = document.createElement('iframe');
                iframe.src = project.mediaUrl;
                iframe.title = project.title;
                iframe.allowFullscreen = true; // Allow fullscreen for videos
                iframe.setAttribute('loading', 'lazy'); // Lazy load iframe
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'); // Required for YouTube embeds
                iframeWrapper.appendChild(iframe);
                detailMediaContainer.appendChild(iframeWrapper);
            } else {
                const img = document.createElement('img');
                img.src = project.mediaUrl;
                img.alt = project.title;
                img.onerror = function() { this.onerror=null; this.src='https://placehold.co/800x450/CCCCCC/000000?text=Image+Not+Found'; };
                detailMediaContainer.appendChild(img);
            }

            // Handle PDF download link
            if (project.pdfLink) {
                detailPdfDownload.href = project.pdfLink;
                detailPdfDownload.classList.remove('hidden');
            } else {
                detailPdfDownload.classList.add('hidden');
            }

            projectDetailPage.classList.remove('hidden'); // Show the detail page
            projectDetailPage.scrollIntoView({ behavior: 'smooth' }); // Scroll to top of the detail page

            // Update active nav button (Projects should be active)
            navButtons.forEach(button => {
                if (button.dataset.sectionId === 'projects-section') {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });

        } else {
            console.error('Project not found for ID:', projectId);
            navigateToSection('projects-section'); // Fallback to projects page if not found
        }
    }

    // Event Listeners for Navigation Buttons (now navigate to sections)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.sectionId;
            navigateToSection(sectionId);
        });
    });

    // Event Listener for "View My Work" button on Hero Section
    document.querySelector('.hero-button').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        navigateToSection('projects-section');
    });

    // Removed event listener for "Back to Projects" button
    // backToProjectsButton.addEventListener('click', () => {
    //     navigateToSection('projects-section'); // Go back to projects section
    // });


    // Handle Contact Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(contactForm);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        console.log('Contact Form Submitted:', data);

        alert('Message sent successfully! (Check console for data)');
        contactForm.reset();
    });

    // Initial setup: Ensure main sections are visible and detail page is hidden
    mainSections.forEach(section => section.classList.remove('hidden'));
    projectDetailPage.classList.add('hidden');
    renderProjects(); // Render projects initially
    navigateToSection('hero-section'); // Start at the hero section
});