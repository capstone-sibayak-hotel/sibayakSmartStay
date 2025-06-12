import API_URL from "../../CONFIG";

class BookingComponent extends HTMLElement {
  connectedCallback() {
    const selectedRoom = JSON.parse(localStorage.getItem('selectedRoom')) || {
      name: 'Twin Room',
      image: 'assets/image/Twin Room.jpg',
      price: 'Rp 300.000'
    };

    this.innerHTML = `
      <div class="booking-container">
        <div class="form-section">
          <h2>Booking Summary</h2>
          <label>Check-in: <input type="date" id="checkin" required /></label>
          <label>Check-out: <input type="date" id="checkout" required /></label>
          <label>Number of Guests: <input type="number" id="guests" min="1" max="4" value="1" required /></label>

          <h2>Personal Details</h2>
          <label>Gender:
            <select id="gender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>First Name: <input type="text" id="firstName" required /></label>
          <label>Last Name: <input type="text" id="lastName" required /></label>
          <label>Phone Number: <input type="tel" id="phone" required /></label>
          <div class="form-row">
            <input type="text" id="country" placeholder="Country" required />
            <input type="text" id="city" placeholder="City" required />
          </div>
        </div>
        <div class="summary-section">
          <img src="${selectedRoom.image}" alt="${selectedRoom.name}" class="room-image">
          <h3>${selectedRoom.name}</h3>
          <p><strong>Price Details</strong></p>
          <p class="price">${selectedRoom.price}/night</p>
          <button class="booking-btn">BOOKING</button>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .booking-container {
        display: flex;
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .form-section {
        flex: 1;
        padding: 2rem;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }

      .form-section h2 {
        margin-bottom: 1.5rem;
      }

      .summary-section {
        flex: 1;
        padding: 2rem;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }

      .room-image {
        width: 100%;
        object-fit: contain;
        border-radius: 8px;
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 1rem;
      }

      input, select {
        width: 100%;
        padding: 8px;
        margin-top: 4px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .form-row {
        display: flex;
        gap: 1rem;
      }

      .booking-btn {
        width: 100%;
        padding: 12px;
        background: #A17640;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1.1rem;
        margin-top: 1rem;
      }

      .booking-btn:hover {
        background: #8a6533;
      }

      .price {
        color: #333;
        font-size: 1.2rem;
        font-weight: 700;
        margin: 1rem 0;
      }

        @media (max-width: 900px) {
        .booking-container {
          flex-direction: column;
          gap: 1.5rem;
          padding: 1rem;
        }
        .form-section,
        .summary-section {
          padding: 1rem;
          max-width: 100%;
        }
        .room-image {
          max-width: 100%;
          height: auto;
        }
        .form-row {
          flex-direction: column;
          gap: 0.5rem;
        }
      }
    `;
    this.appendChild(style);

    this.querySelector('.booking-btn').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to make a booking');
        window.location.href = '/pages/login.html';
        return;
      }

      const checkIn = this.querySelector('#checkin').value;
      const checkOut = this.querySelector('#checkout').value;
      const guests = parseInt(this.querySelector('#guests').value);

      if (!checkIn || !checkOut) {
        alert('Please select check-in and check-out dates');
        return;
      }

      if (new Date(checkIn) >= new Date(checkOut)) {
        alert('Check-out date must be after check-in date');
        return;
      }

      const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
      const pricePerNight = parseInt(selectedRoom.price.replace(/[^0-9]/g, ''));
      const totalPrice = nights * pricePerNight;

      const bookingData = {
        roomType: selectedRoom.name,
        checkIn,
        checkOut,
        guests,
        totalPrice
      };

      try {
        console.log('Sending booking:', bookingData);
        const response = await fetch(`${API_URL}/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(bookingData)
        });

        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        if (!response.ok) {
          throw new Error(responseData.message || 'Failed to create booking');
        }

        document.dispatchEvent(new CustomEvent('booking-submitted', { detail: responseData }));
        
        alert('Booking submitted successfully!');
        this.querySelectorAll('input, select').forEach(input => input.value = '');
      } catch (error) {
        console.error('Error creating booking:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
        alert(error.message || 'Failed to create booking. Please try again.');
      }
    });
  }
}

customElements.define('booking-component', BookingComponent); 