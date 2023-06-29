const $ = (selector) => document.querySelector(selector);
document.getElementById('inputText').addEventListener('input', function() {
  document.getElementById('infoMessage').style.display = this.value ? 'none' : 'block';
});

const { inputText, outputText, encrypt, decrypt } = {
  inputText: $('#inputText'),
  outputText: $('#outputText'),
  encrypt: (text) => {
    if (!/^[a-z\s]+$/.test(text)) {
      return '';
    }
    return text.replace(/[eioua]/g, (char) => ({
      e: 'enter',
      i: 'imes',
      a: 'ai',
      o: 'ober',
      u: 'ufat',
    })[char]);
  },
  decrypt: (text) => {
    const decryptedText = text.replace(/enter|imes|ai|ober|ufat/g, (match) => ({
      enter: 'e',
      imes: 'i',
      ai: 'a',
      ober: 'o',
      ufat: 'u',
    })[match]);
    if (!/^[a-z\s]+$/.test(decryptedText)) {
      return '';
    }
    return decryptedText;
  },
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
      .then(() => alert('Texto copiado al portapapeles'))
      .catch((err) => alert(`No se pudo copiar el texto: ${err}`));
};

const clearInputOutput = () => {
  inputText.value = '';
  outputText.value = '';
};

const btnEncriptar = () => {
  outputText.value = encrypt(inputText.value);
};

const btnDesencriptar = () => {
  const input = inputText.value.trim();
  if (input !== '') {
    const decryptedText = decrypt(input);
    if (decryptedText !== '') {
      outputText.value = decryptedText;
    } else {
      outputText.value = '';
      alert('Texto no válido para desencriptar');
    }
  } else {
    outputText.value = '';
  }
};

const btnCopiar = () => {
  const text = outputText.value;
  if (text !== '') {
    copyToClipboard(text);
  }
};

const btnLimpiar = () => {
  clearInputOutput();
};

clearInputOutput();