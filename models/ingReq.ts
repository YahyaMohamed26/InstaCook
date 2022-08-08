class IngRequest {
  id: number;
  userName: string;
  item: string;
  time: number;
}

const dummyRequests: IngRequest[] = [
  {
    id: 1,
    userName: 'Yahya Mohamed',
    item: 'rice',
    time: 0,
  },
  {
    id: 2,
    userName: 'Arnisa Fazla',
    item: 'olive oil',
    time: 0,
  },
  {
    id: 3,
    userName: 'Selin Kırmacı',
    item: 'mandalina',
    time: 0,
  },
];

export default IngRequest;
export { dummyRequests };
