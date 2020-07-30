let sliderData = {
    links_project_button: {},
    links_project_dot: {},
    links_data: {
            city: null,
            location_prefix: null,
            location_name: null,
            area: null,
            time: null,
            cost: null,
    },
    links_foto: null,
    current_project: null,
};

(function initSlider() {

    // ставим обработчики кликов по названию проектов, а также сохраняем ссылки на кнопки проектов
    let arrNavProject = [...document.querySelectorAll('.avt-projects-navtop-item__text')];
    arrNavProject.forEach((elem) => {
        elem.addEventListener('click', eventClick_NavProject);
        let idButton = elem.id.split('-')[2];
        sliderData.links_project_button[idButton] = elem;
    });

    // ставим обработчики кликов по нижним точкам, а также сохраняем ссылки на точки
    let arrDotProject = [...document.querySelectorAll('.avt-projects-detail-bottomnav-block-item')];
    arrDotProject.forEach((elem) => {
        elem.addEventListener('click', eventClick_NavProject);
        let idButton = elem.id.split('-')[2];
        sliderData.links_project_dot[idButton] = elem;
    });

    // ставим обработчики на стрелки
    document.querySelector('.avt-projects-detail-bottomnav-before').addEventListener('click', eventClick_ArrowL);
    document.querySelector('.avt-projects-detail-bottomnav-after').addEventListener('click', eventClick_ArrowR);

    // находим ссылки на элементы интерфейса, в которых будем менять данные и сохраняем их объекте
    let  linkData = sliderData.links_data;
    for (elem in linkData) {
        linkData[elem] = document.querySelector('#avtid-project-' + elem);
    };
    sliderData.links_foto = document.querySelector('#avtid-project-foto');

    // обрабатываем данные о проектах
    let firstProject = null;
    for(elem in sourceProjects){
        if (firstProject === null) {
            firstProject = elem;
        }
    };
    
    // заполняем страницу данными по первому проекту
    sliderData.links_project_button[firstProject].click();

    console.log(sliderData);
})();

function eventClick_NavProject(event) {
    let currButton = this;
    let idButton = currButton.id.split('-')[2];

    fillProjectData(idButton);
    activateAllButtons(idButton);

    sliderData.current_project = idButton;
};

function eventClick_ArrowL(event) {
    shiftProject(-1);
}

function eventClick_ArrowR(event) {
    shiftProject(1);
}
function shiftProject(argShift) {
    let currNumber = sliderData.current_project.substr(7);
    currNumber = Number(currNumber) + argShift;
    if (currNumber <= 0) {
        currNumber = 3;
    } else if (currNumber > 3) {
        currNumber = 1;
    }

    sliderData.links_project_button['project' + currNumber].click();
}

function fillProjectData(argProject) {
    let currData = sourceProjects[argProject].data;
    let linkData = sliderData.links_data;

    for (elem in linkData) {
        linkData[elem].innerHTML = currData[elem];
    }

    let currFoto = sourceProjects[argProject].foto;
    let linkFoto = sliderData.links_foto;

    linkFoto.src = currFoto.path;
    linkFoto.alt = currFoto.alt;
}

function activateAllButtons(argProject) {

    let linkMenu = null;
    let nameClassActive = '';
    
    // активируем верхнее меню (имена проектов)
    linkMenu = sliderData.links_project_button;
    nameClassActive = 'avt-projects-navtop-item__text--active';
    activateBlock(argProject, linkMenu, nameClassActive);

    // активируем нижнее меню (точки)
    linkMenu = sliderData.links_project_dot;
    nameClassActive = 'avt-projects-detail-bottomnav-block-item--active';
    activateBlock(argProject, linkMenu, nameClassActive);
    

    /*
    let allProjectButton = sliderData.links_project_button;
    let currProjectButton = sliderData.links_project_button[argProject];

    for (elem in allProjectButton) {
        allProjectButton[elem].classList.remove('avt-projects-navtop-item__text--active');
    }

    currProjectButton.classList.add('avt-projects-navtop-item__text--active');
    */
}

function activateBlock(argProject, argArrControls, argClassActive) {

    for (elem in argArrControls) {
        argArrControls[elem].classList.remove(argClassActive);
    }

    argArrControls[argProject].classList.add(argClassActive);
}
