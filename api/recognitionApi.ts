import Ingredient from '../models/ingredient';

class RecognitionApi {
  static async recognize(fileUri: string): Promise<Ingredient[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return [
      {
        id: 100,
        name: 'Chicken',
        imgUrl:
          'https://www.incimages.com/uploaded_files/image/1920x1080/getty_80116649_344560.jpg',
        date: new Date().toISOString(),
        quantity: 20,
      },
    ];
  }
}

export default RecognitionApi;
