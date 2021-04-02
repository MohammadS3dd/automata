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

const nextNodes = (table,node, alphabet) => {
    const nexts = []
    for (const char of alphabet) {
        if (node[char]) {
            nexts.push(table[node[char]])
        }
    }
    console.log({nexts});
    return nexts
}

const nextSet = (table, nodes) => {
    const next = []
    // console.log({nodes});
    for (const node of nodes) {
        /// inja momkene ride bashim
        next.push(...nextNodes(table,node, alphabet))
    }
    return next
}
const union = (setA, setB) => {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

const reachable = (table , start) =>{
    let reachableSet = new Set()
    reachableSet.add(start)
    let isThereNewReachableNodes = true
    
    while (isThereNewReachableNodes){
        let reachableCount = reachableSet.size

        for (let item of reachableSet)
        {
            // console.log([item]);
            reachableSet = union(reachableSet , nextSet(table,[item]))
        }

        isThereNewReachableNodes = (reachableCount < reachableSet.size)
    }
    console.log({reachableSet })
}
// console.log(nextSet(transition,[transition['q0'], transition['q1']]))
reachable(transition , transition[start])
const getUnusedStates = () => {

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
