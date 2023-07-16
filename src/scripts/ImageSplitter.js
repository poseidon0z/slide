function loadCanvas() {
    console.log("Image splitter started.");

    const n = 3;

    for (let i = 0; i < 9; i++){
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        
        img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            canvas.height = height/n;
            canvas.width = width/n;
            ctx.drawImage(img, (i%n) * width/n , (Math.floor(i/n)) * height/n, height/n, width/n, 0, 0, height/n, width/n);
            const dataurl = canvas.toDataURL();
            sessionStorage.setItem("img" + i, dataurl);
        };
        img.src = "src/assets/square.avif";
    }
    console.log("Image splitter completed.")
}
loadCanvas();