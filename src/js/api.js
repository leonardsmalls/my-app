const getDBFile = (fileName) => {
    const data = window.api.getFile(fileName);

    window.api.onFileResponse((data) => {
        return data;
    });
}

const writeToFile = (data, fileName) => {
    window.api.writeToFile(data, fileName);
}

export { getDBFile, writeToFile }