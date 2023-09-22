```html
<!DOCTYPE html>
<html>
  <head>
    <title>Puzzle</title>
  </head>
  <body>
 <div class="container">
    <div class="slides">
      <ul>
        <li><button></button></li>
        <li><button></button></li>
        <li><button></button></li>
        <li><button></button></li>
        <li><button></button></li>
        <li><button></button></li>
        <li><button></button></li>
        <li><button></button></li>
      </ul>
    </div>
  </div>

  <div class="button-container">
    <label for="image-input" id="image-input-label">Resim Seç</label>
    <input type="file" id="image-input" accept="image/*">
    <button id="shuffle-button" onclick="shufflePuzzle()">Karıştır</button>
    <button id="new-photo-button" onclick="loadNewPhoto()">Yeni Oyun</button>
    <img id="new-image" src="" alt="Yeni Fotoğraf" style="display: none;">
  </div>  </body>
</html>
```

```js
var app = {
  tiles: [],
  image: 'https://media.tenor.com/b6HMJnsJxe0AAAAC/natalie-smoking-professional.gif',

  init: function () {
    this.tiles = document.querySelectorAll(".slides ul li");
    this.setup();
    this.addEvents();
  },
  // ...
};


```

app adında bir JavaScript nesnesi oluşturulur. Bu nesne, oyunun temel işlevlerini ve verilerini içerir.
tiles dizisi, oyun tahtasındaki parçaları temsil eder.
image değişkeni, oyun tahtasındaki parçaların arka plan resminin URL'sini içerir.
init fonksiyonu, oyunun başlatılmasını sağlar ve diğer işlevleri çağırır.

```js
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


```
setup fonksiyonu, oyun tahtasının parçalarını düzenler ve arka plan resimlerini ayarlar.
tiles dizisi işlenir ve her parçanın pozisyonu ve arka plan resmi ayarlanır parçalarının arka plan resmini doğru konumda gösterir.

```js
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


```

move fonksiyonu, bir parçayı belirli bir yönde hareket ettirir. Bu, oyunun parçalarını sürüklemek için kullanılır

```js
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


```

shuffle fonksiyonu, parçaları rastgele birkaç kez karıştırır. Bu, oyunun başında parçaların sırasını karıştırmak için kullanılır.karı veya aşağı hareket edebilir.

```js
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
},

```


checkPuzzleComplete fonksiyonu, puzzle'ın tamamlanıp tamamlanmadığını kontrol eder. Tüm parçaların doğru sıralamada olup olmadığını kontrol eder ve eğer doğruysa bir bildirim gösterir.
Bu açıklamalar, oyunun temel işlevlerini ve oyun tahtasının hazırlanmasını açıklar. Kodun geri kalan kısmı, oyunu kullanıcı arayüzü ile etkileşime sokan ve resim yükleme işlevselliğini sağlayan kısımları içerir.

```js
function shufflePuzzle() {
  app.shuffle();
}

```

shufflePuzzle fonksiyonu, kullanıcı tarafından çağrıldığında oyun tahtasındaki parçaları karıştırmak için app.shuffle() işlemini çağırır. Bu, kullanıcının oyunu yeniden karıştırmasına izin verir.

## Resim yükleme işlevi

```js
function loadNewPhoto() {
  // Yeni fotoğrafın URL'sini veya dosya yolunu alın
  var newImageUrl = "https://assets.codepen.io/2574552/Mona_Lisa.jpg"; // Yeni fotoğrafın URL'sini buraya ekleyin

  // Yeni fotoğrafı görüntülemek için <img> etiketini seçin
  var newImageElement = document.getElementById("new-image");

  // <img> etiketinin src özelliğini yeni fotoğrafın URL'siyle güncelleyin
  newImageElement.src = newImageUrl;

  // Puzzle tahtasındaki her bir parçanın arka planını güncelleyin
  var puzzleTiles = document.querySelectorAll(".slides ul li button");
  puzzleTiles.forEach(function (tile, index) {
    var x = index % 3;
    var y = Math.floor(index / 3);
    tile.style.backgroundImage = "url(" + newImageUrl + ")";
    tile.style.backgroundPosition = "-" + (x * 150) + "px -" + (y * 150) + "px";
  });

  // Puzzle'ı görünür yapın
  var puzzleContainer = document.querySelector(".slides");
  puzzleContainer.style.display = "block";

  // <img> etiketini gizleyin
  newImageElement.style.display = "none";
}

```
loadNewPhoto işlevi, "Yeni Oyun" düğmesine tıklanarak çağrılır. Bu işlev, yeni bir resmin URL'sini alır ve oyun tahtasındaki parçaların arka planını ve görselini bu yeni resimle günceller.
newImageUrl değişkeni, yeni resmin URL'sini içerir. İsterseniz bu URL'yi değiştirebilirsiniz.
Yeni resmi <img> etiketinin src özelliği ile yükler ve gösterir. Bu, kullanıcıya yeni bir oyun başlatma seçeneği sunar.

```js
window.addEventListener('load', function () {
  app.init();
});

```
Bu kod parçası, sayfanın tamamen yüklendiğinde ('load' olayı gerçekleştiğinde) app nesnesinin init yöntemini çağırarak oyunun başlatılmasını sağlar. Oyun yüklendikten sonra kullanılmaya hazır olur.

```js
const imageInput = document.querySelector("#image-input");
const puzzleTiles = document.querySelectorAll(".slides ul li button");
let imageLoaded = false;

// Resmi yükleme fonksiyonu
function loadImage(file) {
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  // Resmi her bir puzzle parçasına ekleyin
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

```
Bu kod parçası, resim seçme işlevselliği ile ilgilidir.
imageInput değişkeni, resim seçme düğmesini seçer.
puzzleTiles, oyun tahtasındaki parçaların düğmelerini seçer.
imageLoaded değişkeni, resmin yüklendiğini kontrol etmek için kullanılır.
loadImage işlevi, kullanıcının seçtiği resmi oyun tahtasındaki her parçanın arka planına ekler.
imageInput.onchange olay dinleyicisi, kullanıcı bir resim seçtiğinde çalışır ve seçilen resmi loadImage işlevine ileterek oyun tahtasına ekler.

<img title="Doğayla yaşam" alt="Alt text" src="https://github.com/mrvozturk/Puzzle_new/assets/133267808/ed8e5ab2-7074-4bc6-b9a9-7d1ec191bec8" width="250px" height="500px">

