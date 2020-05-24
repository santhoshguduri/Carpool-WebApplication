export const CreateUser =(user) => {
        fetch('https://localhost:44304/users/createuser',{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' },
        body: JSON.stringify(user)})
        .then(response=>{
            console.log(response.json());
        })
        .catch(error=>{
            console.log(error);
        });
}
