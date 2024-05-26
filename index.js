#! /usr/bin/env node
import inquirer from "inquirer";
console.log("Welcome to the command-line game!\nThis is a text-based adventure game.\nUse your imagination and make strategic decisions to win!\n");
// Class for representing a character (either hero or enemy)
class Character {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
// Main function to run the game
async function main() {
    // Prompt user to enter hero's name
    const { heroName } = await inquirer.prompt([
        {
            type: "input",
            name: "heroName",
            message: "Enter your hero's name:"
        }
    ]);
    // Prompt user to select an enemy type
    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["Goblin", "Orc", "Sorcerer"],
            message: "Select the enemy you want to fight:"
        }
    ]);
    // Initialize hero and enemy
    const hero = new Character(heroName);
    const enemy = new Character(enemyType);
    // Display the battlefield
    console.log(`${enemy.name} vs ${hero.name}`);
    // Main game loop
    do {
        // Prompt user to choose an action
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                choices: ["Attack", "Defend", "Cast Spell", "Flee"],
                message: "Choose an action:"
            }
        ]);
        // Process the chosen action
        switch (action) {
            case "Attack":
                // Determine the outcome of the attack
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    hero.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (hero.health <= 0) {
                        console.log("You lost! 😔 Try again.");
                        return;
                    }
                }
                else {
                    enemy.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (enemy.health <= 0) {
                        console.log("Congratulations! 🎉 You defeated the enemy!");
                        return;
                    }
                }
                break;
        }
    } while (true);
}
// Execute the main function
main();
