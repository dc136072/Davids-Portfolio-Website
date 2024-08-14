//--------------------------------------------------------------------------------------//
//                                       Projects.js                                       //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useState, useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView'; 
import Carousel  from './Carousel.tsx'; // Credit: React Round Carousel by scriptex: https://github.com/scriptex/react-round-carousel
import { useDarkMode } from '../../utils/DarkModeToggle/DarkModeContext';
import classNames from 'classnames';
import './Projects.css';

// Slideshow images & video in webp format - Optimized for faster loading
import InProgressWebp from '../../images/projects_images/slideshow_images/work-in-progress.webp';
import GitHubWebp from '../../images/projects_images/slideshow_images/GitHub-logo.webp';

// Backup slideshow imagesin png/ mp4 format - For browsers that don't support webp
import InProgressPng from '../../images/projects_images/slideshow_images/work-in-progress.png';
import GitHubPng from '../../images/projects_images/slideshow_images/GitHub-logo.png';


// Gradient colors for each slide's captions
const rainbowGradient = 'linear-gradient(45deg, #fcb0a9, #a3c9f8, #a6fcb3, #fff2cc)';
const blueGradient = 'linear-gradient(45deg, #e6f9ff, #b3ecff, #80dfff, #4dd2ff, #1ac6ff, #0077be, #004f8c)';
const orangeGradient = 'linear-gradient(45deg, #ffa500, #ffcc80, #ffdbb5)';

// Array of slides to use for slideshow pictures
const project_data = [
    { 
        image: InProgressPng,
        imageWebp: InProgressWebp,
        title: "GrooveGalaxy", 
        description: (
            <span> 
                A Spotify-inspired web application with React and Node.js, featuring tailored playlists for themes like 'Calm' and 'Gaming'.
            </span>
        ),
        captions: [
            { text: 'Personal', style: { background: blueGradient, }},
        ]

    },

    { 
        image: InProgressPng, 
        imageWebp: InProgressWebp,
        title: "Dialogue Pro",
        description: (
            <span> 
                <a href="https://github.com/dc136072/Django-Dialogue-Pro" target="_blank" rel="noopener noreferrer">GitHub:</a>{" "}
                A full stack application using ChatGPT's API to replicate ChatGPT 
                where people could find information and insights.
            </span>
        ),
        captions: [
            { text: 'Personal', style: { background: rainbowGradient}},
        ]
    },

    {
        image: GitHubPng,
        imageWebp: GitHubWebp,
        title: 'Ideas',
        description: (
            <span> 
               More to come.
            </span>
        ),
        captions: [
            { text: 'Ideas', style: { background: orangeGradient}},
        ]
    },


];

// Function to add padding to each caption
const addPaddingToCaptions = (projects) => {
    return projects.map(project => ({
        ...project,
        captions: project.captions.map(caption => ({
            ...caption,
            style: { ...caption.style, borderRadius: '.5rem', margin: '0px 0px', padding: '3.5px 10px' }
        }))
    }));
};

// New project data w/ all the styles above like padding. Pass this arg in instead.
const updatedProjectData = addPaddingToCaptions(project_data);

