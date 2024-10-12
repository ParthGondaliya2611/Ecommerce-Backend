import bcrypt from 'bcrypt';
export const hashpassword=async(password)=>{
    try {
        const salt=10;
        const hashedpassword=await bcrypt.hash(password,salt);
        return hashedpassword;
    } catch (error) {
        console.log(error);
    }
}
export const comparepassword=(password,hashedpassword)=>{
   return bcrypt.compare(password,hashedpassword) 
}
