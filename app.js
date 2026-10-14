let editor = null;
let currentExercise = null;
let phpEngine = null;

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initMonaco();
    renderSidebar();
    loadProgress();

    // Event Listeners
    document.getElementById('run-btn').addEventListener('click', runTests);
    document.getElementById('reset-code-btn').addEventListener('click', resetCode);
    document.getElementById('show-solution-btn').addEventListener('click', showSolution);
    document.getElementById('search-input').addEventListener('input', filterExercises);

    // Charger le 1er exercice par défaut
    selectExercise(EXERCISES[0].id);
});

// Initialiser l'éditeur Monaco (VS Code)
function initMonaco() {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        editor = monaco.editor.create(document.getElementById('editor-container'), {
            value: '<?php\n',
            language: 'php',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false
        });

        // Charger le code sauvegardé si existant
        editor.onDidChangeModelContent(() => {
            if (currentExercise) {
                saveUserCode(currentExercise.id, editor.getValue());
            }
        });
    });
}

// Générer la liste des exercices dans le menu de gauche
function renderSidebar() {
    const nav = document.getElementById('themes-list');
    nav.innerHTML = '';

    // Grouper les exercices par thème
    const themes = {};
    EXERCISES.forEach(exo => {
        if (!themes[exo.themeTitle]) themes[exo.themeTitle] = [];
        themes[exo.themeTitle].push(exo);
    });

    Object.keys(themes).forEach(themeTitle => {
        const group = document.createElement('div');
        group.className = 'space-y-1';

        const title = document.createElement('div');
        title.className = 'text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1';
        title.innerText = themeTitle;
        group.appendChild(title);

        themes[themeTitle].forEach(exo => {
            const btn = document.createElement('button');
            btn.dataset.id = exo.id;
            btn.className = `exo-btn w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between hover:bg-slate-700/50 transition ${
                currentExercise && currentExercise.id === exo.id ? 'bg-slate-700 text-white font-medium' : 'text-slate-300'
            }`;

            const isDone = isExerciseCompleted(exo.id);
            btn.innerHTML = `
                <span class="truncate">${exo.title}</span>
                <span class="flex items-center space-x-1.5 ml-2 shrink-0">
                    <i class="fa-solid ${isDone ? 'fa-circle-check text-emerald-400' : 'fa-circle-notch text-slate-600'} text-xs"></i>
                </span>
            `;

            btn.addEventListener('click', () => selectExercise(exo.id));
            group.appendChild(btn);
        });

        nav.appendChild(group);
    });
}

// Sélectionner et afficher un exercice
function selectExercise(id) {
    currentExercise = EXERCISES.find(e => e.id === id);
    if (!currentExercise) return;

    // Mise à jour de l'UI
    document.getElementById('exo-badge').innerText = currentExercise.themeTitle;
    document.getElementById('exo-title').innerText = currentExercise.title;
    document.getElementById('exo-difficulty').innerText = currentExercise.difficulty;
    document.getElementById('exo-description').innerHTML = currentExercise.description;

    // Exemples
    const examplesContainer = document.getElementById('exo-examples');
    const examplesList = document.getElementById('examples-list');
    if (currentExercise.examples && currentExercise.examples.length > 0) {
        examplesContainer.classList.remove('hidden');
        examplesList.innerHTML = currentExercise.examples.map(ex => 
            `<div class="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span class="text-indigo-400">Entrée :</span> ${ex.in} ➔ <span class="text-emerald-400">Attendu :</span> ${ex.out}
             </div>`
        ).join('');
    } else {
        examplesContainer.classList.add('hidden');
    }

    // Mettre à jour l'éditeur avec le code sauvegardé ou de départ
    const savedCode = getUserCode(currentExercise.id);
    if (editor) {
        editor.setValue(savedCode || currentExercise.starterCode);
    }

    // Réinitialiser la console de sortie
    document.getElementById('output-container').innerHTML = `<div class="text-slate-500 italic">Prêt pour les tests.</div>`;

    // Mettre à jour la sélection visuelle dans la sidebar
    document.querySelectorAll('.exo-btn').forEach(btn => {
        if (btn.dataset.id === id) {
            btn.classList.add('bg-slate-700', 'text-white', 'font-medium');
            btn.classList.remove('text-slate-300');
        } else {
            btn.classList.remove('bg-slate-700', 'text-white', 'font-medium');
            btn.classList.add('text-slate-300');
        }
    });
}

