const showModal = () => $('#modal').classList.remove('hidden');
const hideModal = e => {
  if (e.target.id === 'modal') {
    $('#modal').classList.add('hidden');
  }
}
