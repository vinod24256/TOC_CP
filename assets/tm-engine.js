/**
 * TM Crypt Engine
 * Core Turing Machine logic for the Theory of Computation project.
 */

class TuringMachine {
    /**
     * @param {string[]} states - Set of state names
     * @param {string[]} alphabet - Input alphabet
     * @param {string[]} tapeAlphabet - Tape alphabet (alphabet union {blank})
     * @param {Object} transitions - Map of "state|||symbol" -> {newState, write, dir}
     * @param {string} startState - Starting state
     * @param {string} acceptState - Accepting state
     * @param {string} rejectState - Rejecting state
     */
    constructor(states, alphabet, tapeAlphabet, transitions, startState, acceptState, rejectState) {
        this.states = states;
        this.alphabet = alphabet;
        this.tapeAlphabet = tapeAlphabet;
        this.transitions = transitions;
        this.startState = startState;
        this.acceptState = acceptState;
        this.rejectState = rejectState;
        this.blank = '□';
        this.reset();
    }

    reset() {
        this.tape = [this.blank];
        this.head = 0;
        this.state = this.startState;
        this.steps = 0;
        this.halted = false;
        this.accepted = false;
        this.log = [];
    }

    loadInput(str) {
        this.reset();
        this.originalInput = str;
        // Standard TM initialization: blank, input, blank...
        this.tape = [this.blank, ...str.split(''), this.blank];
        this.head = 1; // Start at the first character of the input
    }
    
    getInputText() {
        return this.originalInput || '';
    }

    step() {
        if (this.halted) return;

        const sym = this.tape[this.head] || this.blank;
        const key = `${this.state}|||${sym}`;
        const tr = this.transitions[key];
        const oldState = this.state;

        if (!tr) {
            this.state = this.rejectState;
            this.halted = true;
            this.accepted = false;
            this.log.push({ step: ++this.steps, state: oldState, read: sym, ns: this.state, write: sym, dir: 'S' });
            return;
        }

        this.tape[this.head] = tr.write;
        
        if (tr.dir === 'R') {
            this.head++;
            if (this.head >= this.tape.length) {
                this.tape.push(this.blank);
            }
        } else if (tr.dir === 'L') {
            if (this.head > 0) {
                this.head--;
            } else {
                this.tape.unshift(this.blank);
            }
        }

        this.state = tr.newState;
        this.steps++;
        this.log.push({ step: this.steps, state: oldState, read: sym, ns: this.state, write: tr.write, dir: tr.dir });

        if (this.state === this.acceptState) {
            this.halted = true;
            this.accepted = true;
        } else if (this.state === this.rejectState) {
            this.halted = true;
            this.accepted = false;
        }
    }

    run(maxSteps = 10000) {
        let count = 0;
        while (!this.halted && count < maxSteps) {
            this.step();
            count++;
        }
        return this.halted;
    }

    getID() {
        const leftArr = this.tape.slice(0, this.head);
        const rightArr = this.tape.slice(this.head);
        return leftArr.join('') + '[' + this.state + ']' + rightArr.join('');
    }

    getTape() {
        return [...this.tape];
    }

    isHalted() {
        return this.halted;
    }

    isAccepted() {
        return this.accepted;
    }

    getStepCount() {
        return this.steps;
    }

    // Helper for debugging/testing
    out() {
        return this.tape.join('').replace(/□/g, '').trim();
    }
}

/**
 * Creates a Caesar Cipher TM (+k)
 */
function createCaesarTM(k) {
    const states = ['q0', 'q_upper', 'q_lower', 'q_skip', 'q_accept', 'q_reject'];
    const alphabet = [];
    for (let i = 32; i <= 126; i++) alphabet.push(String.fromCharCode(i));
    const tapeAlphabet = [...alphabet, '□'];
    const blank = '□';
    const tr = {};

    const shift = ((k % 26) + 26) % 26;

    // We allow staying in working states for better visualization logic in the UI
    const workingStates = ['q0', 'q_upper', 'q_lower', 'q_skip'];
    
    workingStates.forEach(st => {
        // Transition to accept on reading blank at the end
        tr[`${st}|||${blank}`] = { newState: 'q_accept', write: blank, dir: 'R' };

        // Alphabetic transitions
        for (let i = 0; i < 26; i++) {
            // Uppercase
            const uc = String.fromCharCode(65 + i);
            const uc_enc = String.fromCharCode(65 + (i + shift) % 26);
            tr[`${st}|||${uc}`] = { newState: 'q_upper', write: uc_enc, dir: 'R' };

            // Lowercase
            const lc = String.fromCharCode(97 + i);
            const lc_enc = String.fromCharCode(97 + (i + shift) % 26);
            tr[`${st}|||${lc}`] = { newState: 'q_lower', write: lc_enc, dir: 'R' };
        }

        // Non-alphabetic pass-through
        alphabet.forEach(c => {
            if (!/[a-zA-Z]/.test(c)) {
                tr[`${st}|||${c}`] = { newState: 'q_skip', write: c, dir: 'R' };
            }
        });
    });

    return new TuringMachine(states, alphabet, tapeAlphabet, tr, 'q0', 'q_accept', 'q_reject');
}

/**
 * Creates a Decrypting Caesar Cipher TM (-k)
 */
function createDecryptTM(k) {
    return createCaesarTM(-k);
}

/**
 * Creates an infinite loop TM (bouncing)
 */
function createInfiniteLoopTM() {
    const states = ['qA', 'qB', 'q_accept', 'q_reject'];
    const alphabet = ['a', 'b'];
    const tapeAlphabet = ['a', 'b', '□'];
    const blank = '□';
    const tr = {};

    ['qA', 'qB'].forEach(s => {
        const next = s === 'qA' ? 'qB' : 'qA';
        const dir = s === 'qA' ? 'R' : 'L';
        
        // Bounce on everything
        ['a', 'b', blank].forEach(sym => {
            tr[`${s}|||${sym}`] = { newState: next, write: sym, dir: dir };
        });
    });

    return new TuringMachine(states, alphabet, tapeAlphabet, tr, 'qA', 'q_accept', 'q_reject');
}

// Attach to global scope
if (typeof window !== 'undefined') {
    window.TMEngine = {
        TuringMachine,
        createCaesarTM,
        createDecryptTM,
        createInfiniteLoopTM
    };
}
