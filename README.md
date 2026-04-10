# TM Crypt — WhatsApp Turing Machine Simulator

[![TOC Project](https://img.shields.io/badge/Theory%20of%20Computation-Unit%205-blueviolet)](https://github.com/vinod24256/TOC_CP)
[![Version](https://img.shields.io/badge/Version-1.0.0--Ultimate-success)](https://github.com/vinod24256/TOC_CP)
[![Aesthetics](https://img.shields.io/badge/Design-Premium%20Dark--Mode-ff69b4)](https://github.com/vinod24256/TOC_CP)

**TM Crypt** is a high-fidelity, interactive educational tool designed for **Theory of Computation (TOC)** students. It demonstrates the profound connection between modern communication (WhatsApp) and the bedrock of computation (Turing Machines).

---

## 🌟 Key Features

### 1. Realistic WhatsApp Interface
- **Premium Dark Mode**: Built with vanilla CSS for a sleek, pixel-perfect messaging experience.
- **Multilingual Support**: Diverse contacts with Tamil, Telugu, Hindi, and English interactions.
- **Group Chat Dynamics**: Simulation of multi-user encryption/decryption flows.

### 2. High-Fidelity Turing Machine (TM) Engine
- **Dynamic Caesar Cipher**: A "Total Decider" TM that implements $E(x) = (x + k) \pmod{26}$.
- **Dynamic Shift Slider**: Adjust the shift value $k$ (1-25) in real-time.
- **Automated Round-Trip**: Chained simulation that automatically Encrypts → Transmits → Decrypts (Phase 1 & Phase 2).

### 3. Formal Academic Tools
- **Type 0 Grammar Generator**: Automatically generates unrestricted productions ($\alpha \to \beta$) equivalent to the TM.
- **Interactive Halting Proof**: A step-by-step paradoxical demonstration of why the Halting Problem is undecidable.
- **D3.js State Diagrams**: Animated, draggable state graphs that highlight transitions in real-time.
- **Instantaneous Descriptions (IDs)**: Comprehensive trace logs of $(u, q, v)$ configurations for formal proofs.
- **Complexity Metrics**: Real-time Chart.js visualisations of $O(n)$ time complexity and state frequency.

---

## 🎓 TOC Concepts Covered
- **Church-Turing Thesis**: Computation as a sequence of discrete symbolic manipulations.
- **Decidability**: Proving the Caesar Cipher language is **Recursive** (always halts in `q_accept`).
- **Nondeterminism (NTM)**: Visual representation of branching computation paths.
- **Unrestricted Grammars**: The relationship between Type 0 languages and Turing Machines.
- **The Halting Problem**: Formal proof by contradiction using the "Paradox Wrapper" method.

---

## 🚀 Getting Started

**Standalone Application**: No installation or dependencies required.

1. Clone this repository:
   ```bash
   git clone https://github.com/vinod24256/TOC_CP.git
   ```
2. Open `index.html` in any modern web browser.
3. Start sending messages to witness the Turing Machine in action!

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System).
- **Core Logic**: Pure JavaScript (ES6+).
- **Visualizations**: [D3.js v7](https://d3js.org/) (State Graphs), [Chart.js v4](https://www.chartjs.org/) (Analytics).
- **Typography**: Inter & JetBrains Mono (Google Fonts).

---

## 📄 License
This project is created for educational purposes in Theory of Computation. Feel free to use and adapt!

---
*Created with ❤️ for TOC Excellence.*
