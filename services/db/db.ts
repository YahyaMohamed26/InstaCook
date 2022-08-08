import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { defaultFilters, UserFilters } from '../../models/filter';
import Ingredient from '../../models/ingredient';
import { PublishedRecipe } from '../../models/publishedRecipe';
import Recipe from '../../models/recipe';
import { RecipePost } from '../../models/recipePost';
import User from '../../models/user';
import { firestore } from '../firebase';

const USERS_COLLECTION = 'users';
const USER_INFO = 'USER_INFO';
const USERS_SHOPPING_LIST = 'user-shopping-list';
const POSTS_COLLECTION = 'posts';
const PUBLISHED_RECIPES_COLLECTION = 'published-recipes';

class DB {
  instance: Firestore;
  constructor() {
    this.instance = firestore;
  }

  getUserInfo = async (userId: string) => {
    try {
      const ingredients = await this.getUserIngredients(userId);
      const shoppingList = await this.getUserShoppingListItems(userId);
      const filters = await this.getFilters(userId);
      const savedRecipes = await this.getSavedRecipes(userId);
      const posts = await this.getPublishedRecipes(userId);

      return {
        ingredients,
        shoppingList,
        filters: filters || defaultFilters,
        savedRecipes,
        posts,
      };
      // const filters = await this.getFilters(userId);
      // return { filters };
    } catch (error) {
      console.log(error);
    }
  };

  upsertUser = async (user: User): Promise<unknown> => {
    try {
      const res = await setDoc(
        doc(this.instance, USERS_COLLECTION, user.id),
        user
      );
      console.log('[+] USER WAS ADDED TO DATABASE SUCCESSFULLY');
      return true;
    } catch (error) {
      console.log('[-] FAILED TO INSERT USER INTO DB.');
      console.log(error);
      return false;
    }
  };

  getUser = async (userId: string): Promise<User | undefined> => {
    try {
      const docRef = doc(this.instance, USERS_COLLECTION, userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const user = new User(
          userData.id,
          userData.name,
          userData.email,
          userData.phoneNumber,
          userData.picSrc
        );
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // addNewRecipe = async (userId: string, recipe: Recipe) => {
  //   const path = `published-recipes`;
  //   const recipeToPublish: PublishedRecipe = { recipe, userId };
  //   const docRef = await addDoc(
  //     collection(this.instance, path),
  //     recipeToPublish
  //   );
  //   await setDoc(docRef, {
  //     ...recipeToPublish,
  //     recipe: { ...recipeToPublish.recipe, id: docRef.id },
  //   });
  //   console.log(docRef.id);
  //   return docRef.id;
  // };
  // getPublishedRecipes = async (userId: string): Promise<Array<Recipe>> => {
  //   const path = `published-recipes`;
  //   const q = query(
  //     collection(this.instance, path),
  //     where('userId', '==', userId)
  //   );

  //   const querySnapshot = await getDocs(q);
  //   // const q = query(collection(this.instance, path));
  //   const fetchedRecipes = Array<Recipe>();
  //   // const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const publishedRecipe = doc.data() as PublishedRecipe;
  //     fetchedRecipes.push(publishedRecipe.recipe);
  //   });
  //   console.log('FETCHHHH', fetchedRecipes);
  //   return fetchedRecipes;
  // };

  getAllPublishedRecipes = async (): Promise<Array<Recipe>> => {
    const path = `posts`;
    const q = query(collection(this.instance, path));

    const querySnapshot = await getDocs(q);
    // const q = query(collection(this.instance, path));
    const fetchedRecipes = Array<Recipe>();
    // const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const publishedRecipe = doc.data() as PublishedRecipe;
      fetchedRecipes.push(publishedRecipe.recipe);
    });
    return fetchedRecipes;
  };

  addNewRecipe = async (userId: string, recipe: Recipe) => {
    const path = `published-recipes`;
    const recipeToPublish: PublishedRecipe = { recipe, userId };
    const docRef = await addDoc(
      collection(this.instance, path),
      recipeToPublish
    );
    await setDoc(docRef, {
      ...recipeToPublish,
      recipe: { ...recipeToPublish.recipe, id: docRef.id },
    });
    console.log(docRef.id);
    return docRef.id;
  };

  addToUserIngredients = async (
    userId: string,
    ing: Ingredient
  ): Promise<string> => {
    const path = `${USER_INFO}/${userId}/ingredients`;
    const docRef = await addDoc(collection(this.instance, path), ing);
    await setDoc(docRef, { ...ing, id: docRef.id });
    return docRef.id;
  };

  updateUserIngredient = async (userId: string, ing: Ingredient) => {
    const path = `${USER_INFO}/${userId}/ingredients`;
    const docRef = doc(this.instance, path, ing.id);
    await updateDoc(docRef, { ...ing });
  };

  deleteUserIngredient = async (userId: string, ingId: string) => {
    const path = `${USER_INFO}/${userId}/ingredients`;
    const docRef = doc(this.instance, path, ingId);
    await deleteDoc(docRef);
  };

  getUserIngredients = async (userId: string): Promise<Array<Ingredient>> => {
    const path = `${USER_INFO}/${userId}/ingredients`;
    const q = query(collection(this.instance, path));
    const fetchedIngredients = Array<Ingredient>();
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      fetchedIngredients.push(doc.data() as Ingredient)
    );
    return fetchedIngredients;
  };

