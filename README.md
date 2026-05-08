<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/s9yk3r/password-generator">
    <img src="https://i.imgur.com/Y824jHa.png" alt="Logo" width="150" height="150">
  </a>

<h3 align="center">A simple password generator powered by VueJS</h3>

  <p align="center">
    It's like the title says, I swear! It's only a simple password generator!
    <br />
    <a href="https://github.com/s9yk3r/password-generator"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/s9yk3r/password-generator/issues">Report Bug</a>
    ·
    <a href="https://github.com/s9yk3r/password-generator/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Main View][product-screenshot]

While there are many password generators, this project is specifically designed as a **pluggable Vue 3 module**. It was built to be easily integrated into larger projects while maintaining high security standards and a modern look.

Key highlights:
* **Secure:** Uses the Web Crypto API (`window.crypto`) for generation.
* **Modern UI:** Features glassmorphism effects, gradients, and a responsive design.
* **Production Ready:** Ships with an obfuscated and minified bundle.

### Built With

* [Vue.js 3](https://vuejs.org/) (Composition API)
* [Vite](https://vitejs.dev/)
* [Bootstrap 5](https://getbootstrap.com/)
* [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
* [Font Awesome](https://fontawesome.com/)

<!-- GETTING STARTED -->
## Getting Started

Follow these steps to get the module running in your project instantly.

### Prerequisites

[Node.js](https://nodejs.org)

Your project must be running **Vue 3** and have **Bootstrap 5** and **FontAwesome** installed as they are required for the UI.
```sh
npm install vue bootstrap @fortawesome/vue-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

### Installation

To install the pre-compiled version (recommended), use the distribution branch directly:
```sh
npm install github:s9yk3r/password-generator#dist
```

Note: This command fetches only the optimized dist folder, keeping your node_modules clean and ready for production.

<!-- USAGE -->
## Usage

1. Global Registration (`main.js`)

Import the plugin and its pre-built CSS.

```js
import { createApp } from 'vue'
import App from './App.vue'
import PasswordGenerator from 'password-generator'
import 'password-generator/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.use(PasswordGenerator)
app.mount('#app')
```

2. Implementation

```
<template>
  <PasswordGenerator :initialLength="16"/>
</template>
```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Alessandro Lombi - s9yk3r@pm.me

Project Link: [https://github.com/s9yk3r/password-generator](https://github.com/s9yk3r/password-generator)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/s9yk3r/password-generator.svg?style=for-the-badge
[contributors-url]: https://github.com/s9yk3r/password-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/s9yk3r/password-generator.svg?style=for-the-badge
[forks-url]: https://github.com/s9yk3r/password-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/s9yk3r/password-generator.svg?style=for-the-badge
[stars-url]: https://github.com/s9yk3r/password-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/s9yk3r/password-generator.svg?style=for-the-badge
[issues-url]: https://github.com/s9yk3r/password-generator/issues
[license-shield]: https://img.shields.io/github/license/s9yk3r/password-generator.svg?style=for-the-badge
[license-url]: https://github.com/s9yk3r/password-generator/blob/master/LICENSE.txt
[product-screenshot]: https://i.imgur.com/nHCikGK.png