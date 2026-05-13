import { Injectable } from '@angular/core';

import { toNumber } from '../shared/utils';
import { Theme } from './theme';

@Injectable({
    providedIn: 'root'
})
export class ThemesApi {

    readonly themes: Theme[] = [
        {
            description: 'LEGO® Technic™ sets provide an advanced and complex building experience based on real-life vehicles big and small like sportscars, motorcycles and construction vehicles. They\'re packed full of authentic features like functioning gearboxes, wheels and axles.',
            id: 1,
            name: 'Technic'
        },
        {
            description: 'Explore the bustling world of LEGO® City where there\'s lots to do! Visit fun downtown destinations, play out exciting emergency services stories and discover new frontiers including the ocean and space. Build cool vehicles, take a ride on the train or put on exciting arena stunt shows.',
            id: 52,
            name: 'City'
        },
        {
            description: 'In a galaxy far, far away is a world where LEGO® Star Wars™ fans can celebrate their favorite heroes like Luke Skywalker, Han Solo, the Mandalorian, Grogu and more! Build recreations of memorable movie scenes, epic starships and vehicles, as well as role play awesome adventures with other beloved characters.',
            id: 158,
            name: 'Star Wars'
        },
        {
            description: 'Celebrate 25 years of the wizarding world on movie screens with enchanting LEGO® Harry Potter™ sets. Join Harry, Hermione, Ron and more as you build magical locations from the films for fun pretend play or construct stunning models for spellbinding home décor.',
            id: 246,
            name: 'Harry Potter'
        },
        {
            description: 'Capture the beauty and décor of some of the most remarkable landmarks around the world with LEGO® Architecture sets. From iconic city skylines to jaw-dropping historical structures, fulfill the passion of any architectural enthusiast with mindful builds of these impressive models.',
            id: 252,
            name: 'Architecture'
        },
        {
            description: 'Celebrate 15 years of LEGO® NINJAGO® action with the Masters of Spinjitzu for exciting pretend play in endless adventures. Build stunning temples, ferocious dragons, cool vehicles and mighty mechs in the battle between good vs. evil.',
            id: 435,
            name: 'Ninjago'
        },
        {
            description: 'Celebrate friendship with a group of close-knit girls sharing adventures in Heartlake City including sets featuring new characters. Young builders can create fun stories while developing interpersonal skills and emotional awareness through role-play.',
            id: 494,
            name: 'Friends'
        },
        {
            description: 'Inspired by fans\' designs and voted on by fellow fans to become official sets, LEGO® Ideas offer creatively unique sets of a wide range of interests. From iconic TV and movie favorites, distinctive structures, space exploration and beautiful décor models, these are impressive builds for display.',
            id: 576,
            name: 'Ideas'
        },
        {
            description: 'Inspire endless Minecraft® adventures for fans to recreate iconic pixelated details from the popular video game. Use hands-on creativity to bring to life the authentic Minecraft® characters and build unique structures and scenes to play out fun and exciting stories.',
            id: 577,
            name: 'Minecraft'
        },
        {
            description: 'Ready, set, go! LEGO® Speed Champions give race car fans the chance to recreate mini versions of the world\'s leading and best-known vehicles. Build and display these collectible model replicas from the likes of Ferrari, Aston Martin, Lamborghini, Dodge and Chevrolet.',
            id: 601,
            name: 'Speed Champions'
        },
        {
            description: 'Enjoy hours of thrilling dinosaur adventures with LEGO® Jurassic World™ play sets. Join the heroic characters and try to contain the dinosaurs loose in the park by building cool vehicles, scientific equipment, and laboratories.',
            id: 602,
            name: 'Jurassic World'
        },
        {
            description: 'Celebrate 100 years of magical wonder with LEGO® | Disney sets featuring iconic characters. Fans can relive memorable Disney scenes, build enchanting castles and recreate amusement park attractions. Join Mickey Mouse and Friends, Disney Princess characters and more for fun, imaginative play.',
            id: 608,
            name: 'Disney'
        },
        {
            description: 'LEGO® BrickHeadz™ are collectible figures you can build and display to add some personality to your home or personal space. These brick-built figures feature adorable animals, cartoons, fan-favorite TV & movie characters and special holiday-themed pieces.',
            id: 610,
            name: 'Brickheadz'
        },
        {
            description: 'Jump into the world of LEGO® Super Mario™! Featuring iconic locations and beloved characters, fans can build Starter Courses and Expansion Sets for interactive play and exciting adventures.',
            id: 690,
            name: 'Super Mario'
        },
        {
            description: 'Pay homage to the iconic Caped Crusader™ and his pursuits against the bad guys in Gotham City™ with LEGO® DC Batman™ sets. Fans of all ages can recreate scenes from the memorable movies and comics with exciting role play adventures and authentically detailed vehicles.',
            id: 697,
            name: 'Batman'
        },
        {
            description: 'LEGO® Art gives you the chance to make stunningly detailed brick-built decor sets to display that pay homage to the worlds of art, nature, entertainment, travel and history. Take the time to build your masterpiece for a relaxing and rewarding experience.',
            id: 709,
            name: 'Art'
        },
        {
            description: 'Build upon your passion with premium LEGO® Icons sets designed for adults. Recreate famous landmarks and classic vehicles, assemble detailed modular buildings and pay tribute to pop culture favorites. Display these collectible sets as décor models for a striking centerpiece in the home or office.',
            id: 721,
            name: 'Icons'
        },
        {
            description: 'Bring the fastest video game hero to life with awesome LEGO® Sonic the Hedgehog™ sets. The speedy Sonic is joined by his friends Tails and Amy in exciting ring-collecting challenges as they face off against Dr. Eggman, Cubot and the Badniks.',
            id: 747,
            name: 'Sonic The Hedgehog'
        },
        {
            description: 'Enter the dream world with friends Mateo, Izzie, Cooper, Logan and Zoey as they use the power of imagination to take on the evil Nightmare King. Based on the LEGO® DREAMZzz™ TV series, these sets feature fantastical vehicles, whimsical buildings and wondrous creatures.',
            id: 749,
            name: 'Dreamzzz'
        },
        {
            description: 'Explore Hyrule as you recreate the exciting action and adventure from The Legend of Zelda™ video game series. Build two versions of the Great Deku Tree or leap into battle with Link and Princess Zelda as you face off with the brick-built Ganon. Featuring in-game pieces from the series, including the Master Sword, Hylian Shield and more.',
            id: 764,
            name: 'The Legend of Zelda'
        },
        {
            description: 'The adventure is building! Discover the world of LEGO® Fortnite® - the ultimate survival crafting adventure! Start building your adventure online wherever you play Fortnite - or build IRL with LEGO Fortnite sets based on the Supply Llama, Battle Bus, and more.',
            id: 766,
            name: 'Fortnite'
        },
        {
            description: 'Feel your creativity flourish as you craft colorful, brick-built floral arrangements from the LEGO® Botanicals Collection. Whether creating your own unique home décor or gifting these forever flowers to friends and loved ones, LEGO Botanicals offer beautifully blooming builds.',
            id: 769,
            name: 'Botanicals'
        },
        {
            description: 'Embark on thrilling quests for epic treasure with the Straw Hat Pirates crew and LEGO® ONE PIECE sets. Fans of the manga series, smash-hit anime, and live-action sensation on Netflix will love role-playing with iconic characters in a chaotic ocean of creative building.',
            id: 775,
            name: 'One Piece'
        },
        {
            description: 'LEGO® Pokémon™ sets are here! Check out our awesome selection of collectibles and sets inspired by beloved Pokémon like Charizard, Eevee and Pikachu. Highly-detailed LEGO Pokémon display pieces will make perfect nostalgic gifts for adults, gaming fans and anyone who\'s ever dreamed of being a Pokémon Trainer.',
            id: 776,
            name: 'Pokemon'
        },
        {
            description: 'Celebrate outstanding talent, aspire to achieve and connect with cultural icons through playful, eye-catching display models.',
            id: 787,
            name: 'Editions'
        }
    ].sort((a: Theme, b: Theme) => a.name.localeCompare(b.name));

    getThemeById(id: number) {
        return this.themes.find(theme => theme.id === toNumber(id));
    }
}
