// Transition Table
const transition = {
    'q0': { a: 'q3', b: 'q1' },
    'q1': { a: 'q2', b: 'q5' },
    'q2': { a: 'q2', b: 'q2' },
    'q3': { a: 'q0', b: 'q4' },
    'q4': { a: 'q2', b: 'q5' },
    'q5': { a: 'q5', b: 'q5' }
}

const start = 'q0'

const alphabet = ['a', 'b']

const finish = ['q1', 'q2', 'q4']

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
const removeFromArr = (arr, item) => { return arr.filter((j) => { return j !== item }) }

const nextPartition = (partition) => {
    const next = []

    for (const i of partition) {
        const temp = []
        if (i.length === 1) {
            temp.push([i[0]])
        }
        if (i.length > 1) {
            temp.push([i[0]])
            for (let j = 1; j < i.length; j++) {
                let flagIsPushed = false
                for (jj of temp) {
                    let flagAreDistinguishable = areDistinguishable(jj[0], i[j], alphabet, partition, transition)
                    if (!flagAreDistinguishable) {
                        jj.push(i[j])
                        flagIsPushed = true
                    }

                }

                if (!flagIsPushed) { temp.push([i[j]]) }
            }
        }
        next.push(...temp)


    }
    return next

}

const partition = (startingPartition) => {
    const partitioning = {p0:startingPartition}
    console.log(partitioning);
    let level = 0
    let PartitionLen = startingPartition.length
    let done = false
    let p
    while(!done){
        level += 1
        p = nextPartition(startingPartition)
        partitioning['p'+level] = p
        done = (p.length === PartitionLen)
        PartitionLen = p.length
    }
    return {partitioning , last:p}
}

const transitionMap = (partition ,table) => {
    let map = {}
    for(item of partition){
        let joinedName = item.join('')
        if(joinedName){
            
            for(node of item){
                map[node] = joinedName
            }
        }
    }
    return map
}

// Function to minimize the given transition table
const minimize = (table) => {
    const nodes = Object.keys(table)
    const reachable = removeUnrechable(transition)
    const nonFinish = Object.keys(reachable).filter((item) => { return !finish.includes(item) })
    const startingPartition = [finish, nonFinish]


    const partitions = partition(startingPartition)
    console.log({ reachable, table }, partitions['partitioning'], partitions['last']  );

    console.log( transitionMap(partitions['last']) )
    // let prevPartitionLen = startingPartition.length
    // const p1 = nextPartition(startingPartition) 
    // while(prevPartitionLen)
    
    // const p2 = nextPartition(p1)

    // console.log({p0:startingPartition , p1 , p2});

}

minimize(transition)
