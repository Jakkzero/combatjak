export interface CombatantEntry {
    name: string,
    realdps: number,
    formatdps: string,
    damageportion: string,
    job: string,
    critrate: string,
    dhrate: string,
    critdhrate: string
}

export function parseJSONtoCombatantEntryArray(data: {}) {
    let final: CombatantEntry[] = [];

    for (let entry in data) {

        // If the entry's job is from a non-combat job or is error, just skip it.
        if (nonCombatJobs.includes(data[entry]["Job"].toUpperCase())) {
            console.log("Not Combatant! Skipping...")
            continue
        }

        // Cursed JSON parsing, this'll break at a moment's notice...
        // Dear future me: Sorry, not sorry.
        let combatant: CombatantEntry = {
            name: entry,
            realdps: parseInt(data[entry]["dps"]),
            formatdps: data[entry]["dps-*"],
            damageportion: data[entry]["damage%"],
            job: data[entry]["Job"].toUpperCase(),
            // I wonder why CRIT% is lowercase, but DH% and !!!% is capitalised...
            critrate: data[entry]["crithit%"],
            dhrate: data[entry]["DirectHitPct"],
            critdhrate: data[entry]["CritDirectHitPct"]
        }

        if (combatant.job === "LIMIT BREAK") {
            combatant.job = "LB";
        }
        
        final.push(combatant)
    }

    // Sort the array now, so it's in portion order when we wanna use it.
    return final.sort(combatantSort);
}

// Gizmo for sorting CombatantEntry Arrays.
export const combatantSort = (x: CombatantEntry, y: CombatantEntry) => {

    // Grab the damageportion string
    let [a, b] = [x.damageportion, y.damageportion];
    // Remove the last character, will be "%"
    [a, b] = [a.slice(0, -1), b.slice(0, -1)]
    // And turn them into usable integers
    let [val1, val2] = [parseInt(a), parseInt(b)]

    // Standard sort stuff, makes me miss match statements.
    if (val1 < val2) { return 1 }
    if (val1 > val2) { return -1 }
    return 0;
}

const nonCombatJobs = [
    "ALC", "ARM", "BSM", 'BTN', 'CRP', 'CUL',
    'FSH', 'GSM', 'LTW', 'MIN', 'WVR', 'ERROR'
]

// Colour spelt the correct way. And I'm not gonna change it, f?!? you.
// There's probably a better way to do this, but it works for now. Or forever.
// Also, the weird ordering is because I pulled them from FFLogs. These were the rDPS rankings.
const jobColourMap = {
    "MNK": "e0af26",
    "RPR": "965a90",
    "NIN": "af1964",
    "SAM": "e46d04",
    "DRG": "4164cd",
    "BLM": "a579d6",
    "MCH": "6ee1d6",
    "SMN": "2d9b78",
    "RDM": "f72525",
    "BRD": "91ba5e",
    "DNC": "e2b0af",
    "GNB": "9e8f3f",
    "WAR": "7d0702",
    "DRK": "d126cc",
    "PLD": "a8d2e6",
    "SGE": "80a0f0",
    "WHM": "fff0dc",
    "SCH": "8657ff",
    "AST": "ffe74a"
}

const classToJobMap = {
    "GLA": "PLD",
    "MRD": "WAR",
    "LNC": "DRG",
    "PGL": "MNK",
    "ROG": "NIN",
    "ARC": "BRD",
    "THM": "BLM",
    "ACN": "SMN",
    "CNJ": "WHM"
}

export const getJobColour = (index: string, portion: string) => {

    let colour: string = "";
    let portionInt = parseInt(portion.slice(0, -1));

    // Turn a class code into a job code.
    if (classToJobMap[index] != undefined) {
        index = classToJobMap[index]
    }

    // Then fetch the corresponding colour.
    if (jobColourMap[index] != undefined) {
        colour = jobColourMap[index];
    } else {
        colour = "ffffff"
    }

    return `linear-gradient(to right, #${colour} ${portionInt}%, rgba(255, 255, 255, 0.40) ${portionInt}%)`

}

