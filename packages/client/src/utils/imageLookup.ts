import base1 from "../assets/sprites/base1.gif";
import base2 from "../assets/sprites/base2.gif";

const imageMap: { [key: number]: string } = {
  1: base1,
  2: base2,
};

const getImageForBase = (base: number) => {
  return imageMap[base];
};

export default getImageForBase;
