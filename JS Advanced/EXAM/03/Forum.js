class Forum {
    constructor() {
        this._users = [];
        this._questions = [];
        this._id = 1;
        this._loggedUsers = [];
    }

    register(username, password, repeatPassword, email) {
        if (username === "" || password === "" ||
            repeatPassword === "" || email === "") {
            throw new Error("Input can not be empty");
        }

        if (password !== repeatPassword) {
            throw new Error("Passwords do not match");
        }

        //Check if users contains username or email
        let user = this._users.filter(u => u.username === username || u.email === email)[0]

        if (!user) {
            let user = {
                username,
                password,
                email
            }
            this._users.push(user);
        } else {
            throw new Error("This user already exists!");
        }

        return `${username} with ${email} was registered successfully!`;
    }

    login(username, password){
        let user = this._users.filter(u => u.username === username)[0];
        if(!user){
            throw new Error("There is no such user");
        }

        if(user.password === password){
            this._loggedUsers.push(user);
            return "Hello! You have logged in successfully";
            
        }
    }

    logout(username, password){
        let user = this._users.filter(u => u.username === username)[0];
        if(!user){
            throw new Error("There is no such user");
        }

        if(user.password === password){
            let userIndex = this._users.indexOf(user);
            this._loggedUsers.splice(userIndex, 1);
            return "You have logged out successfully";
        }
    }

    postQuestion(username, question){
        let user = this._users.filter(u => u.username === username)[0];
        //TODO: if i have time i can make it filter only the user because its the same
        let userLoggedIn = this._loggedUsers.includes(user);
        if(!user || !userLoggedIn){
            throw new Error("You should be logged in to post questions");
        }

        if(question === ""){
            throw new Error("Invalid question");
        }

        let currQuestion = {
            id: this._id,
            question: question,
            username: user.username,
            answers: []
        };
        this._id++;

        this._questions.push(currQuestion);

        return `Your question has been posted successfully`;
    }

    postAnswer(username, questionId, answer){
        let user = this._users.filter(u => u.username === username)[0];
        //TODO: if i have time i can make it filter only the user because its the same
        let userLoggedIn = this._loggedUsers.includes(user);
        if(!user || !userLoggedIn){
            throw new Error("You should be logged in to post answers");
        }


        if(answer === ""){
            throw new Error("Invalid answer");
        }

        let currentQuestion = this._questions.filter(q => q.id === questionId)[0];
        if(!currentQuestion){
            throw new Error("There is no such question");
        }

        let resultAnswer = {
            username: user.username,
            answer: answer
        }
        currentQuestion["answers"].push(resultAnswer);

        return "Your answer has been posted successfully";
    }

    showQuestions(){
        let result = "";
        this._questions.forEach(x => {
            result += `Question ${x.id} by ${x.username}: ${x.question}\n`;

            //let resultAnswers = [];
            for (const line in x.answers) {
                let currAnswer = x.answers[line];
                result += `---${currAnswer.username}: ${currAnswer.answer}\n`
            }
        })

        result = result.trim();
        return result;
    }
}

let forum = new Forum();

forum.register('Michael', '123', '123', 'michael@abv.bg');
forum.register('Stoyan', '123ab7', '123ab7', 'some@gmail@.com');
forum.login('Michael', '123');
forum.login('Stoyan', '123ab7');

forum.postQuestion('Michael', "Can I rent a snowboard from your shop?");
forum.postAnswer('Stoyan', 1, "Yes, I have rented one last year.");
forum.postQuestion('Stoyan', "How long are supposed to be the ski for my daughter?");
forum.postAnswer('Michael',2, "How old is she?");
forum.postAnswer('Michael',2, "Tell us how tall she is.");

console.log(forum.showQuestions());
