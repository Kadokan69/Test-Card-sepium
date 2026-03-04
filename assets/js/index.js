class Card {
  constructor(cardElement) {
    this.card = cardElement;
    this.likeButton = this.card.querySelector(".card__like");
    this.likeCount = this.card.querySelector(".card__like-count");
    this.materialItems = this.card.querySelectorAll(".card__material-item");
    this.overlayLink = this.card
      .querySelector(".card__overlay-link")
      ?.getAttribute("href");

    this.init();
  }

  init() {
    this.card.addEventListener("click", (e) => this.handleCardClick(e));
  }

  handleCardClick(e) {
    const ignoreSelectors = [
      ".swiper-button-prev",
      ".swiper-button-next",
      ".card__zoom-link",
      ".card__like",
      ".card__buy-button",
      ".card__link",
      ".card__material-item",
      ".pagination__slider",
    ];

    const isIgnore = ignoreSelectors.some((selector) =>
      e.target.closest(selector),
    );

    if (!isIgnore && this.overlayLink) {
      window.open(this.overlayLink, "_blank");
    }

    this.handleMaterialsClick(e);
    this.handleLikeClick(e);
  }

  handleMaterialsClick(e) {
    if (e.target.classList.contains("card__material-item")) {
      this.materialItems.forEach((item) =>
        item.classList.remove("card__material-item--active"),
      );
      e.target.classList.add("card__material-item--active");
    }
  }

  handleLikeClick(e) {
    const likeButton = e.target.closest(".card__like");

    if (likeButton) {
      const isLiked = likeButton.classList.contains("card__like--active");
      let count = parseInt(this.likeCount.textContent);

      if (isLiked) {
        this.likeCount.textContent = count - 1;
        likeButton.classList.remove("card__like--active");
      } else {
        this.likeCount.textContent = count + 1;
        likeButton.classList.add("card__like--active");
      }
    }
  }
}

