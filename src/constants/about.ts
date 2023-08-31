const story =
  "NutriNotes was born from a personal journey of realizing the need to pay closer attention to my nutritional intake. Like many of us, I found myself eating irregularly while engrossed in work in front of the computer. The idea of being more conscious about what I eat became important, but keeping track of it daily was a challenge. That's when the concept of NutriNotes emerged—a platform to simplify and enhance our nutritional choices!";

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
  "Greetings! I'm a Frontend Developer based in South Korea, with a genuine passion for wellness, health, and delicious food. My commitment lies in creating visually appealing and seamless user experiences. NutriNotes is my way of contributing positively to people's lives through better eating habits.";

const goal =
  "NutriNotes believes everyone deserves a tool to simplify their journey to a healthier lifestyle. Our platform goes beyond tracking meals—it's about building awareness, providing insights, and creating a supportive community.";

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

const descKey: (keyof DescType)[] = ['story', 'features', 'developer', 'goal'];

export { featuresDesc, desc, descKey };
