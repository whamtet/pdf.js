const getPage = el => el.classList.contains('page') ? el : getPage(el.parentElement);

const getY = el => {

    const innerBbox = el.getBoundingClientRect();
    const outerBbox = getPage(el).getBoundingClientRect();

    return (innerBbox.y - outerBbox.y) / outerBbox.height;

};