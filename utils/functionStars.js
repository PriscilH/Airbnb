import { Entypo } from '@expo/vector-icons';

export const functionStars = (rate) => {
  const tab = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      tab.push(<Entypo name="star" size={20} color="#FFB000" key={i} />);
    } else {
      tab.push(<Entypo name="star" size={20} color="#BBBBBB" key={i} />);
    }
  }

  return tab;
};