function Projects() {
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentCaptions, setCurrentCaptions] = useState([]);
    const { isDarkMode } = useDarkMode();
    const carouselRef = useRef(null);
    const projectsRef = useRef(null);           // Ref to play animations when Projects section is in view
    const isProjectsInView = useInView(projectsRef, { threshold:[0.2], sectionName: "projects"});    //
    const projectsHeader = classNames({
        'projects__header': true,
        'section-header': true,
        'animate-projects-header': isProjectsInView,
        'dark-mode': isDarkMode,
    });
    const projectsSubHeader = classNames({
        'projects__subheader': true,
        'section-subheader': true,
        'animate-projects-subheader': isProjectsInView,
        'dark-mode': isDarkMode,
    });
    const projectsLeft = classNames({
        'projects__left': true,
        'animate-projects-left': isProjectsInView,
        'dark-mode': isDarkMode,
    });
    const projectsRight = classNames({
        'projects__right': true,
        'animate-projects-right': isProjectsInView,
        'dark-mode': isDarkMode,
    });

    // Function to check browser for WebP support
    const supportsWebp = () => {
        try {
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } catch (err) {
        return false;
        }
    };  

    // On mount, prefetch images and videos
    useEffect(() => {
        const webpSupported = supportsWebp(); 
        const mediaToPrefetch = [
            webpSupported ? InProgressWebp : InProgressPng,
        ];

        mediaToPrefetch.forEach((mediaPath) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = mediaPath;
            document.head.appendChild(link);
        });
    }, []); // Empty dependency array means this runs once on component mount


    // On mount, update the description and title of the current slide
    useEffect(() => {
        // Function: Update the description and title of the current slide
        const descriptionUpdater = () => {
            const currentIndex = carouselRef.current?.getSelectedIndex();
            if (currentIndex !== undefined) {
                const project = updatedProjectData[currentIndex];
                setCurrentDescription(project.description);
                setCurrentTitle(project.title);
                setCurrentCaptions(Array.isArray(project.captions) ? project.captions : []);
            }
        };
    
        // Update description initially and on slide change
        descriptionUpdater();
        const interval = setInterval(descriptionUpdater, 1000);
    
        // Set a timeout to hide the tooltip text after 4 seconds
        let tooltipTimeout;
        if (isProjectsInView) {
            tooltipTimeout = setTimeout(() => {
                const tooltipElement = document.querySelector('.projects__carousel__tooltip');
                if (tooltipElement) tooltipElement.classList.add('tooltip-hide');
            }, 5000);
        } else {
            const tooltipElement = document.querySelector('.projects__carousel__tooltip');
            if (tooltipElement) tooltipElement.classList.remove('tooltip-hide');
        }
    
        // Cleanup function to clear interval and timeout when the component unmounts
        return () => {
            clearInterval(interval);
            if (tooltipTimeout) clearTimeout(tooltipTimeout);
        };
    }, [isProjectsInView, currentDescription]); // Dependencies: isProjectsInView and currentDescription
    
    
    // Mapping data to carousel items for Carousel.tsx.
    // Note: Carousel.tsx shows a video if it exists, otherwise it shows a webp, and finally a png if webp is not supported.
    const carouselItems = updatedProjectData.map((project, index) => ({
        image: project.image,           // Fall back to png/mp4 if webp is not supported
        imageWebp: project.imageWebp,
        videoWebp: project.videoWebp,
        videoMp4: project.videoMp4,
    }));

    // Function: Animate the clicked arrow button
    document.querySelectorAll('.arrow__button').forEach(arrowButton => {
        arrowButton.addEventListener('click', function() {
            // Force restart of the animation
            this.classList.remove('animation');
            void this.offsetWidth; // Trigger a reflow to restart the animation
            this.classList.add('animation');

            // Set a timeout to remove the animation class after 1.4 seconds
            setTimeout(() => {
                this.classList.remove('animation');
            }, 1400); // 1.4 seconds
        });
    });

    // Function: Click right arrow button to go to the next slide
    const goToNextSlide = () => {
        carouselRef.current?.next(); // Calls the 'next' method of Carousel
    };

    // Function: Click left arrow button to go to the previous slide
    const goToPrevSlide = () => {
        carouselRef.current?.prev(); // Calls the 'prev' method of Carousel
    };

    // Render the Projects section
    return (
        <section className="projects" id="projects" ref = {projectsRef}>
            {/* Header title */}
            <h1 className = {projectsHeader}> Project Showcase </h1>
            <h2 className = {projectsSubHeader}>
            "The absolute best way to learn is by doing." - Aristotle
            </h2>
            <div className = "projects__section">
                {/* Left side w/ Carousel slideshow  */}
                <div className = {projectsLeft}>
                    <div className="projects__carousel-wrapper">
                        <Carousel ref={carouselRef} items={carouselItems}/>
                    </div>
                </div>
                {/* Right side w/ dynamic project description */}
                <div className = {projectsRight}>
                    <div className="projects__text-container">
                        <div className="row-wrapper">
                            {/* Title & Captions */}
                            <h2 className="projects__title">{currentTitle}</h2>
                            <div className="projects__captions ">
                            {currentCaptions.map((caption, index) => (
                                <span key={index} style={caption.style}>
                                    {caption.text}
                                </span>
                            ))}
                            </div>
                            {/* Arrow buttons */}
                            <div className="arrow__buttons__container">
                                <button className="arrow__button left" onClick={goToPrevSlide} aria-label = "Previous Slide Button"></button>
                                <button className="arrow__button right" onClick={goToNextSlide} aria-label = "Previous Slide Button"></button>
                            </div>
                        </div>
                        {/* Description */}
                        <p className="projects__description">{currentDescription}</p>
                    </div>
                    {/* Instructions on how to move the Carousel, dissapears after a few sec. */}
                    <div className='projects__carousel__tooltip'>
                        <p><i>Scroll with buttons, arrow keys, or swipe.</i></p>
                        <div className="tooltip__gifs-container">
                            <div className="tooltip__gif tap-animation"></div>
                            <div className="tooltip__gif key-animation"></div>
                            <div className="tooltip__gif swipe-animation"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
    
    }

export default Projects;
