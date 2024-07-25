// Libraries & Files
import React, { useState, useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView';
import Carousel  from './Carousel.tsx'; // Credit: React Round Carousel by scriptex: https://github.com/scriptex/react-round-carousel
import { useDarkMode } from '../../utils/DarkModeToggle/DarkModeContext';
import classNames from 'classnames';
import './Projects.css';

function Projects () {
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


    return (
        <section className="projects" id="projects" ref = {projectsRef}>
            {/* Header title */}
            <h1 className = {projectsHeader}> Project Showcase </h1>
            <h2 className = {projectsSubHeader}>
            "Learning by doing, is not only more effective, its also more fun" - Richard Branson
            </h2>
        </section>
    );
}

export default Projects

