import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from './service/question.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;



  counter = 61;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getAllQuestion();
    this.startCounter();
  }

  getAllQuestion() {
    this.questionService.getQuestionJson()
      .subscribe(res => this.questionList = res)
  }

  nextQuestion() {
      this.currentQuestion++;


  }

  previousQuestion() {
      this.currentQuestion--;
  }

  answer(currentQno: number, option:any) {
    if (option.correct) {
      this.points += 20;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();

      }, 1000);


    } else {
      setTimeout(() => {
        this.inCorrectAnswer++;
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(_=> {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points - 5;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter=0
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestion();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

}
