const lista = document.querySelector('#lista')
const btnSalvarItem = document.querySelector('#btnSalvarItem')
const campoTextoItem = document.querySelector('#item')

let listaItens = JSON.parse(localStorage.getItem('lista-itens')) || []

const adicionarItem = () => {
  if(campoTextoItem.value) {
    var item = {}
    item.value = campoTextoItem.value
    item.status = 'pending'
    listaItens.push(item)
    window.localStorage.setItem('lista-itens', JSON.stringify(listaItens))
  }
}

const checkItem = (el) => {                  
  let listItem = el.parentElement
  let index = listItem.getAttribute('data-index')
  let status = listItem.getAttribute('data-status')

  if(status === 'pending'){
    listaItens[index].status = 'checked'
  }else{
    listaItens[index].status = 'pending'
  }
  window.localStorage.setItem('lista-itens', JSON.stringify(listaItens))    
  listarItens()
}

const removeItem = (el) => {            
  let listItem = el.parentElement
  let index = listItem.getAttribute('data-index')
  listaItens.splice(index,1)      
  window.localStorage.setItem('lista-itens', JSON.stringify(listaItens))    
  listarItens()      
}

const listarItens = () => {
  lista.innerHTML = ''      
  listaItens.forEach((element, index) => {        
    lista.innerHTML += `<li data-index="${index}" data-value="${element.value}" data-status="${element.status}">
      <span class="list-text">${element.value}</span>
      <span class="list-check-icon" onclick="checkItem(this)"></span>
      <span class="list-remove-icon" onclick="removeItem(this)"></span>
    </li>`
  })
}

btnSalvarItem.addEventListener('click', (e) => {
  e.preventDefault()
  adicionarItem()
  listarItens()
  campoTextoItem.value = ''
})

listarItens()
