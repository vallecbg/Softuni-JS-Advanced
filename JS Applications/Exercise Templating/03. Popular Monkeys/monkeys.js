(function () {
  class Monkey {
      constructor(id, name, image, info) {
          this.id = id;
          this.name = name;
          this.image = image;
          this.info = info;
      }
  }

  let monkeys = [
      new Monkey(1, "Chim Chim", "/images/chim-chim.jpg", "Chim Chim and Speed Racer's kid brother Spritle provide the comic relief on this classic cartoon. Their relationship is a strong (if not a little bizarre) one; they're essentially joined at the hip, and they consistently rock matching outfits as they plot new, wacky ways to get their hands on some candy."),

      new Monkey(2, "Moon Watcher", "/images/moon-watcher.jpg", "This clever ape represents the evolution of man as he picks up a bone and learns to use it as a weapon to club his prey in this iconic opening scene."),

      new Monkey(3, "Jack", "/images/jack.png", "Who needs a parrot, anyway? Captain Barbossa swaps out the more traditional squawker for a monkey in the Pirates movies. And Jack’s not to be trifled with—he's undead, just like his owner."),

      new Monkey(4, "Grape Ape", "/images/grape-ape.jpg", "He's a giant purple gorilla with a limited vocabulary and a heart of gold. What more do you need in a Saturday morning cartoon?"),

      new Monkey(5, "Abu", "/images/abu.png", "Abu is sort of like Aladdin’s version of a Greek chorus, constantly pulling faces and reacting to the action and occasionally uttering a word here or there in a Donald Duck-style voice. Can you blame him? He’s got a lot to deal with, like being turned into an elephant against his will."),

      new Monkey(6, "Marcel", "/images/marcel.png", "All good things must come to an end, and Marcel's time on Friends was no exception. Everyone's favorite 'The Lion Sleeps Tonight'-obsessed Capuchin monkey got donated to a zoo by Ross after he began humping everything in sight. Later Ross finds out that Marcel was stolen from the zoo and is starring in a movie."),
  ];

  window.monkeys = monkeys;
})()

