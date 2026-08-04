document.addEventListener("DOMContentLoaded", () => { //Ensures DOM exists before getElementById runs.
    //Variables

    //ID tags 
    const animTextPage = [
        {
            header_ID: "main-hello",
            text_ID: "main-name"
        },
        {
            header_ID: "about-greeting",
            text_ID: "about-me"
        },
        {
            header_ID: "portfolio-greeting",
            text_ID: "portfolio"
        },
        {
            header_ID: "side-greeting",
            text_ID: "side"
        }
    ]

    //Language
    const langText = [
        {
            header_en: "Hello, my name is",
            header_my: "Apa khabar, nama saya ialah",
            header_ch: "你好，我名叫",
            text_en: "Goh Guang Wei",
            text_my: "Goh Guang Wei",
            text_ch: "吴光卫"
        },
        {
            header_en: "Get to know",
            header_my: "Kenali",
            header_ch: "了解",
            text_en: "About Me",
            text_my: "Tentang Saya",
            text_ch: "关于我"
        },
        {
            header_en: "Explore my works in the",
            header_my: "Terokai kaya saya dalam",
            header_ch: "探索我的作品在",
            text_en: "Portfolio",
            text_my: "Portfolio",
            text_ch: "作品集"
        },
        {
            header_en: "Creativity unbound in the",
            header_my: "Kreativiti yang tidak terikat dalam",
            header_ch: "不受束缚的创造力在",
            text_en: "Side Projects",
            text_my: "Projek Sampingan",
            text_ch: "副业项目"
        }
    ]

    let currentLang = 0;
    let updatedGreeting = "";
    let updatedName = "";
    let timeoutID;
    let intervalID;
    let currentPage = 0;
    let currentLocation = window.location.pathname;
    let helloFlag = false; //Allows only one hello() running at a time
    let isWriting = false;

    //Checks for current page
    if (currentLocation.includes('/index.html'))
    {
        currentPage = 0;
    } else if (currentLocation.includes('/aboutMe.html')){
        currentPage = 1;
    } else if (currentLocation.includes('/portfolio.html')){
        currentPage = 2;
    } else if (currentLocation.includes('/sideProjects.html')){
        currentPage = 3;
    }

    //Sets variable to document ID
    let headerText = document.getElementById(animTextPage[currentPage].header_ID);
    let bottomText = document.getElementById(animTextPage[currentPage].text_ID);


    //Typing effect, takes the element to edit, the text to replace, and speed of animation
    function textTypingEffect(element, text, delay = 50) {

        //Creates a Promise for async, provides delay for the second function with async
        return new Promise((resolve) => {
            let i = 0
            isWriting = true;

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
                        isWriting = false;
                        resolve();
                    }
            }   

            //Starts the function
            step();

        }); 
    
    }

    async function hello() {
        if(helloFlag === false){
            helloFlag = true;
            //Sets text to empty
            headerText.innerHTML = "";
            bottomText.innerHTML = "";

            //Goes through different languages
            if (currentLang === 0) {
                updatedGreeting = langText[currentPage].header_en;
                updatedName = langText[currentPage].text_en;
                currentLang = 1;
            } else if (currentLang === 1) {
                updatedGreeting = langText[currentPage].header_my;
                updatedName = langText[currentPage].text_my;
                currentLang = 2;
            } else {
                updatedGreeting = langText[currentPage].header_ch;
                updatedName = langText[currentPage].text_ch;
                currentLang = 0;
            }

            await textTypingEffect(headerText, updatedGreeting);
            await textTypingEffect(bottomText, updatedName);
            helloFlag = false;
            clearInterval(intervalID);
            intervalID = setInterval(() => {hello();}, 5000);
        }else{
            return;
        }
    }
    
    // Clears greeting and name if tab is not active; prevents clashing
    document.addEventListener("visibilitychange", () => {
        // If tab is not active, clear all intervals and timeouts, alongside current greetings and names
        if (document.visibilityState === 'hidden'){
            helloFlag = true;
        }else{
            //Checks if the writing process is still active; stops new hello() while one is ongoing
            if(isWriting === false){
                helloFlag = false;
                clearInterval(intervalID);
                intervalID = null;
            }

            //Only set new interval if intervalID is empty
            if(intervalID == null){
                hello();
            }

        }
    });

    //Ensures it runs once when user opens it
    if (!sessionStorage.getItem('helloTrigger')) {
        hello();

        //Sets flag so function won't trigger even after refresh
        sessionStorage.setItem('helloTrigger', 'true');
    }

    window.onbeforeunload = function(event){
        this.sessionStorage.removeItem('helloTrigger');
    }


});

function contacts(element){
    let id = element.id
    if(id === "linkedin"){
        window.open('https://www.linkedin.com/in/guangweigoh/', '_blank');
    } else if (id === "whatsapp"){
        window.open('https://api.whatsapp.com/send?phone=601115003757', '_blank');
    } else if (id === "email"){
        window.location.href='mailto:darrengohguangwei1@gmail.com' , '_blank';
    }
}

function direct(){
    window.open('https://github.com/GohGuangWei/Blackjack', '_blank');
}

function form(event){

    event.preventDefault();

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

    const patternName = /^[a-zA-Z\s]+$/;
    const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    
    fields.forEach(field => {
        var errorDetected = false;
        var errorMsg;

        //If field is empty
        if (field.value.trim() === ""){
            errorDetected = true;
            errorMsg = `Insert ${field.fieldName} in the field.`;
        //If name field has special characters
        }else if(!patternName.test(field.value.trim()) && (field.fieldName == "name")){
            errorDetected = true;
            errorMsg = `No special characters in the field.`;
        //Checks if email is valid
        }else if(!patternEmail.test(field.value.trim()) && (field.fieldName === "email")){
            errorDetected = true;
            errorMsg = `Email seems to be not valid. Check for special characters. `;
        }
        else{
            document.getElementById(field.error).style.display = "none";
            document.getElementById(field.name).style.border = "2px solid transparent";
        }

        //If error detected, showcase error to user
        if (errorDetected == true)
        {
            document.getElementById(field.error).style.display = "block";
            document.getElementById(field.name).style.border = "2px solid red";
            document.getElementById(field.error).innerHTML = errorMsg;
        }

        if (!errorDetected) {
            document.getElementById("form").submit();
        } else
        {
            return false;
        }

    });
    
}

var currentJobDesc = -1;

//Triggers job desc change when hover on an element (previous = 0, future = 1)
function onHover(job){
    var desc = document.getElementById("job-history-description");


    const jobSec = [
        {
            jobComp: document.getElementById('jobSec'),
            desc: "As a Solution Consultant, I helped Cyclone Robotics through: <br><br> - Developing 32 JSON files for extraction in their RPA system, ensuring accurate results. <br> - Supervised over 100+ asset uploads to client website in collaboration with co-worker, ensuring data integrity. - Developed a RPA system that compiles all Excel files while maintaining data integrity and checking invalid data. <br>",
        },
        {
            jobComp: document.getElementById("jobSec1"),
            desc: "Currently open for any available jobs! Feel free to contact me below!"
        }
    ]

    //Check if current hover already displayed previous job desc
    if(job === currentJobDesc){
        return;
    }

    currentJobDesc = job;
    desc.innerHTML = "";
    
    for (let i = 0; i < jobSec.length; i++) {
        jobSec[i].jobComp.style.borderColor = "transparent";
    }

    desc.innerHTML = jobSec[job].desc;
    jobSec[job].jobComp.style.borderColor = "var(--button-hover-color)";
}