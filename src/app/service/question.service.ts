import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {AppComponent} from "../app.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  getQuestionJson() {
    return this.http.get<any>("assets/questions.json");
  }
}
