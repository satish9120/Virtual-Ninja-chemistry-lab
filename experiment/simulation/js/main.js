//Your JavaScript goes in here
document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const soluteBeaker = document.getElementById('soluteBeaker');
    const waterBeaker = document.getElementById('waterBeaker');
    const solutionBeaker = document.getElementById('solutionBeaker');
    const soluteParticles = document.getElementById('soluteParticles');
    const solutionLiquid = document.getElementById('solutionLiquid');
    const solutionSolute = document.getElementById('solutionSolute');
    const calculateBtn = document.getElementById('calculate-btn');
    const requiredMassDisplay = document.getElementById('required-mass');
    const massDisplay = document.getElementById('mass-display');
    const statusDisplay = document.getElementById('status');
    const concentrationInput = document.getElementById('concentration');
    const volumeInput = document.getElementById('volume');
    const soluteSelect = document.getElementById('solute-select');
    const stirringRod = document.getElementById('stirringRod');
    const soluteName = document.getElementById('soluteName');
    const water = document.getElementById('water');

    // Step elements
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const step5 = document.getElementById('step5');

    // Variables
    let requiredMass = 0;
    let currentStep = 1;
    let currentVolume = 0;
    let targetVolume = 250;
    let soluteTransferred = false;

    // Initialize solute display
    updateSoluteDisplay();

    // Event listeners
    calculateBtn.addEventListener('click', calculateMass);
    soluteBeaker.addEventListener('click', handleSoluteClick);
    waterBeaker.addEventListener('click', handleWaterClick);
    solutionBeaker.addEventListener('click', handleSolutionClick);
    soluteSelect.addEventListener('change', updateSoluteDisplay);

    // Initialize with step 1 active
    updateSteps();

    function updateSoluteDisplay() {
        const solute = soluteSelect.value;
        soluteName.textContent = solute;
        createParticles(soluteParticles, 100, solute);
    }

    function calculateMass() {
        const concentration = parseFloat(concentrationInput.value);
        targetVolume = parseFloat(volumeInput.value);
        const volumeInLiters = targetVolume / 1000; // Convert mL to L
        const solute = soluteSelect.value;

        // Molar masses (g/mol)
        const molarMasses = {
            'NaCl': 58.44,
            'NaOH': 40.00,
            'HCl': 36.46
        };

        requiredMass = concentration * volumeInLiters * molarMasses[solute];
        requiredMassDisplay.textContent = requiredMass.toFixed(4) + ' g';
        massDisplay.style.display = 'block';

        // Update steps
        currentStep = 2;
        updateSteps();

        statusDisplay.textContent = `Calculated: ${requiredMass.toFixed(4)} g of ${solute} needed. Click solute to transfer.`;
    }

    function handleSoluteClick() {
        if (currentStep < 2) {
            statusDisplay.textContent = "Please calculate the required mass first";
            return;
        }

        if (soluteTransferred) return;

        statusDisplay.textContent = "Transferring solute...";
        soluteTransferred = true;

        // Transfer to solution beaker
        transferSolute();
    }

    function handleWaterClick() {
        if (!soluteTransferred) {
            statusDisplay.textContent = "Please transfer solute first";
            return;
        }

        if (currentVolume >= targetVolume) {
            statusDisplay.textContent = "Already reached target volume";
            return;
        }

        const addVolume = 50;
        currentVolume = Math.min(currentVolume + addVolume, targetVolume);

        const newHeight = (currentVolume / targetVolume) * 80;
        solutionLiquid.style.height = `${newHeight}%`;

        pourWater();

        statusDisplay.textContent = `Added ${addVolume}mL water (${currentVolume}/${targetVolume}mL). Click to add more.`;

        if (currentVolume >= targetVolume) {
            currentStep = 4;
            updateSteps();
            statusDisplay.textContent = `Reached target volume (${targetVolume}mL). Click solution beaker to mix.`;
        }
    }

    function handleSolutionClick() {
        if (currentVolume < targetVolume) {
            statusDisplay.textContent = "Please add more water first";
            return;
        }

        statusDisplay.textContent = "Mixing the solution...";
        currentStep = 5;
        updateSteps();
        mixSolution();
    }

    function transferSolute() {
        const balanceDisplay = document.querySelector('.balance-display');
        const rightPan = document.querySelector('.balance-pan-right');

        rightPan.style.transform = 'translateY(-8px)';

        let currentMass = 0;
        const weighingInterval = setInterval(() => {
            currentMass += 0.002;
            if (currentMass >= requiredMass) {
                currentMass = requiredMass;
                clearInterval(weighingInterval);

                balanceDisplay.textContent = currentMass.toFixed(4) + ' g';
                rightPan.style.transform = 'translateY(0)';

                const soluteRect = soluteBeaker.getBoundingClientRect();
                const beakerRect = solutionBeaker.getBoundingClientRect();

                pourParticles(soluteRect, beakerRect, 50, () => {
                    solutionSolute.style.height = '30%';
                    createParticles(solutionSolute, 100, soluteSelect.value);

                    currentStep = 3;
                    updateSteps();
                    statusDisplay.textContent = "Solute transferred. Click water beaker to add solvent (50mL per click).";
                });
            }
            balanceDisplay.textContent = currentMass.toFixed(4) + ' g';
        }, 10);
    }

    function pourWater() {
        const waterRect = waterBeaker.getBoundingClientRect();
        const beakerRect = solutionBeaker.getBoundingClientRect();

        let particlesPoured = 0;
        const pourInterval = setInterval(() => {
            if (particlesPoured >= 20) {
                clearInterval(pourInterval);
                return;
            }

            const particle = document.createElement('div');
            particle.className = 'pouring-water';

            const startX = waterRect.left + waterRect.width / 2 - 5;
            const startY = waterRect.top + 20;

            const endX = beakerRect.left + beakerRect.width / 2 - startX - 5;
            const endY = beakerRect.top + 20 - startY;

            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.setProperty('--end-x', `${endX}px`);
            particle.style.setProperty('--end-y', `${endY}px`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 800);

            particlesPoured++;
        }, 50);
    }

    function mixSolution() {
        stirringRod.style.opacity = '1';

        const particles = solutionSolute.querySelectorAll('.solute-particle');
        let mixCount = 0;

        const mixInterval = setInterval(() => {
            particles.forEach(particle => {
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.bottom = `${10 + Math.random() * 70}%`;
            });

            mixCount++;
            if (mixCount > 8) {
                particles.forEach(particle => {
                    particle.style.opacity = '0';
                });
            }

            if (mixCount > 16) {
                clearInterval(mixInterval);
                stirringRod.style.opacity = '0';

                setTimeout(() => {
                    solutionSolute.innerHTML = '';
                    statusDisplay.textContent = "Solution prepared successfully! The solute has completely dissolved.";
                }, 1500);
            }
        }, 150);
    }

    function pourParticles(fromRect, toRect, count, callback) {
        let particlesPoured = 0;
        const solute = soluteSelect.value;

        const pourInterval = setInterval(() => {
            if (particlesPoured >= count) {
                clearInterval(pourInterval);
                if (callback) callback();
                return;
            }

            const particle = document.createElement('div');
            particle.className = 'pouring-particle';
            particle.style.backgroundColor = getSoluteColor(solute);

            const startX = fromRect.left + fromRect.width / 2 - 4;
            const startY = fromRect.top + fromRect.height / 2;

            const endX = toRect.left + toRect.width / 2 - startX - 4;
            const endY = toRect.top + toRect.height / 2 - startY;

            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.setProperty('--end-x', `${endX}px`);
            particle.style.setProperty('--end-y', `${endY}px`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 800);

            particlesPoured++;
        }, 30);
    }

    function getSoluteColor(type) {
        const colors = {
            'NaCl': 'white',
            'NaOH': '#f1c40f',
            'HCl': '#e74c3c'
        };
        return colors[type] || 'white';
    }

    function createParticles(container, count, type = 'NaCl') {
        container.innerHTML = '';
        const color = getSoluteColor(type);

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'solute-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = `${Math.random() * 100}%`;
            particle.style.backgroundColor = color;
            container.appendChild(particle);
        }
    }

    function updateSteps() {
        [step1, step2, step3, step4, step5].forEach(step => {
            step.className = 'step';
        });

        for (let i = 1; i < currentStep; i++) {
            document.getElementById(`step${i}`).classList.add('completed');
        }

        if (currentStep <= 5) {
            document.getElementById(`step${currentStep}`).classList.add('active');
        }
    }
});
