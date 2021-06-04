import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListItem } from '../../models';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private currentId = 2;
  list: TodoListItem[] = [
    { id: '1', description: 'Clean Garage', complete: false },
    { id: '2', description: 'Fix Dresser', complete: true }
  ]

  form: FormGroup = this.formBuilder.group({
    item: ['', [Validators.required, Validators.minLength(2)]]
  });

  get item() {
    return this.form.get('item');
  }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // I'll get to it!
    let x = 12;
  }

  submit() {
    if (this.form.valid) {
      const newItem: TodoListItem = {
        id: (++this.currentId).toString(),
        description: this.item?.value,
        complete: false
      };
      this.list = [newItem, ...this.list];
      this.form.reset();
    } else {
      console.log('You have errors!', this.form.errors);
    }
  }

  markComplete(item: TodoListItem) {
    item.complete = true;
  }

  get hasCompleted(): boolean { return this.list.some(item => item.complete); }

  removeCompleted() {
    this.list = this.list.filter(item => item.complete === false);
  }
}
