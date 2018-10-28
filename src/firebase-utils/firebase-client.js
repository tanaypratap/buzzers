var firebase = require('firebase');

const quizIndex = "quiz";
const quizQuestionsIndex = "quizquestions";
const challengeQuizPlayIndex = "challengequizplay";
const challengeQuizPlayResponseIndex = 'challengequizplayresponse'
const tournamentQuizPlayIndex = "tournamentquizplay";
const tournamentQuizPlayResponseIndex = 'tournamentquizplayresponse'

/**
 * Add a quiz to firebase
 * @param {string} file
 */
var addQuestionToFirebase = function (file, inputQuizName, inputStartTime) {
    var quizQuestionText = require(file);
    var quizName;
    var startTime;
    if (inputQuizName === undefined) {
        quizName = quizQuestionText.quizQuestions.quizName;
    } else {
        quizName = inputQuizName;
    }

    if (inputStartTime === undefined) {
        startTime = quizQuestionText.quizQuestions.startTime;
    } else {
        startTime = inputStartTime;
    }
     
    var ref = firebase.app().database().ref('quiz');
    var quizObj = {"quiz_name" : quizName, "quiz_tag" : quizQuestionText.quizQuestions.quizTags[0],
    "Start_time" : startTime, "userCount":0,  "questionCount" : quizQuestionText.quizQuestions.questionCount}
    
    ref.push(quizObj).then((snapshot) => {
        // get the quizId.
        const quizId = snapshot.key
        var quizQuestionRef = firebase.app().database().ref('quizquestions');
        var quizQuestions = quizQuestionText.quizQuestions.questions;
        for (var i=0;i<quizQuestions.length;i++) {
            quizQuestionRef.child(quizId).child(i+1).set(
                {"questionText":quizQuestions[i].question,
                "option1":quizQuestions[i].options.option1,
                "option2":quizQuestions[i].options.option2,
                "option3":quizQuestions[i].options.option3,
                "option4":quizQuestions[i].options.option4,
                "correctAnswer":quizQuestions[i].correctAnswer})
        }
 });
};

/**
 * Get all the quiz from the quiz index.
 */
export const getAllQuiz = function(callback) {
    let allQuiz = null;
    var currentTime = Date.now();
    var obj = {};
    var quizRef = firebase.app().database().ref(quizIndex).orderByChild('Start_time').startAt(currentTime);
    // var quizRef = firebase.app().database().ref(quizIndex);
    quizRef.on("value", function(snapshots) {
        snapshots.forEach(snapshot => {
            obj[snapshot.key] = snapshot.val();
            //items.push(obj);
        });
        callback(obj);
     }, function (error) {
        console.log("Error: " + error.code);
     });
};

export const getQuiz = function(quizId, callback) {
    let quizRef = firebase.app().database().ref(`${quizIndex}/${quizId}`);
    quizRef.on("value", function(snapshot) {
        callback(snapshot.val());
    }, function(error) {
        console.log('Error: '+ error.code);
    })
}
/**
 *
 * @param {*} quizId the id of the quiz
 * @param {*} questionId question id to be retrieved.
 */
export const getQuizQuestion = function(quizId, questionId, callback) {
    // the index is like quizquestions/{quizId}/{questionId} = question object
    var quizQuestionRef = firebase.app().database().ref(quizQuestionsIndex);
    var quizRef = quizQuestionRef.child(quizId);
    var questionRef = quizRef.child(questionId);

    questionRef.once("value", function(snapshot) {
        callback(snapshot.val());
     }, function (error) {
        console.log("Error: " + error.code);
     });
};

export const getUsersRemainingInGame = function(quizId, questionId, response, callback){
    const index = `${tournamentQuizPlayResponseIndex}/${quizId}/${questionId}/${response}`;
    var userRef = firebase.app().database().ref(index);
    userRef.on('value', function(snapshot) {
        callback(snapshot.val());
    }, function(error){
        console.log('Error: '+error.code);
    })
}
/**
 * This code is for initiating s 1-1 challenge, the primary user(master) should invoke after getting opponent id.
 * The initial scores of both users will be 0, which should be updated after each answer. listner should be there for updation of score of opponent.
 * @param {*} quizId id of the quiz
 * @param {*} player1 alias/quiz name of the primary user.
 * @param {*} player2 alias/quiz name of the challenger.
 */
