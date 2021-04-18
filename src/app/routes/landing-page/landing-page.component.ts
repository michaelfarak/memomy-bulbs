import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfoService} from '../../services/user-info-service/user-info.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required)
    });
  }

  save = () => {
    this.userInfoService.saveToLocalStorage(this.form.value);
  }

}
