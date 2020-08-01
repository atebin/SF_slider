// слухебный массив с данными для работы слайдера
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
    current_num: null,
    max_num: 0,
};

(function initSlider() {

    let containerNav = document.querySelector('#avtid-nav-container');
    let containerDot = document.querySelector('#avtid-dot-container');
    
    // читаем массив элементов с данными по проектам и создаем для них элементы управления
    arrProjects.forEach((elem, num) => {
        let textMenu = `${elem.data.city}, ${elem.data.location_name}`;
        let newDiv = null;

        sliderData.max_num = num;
        
        // создание верхнего меню, сохранение ссылок на него, на проект по умолчанию (создание имен проектов)
        newDiv = document.createElement('div');
        newDiv.classList.add('avt-projects-navtop-item');
        newDiv.classList.add('avt-title');
        newDiv.id = 'avtid-nav-project_' + num;
        newDiv.innerHTML = textMenu;
        containerNav.appendChild(newDiv);
        if (elem.default == true) {
            sliderData.current_project = newDiv;
            sliderData.current_num = num;
        }

        // создание обработчиков на верхнее меню (обработчики на имена проектов)
        newDiv.addEventListener('click', eventClick_NavProject);
        sliderData.links_project_button['project_' + num] = newDiv;


        // создание нижнего меню, сохранение ссылок на него (создаение точек)
        newDiv = document.createElement('div');
        newDiv.classList.add('avt-projects-detail-bottomnav-block-item');
        newDiv.id = 'avtid-dot-project_' + num;
        containerDot.appendChild(newDiv);
        
         // создание обработчиков на нижнее меню (обработчики на точки)
        newDiv.addEventListener('click', eventClick_NavProject);
        sliderData.links_project_dot['project_' + num] = newDiv;
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
    
    // заполняем страницу данными по дефолтному проекту
    sliderData.current_project.click();
})();


///////////////////////////////////////////////////////////////////////////////////////
//      Обработчик клика по кнопке с проектами / на точке

function eventClick_NavProject(event) {
    let currButton = this;
    let idProject = currButton.id.split('-')[2];
    let currNumber = idProject.split('_')[1];

    sliderData.current_project = currButton;
    sliderData.current_num = currNumber;

    fillProjectData(idProject);
    activateAllButtons(idProject);
};


///////////////////////////////////////////////////////////////////////////////////////
//      Обработчики клика по стрелкам "вправо" / "влево"

function eventClick_ArrowL(event) {
    shiftProject(-1);
}

function eventClick_ArrowR(event) {
    shiftProject(1);
}
function shiftProject(argShift) {
    let currNumber = sliderData.current_num;
    currNumber = Number(currNumber) + argShift;
    if (currNumber < 0) {
        currNumber = sliderData.max_num;
    } else if (currNumber > sliderData.max_num) {
        currNumber = 0;
    }

    sliderData.links_project_button['project_' + currNumber].click();
}


///////////////////////////////////////////////////////////////////////////////////////
//      Заполнение страницы данными по выбранному проекту

function fillProjectData(argProject) {
    let currData = arrProjects[sliderData.current_num];
    let linkData = sliderData.links_data;

    for (elem in linkData) {
        linkData[elem].innerHTML = currData.data[elem];
    }

    let currFoto = currData.foto;
    let linkFoto = sliderData.links_foto;

    linkFoto.src = currFoto.path;
    linkFoto.alt = currFoto.alt;
}


///////////////////////////////////////////////////////////////////////////////////////
//      Активируем нужный пункт меню и нужную кнопку при клике на проект

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
}

function activateBlock(argProject, argArrControls, argClassActive) {

    for (elem in argArrControls) {
        argArrControls[elem].classList.remove(argClassActive);
    }

    console.log(argArrControls);
    argArrControls[argProject].classList.add(argClassActive);
}