const startQuizChallenge = function(quizId, player1, player2) {
    var user1 = player1;
    var user2 = player2;
    var challengeQuizPlayRef = firebase.app().database().ref(challengeQuizPlayIndex);
    var challengeQuizPlayObj = {"quizId" : quizId}
    challengeQuizPlayObj[player1] = {"score":0}
    challengeQuizPlayObj[player2] = {"score":0}
    var quizPlayId;
    challengeQuizPlayRef.push(challengeQuizPlayObj).then((snapshot) => {
        quizPlayId = snapshot.key;
        return quizPlayId;
    });

}
/**
 * Index for 1-1 challenge response of each user.
 * @param {*} quizPlayId quiz play id which we get from initialization.
 * @param {*} questionId the id of the question whose response is given.
 * @param {*} user user alias who responded.
 * @param {*} response response given by the user
 * @param {*} isCorrect was the user answer correct boolean
 * @param {*} currentScore
 */
const quizChallengeResponse = function(quizPlayId, questionId, user, response, isCorrect, currentScore) {
    var challengeQuizPlayRepsonseRef = firebase.app().database().ref(challengeQuizPlayResponseIndex + '/' + quizPlayId + '/' +user + '/'+ questionId);
    /*var questionObj ={}
    questionObj[questionId] = {"userResponse" : response, "isResponseCorrect": isCorrect };
    var userObj ={};
    userObj[user] = questionObj;
    var responseObj ={}
    responseObj[quizPlayId] = userObj*/
    var responseObj = {"userResponse" : response, "isResponseCorrect": isCorrect };

    //var response = {"userResponse" : response, "isResponseCorrect": isCorrect };
    challengeQuizPlayRepsonseRef.set(responseObj);
    // update the score here for the user.
    var challengeQuizPlayRef = firebase.app().database().ref(challengeQuizPlayIndex);
    challengeQuizPlayRef.child(quizPlayId).child(user).child("score").set(currentScore);
}
/**
 * Adding the user to teh tournament with isAlive = true, on any one queston isAlive becomes false and user can't continue.
 * @param {*} quizId
 * @param {*} user
 */
export const addUserToTournamentQuiz = function(quizId, user) {
    var refPath = `${tournamentQuizPlayIndex}/${quizId}/${user}`;
    var tournamentQuizRef = firebase.app().database().ref().child(refPath);
    var userObject = {"score" : 0, "isAlive": true}
    tournamentQuizRef.set(userObject);
    var quizRef = firebase.database().ref(quizIndex).child(quizId).child("userCount");
    quizRef.transaction(function (response) {
        return (response || 0) + 1
    });
}
/**
 * Adding the response of the user as Option 1 to 4 for every question. For wrong answer mark user isAlive= false.
 * @param {*} quizId
 * @param {*} questionId
 * @param {*} userResponse
 */
export const userTournamentQuizResponse= function(quizId, questionId, user, userResponse) {
    // check if user is alive
    if (!checkIfUserAlive(quizId, user).then(val => { return val }).catch(val => { return val })) {
        console.log("Error recieved");
        throw new Error("User is Malicious");
    }
    // get the correct answer from db and compare with given answer to update isAlive.
    var correctAnswerRef = `${quizQuestionsIndex}/${quizId}/${questionId}/correctAnswer`;
    console.log(correctAnswerRef);
    firebase.database().ref().child(correctAnswerRef).once("value", function (snapshot) {
        var correctAnswer = snapshot.val();
        if (userResponse === correctAnswer) {
            firebase.database().ref(tournamentQuizPlayIndex).child(quizId).child(user).child("score").set(questionId);
        } else {
            var quizUserRef = `${tournamentQuizPlayIndex}/${quizId}/${user}/isAlive`;
            firebase.app().database().ref(quizUserRef).set(false);
        }
    }, function (error) {
        console.log("Error: " + error.code);
    });
    var databaseRef = firebase.database().ref(tournamentQuizPlayResponseIndex).child(quizId).child(questionId).child(userResponse);
    databaseRef.transaction(function (response) {
        return (response || 0) + 1
    });
}

