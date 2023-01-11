import {gql} from "apollo-server"

const typeDefs = gql`
 type Query{
   users:[User]
   user(_id:ID!):User
 }

 type User{
   _id:ID!
   name:String!
   email:String!
   password:String!
   cloudinary_id:String
   profilePic:String
   birthYear: Int
   subscribe: Boolean
   role:String
   gender:String
   token:String
 }


 type Mutation{
   signupUser(userNew:UserInput!):User
   signInUser(userSignin:UserSigninInput!):User
   profileUpdate(userInfo:UserUpdateInfoInput!):User
   passwordUpdate(userPassword:UserPasswordUpdateInput!):successMessage
 }

 input UserInput{
   name:String!
   email:String!
   password:String!
   birthYear: Int
   subscribe: Boolean
   role:String
   gender:String
 }
 
 input UserSigninInput{
   email:String!
   password:String!
 }

 input UserUpdateInfoInput{
   name:String!
   gender:String
   birthYear:Int
 }
 input UserPasswordUpdateInput{
   currentPassword:String!
   newPassword:String!
 }

 type successMessage{
   status:String
   message:String
 }
`
export default typeDefs