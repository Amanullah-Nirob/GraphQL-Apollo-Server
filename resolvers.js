import UserModel from './models/UserModel.js'
import generateToken from './utils/generateToken.js'

const resolvers = {
    Query:{
        users:async(parent, args, contextValue) =>{
            if(!contextValue._id) throw new Error("You must be logged in")
            return await UserModel.find({})
        },
        user:async(_,{_id}) =>await UserModel.findOne({_id}),
    },
    Mutation:{
        signupUser:async(_,{userNew})=>{
           const user = await UserModel.findOne({email:userNew.email})
           if(user){
            throw new Error("User already exists with that email")
          }
          let newUser = await UserModel.create(userNew)
          newUser._doc["token"]=generateToken(newUser._id)
          return newUser._doc
        },
        signInUser:async(_,{userSignin})=>{
           const user = await UserModel.findOne({email:userSignin.email})
           if (user && (await user.matchPasswords(userSignin.password))) {
            user["token"]=generateToken(user._id)
            console.log(user);
            return user
           } else {
            throw new Error("Invalid Email or Password");
          } 
        },
        profileUpdate:async(_,{userInfo},contextValue)=>{
          if(!contextValue._id) throw new Error("You must be logged in")
          const updatedUser = await UserModel.findByIdAndUpdate(
            contextValue._id,
            { 
                ...contextValue._doc,
                name:userInfo.name, 
                gender:userInfo.gender, 
                birthYear:userInfo.birthYear
            },
            { new: true }
          )
          console.log(updatedUser);
          return updatedUser
        },
        
        passwordUpdate:async(_,{userPassword},contextValue)=>{
          if(!contextValue._id) throw new Error("You must be logged in")
          if (userPassword.currentPassword === userPassword.newPassword) {
            throw new Error("New Password Must Differ from Current Password");
          }
           // Find the logged in user by its id
           const user = await UserModel.findById(contextValue._id);
           // Check if it exists
            if (!user) {
                throw new Error("User not found");
            }

            // Now check if the entered 'currentPassword' matches the stored password
            if (!(await user.matchPasswords(userPassword.currentPassword))) {
                throw new Error("Invalid Current Password");
            }
          const data= await UserModel.updateOne(
                { _id: contextValue._id },
                {
                  $set: { password: userPassword.newPassword},
                }
            );
           if(data.modifiedCount>0){
            return {
                status: "success", 
                message: "Password Updated Successfully" 
            }
           }
        },


    }
}

export default resolvers