  setFilters = async (
    userId: string,
    filters: UserFilters
  ): Promise<UserFilters> => {
    console.log('-------------------------------');
    try {
      const path = `${USER_INFO}/${userId}/filters/filters`;
      const docRef = doc(this.instance, path);
      const res = await setDoc(docRef, filters);
      console.log(res);
      return filters;
    } catch (error) {
      console.log(error);
    }
  };

  getFilters = async (userId: string): Promise<UserFilters> => {
    const path = `${USER_INFO}/${userId}/filters/filters`;

    try {
      const docRef = doc(this.instance, path);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const filters = docSnap.data() as UserFilters;
        return filters;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============================ shopping list crud =========================

  addToUserShoppingList = async (
    userId: string,
    ing: Ingredient
  ): Promise<string> => {
    const path = `${USER_INFO}/${userId}/shopping-list`;
    const docRef = await addDoc(collection(this.instance, path), ing);
    await setDoc(docRef, { ...ing, id: docRef.id });
    console.log(docRef.id);
    return docRef.id;
  };

  updateUserShoppingListItem = async (userId: string, ing: Ingredient) => {
    const path = `${USER_INFO}/${userId}/shopping-list`;
    const docRef = doc(this.instance, path, ing.id);
    await updateDoc(docRef, { ...ing });
  };

  deleteUserShoppingListItem = async (userId: string, ingId: string) => {
    const path = `${USER_INFO}/${userId}/shopping-list`;
    const docRef = doc(this.instance, path, ingId);
    await deleteDoc(docRef);
  };

  getUserShoppingListItems = async (
    userId: string
  ): Promise<Array<Ingredient>> => {
    const path = `${USER_INFO}/${userId}/shopping-list`;
    const q = query(collection(this.instance, path));
    const fetchedIngredients = Array<Ingredient>();
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      fetchedIngredients.push(doc.data() as Ingredient)
    );
    return fetchedIngredients;
  };

  // ============================ shopping list crud =========================

  publishPost = async (post: PublishedRecipe): Promise<PublishedRecipe> => {
    const docRef = await addDoc(
      collection(this.instance, PUBLISHED_RECIPES_COLLECTION),
      post
    );
    const postWithId: PublishedRecipe = {
      ...post,
      recipe: { ...post.recipe, id: docRef.id },
    };
    await setDoc(docRef, postWithId);
    return postWithId;
  };

  deletePost = async (post: RecipePost) => {
    const docRef = doc(this.instance, POSTS_COLLECTION, post.id);
    await deleteDoc(docRef);
    return post;
  };

  getPublishedRecipes = async (userId: string): Promise<Array<Recipe>> => {
    const q = query(
      collection(this.instance, PUBLISHED_RECIPES_COLLECTION),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const fetchedRecipes = Array<Recipe>();
    querySnapshot.forEach((doc) => {
      const publishedRecipe = doc.data() as PublishedRecipe;
      fetchedRecipes.push(publishedRecipe.recipe);
    });
    return fetchedRecipes;
  };

  saveRecipe = async (userId: string, recipe: Recipe): Promise<Recipe> => {
    const path = `${USER_INFO}/${userId}/saved-recipes`;
    const docRef = await addDoc(collection(this.instance, path), recipe);
    await setDoc(docRef, recipe);
    console.log(docRef.id);
    return recipe;
  };

  unsaveRecipe = async (userId: string, recipe: Recipe): Promise<Recipe> => {
    const path = `${USER_INFO}/${userId}/saved-recipes`;
    try {
      const q = query(
        collection(this.instance, path),
        where('id', '==', recipe.id)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (error) {
      console.log(error);
    }
    return recipe;
  };

  getSavedRecipes = async (userId: string): Promise<Array<Recipe>> => {
    const path = `${USER_INFO}/${userId}/saved-recipes`;
    const q = query(collection(this.instance, path));
    const fetchedRecipes = Array<Recipe>();
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => fetchedRecipes.push(doc.data() as Recipe));
    return fetchedRecipes;
  };
}

export default new DB();
