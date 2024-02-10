import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  MessageSucces(type:any,title:any, message:any,position:any) {
    Swal.fire({
      icon: type,
      title: title,
      text: message,
      position: position,
    });
  }
}
