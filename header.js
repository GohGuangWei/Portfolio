class Header extends HTMLElement{
    constructor(){
        super();
    }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="header-content">
            <img src="assets/lang_english.png">
            <p onclick="window.location.href='index.html'"> Home</p>
            <p onclick="window.location.href='portfolio.html'"> Portfolio</p>
            <p onclick="window.location.href='gallery.html'"> Gallery </p>
            <p onclick="window.location.href='aboutMe.html'">About Me</p>
        </div>
      </header>
    `;
  }
}

customElements.define('header-component', Header);