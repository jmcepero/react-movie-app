import { Images } from '../../../assets/images/Images.index';

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: any;
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Your Movie & TV Universe Awaits!',
    description:
      'Dive into thousands of titles. From blockbuster hits to indie gems, your next obsession is right here.',
    image: Images.pageOne,
  },
  {
    id: '2',
    title: 'Find Your Faves, Fast!',
    description:
      'Browse top charts, search by actor, or use smart filters to unearth hidden gems. Your perfect watch is just a tap away.',
    image: Images.pageTwo,
  },
  {
    id: '3',
    title: 'Never Lose a Gem Again!',
    description:
      'Spotted something awesome? Save it to your faves, build your ultimate watchlist, and let the show begin!',
    image: Images.pageThree,
  },
];
