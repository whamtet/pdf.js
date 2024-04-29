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
  const span = e.target;
  console.log('span', span);
};

const pageLoad = () => {
  for (const span of $$('span[role=presentation]')) {
    span.onclick = onClick;
  }
}
