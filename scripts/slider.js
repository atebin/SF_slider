let sliderData = {
    links_nav: {
        project1: null,        
        project2: null,
        project3: null,
    },
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
 
    // ставим обработчики кликов по названию проектов
    let arrNavProject = [...document.querySelectorAll('.avt-projects-navtop-item__text')];
    arrNavProject.forEach((elem) => {
        elem.addEventListener('click', eventClick_NavProject);
    });

    // сохраняем ссылки на элементы, в которых будут меняться данные о проектах при смене слайда
    let  linkData = sliderData.links_data;
    for (elem in linkData) {
        linkData[elem] = document.querySelector('#avtid-project-' + elem);
    };

    let  linkFoto = sliderData.links_foto;
    linkFoto = document.querySelector('#avtid-project-foto');

    console.log(sliderData);
})();

function eventClick_NavProject(event) {
    let currButton = this;
    let idButton = currButton.id.split('-')[2];

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
    let linkFoto = document.querySelector('#avtid-project-foto');//sliderData.links_foto;

    console.log(linkFoto);
    
    linkFoto.src = currFoto.path;
    linkFoto.alt = currFoto.alt;
    
}
