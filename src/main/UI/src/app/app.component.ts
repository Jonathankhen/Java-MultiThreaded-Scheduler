import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Component decorator with metadata defining the selector, HTML and CSS files
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  eventTimes: string = '';
  eventDay: string = 'Saturday';
  welcomeMessages: string[] = [];
  roomsearch!: FormGroup;
  rooms!: Room[];
  messages: string[] = [];
  private baseUrl: string = 'http://localhost:8080';
  currentCheckInVal!: string;
  currentCheckOutVal!: string;
  request!: ReserveRoomRequest;
  public submitted!: boolean;

  // Constructor to inject the HttpClient service
  constructor(private httpClient: HttpClient) {}

  // Lifecycle hook that initializes the component
  ngOnInit() {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });

    // Listen to form value changes
    this.roomsearch.valueChanges.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });

    // Initial method call to fetch welcome messages
    this.fetchWelcomeMessages();
    this.loadEventTimes();
  }

  // Fetches initial welcome messages from the server
  fetchWelcomeMessages() {
    this.httpClient.get<string[]>(`${this.baseUrl}/welcome`).subscribe(
      messages => {
        this.messages = messages; // Store the fetched messages
        console.log('Messages:', this.messages);
      },
      error => console.error('Error fetching welcome messages:', error)
    );
  }

  loadEventTimes(): void {
    // Ensure responseType is set to 'text' to handle response as string
    this.httpClient.get<string>(`${this.baseUrl}/api/time/convert`, { responseType: 'text' as 'json' })
      .subscribe(
        eventTimes => {
          this.eventTimes = eventTimes; // Updated variable name to reflect method change
        },
        error => {
          console.error('Error fetching event times:', error); // Updated error message for clarity
        }
      );
  }




  // Submits room search form and fetches available rooms based on form values
  onSubmit({ value, valid }: { value: RoomSearch, valid: boolean }) {
    if (!valid) {
      console.error('Form submission is invalid');
      return; // Exit early if the form data is not valid
    }

    // Fetch all available rooms
    this.getAll().subscribe(
      rooms => {
        const firstRoomProperty = Object.values(rooms)[0];
        if (!Array.isArray(firstRoomProperty)) {
          console.error('Expected rooms to be in an array format, but received:', firstRoomProperty);
          return; // Handle cases where the rooms data is not in the expected format
        }

        // Update room details with currency conversions
        console.log('Fetched rooms:', firstRoomProperty);
        this.rooms = firstRoomProperty.map(room => ({
          ...room,
          priceCAD: (parseFloat(room.price) * 1.3).toFixed(2), // Convert price to CAD
          priceEUR: (parseFloat(room.price) * 0.9).toFixed(2) // Convert price to EUR
        }));
      },
      error => console.error('Error fetching rooms:', error)
    );
  }

  reserveRoom(value: string) {
    this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
    this.createReservation(this.request);
  }

  // Handles room reservation requests
  createReservation(request: ReserveRoomRequest) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<Room>(`${this.baseUrl}/room/reservation/v1`, request, { headers })
      .subscribe(response => console.log(response)); // Log the server response
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
  id: string;
  roomNumber: string;
  price: string;
  priceCAD: string;
  priceEUR: string;
  links: any;
}

export class ReserveRoomRequest {
  constructor(
    public roomId: string,
    public checkin: string,
    public checkout: string
  ) {}
}
