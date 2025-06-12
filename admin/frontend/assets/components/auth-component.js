import { loginUser } from '../../api/login.js'; 

class AuthComponent extends HTMLElement {
  connectedCallback() {
    this.mode = 'login';
    this.render();
  }

  render() {
    const isLogin = this.mode === 'login';
    this.innerHTML = `
      <link rel="stylesheet" href="../styles/login.css">
      <div class="container">
        <div class="left"></div>
        <div class="right">
          <h2>${isLogin ? 'SIGN IN' : 'REGISTER'}</h2>
          <form id="auth-form">
            <label>Username</label>
            <input type="text" id="username" placeholder="Username" required />
            <label>Password</label>
            <input type="password" id="password" placeholder="Password" required />
            <button type="submit">${isLogin ? 'SIGN IN' : 'REGISTER'}</button>
          </form>
        </div>
      </div>
    `;

    this.querySelector('#auth-form').addEventListener('submit', this.handleAuth.bind(this));
    this.querySelector('#toggle-mode').addEventListener('click', (e) => {
      e.preventDefault();
      this.mode = isLogin ? 'register' : 'login';
      this.render();
    });
  }

  handleAuth(e) {
    e.preventDefault();
    
    const username = this.querySelector('#username').value;
    const password = this.querySelector('#password').value;

    if (this.mode === 'login') {
      
      loginUser({ username, password })
        .then(data => {
          console.log(data)
          if (data.accessToken) {
            localStorage.setItem('authToken', data.accessToken);  
            localStorage.setItem('loggedInUser', username);  
            alert('Login successful!');
            window.location.href = 'index.html';  
          } else {
            alert('Invalid username or password');
          }
        })
        .catch(() => alert('Server error'));
    }
  }
}

customElements.define('auth-component', AuthComponent);
