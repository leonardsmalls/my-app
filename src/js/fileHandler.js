const getDBFileAddToLocal = (fileName) => {
    window.api.getFile(fileName);

    window.api.onFileResponse((data, fileName) => {
        const dataArr = data.split('}');
        const newDataArr = [];
        const projectObjCollection = {};
        
        dataArr.forEach((item, index) => {
            if (index !== dataArr.length - 1) {
                item = item + '}';
                newDataArr.push(JSON.parse(item));
            }            
        });

        projectObjCollection[fileName] = newDataArr;

        window.sessionStorage.setItem(fileName, JSON.stringify(projectObjCollection));
    });
}

const watchDBFile = (fileName) => {
    window.api.watchFile(fileName);

    window.api.onFileChange((path) => {
        const fileName = path.split('.')[0];
        getDBFileAddToLocal(fileName);
        console.log('file changed', path, fileName);
    });
}

const populatePageWithLocalStorage = (dataName) => {
    console.log('populatePageWithLocalStorage', dataName);
    const localData = window.sessionStorage;
    const localDataKeys = Object.keys(localData);
    const cardList = document.createElement('div');
    const cardListId = 'cardList';
    cardList.setAttribute('id', cardListId);

    localDataKeys.forEach((key) => {
        if (key === dataName) {
            const data = JSON.parse(localData.getItem(key));
            const dataProjects = Object.values(data);

            dataProjects.forEach((item) => {
                const projects = Object.values(item);

                projects.forEach((project) => {
                    const card = document.createElement('div');
                    const cardClass = 'project-card';
                    card.setAttribute('class', cardClass);

                    for (let projectSpec in project) {
                        const cardSpec = `
                                <div class="project-card-spec">
                                    ${projectSpec}: ${project[projectSpec]}
                                </div>
                        `;
                        card.innerHTML += cardSpec;
                    }
                    cardList.appendChild(card);
                });
            });
        }
    });

    return cardList;
}

export { getDBFileAddToLocal, watchDBFile, populatePageWithLocalStorage }