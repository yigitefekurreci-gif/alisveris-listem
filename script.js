// Service Worker kaydet
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker kayıtlı'))
        .catch((err) => console.log('Service Worker hatası:', err));
}

// Sayfa yüklendiğinde listeyi göster
document.addEventListener('DOMContentLoaded', loadList);

const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const shoppingList = document.getElementById('shoppingList');

// Ekle butonuna tıklandığında
addBtn.addEventListener('click', addItem);

// Enter tuşuna basıldığında
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

function addItem() {
    const itemText = itemInput.value.trim();
    
    if (itemText === '') {
        alert('Lütfen bir ürün yazın!');
        return;
    }
    
    // Listeye ekle
    const items = getItems();
    items.push(itemText);
    saveItems(items);
    
    // Input'u temizle
    itemInput.value = '';
    itemInput.focus();
    
    // Listeyi güncelle
    displayList();
}

function deleteItem(index) {
    const items = getItems();
    items.splice(index, 1);
    saveItems(items);
    displayList();
}

function displayList() {
    const items = getItems();
    shoppingList.innerHTML = '';
    
    if (items.length === 0) {
        shoppingList.innerHTML = '<div class="empty-message">Liste boş. Alınacak ürünleri ekleyin! 🛍️</div>';
        return;
    }
    
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'shopping-item';
        
        li.innerHTML = `
            <span class="item-text">${item}</span>
            <button class="delete-btn" onclick="deleteItem(${index})">Sil</button>
        `;
        
        shoppingList.appendChild(li);
    });
}

function getItems() {
    const items = localStorage.getItem('shoppingList');
    return items ? JSON.parse(items) : [];
}

function saveItems(items) {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

function loadList() {
    displayList();
}
