import { UserCredential } from 'firebase/auth';

class User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  picSrc?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    picSrc?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.picSrc = picSrc;
  }

  public static fromFirebase(user: UserCredential): User {
    return {
      id: user.user.uid,
      name: user.user.displayName,
      email: user.user.email,
      phoneNumber: user.user.phoneNumber,
      picSrc: user.user.photoURL,
    };
  }

  // public static fromGoogleAuth(user: Record<string, unknown>): User {
  //   return {
  //     id: user.,
  //     name: user.user.displayName,
  //     email: user.user.email,
  //     phoneNumber: user.user.phoneNumber,
  //     address: user.user.displayName,
  //     picSrc: user.user.photoURL,
  //   };
  // }
}

const testUser: User = {
  id: '1',
  name: 'User',
  email: 'user@test.com',
  phoneNumber: '05555555555',
};

// const testFriends: Array<User> = [
//   {
//     id: '2',
//     name: 'Yahya Elnouby',
//     email: 'yahya@test.com',
//     phoneNumber: '05555555555',
//     address: 'Somewhere in Ankara',
//   },

//   {
//     id: '3',
//     name: 'Selin Kirmaci',
//     email: 'yahya@test.com',
//     phoneNumber: '05555555555',
//     address: 'Somewhere in Ankara',
//   },
//   {
//     id: 4,
//     name: 'Arnisa Fazla',
//     email: 'arnisa@test.com',
//     phoneNumber: '05555555555',
//     address: 'Somewhere in Ankara',
//   },
//   {
//     id: 5,
//     name: 'Elham Amin',
//     email: 'elham@test.com',
//     phoneNumber: '05555555555',
//     address: 'Somewhere in Ankara',
//   },
//   {
//     id: 6,
//     name: 'Mohammed S.',
//     email: 'mohammed@test.com',
//     phoneNumber: '05555555555',
//     address: 'Somewhere in Ankara',
//   },
// ];

export default User;
export { testUser };
