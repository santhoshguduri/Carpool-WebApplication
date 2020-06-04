import { IUser } from "../../Components/Athentication/Signup";

export const CreateUser =(user : IUser) => {
    return function(){
        fetch('https://localhost:44304/users/createuser',{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' },
        body: JSON.stringify(user)})
        .then(response=>{
            return response.json();
        })
        .catch(error=>{
            console.log(error);
        });
    }
}
