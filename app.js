/*DOM Seçimleri + Değişkenler*/

const tahminEdilen = document.querySelector("h2");
const wrapper = document.querySelector(".wrapper");
const daireler = document.querySelectorAll(".d");
const scoreBoard = document.querySelector('span');
const resetButton = document.querySelector('button');
const highScore = document.querySelector('.highScore');
const wrapper2 = document.querySelector('.wrapper2');
const resetHScore = document.querySelector('.resetHScore');
let dogruCevap;
let score = localStorage.getItem('score');
let hScore = localStorage.getItem('highScore');

//Oyunu çağırıyorum.
game();


function game() { // ANA OYUN FONKSIYONU, TÜM ÖNEMLİ ATAMALAR VE ÇAĞIRMALAR
    eventListeners();
    localStorage.setItem('score', scoreControl(score));
    score = localStorage.getItem('score');
    IsteneniBelirle();
    dogruCevapBelirle();
    daireleriRenklendir();
    hScore = localStorage.getItem('highScore');
    localStorage.setItem('highScore', setHighScore(hScore, score));
    highScore.textContent = 'HIGH SCORE: ' + localStorage.getItem('highScore');
}
function eventListeners() // FONKSIYONLARIN BUTONLARA ATANMASI 
{
    wrapper.addEventListener('click', dogruCevapKontrol);
    resetButton.addEventListener('click', resetGame);
    resetHScore.addEventListener('click', fResetHScore);
}


function IsteneniBelirle() { // Istenenden kasıt sorulacak olan rengin belirlenmesi.
    let istenen = randomXYZ();
    tahminEdilen.textContent = istenen;
    score = localStorage.getItem('score');
    scoreBoard.textContent = 'Score: ' + scoreControl(score);
}
function randomXYZ(x, y, z) {
    /*random atıyorum*/
    x = Math.round(Math.random() * 255);
    y = Math.round(Math.random() * 255);
    z = Math.round(Math.random() * 255);

    return ('(' + x + ',' + y + ',' + z + ')');
    // rgb(255,255,255) mantığıyla (x,y,z) üretiyorum. Bu fonksiyonun çıktısı hep '(x,y,z)' şeklinde bi string oluyor
}
function daireleriRenklendir() {
    for (i = 0; i < daireler.length; i++) {
        daireler[i].setAttribute('style', 'opacity:1;')
        daireler[i].style.background = "rgb" + randomXYZ();
    }
    // tüm daireleri seçip sonrasında forla üzerlerinde gezerek hepsine renk atıyorum + ileride yazıcağım
    // kontrol fonksiyonunda her tıkladıgım dairenin opaklıgını 0a düşüreceğimden burda tekrar 1e çekiyorum.
}
function dogruCevapBelirle(istenen) {
    let daireSiralama = Math.round(Math.random() * 5)
    daireler[daireSiralama].style.background = "rgb" + istenen;
    dogruCevap = daireSiralama;
    console.log(dogruCevap + 1); // KENDIME KOPYA

    // DOĞRU CEVABIN KAÇINCI DAIRE OLDUGUNU BELIRLIYORUM; VE 63. SIRADA O DAIREYE ISTENENI ATIYORUM
    // ve ISTENEN RENGE BOYUYORUM
}
function dogruCevapKontrol(e) {
    // EĞER TIKLANAN DAIRELERDEN DOGRU CEVAP OLANA EŞTİSE
    // 1 SKOR YAZIYORUM SKOR TABLOSUNA VE OYUNU GAME(); İLE RESETLIYORUM
    // SONRA DA SKORU 0DAN KÜÇÜK MÜ DİYE KONTROL EDİP LOCAL STORAGE A ATIYORUM
    if (e.target === daireler[dogruCevap]) {
        score++
        scoreBoard.textContent = 'Score: ' + scoreControl(score);
        game();
        localStorage.setItem('score', scoreControl(score));
    }
    else if (e.target.className === 'wrapper') {
        score = score; //DAIRELERI IC ICE ALAN DIVE TIKLAYINCA YANLIS CEVAP SAYMASIN DIYE YAZDIGIM UFAK BIR SEY

    }
    else {
        //YANLIS TAHMIN FONKSIYONU UYARIYI ÜRETİYOR 
        //YANLIS CEVAP BASINA -1 SKOR YIYORUZ VE DÜŞÜYORUZ AMA SKORUNDA -YE DÜŞMESİNİ ENGELLİYORUZ.
        yanlisTahmin(wrapper2);
        e.target.setAttribute('style', 'opacity:0;');
        score--;
        scoreBoard.textContent = 'Score: ' + scoreControl(score);
        localStorage.setItem('score', scoreControl(score));
        score = scoreControl(score);//SKORUN -YE DÜŞMESİNİ ENGELLER
    }

}
function scoreControl(x) {
    if (x < 0) {
        x = 0;
        return x;
    }
    else {
        return x;
    }
    // SKORUN -YE DÜŞMESİNİ ENGELLER.
}
function resetGame() {
    score = 0;
    localStorage.setItem('score', 0);
    hScore = localStorage.getItem('highScore');
    localStorage.setItem('highScore', hScore);
    game();

    // SKORLARI RESETLER + OYUNU TEKRAR BASLATIR
}
function setHighScore(highScore, score) {
    if (highScore < score) {
        localStorage.setItem('highScore', score);
        highScore = localStorage.getItem('highScore');

        return highScore;
    }
    else {
        return highScore;
    }
    //YÜKSEK SKORU GÜNCEL SKORLA KARŞILAŞTIRIP BÜYÜK OLANI AYARLAYIP LOCALSTORAGE A ATIYORUM
}
function yanlisTahmin(wrapper) {
    let yanlis = document.createElement('p');
    yanlis.textContent = 'Yanlış Tahmin Bir Daha Deneyin';
    yanlis.style.textTransform = 'uppercase';
    yanlis.style.alignSelf = 'center';
    yanlis.style.marginTop = '25px';
    yanlis.style.marginBottom = '-25px';
    yanlis.style.fontSize = '20px';
    yanlis.className = 'yanlisTahmin';
    wrapper.insertBefore(yanlis, wrapper.firstChild);

    setTimeout(function () {
        wrapper.firstChild.remove();
    }, 1000);
    // YANLIŞ TAHMİN UYARISINI ÜRETİP 1 SANIYE SONRA SİLİYORUM
}
// HIGHSCORE VE HIGHSCORE TABLOSUNU 0LIYORUM!
function fResetHScore() {
    localStorage.setItem('highScore', 0);
    highScore.textContent = 'HIGH SCORE: ' + localStorage.getItem('highScore');
}