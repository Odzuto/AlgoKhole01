const EXERCISES = [
    // THÈME 1 : SOMME DE SÉRIE
    {
        id: "t1_e1",
        themeId: 1,
        themeTitle: "1. Somme de série",
        title: "Somme des N premiers entiers",
        difficulty: "Débutant",
        badgeColor: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
        description: `Écrivez une fonction PHP <code>sommeNentiers($n)</code> qui prend en argument un entier positif $n$ ($n \\ge 1$) et retourne la somme de tous les entiers de $1$ à $n$ compris.<br><br>
        <strong>Contraintes :</strong>
        <ul class="list-disc ml-5 mt-1">
            <li>Utilisez une boucle (<code>for</code> ou <code>while</code>).</li>
            <li>Ne pas utiliser de formule mathématique directe ($n(n+1)/2$).</li>
            <li>Ne pas utiliser de fonctions natives PHP.</li>
        </ul>`,
        examples: [
            { in: "$n = 5", out: "15 (1 + 2 + 3 + 4 + 5)" },
            { in: "$n = 1", out: "1" }
        ],
        starterCode: `<?php
function sommeNentiers($n) {
    // Votre code ici
    $somme = 0;
    
    return $somme;
}`,
        solution: `<?php
function sommeNentiers($n) {
    $somme = 0;
    for ($i = 1; $i <= $n; $i++) {
        $somme += $i;
    }
    return $somme;
}`,
        tests: [
            { call: "sommeNentiers(5)", expected: 15 },
            { call: "sommeNentiers(1)", expected: 1 },
            { call: "sommeNentiers(10)", expected: 55 }
        ]
    },
    {
        id: "t1_e2",
        themeId: 1,
        themeTitle: "1. Somme de série",
        title: "Somme des carrés",
        difficulty: "Débutant",
        badgeColor: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
        description: `Écrivez une fonction PHP <code>sommeCarres($n)</code> qui calcule la somme des carrés des entiers de $1$ à $n$ : $1^2 + 2^2 + \\dots + n^2$.`,
        examples: [
            { in: "$n = 3", out: "14 (1 + 4 + 9)" }
        ],
        starterCode: `<?php
function sommeCarres($n) {
    // Votre code ici
    
}`,
        solution: `<?php
function sommeCarres($n) {
    $somme = 0;
    for ($i = 1; $i <= $n; $i++) {
        $somme += $i * $i;
    }
    return $somme;
}`,
        tests: [
            { call: "sommeCarres(3)", expected: 14 },
            { call: "sommeCarres(5)", expected: 55 }
        ]
    },

    // THÈME 3 : SOMME DES VALEURS D'UN TABLEAU
    {
        id: "t3_e1",
        themeId: 3,
        themeTitle: "3. Somme d'un tableau",
        title: "Somme d'un tableau d'entiers",
        difficulty: "Débutant",
        badgeColor: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
        description: `Écrivez une fonction <code>sommeTableau($tab)</code> qui calcule la somme des éléments d'un tableau indexé.<br><br><strong>Contrainte :</strong> Sans utiliser <code>array_sum()</code>.`,
        examples: [
            { in: "$tab = [1, 4, 6]", out: "11" }
        ],
        starterCode: `<?php
function sommeTableau($tab) {
    // Votre code ici
    
}`,
        solution: `<?php
function sommeTableau($tab) {
    $somme = 0;
    foreach ($tab as $val) {
        $somme += $val;
    }
    return $somme;
}`,
        tests: [
            { call: "sommeTableau([1, 4, 6])", expected: 11 },
            { call: "sommeTableau([-2, 5, 10])", expected: 13 }
        ]
    },

    // THÈME 6 : PALINDROME
    {
        id: "t6_e1",
        themeId: 6,
        themeTitle: "6. Palindrome",
        title: "Palindrome de chaîne simple",
        difficulty: "Débutant",
        badgeColor: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
        description: `Écrivez une fonction <code>estPalindrome($str)</code> qui retourne <code>true</code> si la chaîne est un palindrome, sinon <code>false</code>.<br><br><strong>Contrainte :</strong> Sans utiliser <code>strrev()</code>.`,
        examples: [
            { in: "$str = 'radar'", out: "true" },
            { in: "$str = 'hello'", out: "false" }
        ],
        starterCode: `<?php
function estPalindrome($str) {
    // Votre code ici
    
}`,
        solution: `<?php
function estPalindrome($str) {
    $len = strlen($str);
    for ($i = 0; $i < $len / 2; $i++) {
        if ($str[$i] !== $str[$len - 1 - $i]) {
            return false;
        }
    }
    return true;
}`,
        tests: [
            { call: "estPalindrome('radar')", expected: true },
            { call: "estPalindrome('php')", expected: true },
            { call: "estPalindrome('hello')", expected: false }
        ]
    },

    // THÈME 8 : VALEUR MAXIMALE
    {
        id: "t8_e1",
        themeId: 8,
        themeTitle: "8. Valeur maximale",
        title: "Recherche du maximum simple",
        difficulty: "Débutant",
        badgeColor: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
        description: `Écrivez <code>trouverMax($tab)</code> qui retourne la plus grande valeur d'un tableau d'entiers non vide.<br><br><strong>Contrainte :</strong> Sans utiliser la fonction <code>max()</code>.`,
        examples: [
            { in: "$tab = [3, 7, 2, 9, 5]", out: "9" }
        ],
        starterCode: `<?php
function trouverMax($tab) {
    // Votre code ici
    
}`,
        solution: `<?php
function trouverMax($tab) {
    $max = $tab[0];
    for ($i = 1; $i < count($tab); $i++) {
        if ($tab[$i] > $max) {
            $max = $tab[$i];
        }
    }
    return $max;
}`,
        tests: [
            { call: "trouverMax([3, 7, 2, 9, 5])", expected: 9 },
            { call: "trouverMax([-10, -3, -5])", expected: -3 }
        ]
    }
];