import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './assets/style.css';
import quizService from "./quizService";
import QuestionBox from './components/QuestionBox.js'
import Result from "./components/Result.js"

class Quizbee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            score: 0,
            responses: 0
        };
        this.getQuestions = this.getQuestions.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }
    computeAnswer(answer, correct) {
        if (answer === correct) {
            this.setState(
                { score: this.state.score + 1 }
            );
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    }
    getQuestions() {
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };
    playAgain() {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        });
    }
    componentDidMount() {
        this.getQuestions();
    }
    render() {
        return (
            <div className="container">
                <div className="title">Quizbee</div>
                {this.state.questionBank.length > 0 &&
                    this.state.responses < 5 &&
                    this.state.questionBank.map(
                        ({ question, answers, correct, questionId }) => (
                            <QuestionBox question={question} options={answers} key={questionId} selected={answer => this.computeAnswer(answer, correct)} />
                        )
                    )}
                {this.state.responses === 5 ? <Result score={this.state.score} playAgain={this.playAgain} /> : null}
            </div>
        );
    }
};

ReactDOM.render(
    <Quizbee />
    , document.getElementById('root'));

