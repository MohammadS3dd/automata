// Transition Table
const transition = {
    'q0': { a: 'q1', b: 'q3' },
    'q1': { a: 'q0', b: 'q3' },
    'q2': { a: 'q1', b: 'q4' },
    'q3': { a: 'q5', b: 'q5' },
    'q4': { a: 'q3', b: 'q3' },
    'q5': { a: 'q5', b: 'q5' }
}

const start = 'q0'

const alphabet = ['a', 'b']

const nextNodes = (node, alphabet) => {
    const nexts = []
    for (const char of alphabet) {
        if (node[char]) {
            nexts.push(node[char])
        }
    }
    return nexts
}

const nextSet = (table, nodes) => {
    const next = []
    for (const node of nodes) {
        /// inja momkene ride bashim
        next.push(...nextNodes(node, alphabet))
    }
    return next
}

console.log(nextSet(transition,[transition['q0'], transition['q1']]))

const getUnusedStates = () => {

}

const union = (setA, setB) => {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

// Remove the unrechable states
const removeUnrechable = (table) => {
    const nodes = Object.keys(table)

    const usage = {}
}

// Function to minimize the given transition table
const minimize = (table) => {
    const nodes = Object.keys(table)
}

minimize(transition)
