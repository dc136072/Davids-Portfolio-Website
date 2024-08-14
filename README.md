# Portfolio Website
A website about myself created with React, Node.js, HTML, CSS, and JavaScript

# Sections
* Home - Introductory page
* About - Personal section about myself
* What I Do - My skills and interests
* Projects - Projects I've made for school and for fun
* Contact - A form to contact me

# Creation Process
Drafting - I did rough sketches and had ideas for websites first, and thought about the functions.  
**Code Planning** - Before actually coding, I had to plan out the file tree structure, the code structure & syntax, and find open source code that I could use. I also had to plan out the color scheme, fonts, and other design elements. 
**Coding** - I had to learn how to use some features of React, such as utilizing hooks, components, state management, props, and refs. I also had to organize the file structure with a balance between simplicity and organization.

Overall, I think it was really fun! This is strangely what led to the more challenging parts, as what slowed me down the most was feature creep - I felt like there were so many possible cool things I could add, and the rate that I came up with new ideas felt faster than the speed I could code them. I would try to remember to use features that would fit the website, not the other way around. 

 ## File Tree
```
Davids-Portfolio-Website/
├── src/
│   ├── app.js                          // Main js file that renders all components 
│   ├── app.css                         // Main css file that styles all components
|   └── fonts/                          // Fonts used
|   └── images/                         // Images used
│   └── components/                     // Components for each section
│       ├── Home/
│       ├── About/
│       ├── Skills/
│       ├── Projects/
│       ├── Contact/
|   └── hooks/                          // Custom hooks - Reusable functions to check if the section is in view & get window dimensions
│       ├── useInView.js
│       ├── useWindowDimensions.js
|   └── shared/                         // Shared components - Reusable components used in multiple sections such as Dark Mode
│       ├── DarkModeToggle.js
│       ├── DebugWindowDimensions.js
│       ├── HoverImage.js

```

## Credits - Open Source Code & Websites Used
- [React Rotating Text](https://www.npmjs.com/package/react-rotating-text?activeTab=readme) - The typing effect in the Home section
- [Polaroid Wrapper](https://codepen.io/havardob/pen/jOwrXaJ ) - The polaroid image wireframe in the About section
- [React Round Carousel](https://github.com/scriptex/react-round-carousel) - Base code for the carousel in the Projects section
- [Netlify.com](https://www.netlify.com/) - The hosting service for the website
- [Web3Forms.com](https://web3forms.com/) - The contact form service for the website

