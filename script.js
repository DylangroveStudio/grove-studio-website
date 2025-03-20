document.addEventListener('DOMContentLoaded', function() {
    // ==============================
    // PAGE NAVIGATION
    // ==============================
    const navLinks = document.querySelectorAll('a[data-page]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const projectLinks = document.querySelectorAll('.project-nav-link');
    const portfolioBackLinks = document.querySelectorAll('.portfolio-back');
    
    // Handle standard page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target page
            const targetPage = this.getAttribute('data-page');
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active-page');
            });
            
            // Show the target page
            document.getElementById(targetPage).classList.add('active-page');
            
            // Update active link in navigation
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to current page link
            document.querySelectorAll(`.nav-links a[data-page="${targetPage}"]`).forEach(navLink => {
                if (!navLink.classList.contains('btn')) {
                    navLink.classList.add('active');
                }
            });
            
            // Hide any open project details
            document.querySelectorAll('.project-detail').forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Scroll to top of page
            window.scrollTo(0, 0);
        });
    });
    
    // ==============================
    // PORTFOLIO ITEMS
    // ==============================
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                document.querySelectorAll('.portfolio-item').forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Make entire portfolio item clickable with smoother transitions
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent default if clicking on a link inside the item
            if (e.target.tagName === 'A') return;
            
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                // First scroll to a consistent position
                document.querySelector('.portfolio-grid').scrollIntoView({ behavior: 'smooth' });
                
                // Wait for scroll to complete
                setTimeout(() => {
                    // Hide all project details
                    document.querySelectorAll('.project-detail').forEach(detail => {
                        detail.style.display = 'none';
                        detail.style.opacity = '0';
                    });
                    
                    // Show the selected project detail with fade in
                    const projectDetail = document.getElementById(`${projectId}-detail`);
                    if (projectDetail) {
                        projectDetail.style.display = 'block';
                        projectDetail.style.opacity = '0';
                        projectDetail.style.transition = 'opacity 0.4s ease';
                        
                        // Small delay before fade in for smoother experience
                        setTimeout(() => {
                            projectDetail.style.opacity = '1';
                        }, 100);
                    }
                }, 300);
            }
        });
    });
    
    // Portfolio link handling (for "View Project" links) with smoother transitions
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                // First scroll to the portfolio section to provide context
                document.querySelector('.portfolio-grid').scrollIntoView({ behavior: 'smooth' });
                
                // Wait for scroll to complete
                setTimeout(() => {
                    // Hide all project details
                    document.querySelectorAll('.project-detail').forEach(detail => {
                        detail.style.display = 'none';
                        detail.style.opacity = '0';
                    });
                    
                    // Show the selected project detail with fade in
                    const projectDetail = document.getElementById(`${projectId}-detail`);
                    if (projectDetail) {
                        projectDetail.style.display = 'block';
                        projectDetail.style.opacity = '0';
                        projectDetail.style.transition = 'opacity 0.4s ease';
                        
                        // Fade in
                        setTimeout(() => {
                            projectDetail.style.opacity = '1';
                        }, 100);
                    }
                }, 300);
            }
        });
    });
    
    // Back to portfolio button with smoother transitions
    if (portfolioBackLinks.length) {
        portfolioBackLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get current visible project detail
                const currentDetail = document.querySelector('.project-detail[style*="display: block"]');
                
                if (currentDetail) {
                    // Fade out
                    currentDetail.style.opacity = '0';
                    currentDetail.style.transition = 'opacity 0.3s ease';
                    
                    // After fade out, hide it and scroll back
                    setTimeout(() => {
                        // Hide all project details
                        document.querySelectorAll('.project-detail').forEach(detail => {
                            detail.style.display = 'none';
                        });
                        
                        // Scroll back to portfolio grid
                        document.querySelector('.portfolio-grid').scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                } else {
                    // Just scroll back if no project is visible
                    document.querySelector('.portfolio-grid').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Project navigation (next/previous links) with smoother transitions
    if (projectLinks.length) {
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target project
                const targetProject = this.getAttribute('data-project');
                
                // Get current visible project
                const currentDetail = document.querySelector('.project-detail[style*="display: block"]');
                
                // Fade out current project
                if (currentDetail) {
                    currentDetail.style.opacity = '0';
                    currentDetail.style.transition = 'opacity 0.3s ease';
                    
                    // After fade out, hide it and show new one
                    setTimeout(() => {
                        // Hide all project details
                        document.querySelectorAll('.project-detail').forEach(detail => {
                            detail.style.display = 'none';
                            detail.style.opacity = '0';
                        });
                        
                        // Show the target project detail with fade in
                        const targetDetail = document.getElementById(`${targetProject}-detail`);
                        if (targetDetail) {
                            targetDetail.style.display = 'block';
                            targetDetail.style.opacity = '0';
                            
                            // Scroll to portfolio section first to prevent jarring jumps
                            document.querySelector('.portfolio-grid').scrollIntoView({ behavior: 'smooth' });
                            
                            // Then fade in the project detail
                            setTimeout(() => {
                                targetDetail.style.opacity = '1';
                                targetDetail.style.transition = 'opacity 0.3s ease';
                            }, 300);
                        }
                    }, 300);
                } else {
                    // If no current detail is visible, just show the target
                    document.querySelectorAll('.project-detail').forEach(detail => {
                        detail.style.display = 'none';
                    });
                    
                    const targetDetail = document.getElementById(`${targetProject}-detail`);
                    if (targetDetail) {
                        targetDetail.style.display = 'block';
                        targetDetail.style.opacity = '0';
                        
                        // Scroll to appropriate position
                        document.querySelector('.portfolio-grid').scrollIntoView({ behavior: 'smooth' });
                        
                        // Fade in
                        setTimeout(() => {
                            targetDetail.style.opacity = '1';
                            targetDetail.style.transition = 'opacity 0.3s ease';
                        }, 300);
                    }
                }
            });
        });
    }
    
    // ==============================
    // APPROACH PAGE
    // ==============================
    // Process steps interaction
    const stepNumbers = document.querySelectorAll('.step-number');
    const stepContents = document.querySelectorAll('.step-content');
    
    if (stepNumbers.length) {
        stepNumbers.forEach(step => {
            step.addEventListener('click', function() {
                const stepNum = this.getAttribute('data-step');
                
                // Hide all step contents
                stepContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected step content
                document.getElementById(`step-${stepNum}`).classList.add('active');
                
                // Update active state for step numbers
                stepNumbers.forEach(num => {
                    num.classList.remove('active');
                });
                
                this.classList.add('active');
            });
        });
    }
    
    // Testimonials navigation with dots
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonials = document.querySelectorAll('.testimonial-quote');
    
    if (testimonialDots.length) {
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const testimonialNum = this.getAttribute('data-testimonial');
                
                // Hide all testimonials
                testimonials.forEach(testimonial => {
                    testimonial.classList.remove('active');
                });
                
                // Show the selected testimonial
                document.getElementById(`testimonial-${testimonialNum}`).classList.add('active');
                
                // Update active state for dots
                testimonialDots.forEach(d => {
                    d.classList.remove('active');
                });
                
                this.classList.add('active');
            });
        });
    }
    
    // ==============================
    // GIF CONTROLS - Only animate on hover
    // ==============================
    // Get all GIF images
    const projectImages = document.querySelectorAll('.project-image');
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    
    // Function to handle GIF animation
    function handleGifPause(elements, isBackground = false) {
        elements.forEach(element => {
            let parent = element.parentElement;
            
            // Create GIF URL
            let gifUrl;
            if (isBackground) {
                gifUrl = element.style.backgroundImage.replace(/url\(['"]?([^'"]+)['"]?\)/g, '$1');
                // Store original background so we can restore it
                element.setAttribute('data-original-background', element.style.backgroundImage);
                // Temporarily pause by setting a blank color
                element.style.backgroundImage = element.style.backgroundImage;
            } else {
                gifUrl = element.src;
            }
            
            // Add hover event listeners
            parent.addEventListener('mouseenter', () => {
                if (isBackground) {
                    element.style.backgroundImage = `url('${gifUrl}')`;
                } else {
                    element.src = gifUrl; // Restart the GIF
                }
            });
            
            parent.addEventListener('mouseleave', () => {
                if (isBackground) {
                    // When hovering out, keep the same image but reset it (which pauses the GIF)
                    const currentBg = element.style.backgroundImage;
                    // This causes a reload of the image which pauses the GIF
                    element.style.backgroundImage = 'none';
                    setTimeout(() => {
                        element.style.backgroundImage = currentBg;
                    }, 10);
                } else {
                    // For regular images, reload the same src to pause the GIF
                    const currentSrc = element.src;
                    element.src = '';
                    setTimeout(() => {
                        element.src = currentSrc;
                    }, 10);
                }
            });
        });
    }
    
    // Apply to regular images
    handleGifPause(projectImages);
    
    // Apply to background images
    handleGifPause(portfolioImages, true);
});
