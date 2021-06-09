import { Component } from '@angular/core';
import { DataserviceService } from './dataservice.service';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';
// import { Dictionary } from 'node_modules/lodash/fp/';
// import lodash from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arraylist = [];
  obj = [{ "question": "", "correct_answer": "", "incorrect_answers": [] }];
  obj2: any;
  mp = new Map();
  mp1 = new Map();
  count = 0;
 
  constructor(private data: DataserviceService, private toast: ToastrService) {

  }
  ngOnInit() {
    debugger
    this.pageLoadata();
  }
  pageLoadata() {
    debugger
    this.data.getData()
      .subscribe(
        (results: any) => {
          debugger
          if (results == undefined || results == null || results == 'null' || results == '') {
            debugger
            this.toast.warning('Something went wrong. Please try again later..', '', {
              positionClass: 'toast-bottom-right',
              timeOut: 5000
            });
          }
          else {
            if (results) {
              debugger
              this.obj = results.results;
              this.obj2 = this.obj;
              for (let index = 0; index < this.obj.length; index++) {
                debugger
                this.obj2[index].incorrect_answers.push(this.obj[index].correct_answer);
                let str = 'qs' + index;
                this.mp1.set(str, this.obj[index].correct_answer);
              }

            }
            else {
              this.toast.warning(results.ReturnMessage, '', {
                positionClass: 'toast-bottom-right',
                timeOut: 5000
              });
            }
          }
        },
        (error: any) => {
          this.toast.warning('Something went wrong. Please try again later..', '', {
            positionClass: 'toast-bottom-right',
            timeOut: 5000
          });
        }
      );
  }

  Answers(event: any, event1: any) {
    debugger
    if (this.mp.has(event1.currentTarget.name)) {
      debugger
      this.mp.delete(event1.currentTarget.name);
    }
    this.mp.set(event1.currentTarget.name, event);

  }




  Submit() {
    debugger
    if(this.mp.size!=this.obj.length){
      this.toast.warning('Please Answer all the Questions', '', {
        positionClass: 'toast-top-right',
        timeOut: 5000
      });
    }
    else{
    this.count=0;
    for (var [key, val] of this.mp) {
      if (this.mp1.get(key) == this.mp.get(key)) {
        this.count++;
      }
    
    }
    let resultmsg = this.count + '/' + this.obj.length + ' are correct';
    this.toast.success(resultmsg, '', {
      positionClass: 'toast-top-right',
      timeOut: 5000
    });
  }
  }
}

