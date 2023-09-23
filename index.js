var app = {
  tiles: [],
  image: 'https://media.tenor.com/b6HMJnsJxe0AAAAC/natalie-smoking-professional.gif',

  init: function () {
    this.tiles = document.querySelectorAll(".slides ul li");
    this.setup();
    this.addEvents();
  },

  setup: function () {
    var _self = this;
    _self.tiles = Array.from(_self.tiles);
    _self.tiles.push(null);

    _self.tiles.forEach(function (tile, index) {
      if (tile) {
        var x = index % 3;
        var y = Math.floor(index / 3);

        tile.style.top = (y * 150) + "px"; 
        tile.style.left = (x * 150) + "px"; 

        tile.setAttribute("x", x);
        tile.setAttribute("y", y);

        var button = tile.querySelector("button");
        button.style.backgroundImage = "url(" + _self.image + ")";
        button.style.backgroundPosition = "-" + (x * 150) + "px -" + (y * 150) + "px";
      }
    });
  },

  addEvents: function () {
    var _self = this;

    _self.tiles.forEach(function (tile) {
      if (tile) {
        tile.addEventListener('click', function (e) {
          _self.move(tile);
          _self.checkPuzzleComplete();
        });
      }
    });
  },

  move: function (tile) {
    var x = parseInt(tile.getAttribute("x"));
    var y = parseInt(tile.getAttribute("y"));

    var leftTile = document.querySelector("[x='" + (x - 1) + "'][y='" + y + "']");
    var topTile = document.querySelector("[x='" + x + "'][y='" + (y - 1) + "']");
    var rightTile = document.querySelector("[x='" + (x + 1) + "'][y='" + y + "']");
    var bottomTile = document.querySelector("[x='" + x + "'][y='" + (y + 1) + "']");

    switch (true) {
      case x > 0 && !leftTile:
        tile.style.left = (x - 1) * 150 + "px";
        tile.setAttribute("x", x - 1);
        break;
      case x < 2 && !rightTile:
        tile.style.left = (x + 1) * 150 + "px";
        tile.setAttribute("x", x + 1);
        break;
      case y > 0 && !topTile:
        tile.style.top = (y - 1) * 150 + "px";
        tile.setAttribute("y", y - 1);
        break;
      case y < 2 && !bottomTile:
        tile.style.top = (y + 1) * 150 + "px";
        tile.setAttribute("y", y + 1);
        break;
    }
  },

  shuffle: function () {
    var clickNumber = 100;
    var _self = this;

    function doMove() {
      var tile = _self.tiles[Math.floor(Math.random() * _self.tiles.length)];
      if (tile) {
        _self.move(tile);
      }

      clickNumber--;
      if (clickNumber > 0) {
        requestAnimationFrame(doMove);
      }
    }

    doMove();
  },

  checkPuzzleComplete: function () {
    var _self = this;

    var correctOrder = _self.tiles.every(function (tile, index) {
      if (!tile) return true;
      var x = parseInt(tile.getAttribute("x"));
      var y = parseInt(tile.getAttribute("y"));
      return x === index % 3 && y === Math.floor(index / 3);
    });

    if (correctOrder) {
      alert("Puzzle tamamlandı!");
    }
  }
};

function shufflePuzzle() {
  app.shuffle();
}

function loadNewPhoto() {
  // Yeni fotoğrafın URL'sini veya dosya yolunu al
  var newImageUrl = "https://assets.codepen.io/2574552/Mona_Lisa.jpg"; // Yeni fotoğrafın URL'sini buraya ekle

  // Yeni fotoğrafı görüntülemek için <img> etiketini seç
  var newImageElement = document.getElementById("new-image");

  // <img> etiketinin src özelliğini yeni fotoğrafın URL'siyle güncelle
  newImageElement.src = newImageUrl;

  // Puzzle tahtasındaki her bir parçanın arka planını güncelle
  var puzzleTiles = document.querySelectorAll(".slides ul li button");
  puzzleTiles.forEach(function (tile, index) {
    var x = index % 3;
    var y = Math.floor(index / 3);
    tile.style.backgroundImage = "url(" + newImageUrl + ")";
    tile.style.backgroundPosition = "-" + (x * 150) + "px -" + (y * 150) + "px";
  });

  // Puzzle'ı görünür 
  var puzzleContainer = document.querySelector(".slides");
  puzzleContainer.style.display = "block";

  // <img> etiketini gizlensin
  newImageElement.style.display = "none";
}

window.addEventListener('load', function () {
  app.init();
});
const imageInput = document.querySelector("#image-input");
const puzzleTiles = document.querySelectorAll(".slides ul li button");
let imageLoaded = false;

// Resmi yükleme fonksiyonu
function loadImage(file) {
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  // Resmi her bir puzzle parçasına ekle
  puzzleTiles.forEach((tile, index) => {
    const x = index % 3;
    const y = Math.floor(index / 3);
    tile.style.backgroundImage = `url(${imageUrl})`;
    tile.style.backgroundPosition = `-${x * 150}px -${y * 150}px`;
  });

}
// Resim seçildiğinde çalışacak olay dinleyici
imageInput.onchange = (e) => {
  if (imageInput.files.length == 0) return;
  const file = imageInput.files[0];
  loadImage(file);
};