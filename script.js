let kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

function kitaplariKaydet() {
    localStorage.setItem("kitaplar", JSON.stringify(kitaplar));
}

function kitaplariGoster() {

    let liste = document.getElementById("kitapListesi");
    liste.innerHTML = "";

    kitaplar.forEach(function(kitap, index) {

        let yeniKitap = document.createElement("li");

        let kitapAdi = document.createElement("strong");
        kitapAdi.textContent = kitap.ad + " - " + kitap.yazar;

        let durum = document.createElement("span");
        durum.className = "durum";
        durum.textContent = kitap.okundu ? "Okundu" : "Okunmadı";

        let durumButonu = document.createElement("button");

        durumButonu.textContent = kitap.okundu
            ? "Okunmadı olarak işaretle"
            : "Okundu olarak işaretle";

        durumButonu.onclick = function() {
            kitaplar[index].okundu = !kitaplar[index].okundu;
            kitaplariKaydet();
            kitaplariGoster();
        };

        let silButonu = document.createElement("button");
        silButonu.textContent = "Sil";
let duzenleButonu = document.createElement("button");
duzenleButonu.textContent = "Düzenle";

duzenleButonu.onclick = function() {

    let yeniAd = prompt("Yeni kitap adını gir:");

    if (yeniAd === null || yeniAd.trim() === "") {
        return;
    }

    let yeniYazar = prompt("Yeni yazar adını gir:");

    if (yeniYazar === null || yeniYazar.trim() === "") {
        return;
    }

    kitaplar[index].ad = yeniAd.trim();
    kitaplar[index].yazar = yeniYazar.trim();

    kitaplariKaydet();
    kitaplariGoster();
};
        silButonu.onclick = function() {
            kitaplar.splice(index, 1);
            kitaplariKaydet();
            kitaplariGoster();
        };

        yeniKitap.append(kitapAdi, durum, durumButonu,duzenleButonu,silButonu);
        liste.appendChild(yeniKitap);

    });

    istatistikGuncelle();
}

function kitapEkle() {

    let kitapAdi = document.getElementById("kitapAdi").value.trim();
    let yazar = document.getElementById("yazar").value.trim();

    if (kitapAdi === "" || yazar === "") {
        alert("Lütfen kitap adı ve yazar giriniz!");
        return;
    }

    kitaplar.push({
        ad: kitapAdi,
        yazar: yazar,
        okundu: false
    });

    kitaplariKaydet();

    document.getElementById("kitapAdi").value = "";
    document.getElementById("yazar").value = "";

    kitaplariGoster();
}

function istatistikGuncelle() {

    let toplam = kitaplar.length;
    let okunan = kitaplar.filter(kitap => kitap.okundu).length;

    document.getElementById("toplamKitap").textContent = toplam;
    document.getElementById("okunanKitap").textContent = okunan;
    document.getElementById("okunmayanKitap").textContent = toplam - okunan;
}

kitaplariGoster();
// GOOGLE İLE GİRİŞ
async function googleIleGirisYap() {
    const { error } = await db.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin + window.location.pathname
        }
    });

    if (error) {
        alert("Giriş hatası: " + error.message);
    }
}

// HESAPTAN ÇIKIŞ
async function cikisYap() {
    const { error } = await db.auth.signOut();

    if (error) {
        alert("Çıkış hatası: " + error.message);
    } else {
        alert("Hesaptan çıkış yapıldı.");
    }
}
