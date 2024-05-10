const $ = x => document.querySelector(x);
const $$ = x => document.querySelectorAll(x);

htmx.config.defaultSwapStyle = 'outerHTML';

const hideModal = e => {
  if (e.target.id === 'modal') {
    $('#modal').classList.add('hidden');
  }
}

const server = location.host.startsWith('localhost') ? 'http://localhost:3000' : 'https://app.simplifydd.com';

// clicking pdf elements
const onClickText = async e => {
  const span = e.target.parentElement;
  console.log('clicked', span);

  const params = new URLSearchParams(location.search);
  const values = {
    fragment: span.innerText.trim(),
    fragmentId: span.id,
    page: PDFViewerApplication.page,
    offset: params.get('offset'),
    file_id: params.get('file_id'),
  };

  const url = `${server}/api/question/${params.get('question_id')}/reference`;
  const response = await fetch (url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
  if (response.status === 200) {
    if (opener) {
      opener.postMessage('refresh');
    }
    window.close();
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
      PDFViewerApplication.page = Number(params.get('page'));
    }
    // htmx.trigger('#inset', 'click');
  }
  for (const span of $$('span[role=presentation]')) {
    span.onclick = onClickText;
  }
}

const updateAttribute = (el, k, f) => el.setAttribute(k, f(el.getAttribute(k)));

updateAttribute($('#inset'), 'hx-get', x => {
  if (location.host.startsWith('localhost')) {
    return x;
  } else {
    // index.html contains dev values
    return x.replace('http://localhost:3000', 'https://app.simplifydd.com');
  }
});


