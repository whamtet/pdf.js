const $ = x => document.querySelector(x);
const $$ = x => document.querySelectorAll(x);

htmx.config.defaultSwapStyle = 'outerHTML';

const hideModal = e => {
  if (e.target.id === 'modal') {
    $('#modal').classList.add('hidden');
  }
}

const server = location.host.startsWith('localhost') ? 'http://localhost:2998' : 'https://doc-index.simpleui.io';

// clicking pdf elements
const onClickPresentationSpan = async e => {
  const span = e.target.parentElement;
  console.log('clicked', span);

  const params = new URLSearchParams(location.search);
  const values = {
    fragment: span.innerText.trim(),
    page: PDFViewerApplication.page - 1,
    offset: Number(params.get('offset')) || window.migration_offset,
    file_id: Number(params.get('file_id'))
  };
  
  if ($('#values')) {
    $('#values').value = JSON.stringify(values);
    htmx.trigger('#values-form', 'submit');
  }
  
};

const find = text => {
  const {findBar} = PDFViewerApplication;
  findBar.open();
  $('#findInput').value = text;
  findBar.dispatchEvent('again');
}

let virgin = true;
const pageLoad = () => {
  if (virgin) {
    virgin = false;
    const params = new URLSearchParams(location.search);
    if (params.has('q')) {
      find(params.get('q'));
    } else if (params.has('page')) {
      PDFViewerApplication.page = Number(params.get('page')) + 1;
    }
    $('#inset').click();
  }
  for (const span of $$('span[role=presentation]')) {
    span.onclick = onClickPresentationSpan;
  }
}

const updateAttribute = (el, k, f) => el.setAttribute(k, f(el.getAttribute(k)));

updateAttribute($('#inset'), 'hx-get', x => {
  if (location.host.startsWith('localhost')) {
    return x;
  } else {
    // index.html contains dev values
    return x.replace('http://localhost:2998', 'https://doc-index.simpleui.io');
  }
});
