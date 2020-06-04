
export const onChangeName=()=>{
    return function(){
        var nameregx = /^[a-z]+$/i;
        var name = document.getElementById('name')! as HTMLInputElement;
        var result = nameregx.test(name.value);
        result?name.style.border="2px solid green":
        name.style.border="2px solid red";
    }
}

export const onChangeEmail=()=>{
    return function(){
        var emailregx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        var email = document.getElementById('email')! as HTMLInputElement;
        var result = emailregx.test(email.value);
        result ? email.style.border="2px solid green":
        email.style.border="2px solid red";
    }
}

export const onChangeMobile=()=>{
    return function(){
        var mobileregx = /^[6-9]{1}[0-9]{9}$/;
        var mobile = document.getElementById('mobile')! as HTMLInputElement;
        var result = mobileregx.test(mobile.value);
        result ? mobile.style.border="2px solid green":
        mobile.style.border="2px solid red";
    }
}

export const onChangeGender=()=>{
    return function(){
        var genderregx = /^[a-z0-9]+$/i;
        var gender = document.getElementById('gender')! as HTMLInputElement;
        var result = genderregx.test(gender.value);
        result ? gender.style.border="2px solid green":
        gender.style.border="2px solid red";
    }
}

export const onChangePasswordStrength=()=>{
    return function(){
        var strongPasswordregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        var averagePasswordregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        var password = document.getElementById('password')! as HTMLInputElement;
        strongPasswordregx.test(password.value) ? password.style.border="2px solid green":
        averagePasswordregx.test(password.value) ? password.style.border="2px solid yellow" :
        password.style.border="2px solid red";
    }
}
