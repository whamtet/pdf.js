const $ = x => document.querySelector(x);
const $$ = x => document.querySelectorAll(x);
const $id = x => document.getElementById(x);

const loadInfo = async () => {
  const [_, question_id] = location.href.split('=');
  const response = await fetch(`http://localhost:3000/api/question/${question_id}`);

  const {question} = await response.json();
  $id('question-title').innerHTML = question;
}
loadInfo();

const onClick = e => {
  const span = e.target;
  console.log('span', span);
};

const pageLoad = () => {
  for (const span of $$('span[role=presentation]')) {
    span.onclick = onClick;
  }
}
