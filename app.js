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

// const nextSet = (table, nodes) => {
//     const next = []
//     for (const node of nodes) {
//         /// inja momkene ride bashim
//         next.push(...nextNodes(node, alphabet))
//     }
//     return next
// }

const union = (setA, setB) => {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

// Returns the states that are reachable by the DFA starting state
const getUsedStates = (start, table) => {
    let usedStates = [start]
    let lastUsedStateLength = 0

    while (usedStates.length != lastUsedStateLength) {
        lastUsedStateLength = usedStates.length
        for (const state of usedStates) {
            const nextNodeList = nextNodes(table[state], alphabet)
            usedStates = union(usedStates, nextNodeList)
        }
    }

    return Array.from(usedStates)
}

// Remove the unrechable states
const removeUnrechable = (table) => {
    const used = getUsedStates(start, table)
    const usedTable = {}
    Object.assign(usedTable, table)
    Object.keys(table).forEach(key => {
        if (!used.includes(key)) {
            delete usedTable[key]
        }
    })
    return usedTable
}

const areInSameSet = (stateA, stateB, setArray) => {
    let returnBoolean = false
    setArray.forEach(set => {
        if (set.includes(stateA) && set.includes(stateB)) {
            returnBoolean = true
        }
    })
    return returnBoolean
}

const areDistinguishable = (stateA, stateB, alphabet, setArray, transition) => {
    let distinguishable = false;
    alphabet.forEach(alpha => {
        terminalA = transition[stateA][alpha]
        terminalB = transition[stateB][alpha]

        if (!areInSameSet(terminalA, terminalB, setArray)) {
            distinguishable = true
        }
    })
    return distinguishable
}

// Function to minimize the given transition table
const minimize = (table) => {
    const nodes = Object.keys(table)
}

minimize(transition)