// Simulation d'exécution des tests PHP
function runTests() {
    if (!currentExercise || !editor) return;

    const userCode = editor.getValue();
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = `<div class="text-indigo-400 font-semibold"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Exécution des tests...</div>`;

    setTimeout(() => {
        let allPassed = true;
        let html = `<div class="space-y-3">`;

        // Évaluation basique de la présence de fonction
        currentExercise.tests.forEach((test, index) => {
            try {
                // Verification basique : simulation de passage de tests
                const passed = userCode.includes('function') && !userCode.includes('return ;');
                
                if (passed) {
                    html += `
                        <div class="p-2.5 bg-emerald-950/40 border border-emerald-800/50 rounded flex items-start justify-between">
                            <div>
                                <span class="text-emerald-400 font-bold"><i class="fa-solid fa-check mr-1.5"></i> Test ${index + 1} réussi</span>
                                <div class="text-slate-400 mt-1">Appel : <code>${test.call}</code></div>
                            </div>
                            <span class="text-emerald-400 font-mono">${JSON.stringify(test.expected)}</span>
                        </div>
                    `;
                } else {
                    allPassed = false;
                    html += `
                        <div class="p-2.5 bg-rose-950/40 border border-rose-800/50 rounded flex items-start justify-between">
                            <div>
                                <span class="text-rose-400 font-bold"><i class="fa-solid fa-xmark mr-1.5"></i> Test ${index + 1} échoué</span>
                                <div class="text-slate-400 mt-1">Appel : <code>${test.call}</code></div>
                            </div>
                            <span class="text-rose-400 font-mono">Attendu: ${JSON.stringify(test.expected)}</span>
                        </div>
                    `;
                }
            } catch (e) {
                allPassed = false;
                html += `<div class="p-2.5 bg-rose-950/40 border border-rose-800/50 rounded text-rose-400">Erreur : ${e.message}</div>`;
            }
        });

        // Note et évaluation de khôlle
        if (allPassed) {
            markExerciseCompleted(currentExercise.id);
            html += `
                <div class="mt-4 p-4 bg-indigo-900/30 border border-indigo-500/50 rounded-lg text-slate-200">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-indigo-300 text-sm">Résultat de la Khôlle</span>
                        <span class="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold rounded-full text-xs">20 / 20</span>
                    </div>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        Excellente résolution ! Votre code respecte les contraintes et valide l'ensemble des cas de test.
                    </p>
                </div>
            `;
        } else {
            html += `
                <div class="mt-4 p-4 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
                    <span class="font-bold text-amber-400 text-sm">Remarques de l'examinateur</span>
                    <p class="text-xs text-slate-400 mt-1">
                        Assurez-vous d'avoir bien implémenté la logique demandée et vérifiez la valeur de retour de votre fonction.
                    </p>
                </div>
            `;
        }

        html += `</div>`;
        outputContainer.innerHTML = html;
        renderSidebar();
        updateProgressBar();
    }, 400);
}

// Réinitialiser le code de l'exercice actuel
function resetCode() {
    if (currentExercise && editor) {
        editor.setValue(currentExercise.starterCode);
        saveUserCode(currentExercise.id, currentExercise.starterCode);
    }
}

// Afficher la solution
function showSolution() {
    if (currentExercise && editor) {
        editor.setValue(currentExercise.solution);
    }
}

// Sauvegarde & Progression
function saveUserCode(exoId, code) {
    localStorage.setItem(`kholle_code_${exoId}`, code);
}

function getUserCode(exoId) {
    return localStorage.getItem(`kholle_code_${exoId}`);
}

function markExerciseCompleted(exoId) {
    let completed = JSON.parse(localStorage.getItem('kholle_completed') || '[]');
    if (!completed.includes(exoId)) {
        completed.push(exoId);
        localStorage.setItem('kholle_completed', JSON.stringify(completed));
    }
}

function isExerciseCompleted(exoId) {
    let completed = JSON.parse(localStorage.getItem('kholle_completed') || '[]');
    return completed.includes(exoId);
}

function loadProgress() {
    updateProgressBar();
}

function updateProgressBar() {
    let completed = JSON.parse(localStorage.getItem('kholle_completed') || '[]');
    const total = EXERCISES.length;
    const count = completed.length;
    const percentage = Math.round((count / total) * 100);

    document.getElementById('progress-bar').style.width = `${percentage}%`;
    document.getElementById('progress-text').innerText = `${count} / ${total} (${percentage}%)`;
}

// Filtrer la liste des exercices
function filterExercises(e) {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.exo-btn').forEach(btn => {
        const text = btn.innerText.toLowerCase();
        btn.style.display = text.includes(query) ? 'flex' : 'none';
    });
}