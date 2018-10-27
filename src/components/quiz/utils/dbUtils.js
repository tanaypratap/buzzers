import firebase from '../../../firebase';

const quizIndex="quiz";
const quizQuestionsIndex="quizquestions";
// const challengeQuizPlayIndex="challengequizplay";
// const challengeQuizPlayResponseIndex='challengequizplayresponse'

export const getAllQuiz = function() {
    var quizRef = firebase.app().database().ref(quizIndex);
    quizRef.on("value", function(snapshot) {
        console.log(snapshot.val());
    }, function (error) {
        console.log("Error: " + error.code);
    });
};

export const getQuizQuestion = function(quizId, questionId) {
    var quizQuestionRef = firebase.app().database().ref(quizQuestionsIndex);
    var quizRef = quizQuestionRef.child(quizId);
    var questionRef = quizRef.child(questionId);

    questionRef.once("value", function(snapshot) {
    console.log(snapshot.val());
    }, function (error) {
    console.log("Error: " + error.code);
    });
};
