fetch('https://app-uniesp-p2-43622fe4ead4.herokuapp.com/mensagens')
  .then(resp => resp.json())
  .then(result => {
    const tbl = document.getElementById('myTable');
    result.forEach(itm => {
      const r = document.createElement('tr');
      const nCell = document.createElement('td');
      nCell.textContent = itm.nome;
      const eCell = document.createElement('td');
      eCell.textContent = itm.email;
      const mCell = document.createElement('td');
      mCell.textContent = itm.mensagem;
      r.appendChild(nCell);
      r.appendChild(eCell);
      r.appendChild(mCell);
      tbl.appendChild(r);
    });
  })
  .catch(err => console.error('Erro:', err));

document.getElementById('loginForm').addEventListener('submit', function(evt) {
  evt.preventDefault();
  checkCredentials();
});

function checkCredentials() {
  const mail = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  
  if (mail === 'administrador@administrador.com' && pass == '1234@') {
    window.location.href = 'adm.html';
  } else {
    document.getElementById('errorMessage').textContent = 'Email ou senha incorretos.';
  }
}

document.getElementById('messageForm').addEventListener('submit', function(evt) {
  evt.preventDefault();
  sendMessage();
});

function sendMessage() {
  const nm = document.getElementById('name').value;
  const em = document.getElementById('email').value;
  const msg = document.getElementById('message').value;
  
  fetch('https://app-uniesp-p2-43622fe4ead4.herokuapp.com/mensagens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: nm, email: em, message: msg })
  })
  .then(resp => resp.json())
  .then(result => {
    if (result.success) {
      document.getElementById('messageResponse').textContent = 'Mensagem enviada com sucesso.';
    } else {
      document.getElementById('messageResponse').textContent = 'Erro ao enviar a mensagem.';
    }
  })
  .catch(error => {
    document.getElementById('messageResponse').textContent = 'Erro ao enviar a mensagem: ' + error;
  });
}
