interface Ingredient {
  id: string;
  name: string;
  imgUrl?: string;
  date?: string;
  quantity?: number;
}

interface FilterIngredient extends Ingredient {
  included: boolean;
}

const dummyIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Apple',
    imgUrl:
      'https://5.imimg.com/data5/NL/FU/MY-48841722/apple-fruit-500x500.jpeg',
    date: '2020-01-01',
    quantity: 5,
  },
  {
    id: '2',
    name: 'Meat',
    imgUrl:
      'https://www.incimages.com/uploaded_files/image/1920x1080/getty_80116649_344560.jpg',
    date: '2022-01-01',
    quantity: 20,
  },
  {
    id: '3',
    name: 'Oil',
    imgUrl: 'https://m.media-amazon.com/images/I/71n0lstWV7L._AC_SL1500_.jpg',
    date: '2022-01-01',
    quantity: 2,
  },
  {
    id: '4',
    name: 'Flour',
    imgUrl:
      'https://i5.walmartimages.com/asr/769b7ea6-1afd-4aad-9993-9a6ea57ef7b7_1.be2a4f66ed4a3c53b4eb76c3a99837dd.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    date: '2022-01-01',
    quantity: 1,
  },
  {
    id: '5',
    name: 'Orange',
    imgUrl:
      'https://i5.walmartimages.ca/images/Enlarge/234/6_r/6000191272346_R.jpg',
    date: '2022-01-01',
    quantity: 10,
  },
  {
    id: '6',
    name: 'Milk',
    imgUrl:
      'https://www.almarai.com/wp-content/uploads/2017/11/42270-UHT-MILK-FF-1L-SCREWCAP-WITH-VITAMIN-EN_WEB.jpg',
    date: '2022-01-01',
    quantity: 2,
  },
];

const dummyFiltereIngredients: FilterIngredient[] = [
  {
    id: '1',
    name: 'Apple',
    imgUrl:
      'https://5.imimg.com/data5/NL/FU/MY-48841722/apple-fruit-500x500.jpeg',
    date: '2020-01-01',
    quantity: 5,
    included: true,
  },
  {
    id: '2',
    name: 'Meat',
    imgUrl:
      'https://www.in0cimages.com/uploaded_files/image/1920x1080/getty_80116649_344560.jpg',
    date: '2022-01-01',
    quantity: 20,
    included: true,
  },
  {
    id: '3',
    name: 'Oil',
    imgUrl: 'https://m.media-amazon.com/images/I/71n0lstWV7L._AC_SL1500_.jpg',
    date: '2022-01-01',
    quantity: 2,
    included: true,
  },
  {
    id: '4',
    name: 'Flour',
    imgUrl:
      'https://i5.walmartimages.com/asr/769b7ea6-1afd-4aad-9993-9a6ea57ef7b7_1.be2a4f66ed4a3c53b4eb76c3a99837dd.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    date: '2022-01-01',
    quantity: 1,
    included: true,
  },
  {
    id: '5',
    name: 'Orange',
    imgUrl:
      'https://i5.walmartimages.ca/images/Enlarge/234/6_r/6000191272346_R.jpg',
    date: '2022-01-01',
    quantity: 10,
    included: true,
  },
  {
    id: '6',
    name: 'Milk',
    imgUrl:
      'https://www.almarai.com/wp-content/uploads/2017/11/42270-UHT-MILK-FF-1L-SCREWCAP-WITH-VITAMIN-EN_WEB.jpg',
    date: '2022-01-01',
    quantity: 2,
    included: true,
  },
];

export default Ingredient;
export { dummyIngredients, dummyFiltereIngredients };
