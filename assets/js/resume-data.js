(function () {
    "use strict";

    window.RESUME_DATA = {
        profile: {
            name: "Quentin Adolphe",
            location: "Detroit, MI",
            email: "qadolphe1@gmail.com",
            website: "https://qadolphe.com",
            linkedin: "https://www.linkedin.com/in/quentin-adolphe-b72a04223",
            github: "https://github.com/qadolphe"
        },

        education: [
            {
                id: "education-gatech",
                institution: "Georgia Institute of Technology",
                degree: "Master of Science in Computer Science",
                details: "Edge AI specialization",
                date: "Expected 2029",
                defaultSelected: true
            },
            {
                id: "education-swarthmore",
                institution: "Swarthmore College",
                degree: "Bachelor of Arts in Computer Science, Minor in Engineering",
                details: "GPA: 3.9/4.0",
                date: "Class of 2025",
                defaultSelected: true
            }
        ],

        experience: [
            {
                id: "role-gm-robotics",
                organization: "General Motors",
                title: "Robotics AI/ML Software Engineer",
                date: "Sep 2026 - Present",
                location: "",
                skills: ["Robotics", "Motion Planning", "Scene Perception", "Autonomous Systems"],
                bullets: [
                    "Integrate and test motion-planning and scene-perception software for autonomous systems."
                ],
                defaultSelected: true
            },
            {
                id: "role-gm-dimensional",
                organization: "General Motors",
                title: "Dimensional Systems Engineer",
                date: "Mar 2026 - Sep 2026",
                location: "",
                skills: ["Python", "Databricks", "ETL", "Excel", "VBA", "Simulation"],
                bullets: [
                    "Replaced a manual Excel/VBA workflow with a Databricks ETL pipeline, processing approximately 100,000 deliverable rows across vehicle programs to improve DSE visibility and execution.",
                    "Developed a 3D variational autoencoder tool to edit tolerance models, run simulations, analyze results, and generate reports, saving more than 40 hours per simulation and reporting cycle."
                ],
                defaultSelected: true
            },
            {
                id: "role-gm-cfd",
                organization: "General Motors",
                title: "CFD Automation Engineer",
                date: "Jul 2025 - Mar 2026",
                location: "",
                skills: ["Python", "React", "Electron", "Flask", "TypeScript", "HPC", "Pandas", "NumPy"],
                bullets: [
                    "Built a Python analytics framework to evaluate tire parameters affecting virtual vehicle stability.",
                    "Rebuilt a legacy Tkinter GUI as a React, Electron, and Flask application to streamline preprocessing, HPC submission, monitoring, and postprocessing work."
                ],
                defaultSelected: true
            },
            {
                id: "role-swarthmore-ta",
                organization: "Swarthmore College",
                title: "Teaching Assistant - Computer Vision & Mobile Robotics",
                date: "Jan 2024 - May 2025",
                location: "",
                skills: ["Computer Vision", "Teaching", "Python"],
                bullets: [
                    "Helped students work through labs in perception algorithms, robot kinematics, and control systems.",
                    "Reviewed and debugged assignments for 20+ students, giving feedback on code and problem-solving approaches."
                ],
                defaultSelected: true
            },
            {
                id: "role-gm-validation",
                organization: "General Motors",
                title: "Software Validation Engineer Intern",
                date: "May 2024 - Aug 2024",
                location: "",
                skills: ["Software Validation", "ECU", "Automation", "Software-Defined Vehicles"],
                bullets: [
                    "Built applications supporting flash development, including a custom utility file generator.",
                    "Automated ECU flash validation against Software-Defined Vehicle specifications."
                ],
                defaultSelected: true
            },
            {
                id: "role-usaa",
                organization: "USAA",
                title: "Software Engineering Intern",
                date: "May 2023 - Aug 2023",
                location: "",
                skills: ["React", "JavaScript", "Full-Stack Development", "Database Integration"],
                bullets: [
                    "Contributed to full-stack development of a modernized life insurance application with database integration.",
                    "Implemented pages with React and JavaScript and created application metadata."
                ],
                defaultSelected: true
            },
            {
                id: "role-forward-edge",
                organization: "Forward Edge AI",
                title: "Economic Research Investigator",
                date: "May 2022 - Aug 2022",
                location: "",
                skills: ["Research", "Cybersecurity", "Economics", "Technical Writing"],
                bullets: [
                    "Wrote a National Science Foundation-funded economics research paper on the business operations of international scam centers and criminal organizations.",
                    "Assessed cybersecurity and operational capabilities for the NSA Protocol Free Encryption Device as part of a Cooperative Research and Development Agreement team."
                ],
                defaultSelected: false
            }
        ],

        projects: [
            {
                id: "project-running-analysis",
                name: "Running Analysis with Machine Learning",
                technologies: ["Kotlin", "TensorFlow", "Computer Vision", "Machine Learning"],
                url: "https://github.com/qadolphe/Running-Form-Analyzer",
                bullets: [
                    "Used TensorFlow's Thunder convolutional neural network to estimate a sprinter's joint positions.",
                    "Trained a neural network to identify the current phase of a sprinter in motion."
                ],
                defaultSelected: true
            },
            {
                id: "project-triangulation",
                name: "3D Triangulation of Objects",
                technologies: ["Python", "Computer Vision", "Stereo Calibration"],
                url: "https://github.com/qadolphe/3D-Triangualtion-with-Stereo-Vision",
                bullets: [
                    "Calibrated a stereo camera setup to calculate 3D real-world coordinates from 2D images."
                ],
                defaultSelected: true
            },
            {
                id: "project-turtlebot",
                name: "Turtlebot Maze Traversal",
                technologies: ["Python", "Robotics", "Dijkstra's Algorithm", "Control Systems"],
                url: "https://mzucker.github.io/swarthmore/e28_f2023/final_project.html",
                bullets: [
                    "Implemented Dijkstra's algorithm and a proportional-derivative controller to navigate a robot through a maze."
                ],
                defaultSelected: true
            },
            {
                id: "project-heart-rate",
                name: "Heart Rate Monitor",
                technologies: ["C++", "MATLAB", "Embedded Systems", "ECG"],
                url: "https://github.com/qadolphe/Heart-Rate-Monitor",
                bullets: [
                    "Designed and built an ECG measurement system using a Nucleo microcontroller board."
                ],
                defaultSelected: false
            },
            {
                id: "project-traffic-light",
                name: "Traffic Light Controller",
                technologies: ["C++", "Embedded Systems", "State Machines", "Ultrasonic Sensors"],
                url: "https://github.com/qadolphe/Stoplight-State-Machine",
                bullets: [
                    "Built a state-machine traffic light controller for a T-intersection using ultrasonic sensors."
                ],
                defaultSelected: false
            },
            {
                id: "project-cubic-spline",
                name: "Cubic Spline Interpolation",
                technologies: ["Python", "Numerical Methods", "Gauss-Seidel Method"],
                url: "https://github.com/qadolphe/Cubic-Splines",
                bullets: [
                    "Implemented curve fitting with piecewise third-order polynomials and the Gauss-Seidel method."
                ],
                defaultSelected: false
            },
            {
                id: "project-orbital-simulation",
                name: "Sun-Earth-Moon Orbital Simulation",
                technologies: ["Python", "Numerical Methods", "Ordinary Differential Equations"],
                url: "https://github.com/qadolphe/Sun-Earth-Moon-Simulation",
                bullets: [
                    "Simulated celestial-body positions using Newtonian mechanics and ordinary differential equation solvers."
                ],
                defaultSelected: false
            },
            {
                id: "project-chaos-random",
                name: "Chaos Pseudorandom Generator",
                technologies: ["Python", "Security", "Numerical Methods"],
                url: "https://github.com/qadolphe/CS88-Final-Project",
                bullets: [
                    "Generated pseudorandom numbers from the chaotic motion of simulated double pendulums."
                ],
                defaultSelected: false
            },
            {
                id: "project-hybrid-images",
                name: "Hybrid Images",
                technologies: ["Python", "Computer Vision", "Image Processing"],
                url: "https://qadolphe.com/QA_CS_git_blends.html",
                bullets: [
                    "Blended images with Laplacian masks and frequency-domain image processing."
                ],
                defaultSelected: false
            },
            {
                id: "project-tennis-tracking",
                name: "Tennis Player Tracking",
                technologies: ["Python", "Computer Vision", "Object Tracking"],
                url: "https://qadolphe.com/QA_CSgit_tennis.html",
                bullets: [
                    "Tracked tennis players over time using temporal averaging and morphological operators."
                ],
                defaultSelected: false
            },
            {
                id: "project-swatbloc",
                name: "Swatbloc Headless Commerce",
                technologies: ["TypeScript", "Next.js", "Google Gemini API", "Turborepo"],
                url: "",
                bullets: [
                    "Designed a type-safe headless commerce SDK in a Turborepo monorepo.",
                    "Built a generative UI engine using the Google Gemini API for natural-language theme generation."
                ],
                defaultSelected: false
            },
            {
                id: "project-lattice-boltzmann",
                name: "Lattice Boltzmann Computational Fluid Dynamics",
                technologies: ["Python", "Machine Learning", "Numerical Methods", "CFD"],
                url: "https://github.com/qadolphe/CFD_Start",
                bullets: [
                    "Implemented a Lattice Boltzmann fluid simulation and explored neural-network prediction of airflow."
                ],
                defaultSelected: false
            },
            {
                id: "project-stock-trading",
                name: "Automated Stock Trading",
                technologies: ["Python", "Artificial Intelligence", "Sentiment Analysis", "Finance"],
                url: "",
                bullets: [
                    "Built an automated trading prototype that used news-headline sentiment analysis to inform predictions."
                ],
                defaultSelected: false
            },
            {
                id: "project-college-rideshare",
                name: "College Ride Share",
                technologies: ["Swift", "iOS", "Mobile Development"],
                url: "https://github.com/qadolphe/College-Ride-Share-App",
                bullets: [
                    "Developed an iOS application for Swarthmore College students to coordinate airport trips and split costs."
                ],
                defaultSelected: false
            },
            {
                id: "project-game-of-life",
                name: "Conway's Game of Life",
                technologies: ["C#", "Unity", "Game Development"],
                url: "https://qadolphe.com/web/index.html",
                bullets: [
                    "Developed an interactive Unity implementation of Conway's cellular automaton."
                ],
                defaultSelected: false
            }
        ],

        activities: [
            {
                id: "activity-varsity-track",
                name: "Varsity Track and Field",
                organization: "Swarthmore College",
                details: "Student-athlete; additional interests include soccer and ultimate frisbee.",
                date: "",
                defaultSelected: true
            }
        ],

        skillGroups: [
            {
                label: "Programming",
                items: ["Python", "Java", "JavaScript", "TypeScript"]
            },
            {
                label: "Frameworks and Platforms",
                items: ["React", "Node.js", "Flask", "Databricks"]
            },
            {
                label: "AI and Robotics",
                items: ["Machine Learning", "Computer Vision", "Robotics"]
            },
            {
                label: "Data and Automation",
                items: ["Data Aggregation", "Process Automation", "ETL Pipelines", "MCP Servers"]
            }
        ],

        skills: [
            "Data Aggregation",
            "Process Automation",
            "ETL Pipelines",
            "Python",
            "Java",
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Flask",
            "Databricks",
            "Machine Learning",
            "Computer Vision",
            "Robotics",
            "MCP Servers"
        ]
    };
}());
