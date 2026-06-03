// Career database with required skills
const careerDatabase = {
    "Data Scientist": {
        skills: ["python", "sql", "machine learning", "statistics", "data visualization", "pandas", "scikit-learn"],
        resources: {
            python: "https://www.python.org/about/gettingstarted/",
            sql: "https://www.w3schools.com/sql/",
            "machine learning": "https://www.coursera.org/learn/machine-learning",
            statistics: "https://www.khanacademy.org/math/statistics-probability",
            "data visualization": "https://www.tableau.com/learn/training"
        }
    },
    "Frontend Developer": {
        skills: ["html", "css", "javascript", "react", "git", "responsive design", "bootstrap"],
        resources: {
            html: "https://www.w3schools.com/html/",
            css: "https://www.w3schools.com/css/",
            javascript: "https://javascript.info/",
            react: "https://reactjs.org/docs/getting-started.html",
            git: "https://git-scm.com/doc"
        }
    },
    "Backend Developer": {
        skills: ["python", "java", "node.js", "sql", "api design", "database", "docker"],
        resources: {
            python: "https://www.python.org/about/gettingstarted/",
            "node.js": "https://nodejs.org/en/docs/guides/getting-started-guide/",
            sql: "https://www.w3schools.com/sql/",
            docker: "https://docs.docker.com/get-started/"
        }
    },
    "Cybersecurity Analyst": {
        skills: ["networking", "linux", "python", "risk assessment", "security tools", "encryption"],
        resources: {
            networking: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-computer-networking.html",
            linux: "https://linuxjourney.com/",
            python: "https://www.python.org/about/gettingstarted/",
            "security tools": "https://www.kali.org/tools/"
        }
    },
    "AI/ML Engineer": {
        skills: ["python", "machine learning", "deep learning", "tensorflow", "pytorch", "statistics", "nlp"],
        resources: {
            python: "https://www.python.org/about/gettingstarted/",
            "machine learning": "https://www.coursera.org/learn/machine-learning",
            "deep learning": "https://www.deeplearning.ai/",
            tensorflow: "https://www.tensorflow.org/tutorials"
        }
    },
    "DevOps Engineer": {
        skills: ["linux", "docker", "kubernetes", "jenkins", "aws", "terraform", "git"],
        resources: {
            linux: "https://linuxjourney.com/",
            docker: "https://docs.docker.com/get-started/",
            kubernetes: "https://kubernetes.io/docs/tutorials/",
            aws: "https://aws.amazon.com/training/"
        }
    },
    "Product Manager": {
        skills: ["agile", "scrum", "product strategy", "user research", "data analysis", "communication", "leadership"],
        resources: {
            agile: "https://www.agilealliance.org/agile101/",
            "product strategy": "https://www.productplan.com/learn/product-strategy/",
            "user research": "https://www.nngroup.com/articles/user-research-methods/"
        }
    },
    "UX Designer": {
        skills: ["figma", "user research", "prototyping", "wireframing", "usability testing", "visual design"],
        resources: {
            figma: "https://www.figma.com/resources/learn-design/",
            prototyping: "https://www.interaction-design.org/literature/topics/prototyping",
            "user research": "https://www.usability.gov/how-to-and-tools/methods/user-research/index.html"
        }
    }
};

