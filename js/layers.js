addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "red",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "ruby points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("p", 15)) mult = mult.times(upgradeEffect("p", 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "R: Reset for ruby points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "More points",
            description: "1.2x point gain",
            cost: new Decimal(2),
        },
        12: {
            title: "Even more points",
            description: "3x point gain",
            cost: new Decimal(3),
        },
        13: {
            title: "Even more points again",
            description: "5x point gain",
            cost: new Decimal(10),
        },
        14: {
            title: "Scaled points",
            description: "Earn more points based on ruby points",
            cost: new Decimal(20),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() {return format(upgradeEffect(this.layer,this.id))+"x"},
        },
        15: {
            title: "Scaled ruby points",
            description: "Earn more ruby points based on points",
            cost: new Decimal(200),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() {return format(upgradeEffect(this.layer,this.id))+"x"},
        },
    },
    layerShown(){return true}
})

addLayer("b", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "blue",
    requires: new Decimal(500), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "ruby points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0.5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
    },
)
