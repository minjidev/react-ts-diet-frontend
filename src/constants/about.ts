const story =
  "<span class='first-letter'>N</span>utriNotes is an early-stage personal project born from the realization of needing to pay closer attention to my nutritional intake.\
  Like many of us, I found myself eating irregularly while engrossed in work in front of the computer.\
  The idea of being more conscious about what I eat became important, but keeping track of it daily was a challenge. That's when the concept of NutriNotes emerged—a platform to simplify and enhance our nutritional choices!";

const features =
  'NutriNotes is designed to make healthy eating effortless. We offer a range of features that address the struggles of modern, busy lives:';

const featuresDesc = [
  {
    title: 'Browse Diverse Food Choices',
    content: 'Explore a variety of food options and discover new meal ideas that align with your nutritional goals.',
  },
  {
    title: 'Search and Log Meals:',
    content: "Easily log your daily meals, making it convenient to keep track of what you're consuming.",
  },
  {
    title: 'Nutritional Information',
    content:
      'Access detailed nutritional information for each meal, helping you understand the impact of your choices.',
  },
  {
    title: 'Visual Daily Summary:',
    content:
      'Get a clear visual summary of the nutritional content of your daily meals, encouarging you to make balanced decisions.',
  },
];

const developer =
  "Greetings! 👋 I'm a <span class='bold'>Frontend Developer</span> based in South Korea, who's all about wellness, health, and scrumptious food.\
  I aim to specialize in creating <span class='highlight'> visually captivating and smooth user experiences</span>.\
  I'm also committed to ensure <span class='highlight'>web accessibility</span> across all of my projects.";

const goal =
  "NutriNotes believes everyone deserves a tool <span class='bold'>to simplify their journey to a healthier lifestyle</span>.\
  It aims for users to elevate their awareness of nutritional intake and effortlessly track their meals.";

const desc = {
  story,
  features,
  developer,
  goal,
};

interface DescType {
  story: string;
  features: string;
  developer: string;
  goal: string;
}

const descKey: (keyof DescType)[] = ['story', 'developer', 'goal'];

export { featuresDesc, desc, descKey };
