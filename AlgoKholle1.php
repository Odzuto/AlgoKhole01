---

### 2. `index.html`

```html
<!DOCTYPE html>
<html lang="fr" class="h-full bg-slate-900 text-slate-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entraînement Khôlle Algorithmique & PHP</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Monaco Editor Loader -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js"></script>
    <!-- Custom Styles -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="h-full flex flex-col font-sans overflow-hidden">

    <!-- Header -->
    <header class="bg-slate-800 border-b border-slate-700 px-6 py-3 flex justify-between items-center z-10 shrink-0">
        <div class="flex items-center space-x-3">
            <div class="bg-indigo-600 text-white p-2 rounded-lg font-bold">
                <i class="fa-solid fa-graduation-cap text-xl"></i>
            </div>
            <div>
                <h1 class="font-bold text-lg text-white leading-none">Khôlle PHP & Algo</h1>
                <span class="text-xs text-slate-400">Préparation aux examens d'algorithmique</span>
            </div>
        </div>

        <!-- Global Progress Bar -->
        <div class="flex items-center space-x-4">
            <div class="text-right">
                <div class="text-xs text-slate-400">Progression globale</div>
                <div id="progress-text" class="text-sm font-semibold text-indigo-400">0 / 40 (0%)</div>
            </div>
            <div class="w-32 bg-slate-700 h-3 rounded-full overflow-hidden">
                <div id="progress-bar" class="bg-indigo-500 h-full w-0 transition-all duration-300"></div>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="flex flex-1 overflow-hidden">
        
        <!-- Sidebar Navigation -->
        <aside class="w-80 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
            <div class="p-4 border-b border-slate-700">
                <input type="text" id="search-input" placeholder="Rechercher un exercice..." 
                       class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500">
            </div>
            <nav id="themes-list" class="flex-1 overflow-y-auto p-3 space-y-4">
                <!-- Injected via exercises.js / app.js -->
            </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col min-w-0 bg-slate-900">
            
            <!-- Exercise Header & Consignes -->
            <div id="exercise-header" class="p-6 border-b border-slate-800 bg-slate-850 overflow-y-auto max-h-[40vh]">
                <div class="flex items-start justify-between">
                    <div>
                        <span id="exo-badge" class="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">Thème 1</span>
                        <h2 id="exo-title" class="text-2xl font-bold mt-2 text-white">Sélectionnez un exercice</h2>
                    </div>
                    <span id="exo-difficulty" class="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-700 text-slate-300">Niveau</span>
                </div>

                <div id="exo-description" class="mt-4 text-slate-300 text-sm leading-relaxed space-y-2">
                    <p class="italic text-slate-500">Choisissez un exercice dans le menu de gauche pour commencer à coder.</p>
                </div>

                <!-- Examples Section -->
                <div id="exo-examples" class="mt-4 hidden">
                    <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Exemples :</h4>
                    <div id="examples-list" class="space-y-2 text-xs font-mono"></div>
                </div>
            </div>

            <!-- Workspace: Editor + Output -->
            <div class="flex-1 flex min-h-0">
                
                <!-- Code Editor Column -->
                <div class="flex-1 flex flex-col border-r border-slate-800">
                    <div class="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
                        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Éditeur PHP</span>
                        <div class="flex space-x-2">
                            <button id="reset-code-btn" class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-xs transition">
                                <i class="fa-solid fa-rotate-left mr-1"></i> Réinitialiser
                            </button>
                            <button id="show-solution-btn" class="px-3 py-1 bg-amber-600/30 border border-amber-500/50 text-amber-300 hover:bg-amber-600/50 rounded text-xs transition">
                                <i class="fa-solid fa-lightbulb mr-1"></i> Voir correction
                            </button>
                        </div>
                    </div>
                    <div id="editor-container" class="flex-1 w-full h-full"></div>
                </div>

                <!-- Console & Tests Output Column -->
                <div class="w-1/2 flex flex-col bg-slate-950">
                    <div class="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
                        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Résultats & Évaluation</span>
                        <button id="run-btn" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold transition flex items-center">
                            <i class="fa-solid fa-play mr-1.5"></i> Tester le code
                        </button>
                    </div>

                    <div id="output-container" class="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-4">
                        <div class="text-slate-500 italic">Cliquez sur "Tester le code" pour lancer les tests unitaires...</div>
                    </div>
                </div>

            </div>
        </main>
    </div>

    <!-- Application Scripts -->
    <script src="exercises.js"></script>
    <script src="app.js"></script>
</body>
</html>