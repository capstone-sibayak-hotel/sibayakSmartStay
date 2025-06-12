import API_URL from "../../CONFIG";

class ReviewListComponent extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <div class="review-list">
        <div id="reviews-container"></div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #reviews-container{
      display:flex;
      flex-direction:column;
      align-items:center;
      }
      .review-list {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .review-item {
        background: white;
        border-radius: 8px;
        width:100%;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .review-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .review-name {
        font-weight: bold;
        color: #333;
      }

      .review-date {
        color: #666;
        font-size: 0.9em;
      }

      .review-rating {
        color: #A17640;
        margin-bottom: 10px;
      }

      .review-room {
        color: #666;
        font-style: italic;
        margin-bottom: 10px;
      }

      .review-comment {
        color: #444;
        line-height: 1.5;
        margin-bottom: 15px;
      }

      .stars {
        color: #A17640;
      }

      .ml-predictions {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #eee;
      }

      .ml-prediction-item {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      }

      .ml-prediction-label {
        font-weight: bold;
        margin-right: 10px;
        min-width: 100px;
      }

      .ml-prediction-score {
        padding: 2px 8px;
        border-radius: 4px;
        font-weight: bold;
      }

      .score-high {
        background-color: #e6ffe6;
        color: #006600;
      }

      .score-medium {
        background-color: #fff2e6;
        color: #cc7700;
      }

      .score-low {
        background-color: #ffe6e6;
        color: #cc0000;
      }

      @media (max-width: 600px) {
        .review-list, .form-popup {
          padding: 0.5rem;
          width: 100% !important;
          max-width: 100% !important;
        }
          .review-list{
          padding:0;
          }

        .review-item {
          padding: 0.7rem;
          max-width:90%;
        }
        h2, .review-header, .review-rating, .review-room, .review-comment {
          font-size: 1rem !important;
        }
      }
    `;
    this.appendChild(style);

    this.loadReviews();
    document.addEventListener('review-submitted', () => this.loadReviews());
  }

  getScoreClass(score) {
    if (score >= 4) return 'score-high';
    if (score <= 2) return 'score-low';
    return 'score-medium';
  }

  loadReviews() {
    let reviews = [];
    try {
      const saved = localStorage.getItem('reviews');
      reviews = saved ? JSON.parse(saved) : [];
    } catch (e) {
      reviews = [];
    }
    const container = this.querySelector('#reviews-container');
    container.innerHTML = '';
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    reviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review-item';
      reviewElement.innerHTML = `
        <div class="review-header">
          <span class="review-name">${review.username}</span>
          <span class="review-date">${review.date}</span>
        </div>
        <div class="review-rating">
          <span class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
        </div>
        <div class="review-room">Room: ${review.roomType}</div>
        <div class="review-comment">${review.comment}</div>
        <div class="ml-predictions">
          <div class="ml-prediction-item">
            <span class="ml-prediction-label">Fasilitas:</span>
            <span class="ml-prediction-score ${this.getScoreClass(review.mlPredictions?.fasilitas || 0)}">
              ${review.mlPredictions?.fasilitas || 0}
            </span>
          </div>
          <div class="ml-prediction-item">
            <span class="ml-prediction-label">Staff:</span>
            <span class="ml-prediction-score ${this.getScoreClass(review.mlPredictions?.staff || 0)}">
              ${review.mlPredictions?.staff || 0}
            </span>
          </div>
          <div class="ml-prediction-item">
            <span class="ml-prediction-label">Kebersihan:</span>
            <span class="ml-prediction-score ${this.getScoreClass(review.mlPredictions?.kebersihan || 0)}">
              ${review.mlPredictions?.kebersihan || 0}
            </span>
          </div>
        </div>
      `;
      container.appendChild(reviewElement);
    });
  }
}

customElements.define('review-list-component', ReviewListComponent); 