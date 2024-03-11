async function ImageSplitter(a: string, dimension: number) {
    // console.log("Image splitter started.");

    var images:string[] = [];
    await new Promise<void>((resolve) => {
        let loadedImages = 0;
    for (let i = 0; i < dimension * dimension; i++){
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        
        img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;

            const size = Math.min(width, height);
            const xOffset = (width - size) / 2;
            const yOffset = (height - size) / 2;
            canvas.height = size/dimension;
            canvas.width = size/dimension;
            ctx!.drawImage(
                img,
                xOffset + ((i % dimension) * size) / dimension,
                yOffset + (Math.floor(i / dimension) * size) / dimension,
                size / dimension,
                size / dimension,
                0,
                0,
                size / dimension,
                size / dimension
              );
            const dataurl = canvas.toDataURL();
            images[i] = dataurl;
            loadedImages++;
            if (loadedImages === dimension * dimension) {
                resolve();
            }
        };
        img.src = a;
    }});
    // console.log("Image splitter completed.")
    return images;
}

export default ImageSplitter;