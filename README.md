# Concevoir des composants testés unitairement avec Angular

## BBL présenté par [Vincent Vieira](mailto:vincent.vieira@carbon-it.com)

### Prérequis

Afin d'avoir une expérience optimale avec ce kata, il est nécessaire _a minima_ de :

- Connaître [l'approche composant et ce qu'elle apporte](https://medium.com/the-s-curve/why-component-driven-design-drives-great-software-products-7cace364e815)
- Connaître [les bases des composants Angular (_lien de données_, _lien d'évènements_, _pipe_s...)](https://angular.io/guide/architecture-components)
- Conceptualiser correctement les mots-clé [_async/await_](https://javascript.info/async-await)

### Le kata "Tic Tac Toe"

Il s'agit de l'exercice utilisé en tant
que [tutoriel pour débuter sur React](https://reactjs.org/tutorial/tutorial.html). Dans ce kata, il s'agit d'implémenter
un jeu de morpion au tour à tour au sein du navigateur. Au-delà des règles du morpion, il est nécessaire que
l'application soit capable de :

- Afficher la grille de jeu et la position des différents pions
- Afficher l'historique des mouvements et permettre de naviguer vers un état de jeu spécifique
- Afficher qui est le prochain joueur ou le gagnant s'il existe

### A propos du BBL

Le projet utilisé dans le tutoriel React n'utilise que JavaScript. L'idée de ce BBL est de partir dans les meilleures
conditions possibles et donc, avec une version légèrement améliorée qui utilise Typescript avec quelques types
supplémentaires par rapport au projet initial.

- *Quel est l'intérêt de TypeScript ?*

TypeScript est un langage qui permet d'offrir l'ensemble des fonctionnalités présentes dans les versions récentes de
JavaScript, tout en offrant un système de typage à la compilation (appelé *static type checking*). Un typage fort permet
de, notamment :

- Profiter d'une autocomplétion et de fonctionnalités de navigation au sein des environnements de développement
  intégrés (IDE)
- Eviter les bugs les plus courants et les plus impactants lorsque l'on écrit du JavaScript en vérifiant que le code est
  structurellement valide
- Rendre le code plus lisible en donnant un sens sémantique aux valeurs utilisées de par leur association à un type
  spécifique

#### Utiliser TypeScript efficacement

Lorsque l'on introduit du lien de données entre des composants hiérarchiquement liés, il est nécessaire de typer les
propriétés d'entrée ou l'état de nos composants.

*Qu'est-ce qu'un alias de type ?*
[C'est un nom qui réfère à un type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) qui
peut-être :

- Une ou plusieurs valeurs sous forme de litéral
- Une [union de types *discriminée*](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types)
- Une [intersection de types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types)

**Un alias de type peut être générique.** Cela permet donc une grande flexibilité dans sa déclaration.

*Quels sont les intérêts des types `TicTacToePlayer` et `TicTacToeBoard` ?*

En appliquant une restriction sur les valeurs possibles dans l'ensemble des valeurs possibles de type `string`, on donne
un sens sémantiquement parlant à notre alias de type. Ainsi à la relecture du code sans aucune connaissance du contexte
métier, on identifiera plus facilement ce que représente notre type ainsi que les valeurs utilisées pour représenter
notre joueur, et l'ensemble des cellules du plateau.

#### Décomposer correctement ses composants

Lorsque l'on réalise une application avec un framework comme Angular, on va chercher à avoir un maximum de **dumb
components** (aussi appelés **composants présentationnels**). Un composant "idiot" est un composant n'ayant que pour
rôle de gérer l'affichage de données qu'il obtient d'autres composants. Ces composants sont appelés **smart
components** (ou **composants conteneurs**) car ils possèdent une intelligence dans la gestion de ces données.

- [*Pourquoi décomposer ses composants correctement est important
  ?*](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)
- [*Quelles sont les règles à respecter ?*](https://angular-checklist.io/default/checklist/architecture/Z1eHhoR)

L'état de l'art du découplage s'exprimera en Angular par le biais d'une solution de gestion centralisée de l'état de l'
application (typiquement, **Redux**). L'ensemble des composants affichent des données venant de cette *base de vérité*,
et la changeront en réagissant aux évènements utilisateur qu'ils propagent sous forme d'*actions*, qui impliqueront
l'exécution ou non d'*effets de bord* desquels peuvent découler une ou plusieurs actions.

#### Donner du sens au code

En parallèle d'un refactoring global à redécouper l'architecture composant du projet, il est nécessaire de s'interroger
sur le nommage des différents composants. Un nommage sera *a minima* intelligible, aisément recherchable et concis afin
d'être efficace. **Il doit refléter l'intention du composant**, par exemple **GameStateHistoryComponent**
en ce qui concerne le composant permettant d'afficher et naviguer entre les différents états de jeu enregistrés dans
l'historique d'une partie.

#### Respecter les conventions

Angular possède beaucoup de conventions de nommage et d'organisation, à tel point qu'elles peuvent devenir déroutantes.
Nous n'évoquerons pas celles concernant le nommage ([**qui sont néanmoins à garder en
tête !**](https://angular.io/guide/styleguide#naming)) qui sont accessibles dans la documentation d'Angular, mais nous
nous concentrerons sur les contraintes d'organisation ; bien plus hardues à assimiler et mettre en place.

**4 principes doivent résonner comme un automatisme lorsque nous organisons du code avec Angular, connus sous
l'acronyme _LIFT_ :**

- _[**L**ocaliser](https://angular.io/guide/styleguide#locate)_ facilement du code au sein du projet, sans avoir à
  mémoriser le nom du fichier créé ou son chemin.
- _[**I**dentifier](https://angular.io/guide/styleguide#identify)_ facilement ce à quoi sert un fichier, et ce qu'il
  contient (ainsi que ce qu'il ne contient pas).
- _Aplatir_ au plus la structure ([**F**latten](https://angular.io/guide/styleguide#flat)) pour éviter de créer de la
  complexité lors de la recherche de fichiers.
- _Essayer de ne pas se répéter_ ([**T**ry to be DRY](https://angular.io/guide/styleguide#t-dry-try-to-be-dry)).
  Autrement dit, il est nécessaire de suivre le principe DRY (*Don't Repeat Yourself*) sans en abuser et sacrifier la
  lisibilité du code. Parfois, la duplication de code peut avoir du bon, si cela évite des noeuds au cerveau à la
  lecture du code :blush:.

*Comment organiser ses fichiers au sein d'un projet Angular ?*

Il n'y a pas de réponse universelle, mais l'approche _core/shared/features_ est un très bon compromis. Le dossier racine
de vos sources Angular contiendra :

- Un dossier _core_ contenant du code nécessaire à la **"plomberie"** (intercepteurs HTTP, code nécessaire à la gestion
  d'erreurs...) qui ne sont qu'à importer **une seule fois au sein du module racine de l'application**.
- Un dossier _shared_ contenant des services/directives/composants/pipes réutilisables au sein de différents modules,
  qui ne comportent donc pas de métier spécifique en leur sein.
- Un dossier par fonctionnalité applicative, exposée à l'extérieur par un _feature module_.

*Qu'est-ce qu'un **feature module*** ?

Un _feature module_ est un `@NgModule` qui permet de regrouper et d'exposer un ensemble de composants, services ou
directives ayant un sens métier commun et qui sont utilisés les uns avec les autres. C'est une approche inspirée de la
notion d'aggrégat au sein du [_Domain Driven
Development_](https://www.jamesmichaelhickey.com/domain-driven-design-aggregates/), afin de pouvoir identifier
rapidement et simplement de façon simple ce que l'on importe à la racine de l'application. En les exportant ainsi, on
permet l'utilisation d'un pan entier de l'application sans avoir à connaître l'ensemble des modules sous-jacents
nécessaires au fonctionnement de l'ensemble du code (cela peut être également pratique pour réaliser des tests
d'intégration).

*Dois-je donc déclarer tous les composants d'une fonctionnalité dans un **feature module** ?*

Je recommande personnellement une approche où chaque composant possède son propre module. Cela permet la réutilisation
de ce module dans la configuration des tests, ainsi qu'une isolation claire par rapport au _feature module_.

**Au final, le _feature module_ importera un module par composant exposé, et les services/directives communs à
ceux-ci.**

#### Tester

##### Quoi tester ?

Lorsque l'on va rédiger des tests unitaires de composants Angular, les APIs de test fournies avec le framework nous
offre une kyrielle de possibilités. Accéder à l'élément HTML représentant notre composant pour localiser un élément
spécifique, accéder à l'injecteur du TestBed ou du composant afin de localiser l'instance d'un service/d'une directive,
accéder à l'instance de notre composant...

**Cela peut être déroutant, on peut tout faire, et finir par ne rien faire.**

La documentation officielle d'Angular elle-même nous incite à faire deux types de tests :

- [des tests qui vérifient l'état public d'un composant](https://angular.io/guide/testing-components-basics#component-class-testing)
- [des tests tournés vers l'impact que l'implémentation du composant aura sur l'interface utilisateur](https://angular.io/guide/testing-components-basics#component-dom-testing)
  ; que ce soit dans l'affichage ou la gestion des interactions avec celui-ci

La méthodologie est empruntée de React, où *Kent C. Dodds*, créateur de *testing-library* 
[qui dit si bien](https://kentcdodds.com/blog/testing-implementation-details) :

> Plus vos tests reflètent la manière dont votre programme est utilisé, plus la confiance que vous leur donnerez sera importante.

##### Tester la communication entre composants enfant/parent avec `@Output()`

Lorsque l'on écrit des composants faisant appel à un ou
des [lien(s) d'évènements](https://angular.io/guide/user-input#binding-to-user-input-events), il est intéressant avec
Angular de créer un composant spécifique au test. Ce composant
appelé *[test host component](https://angular.io/guide/testing-components-scenarios#component-inside-a-test-host)*,
permet de lier l'évènement à tester à un composant qui servira d'hôte. Celui-ci possèdera une méthode liée à l'évènement qui
pourra être espionnée afin d'enregistrer les interactions qu'aura Angular à la suite de l'émission de l'évènement au
sein du composant enfant testé.

##### Jasmine ou Jest ?

Jasmine est *de facto* la bibliothèque utilisée afin d'écrire des tests avec Angular, Karma les exécutant. Ceci étant dit, Jasmine souffre de
quelques défauts pénibles au quotidien :
- Absence d'APIs agréables à utiliser pour créer des tests paramétrés 
- Manque de certains utilitaires d'assertion sur l'invocation de *fonctions espionnes*

[Jest](https://jestjs.io/) pallie à ces problèmes en réunissant librairie d'assertions et exécuteur de tests, mais n'est
pas disponible *out-of-the-box*, [il est nécessaire de l'installer](https://github.com/briebug/jest-schematic).

Si jamais l'API de testing d'Angular vous paraît trop dantesque, vous pouvez également
utiliser [Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro),
elle est bien plus frugale et permet de se concentrer sur l'essentiel.

##### Bonnes pratiques
- Nommez et structurez vos tests intelligemment :
  - Gardez à l'esprit que Jasmine ou Jest concatènent l'ensemble des titres de vos suites de test et de vos tests dans
    l'ordre dans lequel vous les imbriquez. Cela a pour but de vous inciter à écrire des tests dont les descriptions
    seront lisibles comme des phrases, intelligibles par un humain. N'hésitez pas à imbriquer vos suites de test avec
    describe pour décrire une fonctionnalité du composant que vous testez.
- Prenez avantage des tests paramétrés afin de faire varier l'état initial ainsi que le comportement attendu au sein du
  composant testé (*même s'ils sont plus douloureux à écrire avec Jasmine*)
- Essayez autant que faire se peut
  de [requêter des éléments au sein du DOM par le type de composant/directive cible](https://angular.io/api/platform-browser/By#directive),
  cela permet d'avoir un code moins sensible au refactoring.
- N'oubliez pas que la **détection de changement est désactivée par défaut dans des tests Angular**. Il faut
  appeler `.detectChanges()` sur votre fixture afin de déclencher un cycle de détection et rafraîchir le DOM !
