document.addEventListener("DOMContentLoaded", () => { //Ensures DOM exists before getElementById runs.
    //Variables
    const greeting = document.getElementById("hello");
    const name = document.getElementById("name");

    let currentLang = 0;
    let updatedGreeting = "";
    let updatedName = "";

    var timeoutID;
    var intervalID;



    //Typing effect, takes the element to edit, the text to replace, and speed of animation
    function textTypingEffect(element, text, delay = 50) {

        //Creates a Promise for async, provides delay for the second function with async
        return new Promise((resolve) => {
            let i = 0

            //Recursive function to continuously add text to the element
            function step(){
                element.innerHTML += text[i];
                i++;
            
                //When the written text is shorter than the given text
                if (i < text.length){
                    timeoutID = setTimeout(step, delay);
                } else
                {
                    //returns the Promise for the second function to run
                    resolve();
                }
            }   

            //Starts the function
            step();

        });     
    }

    async function hello() {
        greeting.innerHTML = "";
        name.innerHTML = "";

        if (currentLang === 0) {
            updatedGreeting = "Hello, my name is";
            updatedName = "Goh Guang Wei";
            currentLang = 1;
        } else if (currentLang === 1) {
            updatedGreeting = "Apa khabar, nama saya ialah";
            updatedName = "Goh Guang Wei";
            currentLang = 2;
        } else {
            updatedGreeting = "你好，我名叫";
            updatedName = "吴光卫";
            currentLang = 0;
        }


        await textTypingEffect(greeting, updatedGreeting);
        await textTypingEffect(name, updatedName);
    }
    
    // Clears greeting and name if tab is not active; prevents clashing
    document.addEventListener("visibilitychange", () => {
        // If tab is not active, clear all intervals and timeouts, alongside current greetings and names
        if (document.visibilityState === 'hidden'){
            clearInterval(intervalID);
            clearTimeout(timeoutID);
            greeting.innerHTML = "";
            name.innerHTML = "";
        }else{
            hello();
            intervalID = setInterval(hello, 5000);
        }
    });
});

function form(){

    // Objects for each field
    const fields = [
        {
            fieldName: "name",
            value: document.forms["contact-form"]["form-name"].value,
            name:  "name-input",
            error: "name-error"
        },
        {
            fieldName: "email",
            value: document.forms["contact-form"]["form-email"].value,
            name:  "email-input",
            error: "email-error"
        }
    ]

    const patternName = /^[a-zA-Z]+$/;
    const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    
    fields.forEach(field => {
        var errorDetected = false;
        var errorMsg;

        if (field.value.trim() === ""){
            errorDetected = true;
            errorMsg = `Insert ${field.fieldName} in the field.`;
        }else if(!patternName.test(field.value.trim()) && (field.fieldName == "name")){
            errorDetected = true;
            errorMsg = `No special characters in the field.`;
        }else if(!patternEmail.test(field.value.trim()) && (field.fieldName === "email")){
            errorDetected = true;
            errorMsg = `Email seems to be not valid. Check for special characters. `;
        }
        else{
            document.getElementById(field.error).style.display = "none";
            document.getElementById(field.name).style.border = "2px solid transparent";
        }

        if (errorDetected == true)
        {
            document.getElementById(field.error).style.display = "block";
            document.getElementById(field.name).style.border = "2px solid red";
            document.getElementById(field.error).innerHTML = errorMsg;
        }

    });
    
}