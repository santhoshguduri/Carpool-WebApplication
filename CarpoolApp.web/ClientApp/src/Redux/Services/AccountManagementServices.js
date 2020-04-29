export const CreateUser =(user) => {
    return function(){
        fetch('https://localhost:44304/users/createuser',{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' },
        body: JSON.stringify(user)})
        .then(response=>{
            return response.JSON();
        })
        .catch(error=>{
            console.log(error);
        });
    }
}
