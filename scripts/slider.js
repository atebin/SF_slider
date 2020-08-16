import { arrProjects } from './projects.js';

// служебный массив с данными для работы слайдера
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
    links_foto: {
        foto_big: null,
        foto_sm: null,
    },
    current_num: null,
    max_num: 0,
};

(function initSlider() {

    // создаем и настраиваем слайдер
    initSlider_CreateNavigationBlocs();
    initSlider_EventHandlerClickArrows();
    initSlider_SaveLinkToElementDOM();
    
    // заполняем страницу данными по дефолтному проекту
    changeDataInDOM();

})();

function initSlider_CreateNavigationBlocs() {
    
    // контейнеры для верхнего и нижнего блока упроавления слайдером
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
        newDiv.id = 'avtid-nav-' + num;
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
        newDiv.id = 'avtid-dot-' + num;
        containerDot.appendChild(newDiv);
        
         // создание обработчиков на нижнее меню (обработчики на точки)
        newDiv.addEventListener('click', eventClick_NavProject);
        sliderData.links_project_dot['project_' + num] = newDiv;
    });
}

function initSlider_EventHandlerClickArrows(){
    
    document.querySelector('.avt-projects-detail-bottomnav-before').addEventListener('click', eventClick_ArrowL);
    document.querySelector('.avt-projects-detail-bottomnav-after').addEventListener('click', eventClick_ArrowR);
    document.querySelector('.avt-project-slider-before').addEventListener('click', eventClick_ArrowL);
    document.querySelector('.avt-project-slider-after').addEventListener('click', eventClick_ArrowR);
}

function initSlider_SaveLinkToElementDOM(){

    let  linkData = sliderData.links_data;
    for (let elem in linkData) {
        linkData[elem] = document.querySelector('#avtid-project-' + elem);
    };
    let  linkFoto = sliderData.links_foto;
    for (let elem in linkFoto) {
        linkFoto[elem] = document.querySelector('#avtid-project-' + elem);
    };
}

///////////////////////////////////////////////////////////////////////////////////////
//      Обработчик клика по кнопке с проектами / на точке

function eventClick_NavProject(event) {
    let currButton = event.target;
    let currNumber = currButton.id.split('-')[2];

    sliderData.current_num = currNumber;
    changeDataInDOM();
};


///////////////////////////////////////////////////////////////////////////////////////
//      Обработчики клика по стрелкам "вправо" / "влево"

function eventClick_ArrowL() {
    shiftProject(-1);
}

function eventClick_ArrowR() {
    shiftProject(1);
}
function shiftProject(argShift) {
    if (!checkCurrentNum()) {
        return;
    }

    let currNumber = sliderData.current_num;

    currNumber = Number(currNumber) + argShift;
    if (currNumber < 0) {
        currNumber = sliderData.max_num;
    } else if (currNumber > sliderData.max_num) {
        currNumber = 0;
    }

    sliderData.current_num = currNumber;
    changeDataInDOM();
}

///////////////////////////////////////////////////////////////////////////////////////
//      Функция проверки установленного текущего значения

function checkCurrentNum() {
    if (sliderData.current_num === null) {
        console.log('Ошибка: Номер текущего проекта не установлен. Данные не могут быть показаны на странице!');
        console.log('Проверьте заполнение массива и назначение проекта, открываемого по умолчанию.\n');
        console.log(sliderData);
    } else {
        return true;
    }

    if (arrProjects.length == 0) {
        console.log('Ошибка: Массив с данными по проектам пуст!');
    }
    console.log('Массив данных по проектам');
    console.log(arrProjects);

    return false;
}

///////////////////////////////////////////////////////////////////////////////////////
//      Функция изменения данных для заданного в глобальном объекте актуального номера проекта

function changeDataInDOM() {
    try {
        if (!checkCurrentNum()) {
            return;
        }

        fillProjectData();
        activateAllButtons();
    } catch (err) {
        console.log(err);
    }
}


///////////////////////////////////////////////////////////////////////////////////////
//      Заполнение страницы данными по выбранному проекту

function fillProjectData() {
    let currData = arrProjects[sliderData.current_num];
    let linkData = sliderData.links_data;
    
    for (let elem in linkData) {
        linkData[elem].innerHTML = currData.data[elem];
    }

    let currFoto = currData.foto;
    let linkFoto = sliderData.links_foto;

    for (let elem in linkFoto) {
        linkFoto[elem].src = currFoto[elem];
    }
}


///////////////////////////////////////////////////////////////////////////////////////
//      Активируем нужный пункт меню и нужную кнопку при клике на проект

function activateAllButtons() {
    let linkMenu = null;
    let nameClassActive = '';
    
    // активируем верхнее меню (имена проектов)
    linkMenu = sliderData.links_project_button;
    nameClassActive = 'avt-projects-navtop-item__text--active';
    activateBlock(linkMenu, nameClassActive);

    // активируем нижнее меню (точки)
    linkMenu = sliderData.links_project_dot;
    nameClassActive = 'avt-projects-detail-bottomnav-block-item--active';
    activateBlock(linkMenu, nameClassActive);
}

function activateBlock(argArrControls, argClassActive) {
    let currNum = sliderData.current_num;
    let currElement = 'project_' + currNum;

    for (let elem in argArrControls) {
        argArrControls[elem].classList.remove(argClassActive);
    }

    argArrControls[currElement].classList.add(argClassActive);
}
