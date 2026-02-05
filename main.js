document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminalOutput');
    const commandInput = document.getElementById('commandInput');
    const currentTime = document.getElementById('currentTime');
    
    // Set current time
    currentTime.textContent = new Date().toLocaleString();
    
    // Available commands
    const commands = {
        'help': 'Show available commands',
        'subscribe': 'Subscribe to newsletter',
        'skills': 'Show my technical skills',
        'clear': 'Clear terminal screen',
        'contact': 'Show contact information',
        'about': 'Show about information'
    };
    
    // Skills data
    const skills = {
        'Frontend': ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Angular'],
        'Backend': ['Node.js', 'Python', 'PHP', 'Java', 'Ruby on Rails'],
        'Database': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
        'DevOps': ['Docker', 'Kubernetes', 'AWS', 'Azure'],
        'Tools': ['VS Code', 'Github', 'Git', 'Postman', 'Figma']
    };
    
    // Command history
    let commandHistory = [];
    let historyIndex = -1;
    
    // Focus input on click anywhere
    terminalOutput.addEventListener('click', () => {
        commandInput.focus();
    });
    
    // Handle command input
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = commandInput.value.trim();
            
            if (command) {
                // Add to history
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                
                // Process command
                processCommand(command);
                
                // Clear input
                commandInput.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                if (historyIndex > 0) historyIndex--;
                commandInput.value = commandHistory[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        }
    });
    
    function processCommand(command) {
        // Add command to output
        addOutputLine(`user@portfolio:~$ ${command}`, 'command');
        
        // Process the command
        switch (command.toLowerCase()) {
            case 'help':
                showHelp();
                break;
            case 'subscribe':
                subscribe();
                break;
            case 'skills':
                showSkills();
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'contact':
                showContact();
                break;
            case 'about':
                showAbout();
                break;
            default:
                addOutputLine(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }
        
        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function addOutputLine(text, type = 'response') {
        const line = document.createElement('div');
        line.className = 'output-line';
        
        const span = document.createElement('span');
        span.className = type;
        span.textContent = text;
        
        line.appendChild(span);
        terminalOutput.insertBefore(line, terminalOutput.lastElementChild);
    }
    
    function showHelp() {
        addOutputLine('Available commands:', 'response');
        addOutputLine('--------------------------------------------------', 'response');
        for (const [cmd, desc] of Object.entries(commands)) {
            addOutputLine(`${cmd.padEnd(12)} - ${desc}`, 'response');
        }
    }
    
    function subscribe() {
        addOutputLine('Subscribing to newsletter...', 'response');
        
        setTimeout(() => {
            addOutputLine('Connecting to server...', 'response');
            
            setTimeout(() => {
                addOutputLine('Authentication successful...', 'success');
                
                setTimeout(() => {
                    const email = prompt('Enter your email address:');
                    if (email) {
                        addOutputLine(`Subscription successful! Welcome aboard, ${email}`, 'success');
                        addOutputLine('You will receive updates about new projects and technologies.', 'response');
                    } else {
                        addOutputLine('Subscription cancelled.', 'error');
                    }
                }, 800);
            }, 800);
        }, 800);
    }
    
    function showSkills() {
        addOutputLine('My Technical Skills:', 'response');
        addOutputLine('--------------------------------------------------', 'response');
        
        for (const [category, skillList] of Object.entries(skills)) {
            addOutputLine(category + ':', 'skill-category');
            skillList.forEach(skill => {
                addOutputLine('• ' + skill, 'skill-item');
            });
        }
    }
    
    function clearTerminal() {
        const outputLines = terminalOutput.querySelectorAll('.output-line');
        outputLines.forEach(line => line.remove());
    }
    
    function showContact() {
        addOutputLine('Contact Information:', 'response');
        addOutputLine('--------------------------------------------------', 'response');
        addOutputLine('Email: hozyfabatisha@gmail.com', 'response');
        addOutputLine('LinkedIn: linkedin.com/in/hozyfa-batisha', 'response');
        addOutputLine('GitHub: github.com/Hozyfa-Batisha', 'response');
        addOutputLine('Portfolio: HozyfaBatisha.dev', 'response');
    }
    
    function showAbout() {
    addOutputLine('About Me:', 'response');
    addOutputLine('--------------------------------------------------', 'response');
    addOutputLine('Full-stack developer with expertise in C++, JavaScript, and cybersecurity.', 'response');
    addOutputLine('Passionate about problem solving, building secure web apps, and exploring Linux systems.', 'response');
    addOutputLine('Currently diving deep into DevOps, ethical hacking, and modern frontend frameworks.', 'response');
    addOutputLine('Always curious and open to new challenges.', 'response');
    }
    
    // Auto-focus input on load
    commandInput.focus();
});