export interface InputUserInterface {
  fullname: string;
  email: string;
  password: string;
}

export interface UserInterface extends InputUserInterface {
  id: number;
  
}

export interface UserLoginInterface {
  email: string;
  password: string;
}


// export interface EmailOptions {
//   to: string,
//   subject: string,
//   text: string,
//   html: string
// }