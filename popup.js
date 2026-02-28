const input = document.getElementById('phraseInput');
const btn = document.getElementById('saveBtn');

chrome.storage.local.get(['greetings'], (res) => {
  if (res.greetings) input.value = res.greetings.join(', ');
});

btn.onclick = () => {
  const phrases = input.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
  chrome.storage.local.set({ greetings: phrases }, () => {
    btn.innerText = 'Saved! Now refresh Twitch';
    setTimeout(() => { btn.innerText = 'Save'; }, 2000);
  });
};