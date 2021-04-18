import { Injectable } from '@angular/core';

export interface UserInfo {
  name: string;
}

interface UserScore {
  userName: string;
  score: number;
  date: string;
  time: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  userScores = [];

  constructor() { }

  saveToLocalStorage = (userInfo: UserInfo) => {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserInfo = () => {
    return JSON.parse(window.localStorage.getItem('userInfo'));
  }

  saveScore = (newScore: UserScore) => {
    const storedData = JSON.parse(window.localStorage.getItem('userScores'));
    if (storedData != null) {
      if (!Array.isArray(storedData)){
        this.userScores.push(storedData, newScore);
      } else {
        this.userScores = storedData;
        this.userScores.push(newScore);
      }
      window.localStorage.setItem('userScores', JSON.stringify(this.userScores));
    } else {
      window.localStorage.setItem('userScores', JSON.stringify(newScore));
    }
  }

  getScoreHistory = () => {
    const storedScores = [];
    const storedData = JSON.parse(window.localStorage.getItem('userScores'));
    if (storedData != null){
      if (!Array.isArray(storedData)) {
        storedScores.push(storedData);
        return storedScores;
      } else {
        return storedData;
      }
    } else {
      return [];
    }
  }
}
