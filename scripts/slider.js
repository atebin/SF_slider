let sliderData = {
    links_project_button: {},
    links_data: {
            city: null,
            location_prefix: null,
            location_name: null,
            area: null,
            time: null,
            cost: null,
    },
    links_foto: null,
    projects: {
        project1: {
            data: {
                city: 'Rostov-on-Don',
                location_prefix: 'LCD',
                location_name: 'Admiral',
                area: '81 m2',
                time: '3.5 months',
                cost: 'Upon request',
            },
            foto: {
                path: './images/projects_photo_1.png',
                alt: 'Completed projects. ',
            },
        },      
        project2: {
            data: {
                city: 'Sochi',
                location_prefix: '',
                location_name: 'Thieves',
                area: '105 m2',
                time: '4 months',
                cost: 'Upon request',
            },
            foto: {
                path: './images/projects_photo_2.png',
                alt: 'Completed projects. ',
            },
        },
        project3: {
            data: {
                city: 'Rostov-on-Don',
                location_prefix: '',
                location_name: 'Patriotic',
                area: '93 m2',
                time: '3 months',
                cost: 'Upon request',
            },
            foto: {
                path: './images/projects_photo_3.png',
                alt: 'Completed projects. ',
            },
        },
    },
};

(function initSlider() {

    // ставим обработчики кликов по названию проектов, а также сохраняем ссылки на кнопки проектов
    let arrNavProject = [...document.querySelectorAll('.avt-projects-navtop-item__text')];
    arrNavProject.forEach((elem) => {
        elem.addEventListener('click', eventClick_NavProject);
        let idButton = elem.id.split('-')[2];
        sliderData.links_project_button[idButton] = elem;
    });

    // находим ссылки на элементы интерфейса, в которых будем менять данные и сохраняем их
    let  linkData = sliderData.links_data;
    for (elem in linkData) {
        linkData[elem] = document.querySelector('#avtid-project-' + elem);
    };

    sliderData.links_foto = document.querySelector('#avtid-project-foto');

    // находим ссылки на кнопки с названиями проекта и сохраняем ссылки на них

    console.log(sliderData);

    console.log(sliderData.links_project_button[0]);
})();

function eventClick_NavProject(event) {
    let currButton = this;
    let idButton = currButton.id.split('-')[2];

    let allProjectButton = 

    fillProject(idButton);
};

function fillProject(argProject) {
    let currData = sliderData.projects[argProject].data;
    let linkData = sliderData.links_data;

    for (elem in linkData) {
        console.log(currData[elem]);
        linkData[elem].innerHTML = currData[elem];
    }

    let currFoto = sliderData.projects[argProject].foto;
    let linkFoto = sliderData.links_foto;

    linkFoto.src = currFoto.path;
    linkFoto.alt = currFoto.alt;
    
}
