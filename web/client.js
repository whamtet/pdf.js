const $ = x => document.querySelector(x);
const $$ = x => document.querySelectorAll(x);
const $id = x => document.getElementById(x);

htmx.config.defaultSwapStyle = 'outerHTML';

const hideModal = e => {
  if (e.target.id === 'modal') {
    $('#modal').classList.add('hidden');
  }
}

// clicking pdf elements
const onClick = e => {
  const span = e.target.parentElement;
  console.log('clicked', span);
  const values = {
    fragment: span.innerText.trim(),
    fragmentId: span.id,
    page: PDFViewerApplication.page,
    command: 'add'
  };

  htmx.ajax('POST', 'http://localhost:3000/pdf-viewer/inset', {values, target: '#inset'});
};

const pageLoad = () => {
  for (const span of $$('span[role=presentation]')) {
    span.onclick = onClick;
  }
}