const checkIfUserAlive = function(quizId, user) {
    return new Promise((resolve, reject) =>{
        var refPath = `${tournamentQuizPlayIndex}/${quizId}/${user}/isAlive`

        firebase.database().ref(refPath).once("value", function(snapshot) {
            if (snapshot.val() === false) {
                console.log(user + " is Malicious User should be blocked");
                reject(false);
            } else {
                resolve(true);
            }
        })
    });
}

const getResponsesForQuestion = function(quizId, questionId, callback) {
    var refPath = `${tournamentQuizPlayResponseIndex}/${quizId}/${questionId}`
        firebase.database().ref(refPath).once("value", function(snapshot) {
            callback(snapshot.val());
        })
}

const createDemoQuiz = function(user) {
    const directoyPath = path.resolve("../../demo-quiz-bank");
    console.log(directoyPath);
    fs.readdir(directoyPath,function(err, files) {
        var filesCount = files.length;
        var fileIndex = Math.floor(Math.random() * filesCount);
        console.log(directoyPath + "/" + files[fileIndex]);
        var startTime = Date.now() + 120000;
        addQuestionToFirebase(directoyPath + "/" + files[fileIndex], user + " Quiz", startTime);
    })
}
/**
 * gets all the winners
 * @param {*} quizId 
 * @param {*} callback 
 */
const getWinnersForTournamentQuiz = function(quizId, callback) {
    var refPath = `${tournamentQuizPlayIndex}/${quizId}`
        firebase.database().ref(refPath).orderByChild("score").startAt(1).limitToLast(1).once("value", function(snapshot) {
            var keys = Object.keys(snapshot.val());
            var score = snapshot.val()[keys[0]]["score"]
            firebase.database().ref(refPath).orderByChild("score").equalTo(score).on("value", function(snapshot) {
                callback(snapshot.val());
            })
        })
}
/**
 * get the final user score from the db.
 * @param {} quizId 
 * @param {*} user 
 * @param {*} callback 
 */
const getFinalUserScore = function(quizId,user, callback) {
    var refPath = `${tournamentQuizPlayIndex}/${quizId}/${user}/"score"`;
        firebase.database().ref(refPath).once("value", function(snapshot) {
            callback(snapshot.val());
        })
}

// config for firebase
const config = {
    apiKey: 'AIzaSyDe8UizhOLkVq0WZgyree2XinGNbBbd1No',
    authDomain: 'sapphireapp-483.firebaseapp.com',
    databaseURL: 'https://sapphireapp-483.firebaseio.com',
    projectId: 'sapphireapp-483',
    storageBucket: 'sapphireapp-483.appspot.com',
    messagingSenderId: '930819397911'
    };
firebase.initializeApp(config);

/*
// // testing code
// //1 creating quizes.
 const directoyPath = path.resolve("../../quiz-bank");
 console.log(directoyPath);
 fs.readdir(directoyPath,function(err, files) {
     console.log(files)
     files.forEach(function(file) {
         console.log(file);
         addQuestionToFirebase(directoyPath + "/" + file);
     });
 })*/
/*
//2. getting a quiz question.
// getQuizQuestion('-LPol7rwiaUYa9aYvmsD',1, (val) => { console.log(val)} );
//3. starting a 1-1 quiz
var challengeId = startQuizChallenge('-LPol7rwiaUYa9aYvmsD','jatin','shashank')
console.log(challengeId);
//4. response of a 1-1 quiz.
quizChallengeResponse("-LPpExdwJIEJ_hweg_Gz",1,'jatin','23',false,4);

//5 registerUser to quiz.
addUserToTournamentQuiz('-LPol7rwiaUYa9aYvmsD','tanay');
//6. register answer of user to quiz.
userTournamentQuizResponse('-LPol7rwiaUYa9aYvmsD',1,'tanay','375')
//7. get the options to count map for users
getResponsesForQuestion('-LPol7rwiaUYa9aYvmsD',1);
//8. getWinners
getWinnersForTournamentQuiz('-LPol7rwiaUYa9aYvmsD');
*/

//getAllQuiz();
