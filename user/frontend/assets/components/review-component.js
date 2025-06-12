import API_URL from "../../CONFIG";

class ReviewComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="overlay">
        <div class="form-popup">
          <h2>Write a Review</h2>
          <label>Rate the product</label>
          <div class="stars" id="rating-stars">
            ${[1, 2, 3, 4, 5].map(i => `<span data-val="${i}">&#9733;</span>`).join('')}
          </div>

          <form id="form">
            <label>Choose Room</label>
            <select id="roomType" required>
              <option>Twin Room</option>
              <option>Standard Room</option>
              <option>Promotion Room</option>
              <option>Villa House</option>
            </select>

            <label>Message</label>
            <textarea id="comment" placeholder="Write your review..." required></textarea>

            <div class="actions">
              <button type="submit" class="submit">Submit</button>
              <button type="button" id="cancelBtn" class="cancel">Cancel</button>
            </div>
          </form>

           <div id="ml-results" style="margin-top: 20px;">
            <div id="predicted-fasilitas"></div>
            <div id="predicted-staff"></div>
            <div id="predicted-kebersihan"></div>
          </div>


        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .form-popup {
        background: white;
        border-radius: 10px;
        padding: 30px;
        width: 350px;
        max-width: 98vw;
        box-sizing: border-box;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-family: sans-serif;
      }

      h2 {
        margin-top: 0;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
      }

      .stars {
        margin-bottom: 15px;
        text-align: center;
      }

      .stars span {
        font-size: 28px;
        cursor: pointer;
        color: #ccc;
        margin: 0 2px;
      }

      .stars .selected {
        color: #A17640;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #555;
      }

      input, select, textarea {
        width: 100%;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }

      textarea {
        height: 100px;
        resize: vertical;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
      }

      .submit {
        background-color: #A17640;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }

      .submit:hover {
        background-color: #8a6533;
      }

      .cancel {
        background: transparent;
        border: 1px solid #A17640;
        color: #A17640;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }

      .cancel:hover {
        background: #f5f5f5;
      }

      @media (max-width: 600px) {
        .form-popup {
          padding: 0.5rem !important;
          width: 80vw !important;
          max-width: 90vw !important;
        }
        .review-list {
          padding: 0.5rem !important;
          width: 98vw !important;
          max-width: 98vw !important;
        }
        .review-item {
          padding: 0.7rem;
        }
        h2, .review-header, .review-rating, .review-room, .review-comment {
          font-size: 1rem !important;
        }
}
    `;
    this.appendChild(style);

    //display ml
    function getColor(score) {
      if (score >= 4) return 'green';   
      if (score <= 2) return 'red';     
      return 'gray';                    
    }

    let selectedRating = 0;
    const stars = this.querySelectorAll('#rating-stars span');
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-val'));
        stars.forEach((s, i) => {
          s.classList.toggle('selected', i < selectedRating);
        });
      });
    });

    this.querySelector('#form').addEventListener('submit', async (e) => {
      e.preventDefault();

      if (selectedRating === 0) {
        alert('Please select a star rating!');
        return;
      }

      // Get user data from localStorage atau prompt
      let userData = JSON.parse(localStorage.getItem('user'));
      if (!userData || !userData.username) {
        const username = prompt('Masukkan nama Anda:');
        userData = { username };
        localStorage.setItem('user', JSON.stringify(userData));
      }
      // panggil ML API sebelum submit
      const commentText = this.querySelector('#comment').value;
      let predictedScores = {};
      try {
        const mlResponse = await fetch("https://proyek-sentimen-api-production.up.railway.app/predict_aspects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ review_text: commentText })
        });
        if (!mlResponse.ok) throw new Error("Failed to get prediction from ML model");
        predictedScores = await mlResponse.json();
        document.getElementById('predicted-fasilitas').innerHTML = `
          Fasilitas: <span style="color:${getColor(predictedScores.Fasilitas)}">${predictedScores.Fasilitas}</span>
        `;
        document.getElementById('predicted-staff').innerHTML = `
          Staf: <span style="color:${getColor(predictedScores.Staf)}">${predictedScores.Staf}</span>
        `;
        document.getElementById('predicted-kebersihan').innerHTML = `
          Kebersihan: <span style="color:${getColor(predictedScores.Kebersihan)}">${predictedScores.Kebersihan}</span>
        `;
      } catch (err) {
        predictedScores = { Fasilitas: 0, Staf: 0, Kebersihan: 0 };
      }
      // Simpan ke localStorage
      const review = {
        username: userData.username,
        roomType: this.querySelector('#roomType').value,
        comment: this.querySelector('#comment').value,
        rating: selectedRating,
        date: new Date().toLocaleString('id-ID'),
        mlPredictions: {
          fasilitas: predictedScores.Fasilitas || 0,
          staff: predictedScores.Staf || 0,
          kebersihan: predictedScores.Kebersihan || 0
        }
      };
      let reviews = [];
      try {
        const saved = localStorage.getItem('reviews');
        reviews = saved ? JSON.parse(saved) : [];
      } catch (e) { reviews = []; }
      reviews.unshift(review);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      document.dispatchEvent(new CustomEvent('review-submitted'));
      alert('Review submitted successfully!');
      this.remove();
    });

    this.querySelector('#cancelBtn').addEventListener('click', () => {
      this.remove();
    });
  }
}

customElements.define('review-component', ReviewComponent); 