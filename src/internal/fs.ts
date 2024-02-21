export const saveToFile = (data: BlobPart, filename: string, type: string) => {
  const file = new Blob([data], { type: type });
  const anchorElement = document.createElement("a");
  const url = URL.createObjectURL(file);

  anchorElement.href = url;
  anchorElement.download = filename;
  document.body.appendChild(anchorElement);
  anchorElement.click();

  setTimeout(() => {
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(url);
  }, 0);
};
