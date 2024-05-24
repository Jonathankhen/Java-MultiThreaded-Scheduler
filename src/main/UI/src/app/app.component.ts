import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  roomsearch!: FormGroup;
  rooms!: Room[];
  messages: string[] = [];

  private baseUrl: string = 'http://localhost:8080';
  currentCheckInVal!: string;
  currentCheckOutVal!: string;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });

    this.roomsearch.valueChanges.subscribe(value => {
      this.currentCheckInVal = value.checkin;
      this.currentCheckOutVal = value.checkout;
    });

    this.fetchWelcomeMessages();
  }

  fetchWelcomeMessages() {
    this.httpClient.get<string[]>(`${this.baseUrl}/welcome`).subscribe(
      messages => this.messages = messages,
      error => console.error('Error fetching welcome messages:', error)
    );
  }

  onSubmit({ value, valid }: { value: RoomSearch, valid: boolean }) {
    if (valid) {
      this.getAll().subscribe(
        rooms => {
          this.rooms = rooms as Room[];
          this.convertCurrency();
        }
      );
    }
  }

  convertCurrency() {
    const conversionRates = { USD: 1, CAD: 1.3, EUR: 0.9 };
    this.rooms.forEach(room => {
      room.priceUSD = parseFloat(room.price).toFixed(2);
      room.priceCAD = (parseFloat(room.price) * conversionRates.CAD).toFixed(2);
      room.priceEUR = (parseFloat(room.price) * conversionRates.EUR).toFixed(2);
    });
  }

  reserveRoom(roomId: string) {
    const request = new ReserveRoomRequest(roomId, this.currentCheckInVal, this.currentCheckOutVal);
    this.createReservation(request);
  }

  createReservation(request: ReserveRoomRequest) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<Room>(`${this.baseUrl}/room/reservation/v1`, request, { headers })
      .subscribe(response => console.log(response));
  }

  getAll(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${this.baseUrl}/room/reservation/v1`, {
      params: { checkin: this.currentCheckInVal, checkout: this.currentCheckOutVal },
      responseType: 'json'
    });
  }
}

export interface RoomSearch {
  checkin: string;
  checkout: string;
}

export interface Room {
  priceEUR: string;
  priceCAD: string;
  priceUSD: string;
  id: string;
  roomNumber: string;
  price: string;
  links: string;
}

export class ReserveRoomRequest {
  constructor(
    public roomId: string,
    public checkin: string,
    public checkout: string
  ) {}
}
