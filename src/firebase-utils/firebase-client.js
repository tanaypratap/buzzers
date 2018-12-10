// [TODO] Add Documentation
// https://github.com/tanaypratap/buzzers/issues/54
let firebase = require('firebase');

export const quizIndex = "quiz";
export const quizQuestionsIndex = "quizquestions";
export const challengeQuizPlayIndex = "challengequizplay";
export const challengeQuizPlayResponseIndex = 'challengequizplayresponse'
export const tournamentQuizPlayIndex = "tournamentquizplay";
export const tournamentQuizPlayResponseIndex = 'tournamentquizplayresponse'
const userIndex = "users";

const demoTimeInMillis = 10000
/**
 * Add a quiz to firebase
 * @param {string} file
 */
let addQuestionToFirebase = function (file, inputQuizName, inputStartTime) {
    const quizQuestionText = require(file);
    let quizName;
    let startTime;
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
     
    const ref = db.ref('quiz');
    const quizObj = {"quiz_name" : quizName, "quiz_tag" : quizQuestionText.quizQuestions.quizTags[0],
    "Start_time" : startTime, "userCount":0,  "questionCount" : quizQuestionText.quizQuestions.questionCount}
    
    ref.push(quizObj).then((snapshot) => {
        // get the quizId.
        const quizId = snapshot.key
        let quizQuestionRef = db.ref('quizquestions');
        let quizQuestions = quizQuestionText.quizQuestions.questions;
        for (let i=0;i<quizQuestions.length;i++) {
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
    const currentTime = Date.now();
    let obj = {};
    const quizRef = db.ref(quizIndex).orderByChild('Start_time').startAt(currentTime);
    // let quizRef = db.ref(quizIndex);
    quizRef.on("value", function(snapshots) {
        snapshots.forEach(snapshot => {
            obj[snapshot.key] = snapshot.val();
        });
        callback(obj);
     }, function (error) {
        // [TODO] Add Telemetry and Error Handling
        // https://github.com/tanaypratap/buzzers/issues/53
        console.log("Error: " + error.code);
     });
};

 export const getQuiz = function(quizId, callback) {
    const quizRef = db.ref(`${quizIndex}/${quizId}`);
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
    const quizQuestionRef = db.ref(quizQuestionsIndex);
    const quizRef = quizQuestionRef.child(quizId);
    const questionRef = quizRef.child(questionId);

    questionRef.once("value", function(snapshot) {
        callback(snapshot.val());
     }, function (error) {
        console.log("Error: " + error.code);
     });
};

 export const getUsersRemainingInGame = function(quizId, questionId, response, callback){
    const index = `${tournamentQuizPlayResponseIndex}/${quizId}/${questionId}/${response}`;

    const userRef = db.ref(index);
    userRef.on('value', function(snapshot) {
        callback(snapshot.val());
    }, function(error){
        console.log('Error: '+error.code);
    })
}
/**
 * 
 * @param {*} user the user object with uid, 
 */
export const createUserIfNotExists = function (user) {
    const userRef = db.ref(userIndex)
    userRef.child(user.uid).transaction(function(response) {
        if(response === undefined || response ===null) {
            return user;
        }
    })
}
/**
 * This code is for initiating s 1-1 challenge, the primary user(master) should invoke after getting opponent id.
 * The initial scores of both users will be 0, which should be updated after each answer. listner should be there for updation of score of opponent.
 * @param {*} quizId id of the quiz
 * @param {*} player1 alias/quiz name of the primary user.
 * @param {*} player2 alias/quiz name of the challenger.
 */
export const startQuizChallenge = function(quizId, player1, player2) {
    const challengeQuizPlayRef = db.ref(challengeQuizPlayIndex);
    const challengeQuizPlayObj = {"quizId" : quizId}
    challengeQuizPlayObj[player1] = {"score":0}
    challengeQuizPlayObj[player2] = {"score":0}
    let quizPlayId;
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
export const quizChallengeResponse = function(quizPlayId, questionId, user, response, isCorrect, currentScore) {
    const challengeQuizPlayRepsonseRef = db.ref(challengeQuizPlayResponseIndex + '/' + quizPlayId + '/' +user + '/'+ questionId);
    const responseObj = {"userResponse" : response, "isResponseCorrect": isCorrect };

    challengeQuizPlayRepsonseRef.set(responseObj);
    let challengeQuizPlayRef = db.ref(challengeQuizPlayIndex);
    challengeQuizPlayRef.child(quizPlayId).child(user).child("score").set(currentScore);
}
/**
 * Adding the user to teh tournament with isAlive = true, on any one queston isAlive becomes false and user can't continue.
 * @param {*} quizId
 * @param {*} user
 */
 export const addUserToTournamentQuiz = function(quizId, user) {
    let refPath = `${tournamentQuizPlayIndex}/${quizId}/${user.uid}`;
    let tournamentQuizRef = db.ref().child(refPath);
    let userObject = {"score" : 0, "isAlive": true, "displayName":user.displayName,
     "photoURL" : user.photoURL, "email" : user.email}
    tournamentQuizRef.set(userObject);
    let quizRef = firebase.database().ref(quizIndex).child(quizId).child("userCount");
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
    
    let newPromise = new Promise( (res, rej) => {
        checkIfUserAlive(quizId, user, (val) => {
            if(!val){
                rej(val);
            }
            else{ 
                res(val);
            }
        });  
    })
 
    newPromise.then( (val) => {
        // get the correct answer from db and compare with given answer to update isAlive.
        const correctAnswerRef = `${quizQuestionsIndex}/${quizId}/${questionId}/correctAnswer`;
        firebase.database().ref().child(correctAnswerRef).once("value", function (snapshot) {
            const correctAnswer = snapshot.val();
            if (userResponse && userResponse === correctAnswer) {
                firebase.database().ref(tournamentQuizPlayIndex).child(quizId).child(user.uid).child("score").set(questionId);
            } else {
                const quizUserRef = `${tournamentQuizPlayIndex}/${quizId}/${user.uid}/isAlive`;
                db.ref(quizUserRef).set(false);
            }
        }, function (error) {
            console.log("Error: " + error.code);
        });
        if(userResponse){
            let databaseRef = firebase.database().ref(tournamentQuizPlayResponseIndex).child(quizId).child(questionId).child(userResponse);
            databaseRef.transaction(function (response) {
                return (response || 0) + 1
            });
        }
    }).catch((val) => { console.log('Error: ', val)});

}



 export const checkIfUserAlive = function(quizId, user, callback) {
    const refPath = `${tournamentQuizPlayIndex}/${quizId}/${user.uid}/isAlive`

    firebase.database().ref(refPath).once("value", function(snapshot) {
        if (snapshot.val() === 'false') {
            console.log(user + " is Malicious User should be blocked");   
        }
        callback(snapshot.val());
    })
}

export const getResponsesForQuestion = function(quizId, questionId, callback) {
    let refPath = `${tournamentQuizPlayResponseIndex}/${quizId}/${questionId}`
        firebase.database().ref(refPath).once("value", function(snapshot) {
            callback(snapshot.val());
        })
}

// [TODO] More cleaning to be done keeping the logic intact 
export const createDemoQuiz = function (userDisplayName) {
    const refPath = `quiz`;
    firebase.database().ref(refPath).once("value", function (snapshot) {
        const existingQuizobj = snapshot.val();
        let keys = Object.keys(existingQuizobj);
        let randomIndex = Math.floor(Math.random() * keys.length);
        let quizId = keys[randomIndex];
        let newQuizRef = db.ref('quiz');
        let newQuizObj = {
            "quiz_name": userDisplayName + "'s" + " Quiz", "quiz_tag": "DemoQuiz", questionCount: existingQuizobj[quizId].questionCount, userCount: 0,
            "Start_time": Date.now() + demoTimeInMillis
        }
        newQuizRef.push(newQuizObj).then((snapshot) => {
            // get the quizId.
            const newQuizId = snapshot.key
            for (let i = 1; i <= existingQuizobj[quizId].questionCount; i++) {
                firebase.database().ref(`quizquestions/${quizId}/${i}`).once("value", function (oldQuizSnapshot) {
                    const oldQuizQuestion = oldQuizSnapshot.val();
                    let quizQuestionRef = db.ref('quizquestions');
                    quizQuestionRef.child(newQuizId).child(i).set(
                        {
                            "questionText": oldQuizQuestion.questionText,
                            "option1": oldQuizQuestion.option1,
                            "option2": oldQuizQuestion.option2,
                            "option3": oldQuizQuestion.option3,
                            "option4": oldQuizQuestion.option4,
                            "correctAnswer": oldQuizQuestion.correctAnswer
                        })
                });
            }
        });
    });
}
/**
 * gets all the winners
 * @param {*} quizId 
 * @param {*} callback 
 */
export const getWinnersForTournamentQuiz = function (quizId, callback) {
    let refPath = `${tournamentQuizPlayIndex}/${quizId}`
    firebase.database().ref(refPath).orderByChild("score").startAt(1).limitToLast(1).once("value", function (snapshot) {
        if (snapshot.val()) {
            let keys = Object.keys(snapshot.val());
            let score = snapshot.val()[keys[0]]["score"]
            firebase.database().ref(refPath).orderByChild("score").equalTo(score).on("value", function (snapshot) {
                callback(snapshot.val());
            })
        } else {
            callback({});
        }
    })
}
/**
 * get the final user score from the db.
 * @param {} quizId 
 * @param {*} user 
 * @param {*} callback 
 */
export const getFinalUserScore = function(quizId,user, callback) {
    let refPath = `${tournamentQuizPlayIndex}/${quizId}/${user.uid}/score`;
    firebase.database().ref(refPath).once("value", function(snapshot) {
        callback(snapshot.val());
    })
}

// config for firebase
export const config = {
    apiKey: 'AIzaSyDe8UizhOLkVq0WZgyree2XinGNbBbd1No',
    authDomain: 'sapphireapp-483.firebaseapp.com',
    databaseURL: 'https://sapphireapp-483.firebaseio.com',
    projectId: 'sapphireapp-483',
    storageBucket: 'sapphireapp-483.appspot.com',
    messagingSenderId: '930819397911'
    };
firebase.initializeApp(config);
const db = firebase.app().database();
