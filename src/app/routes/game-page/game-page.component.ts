import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserInfoService} from '../../services/user-info-service/user-info.service';
import {DatePipe} from '@angular/common';
import {ArraySortPipe} from '../../services/orderBy';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, AfterViewInit {
  @ViewChild('gameContainer') bulbsContainer: ElementRef;


  bulbNumber = 6;
  sequenceSize = 4;
  sequenceArray;
  clickSuccess;
  currentIteration;
  clickSequence;
  bulbsArray;
  totalPoint;
  gameStarted = false;
  gameFinished = false;
  userInfo;
  scoreHistory = [];

  constructor(private renderer: Renderer2, private userInfoService: UserInfoService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.generateSequence(this.sequenceSize);
    this.clickSuccess = 0;
    this.currentIteration = 1;
    this.clickSequence = [];
    this.totalPoint = 0;
    this.userInfo = this.userInfoService.getUserInfo();
    this.getScoreHistory();
  }

  ngAfterViewInit(): void {
    this.bulbsArray = Array.from(this.bulbsContainer.nativeElement.children);
  }

  getScoreHistory = () => {
    this.scoreHistory = this.userInfoService.getScoreHistory();
  }

  generateSequence = (size: number) => {
    const sequence = new Set();
    while (sequence.size !== size) {
      const randomInt = Math.floor(Math.random() * this.bulbNumber) + 1;
      if (!sequence.has(randomInt)) {
        sequence.add(randomInt);
      }
    }
    this.sequenceArray = [...sequence];
  }

  lightBulb = (item: any, className: string) => {
      const hasClass = item.classList.contains(className);
      if (hasClass) {
        item.classList.remove(className);
      } else {
        item.classList.add(className);
        setTimeout(() => item.classList.remove(className), 1000);
      }
  }

  clickBulb = (event: any, className: string) => {
    const bulbStringId = event.target.id;
    const bulbId = bulbStringId.substr(bulbStringId.length - 1);
    this.lightBulb(event.target, className);
    if (bulbId === this.sequenceArray[this.clickSuccess].toString()) {
      this.clickSuccess += 1;
    } else {
      console.log('Error');
      setTimeout(() => this.endGameActions(), 2000);
    }
    if (this.currentIteration === this.clickSuccess){  // meaning the end of one iteration
      this.totalPoint = this.clickSuccess * 10;
      if (this.currentIteration === this.sequenceSize){  // final iteration
        setTimeout(() => this.endGameActions(), 2000);
      } else {
        setTimeout(() => this.nextIteration(), 2000);
      }
    }
  }
  nextIteration = () => {
    this.currentIteration += 1;
    this.startSequence();
  }
  startSequence = () => {
    this.gameStarted = true;
    this.clickSuccess = 0;
    this.sequenceArray.slice(0, this.currentIteration).forEach((elem, i) => {
      this.bulbsArray.forEach((bulb, index) => {
        if (index + 1 === elem) {
          setTimeout(() => {
            this.lightBulb(bulb, 'bulb' + (index + 1));
          }, i * 1000);
        }
      });
    });
  }

  endGameActions = () => {
    window.alert('Game Over');
    this.gameStarted = false;
    this.gameFinished = true;
    this.userInfoService.saveScore({
      userName: this.userInfo.name,
      score: this.totalPoint,
      date: this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
      time: new Date().getTime().toString()
    });
    this.getScoreHistory();
    return;
  }

  restartGame = () => {
    this.generateSequence(this.sequenceSize);
    this.clickSuccess = 0;
    this.currentIteration = 1;
    this.clickSequence = [];
    this.totalPoint = 0;
    this.gameFinished = false;
    setTimeout(() => this.startSequence(), 1000);
  }
}
