let $ = function (id) {return document.getElementById(id);}

function getName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function getInputName(input) {
    return input.parentElement.querySelector('label').innerHTML;
}

function showOther(input, el, target) {
    if (input[input.selectedIndex].value === el) {
        target.classList.remove("hidden2");
    } else {
        target.classList.add('hidden2');
    };
}

function showOtherGender() {
    const checked = $('gender').querySelector('input[name="gender"]:checked');
    if ($('other') === checked) {
        $('otherGender').classList.remove('hidden');
    } else {
        $('otherGender').classList.add('hidden');
    };
}

function showHidden (el) {el.classList.remove('hidden');}

function showError (input, message1, message2) {
    const control = input.parentElement;
    const small = control.querySelector('small');
    const result = $(`${input.id}res`);
    input.classList.add('error');
    small.classList.add('error-feedback');
    result.classList.add('error-feedback');
    small.innerText = message1;
    result.innerHTML = message2;
}

function showSuccess (input) {
    input.classList.add('success');
    let feedback = $(`${input.id}-feedback`);
    feedback.classList.remove('error-feedback');
    feedback.innerText = '';
    const result = $(`${input.id}res`);
    result.innerHTML = $(`${input.id}`).value;
    result.classList.remove('error-feedback');
    if (input.id === 'password') {
        result.innerHTML = 'Correct';
    } else if (input.id === "country" && input.options[input.selectedIndex].value === 'Other'){
        result = $('countryres');
        result.innerHTML = $('Other').value;
    }
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else if (input.value.length === 0) {
        showError(input, 'Please enter Your E-mail address!', 'Please enter Your E-mail address!');
    } else {
        showError(input, 'E-mail is not valid!', `${input.value} is not a valid E-mail address!`);
    }
}

function checkLength(input, min, max) {
    if(input.value.length === 0) {
        showError(input, `Please enter Your ${getInputName(input)}!`, `Please enter Your ${getInputName(input)}!`);
    } else if (input.value.length > max) {
        showError(input, `${getInputName(input)} must be less than ${max} characters`, `${input.value} is too long ${getInputName(input)}!`);
    } else if (input.value.length > 0 && input.value.length < min) {
        showError(input, `${getInputName(input)} must be at least ${min} characters!`, `${input.value} is too short ${getInputName(input)}!`);
    } else {
        showSuccess(input);
    }
}

function checkValue(input) {
    if(input.value.length === 0 ) {
        showError(input, `Please enter Your ${getInputName(input)}!`, `Please enter Your ${getInputName(input)}!`);
    } else {
        showSuccess(input);
    }
}

// function checkChecked(input) {
//     const check = document.querySelector('input[name="gender"]:checked');
//     if (check !== null ) {
//         showSuccess($('gender').querySelector('input[name="gender"]:checked'));
//     } else {
//         showError($('gender'), 'Please specify Your gender!', 'Please specify Your gender!');   
//     }
// }

function checkPassword(input) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else if (input.value.length === 0) {
        showError(input, 'Please enter Your Password!', 'Please enter Your Password!');
    } else {
        showError(input, 'Password is not valid! It must be at least 8 characters long and contain at least one number!', ' is not a valid Password!');
    }
}

function checkPasswordMatch(input1, input2) {
    if (input1.value.length === 0 && input2.value.length === 0) {
        showError(input1, `Please enter Your ${getInputName(input1)}!`, `Please enter Your ${getInputName(input1)}!`);
    } else if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match!', 'Passwords do not match!');
    } else {
        showSuccess(input2);
        $('password2res').remove();
    }
}

function checkCountry(input) {
    if (input.options[input.selectedIndex].value === 'SelectCountry') {
        showError(input, 'Please select Your country!', 'Please select Your Country!');
    } else if (input.options[input.selectedIndex].value === 'Other') {
        const other = $('Other');
        other.classList.add('success');
        let feedback = $(`Other-feedback`);
        feedback.classList.remove('error-feedback');
        feedback.innerText = '';
        const result = $(`countryres`);
        result.innerHTML = other.value;
        result.classList.remove('error-feedback');
    } else {
        showSuccess(input);
    }
}

function checkGender() {
    const checked = $('gender').querySelector('input[name="gender"]:checked');
    if ( checked === null) {
            let feedback = $('gender-feedback');
            let result = $('genderres');
            let input = $('gender');
            input.classList.add('error');
            feedback.classList.add('error-feedback');
            feedback.innerText = 'Please specify Your gender!';
            result.innerHTML = 'Please specify Your gender!';
            result.classList.add('error-feedback');

        } else if (checked.id === 'other') {
            let input = $('otherGender')
            let feedback = $('otherGender-feedback');
            let result = $('genderres');
            if(input.value === '') {
                input.classList.add('error');
                feedback.classList.add('error-feedback');
                feedback.innerText = 'Please specify Your gender!';
                result.innerHTML = 'Please specify Your gender!';
                result.classList.add('error-feedback');

            } else {
                input.classList.add('success');
                feedback.classList.remove('error-feedback');
                feedback.innerText = '';
                $('gender-feedback').innerText = '';
                $('gender-feedback').classList.remove('error-feedback');
                result.innerHTML = input.value;
                result.classList.remove('error-feedback');
                $('gender').classList.remove('error');
                $('gender-feedback').classList.remove('error-feedback');

            }
        } else {
            let input = $('gender');
            let feedback = $('gender-feedback');
            let result = $('genderres');
            input.classList.add('success');
            feedback.classList.remove('error-feedback');
            feedback.innerText = '';
            result.innerHTML = checked.value;
            result.classList.remove('error-feedback');
        }
        
    }

$('country').addEventListener('change', function() {
    showOther($('country'), "Other", $('Other'));
});

$('gender').addEventListener('change', function() {
    showOtherGender();
});

$('submit').addEventListener('click', function(e){
    e.preventDefault();
    checkLength($('login'), 4, 10);
    checkEmail($('email'));
    checkValue($('name'));
    checkValue($('lastname'));
    checkPassword($('password'));
    checkPasswordMatch($('password'), $('password2'));
    checkLength($('phone'), 7, 13);
    checkValue($('birth'));
    checkCountry($('country'));
    checkGender();
    showHidden(results);
});


