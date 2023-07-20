async function ImageSplitter(a: string) {
    console.log("Image splitter started.");

    const n = 3;
    var images:string[] = [];
    await new Promise<void>((resolve) => {
        let loadedImages = 0;
    for (let i = 0; i < 9; i++){
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        
        img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            canvas.height = height/n;
            canvas.width = width/n;
            ctx!.drawImage(img, (i%n) * width/n , (Math.floor(i/n)) * height/n, height/n, width/n, 0, 0, height/n, width/n);
            const dataurl = canvas.toDataURL();
            images[i] = dataurl;
            loadedImages++;
            if (loadedImages === 9) {
                resolve();
            }
        };
        img.src = a;
    }});
    console.log("Image splitter completed.")
    return images;
}

export default ImageSplitter;