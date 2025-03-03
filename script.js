// Define all visualization categories
const allCategories = [
  'all_categories', 'career', 'character', 'women', 'streetcred',
  'violence', 'family', 'physical'
];

// Initialize scrollama instance
let scroller = scrollama();

// Track device state
let isMobile = window.innerWidth <= 768;

// Reference to the visualization container
const vizContainer = document.querySelector('.viz-container');

/**
 * Preload all visualization images before starting the scrollytelling
 * Returns a promise that resolves when all images are loaded
 */
function preloadImages() {
  // Add loading class to the container
  if (vizContainer) vizContainer.classList.add('loading');
  
  return new Promise((resolve) => {
    let loadedCount = 0;
    let totalImages = 0;
    
    // Count how many images we need to load
    allCategories.forEach(category => {
      totalImages++; // Main visualization
      if (category !== 'all_categories') {
        totalImages++; // Secondary visualization
      }
    });
    
    // Load each image
    allCategories.forEach(category => {
      const img1 = new Image();
      img1.src = `charts/${category}.svg`;
      img1.onload = img1.onerror = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          // Remove loading class
          if (vizContainer) vizContainer.classList.remove('loading');
          resolve();
        }
      };

      if (category !== 'all_categories') {
        const img2 = new Image();
        img2.src = `charts/${category}_sub.svg`;
        img2.onload = img2.onerror = () => {
          loadedCount++;
          if (loadedCount >= totalImages) {
            // Remove loading class
            if (vizContainer) vizContainer.classList.remove('loading');
            resolve();
          }
        };
      }
    });
  });
}

/**
 * Update the visualization based on current step and scroll progress
 * @param {string} category - The current category
 * @param {number} progress - Scroll progress from 0 to 1
 */
function updateVisualization(category, progress = 0) {
  // Hide all visualizations
  document.querySelectorAll('.viz-image.active').forEach(viz => {
    viz.classList.remove('active');
  });
  
  // Adjust threshold for mobile vs desktop
  // Use a lower threshold on mobile for earlier transition
  const progressThreshold = isMobile ? 0.3 : 0.4;
  
  // For "all_categories" we only have one visualization
  // For others, we switch between primary and secondary based on scroll progress
  const vizId = category === 'all_categories'
    ? `${category}-viz-1`
    : `${category}-viz-${progress > progressThreshold ? 2 : 1}`;
  
  // Find and activate the appropriate visualization
  const activeViz = document.getElementById(vizId);
  if (activeViz) {
    activeViz.classList.add('active');
  }
}

/**
 * Handle window resize and orientation change events
 * Detects device changes and adjusts the scrollytelling setup
 */
function handleViewportChange() {
  // Store previous state
  const wasDesktop = !isMobile;
  
  // Update current state
  isMobile = window.innerWidth <= 768;
  
  // Rebuild if crossing mobile/desktop threshold
  if (wasDesktop !== !isMobile) {
    setupScrollama();
  }
  
  // Always resize scrollama
  scroller.resize();
}

/**
 * Set up scrollama with appropriate settings for the current device
 */
function setupScrollama() {
  // Different offset for mobile vs desktop
  // This determines when a step becomes active
  const offset = isMobile ? 0.25 : 0.5;
  
  scroller.setup({
    step: '.step',
    offset: offset,
    progress: true,
    debug: false
  })
  .onStepEnter(response => {
    // Get current category from data attribute
    const category = response.element.dataset.category;
    
    // Update active step styling
    document.querySelectorAll('.step').forEach(step => {
      step.classList.remove('is-active');
    });
    response.element.classList.add('is-active');
    
    // Update visualization on step enter
    updateVisualization(category, 0);
    
    // On mobile, scroll the step into better view if coming from below
    if (isMobile && response.direction === 'up') {
      const rect = response.element.getBoundingClientRect();
      if (rect.top < 0) {
        window.scrollBy({
          top: rect.top - 10,
          behavior: 'smooth'
        });
      }
    }
  })
  .onStepProgress(response => {
    // Update visualization based on scroll progress through the step
    const category = response.element.dataset.category;
    updateVisualization(category, response.progress);
  });
}

/**
 * Smooth scroll to an element by ID
 * @param {string} elementId - The ID of the element to scroll to
 */
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    // Use smooth scrolling behavior when supported
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Fix issues with mobile scrolling by optimizing touch events
 */
function fixMobileScrolling() {
  // Enable smoother touch scrolling
  document.addEventListener('touchstart', function() {}, {passive: true});
  document.addEventListener('touchmove', function() {}, {passive: true});
  
  // Make first step active by default on mobile
  if (isMobile) {
    const firstStep = document.querySelector('.step');
    if (firstStep) firstStep.classList.add('is-active');
    
    // Show first visualization
    updateVisualization('all_categories', 0);
  }
}

// Initialize on page load
window.addEventListener('load', () => {
  console.log('Page loaded, initializing scrollytelling');
  
  // Preload images first
  preloadImages().then(() => {
    // Setup scrollama
    setupScrollama();
    
    // Fix mobile scrolling
    fixMobileScrolling();
    
    // Add event listener for timeline link
    const timelineLink = document.getElementById('timelineLink');
    if (timelineLink) {
      timelineLink.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement('scrolly-start');
      });
    }
    
    console.log('Scrollytelling initialized');
  });
});

// Add debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleViewportChange, 100);
});

// Handle orientation changes
window.addEventListener('orientationchange', () => {
  // Wait for orientation change to complete
  setTimeout(handleViewportChange, 200);
});

// Handle back/forward browser navigation
window.addEventListener('popstate', () => {
  scroller.resize();
});
