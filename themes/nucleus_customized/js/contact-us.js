const submitButton = document.querySelector('[data-type="contact-submit"]');
const contactInput = {
    name: document.querySelector('[data-type="contact-name"]'),
    email: document.querySelector('[data-type="contact-email"]'),
    message: document.querySelector('[data-type="contact-message"]')
};
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Email is sent to Dr Buehlmaier(t9w6fmmwapgjy2mjxk43jx54)
//      originally: webdevelopmentcim@gmail.com(xiwwtphqxxqhkevncb2hgo93)

var emailData = {
    "access_token": "t9w6fmmwapgjy2mjxk43jx54"
};

function updateName() {
    if (contactInput.name.uninputed === undefined) {contactInput.name.uninputed = true;}
    contactInput.name.valid = contactInput.name.value.trim() !== "" || contactInput.name.uninputed;
}

function updateEmail() {
    if (contactInput.email.uninputed === undefined) {contactInput.email.uninputed = true;}
    contactInput.email.valid = emailRegex.test(contactInput.email.value) || contactInput.email.uninputed;
}

function updateMessage() {
    if (contactInput.message.uninputed === undefined) {contactInput.message.uninputed = true;}
    contactInput.message.valid = contactInput.message.value.trim() !== "" || contactInput.message.uninputed;
}

function updateUninputed() {
    for (const [key, value] of Object.entries(contactInput)) {
        contactInput[key].uninputed = value.value.trim() === "" && contactInput[key].uninputed;
    }
}

function updateInputState() {
    for (const [key, value] of Object.entries(contactInput)) {
        if (contactInput[key].valid === false) {
            contactInput[key].classList.add('invalid');
            if (value.value.trim() === "") {
                document.getElementsByClassName(`contact-input-helper-text ${key}`)[0].classList.add('active');
                if (key === 'email') {
                    const emailformat = document.getElementsByClassName(`contact-input-helper-text emailFormat`)[0];
                    if (emailformat.classList.contains('active')) {
                        emailformat.classList.remove('active');
                    }
                }
            } else {            
                document.getElementsByClassName(`contact-input-helper-text emailFormat`)[0].classList.add('active');
                if (key === 'email') {
                    const emailformat = document.getElementsByClassName(`contact-input-helper-text email`)[0];
                    if (emailformat.classList.contains('active')) {
                        emailformat.classList.remove('active');
                    }
                }
            }
        } else if (contactInput[key].classList.contains('invalid')) {
            contactInput[key].classList.remove('invalid');
            if (key === 'email') {
                let emailformat = document.getElementsByClassName(`contact-input-helper-text email`)[0];
                if (emailformat.classList.contains('active')) {
                    emailformat.classList.remove('active');
                }
                emailformat = document.getElementsByClassName(`contact-input-helper-text emailFormat`)[0];
                if (emailformat.classList.contains('active')) {
                    emailformat.classList.remove('active');
                }
            } else {
                document.getElementsByClassName(`contact-input-helper-text ${key}`)[0].classList.remove('active');
            }
        }
    }
}

function sentSuccess() {
    document.getElementsByClassName("submit-success")[0].classList.add('active');
    document.getElementsByClassName("submit-error")[0].classList.remove('active');
    for (const [key, value] of Object.entries(contactInput)) {
        value.value = "";
        contactInput[key].uninputed = undefined;
        contactInput[key].valid = undefined;
    }
}

function sentFail(error) {
    document.getElementsByClassName("submit-error")[0].classList.add('active');
    document.getElementsByClassName("submit-success")[0].classList.remove('active');
}

function toParams(data) {
    var form_data = [];
    for (var key in data) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }

    return form_data.join("&");
}

function sendEmail() {
    if (submitButton.disabled) {
        return;
    }
    submitButton.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                sentSuccess();
            } else {
                sentFail(request.response);
            }
        }
    }
    var subject = "Message from " + contactInput.name.value + " (" + contactInput.email.value + ")";
    var message = "Name: " + contactInput.name.value + "\nEmail: " + contactInput.email.value + "\nMessage:\n" + contactInput.message.value;
    emailData['subject'] = subject;
    emailData['text'] = message;
    // console.log(emailData);
    var params = toParams(emailData);
    // console.log(params);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}


for (const [key, value] of Object.entries(contactInput)) {
    if (value !== null) {
        value.addEventListener('input', function (event) {
            updateUninputed();
            if (key === 'name') {
                updateName();
            } else if (key === 'email') {
                updateEmail();
            } else if (key === 'message') {
                updateMessage();
            }
            updateInputState();
        });
    }
}

if (submitButton !== null) {
    submitButton.addEventListener('click', function (event) {
        if (contactInput.name.valid && contactInput.email.valid && contactInput.message.valid && !contactInput.name.uninputed && !contactInput.email.uninputed && !contactInput.message.uninputed) {
            sendEmail();
            submitButton.disabled = false;
        } else {
            if (contactInput.name.value.trim() === "") {
                contactInput.name.valid = false;
                contactInput.name.uninputed = false;
            }
            if (!emailRegex.test(contactInput.email.value)) {
                contactInput.email.valid = false;
                contactInput.email.uninputed = false;
            }
            if (contactInput.message.value.trim() === "") {
                contactInput.message.valid = false;
                contactInput.message.uninputed = false;
            }
            updateInputState();
        }
    });
}