function analyzeGap() {
    // Get user inputs
    const skillsInput = document.getElementById('skills').value;
    const career = document.getElementById('career').value;
    
    // Validate inputs
    if (!career) {
        alert('Please select a career');
        return;
    }
    
    if (!skillsInput.trim()) {
        alert('Please enter your skills');
        return;
    }
    
    // Parse user skills
    const userSkills = skillsInput.toLowerCase()
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    
    // Get required skills for selected career
    const careerData = careerDatabase[career];
    if (!careerData) {
        alert('Career data not found');
        return;
    }
    
    const requiredSkills = careerData.skills;
    
    // Find missing skills
    const missingSkills = requiredSkills.filter(skill => 
        !userSkills.some(userSkill => userSkill.includes(skill) || skill.includes(userSkill))
    );
    
    // Calculate match percentage
    const matchedSkills = requiredSkills.filter(skill => 
        userSkills.some(userSkill => userSkill.includes(skill) || skill.includes(userSkill))
    );
    
    const matchPercentage = Math.round((matchedSkills.length / requiredSkills.length) * 100);
    
    // Generate learning resources
    const learningResources = [];
    missingSkills.slice(0, 5).forEach(skill => {
        if (careerData.resources[skill]) {
            learningResources.push(`<a href="${careerData.resources[skill]}" target="_blank">Learn ${skill}</a>`);
        } else {
            learningResources.push(`<span>📚 ${skill} - Search on Coursera/Udemy</span>`);
        }
    });
    
    // Generate study plan
    const studyPlan = generateStudyPlan(missingSkills.slice(0, 3));
    
    // Display results
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');
    
    resultContent.innerHTML = `
        <h2>📊 Analysis for ${career}</h2>
        
        <div class="match-percentage">
            🎯 Match Score: ${matchPercentage}%
        </div>
        
        <div class="progress-bar" style="background: #e0e0e0; border-radius: 10px; height: 20px; margin: 20px 0;">
            <div style="background: linear-gradient(90deg, #667eea, #764ba2); width: ${matchPercentage}%; height: 100%; border-radius: 10px; transition: width 0.5s;"></div>
        </div>
        
        <h3>✅ Skills You Have:</h3>
        <div>
            ${matchedSkills.map(skill => `<span class="skill-badge">✓ ${skill}</span>`).join('')}
            ${matchedSkills.length === 0 ? '<p>None yet! Time to start learning.</p>' : ''}
        </div>
        
        <h3>❌ Skills You Need to Learn:</h3>
        <div class="missing-skills">
            ${missingSkills.map(skill => `<span class="skill-badge missing">📖 ${skill}</span>`).join('')}
            ${missingSkills.length === 0 ? '<p>🎉 Congratulations! You have all the required skills!</p>' : ''}
        </div>
        
        ${missingSkills.length > 0 ? `
            <h3>📚 Recommended Learning Resources:</h3>
            <div style="margin: 15px 0;">
                ${learningResources.map(link => `<div style="margin: 10px 0;">${link}</div>`).join('')}
            </div>
            
            <h3>🗓️ 30-Day Learning Plan:</h3>
            <div style="background: white; padding: 15px; border-radius: 8px;">
                ${studyPlan}
            </div>
            
            <h3>💡 Quick Tips:</h3>
            <ul>
                <li>Focus on ${missingSkills[0]} first - it's most important for ${career}</li>
                <li>Practice daily for at least 30 minutes</li>
                <li>Build a portfolio project using these skills</li>
                <li>Join online communities for ${career}</li>
            </ul>
        ` : ''}
    `;
    
    resultDiv.style.display = 'block';
    
    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateStudyPlan(topSkills) {
    if (topSkills.length === 0) return '<p>You already have all skills! Consider advancing to expert level.</p>';
    
    let plan = '<ol style="margin-left: 20px;">';
    
    if (topSkills[0]) {
        plan += `<li><strong>Week 1-2:</strong> Master ${topSkills[0]} - Complete beginner to intermediate level</li>`;
    }
    if (topSkills[1]) {
        plan += `<li><strong>Week 3:</strong> Learn ${topSkills[1]} fundamentals and build small projects</li>`;
    }
    if (topSkills[2]) {
        plan += `<li><strong>Week 4:</strong> Study ${topSkills[2]} and combine with previous skills for a final project</li>`;
    }
    
    plan += '</ol>';
    plan += '<p><strong>🎯 Final Week Goal:</strong> Build one complete project using all new skills</p>';
    
    return plan;
}

// Add event listener for Enter key in textarea
document.getElementById('skills').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        analyzeGap();
    }
});

// Add career description on selection
document.getElementById('career').addEventListener('change', function() {
    const career = this.value;
    if (career && careerDatabase[career]) {
        console.log(`Selected: ${career} - Requires ${careerDatabase[career].skills.length} skills`);
    }
});