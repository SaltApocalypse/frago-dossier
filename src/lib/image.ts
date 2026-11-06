/**
 * 图片上传工具：读取 + 降采样为 dataURL。
 *
 * 名片数据会整体写入 localStorage（约 5MB 配额），直接存原图容易超限；
 * 这里把头像限制在 512px、背景限制在 1600px，并优先编码为 WebP。
 */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("无法读取图片"));
    image.src = src;
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("读取图片失败"));
    };
    reader.onerror = () => reject(new Error("读取图片失败"));
    reader.readAsDataURL(blob);
  });
}

export async function fileToDataUrl(file: File, maxSize: number) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(objectUrl);
    const longest = Math.max(image.naturalWidth, image.naturalHeight);
    const scale = Math.min(1, maxSize / longest);

    // 小图且体积不大时保留原始编码
    if (scale >= 1 && file.size <= 400_000) {
      return await blobToDataUrl(file);
    }

    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) return await blobToDataUrl(file);

    context.drawImage(image, 0, 0, width, height);

    try {
      return canvas.toDataURL("image/webp", 0.9);
    } catch {
      return canvas.toDataURL("image/png");
    }
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
