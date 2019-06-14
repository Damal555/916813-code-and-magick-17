'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var wizards = [];
var amount = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

function createRandomData() {
  var wizardName = WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)];
  var wizardLastname = WIZARD_LASTNAMES[Math.floor(Math.random() * WIZARD_LASTNAMES.length)];
  var wizardCoatColor = WIZARD_COATCOLOR[Math.floor(Math.random() * WIZARD_COATCOLOR.length)];
  var wizardEyesColor = WIZARD_EYESCOLORS[Math.floor(Math.random() * WIZARD_EYESCOLORS.length)];

  return {
    name: wizardName + ' ' + wizardLastname,
    coat: wizardCoatColor,
    eyes: wizardEyesColor
  };
}

for (var i = 0; i < amount; i++) {
  var similarWizard = createRandomData();
  wizards[i] = similarWizard;
}


function createDOMElements() {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyes;
  return wizardElement;
}

function insertFragment() {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < amount; i++) {
    fragment.appendChild(createDOMElements());
  }
  similarListElement.appendChild(fragment);
}
insertFragment();

userDialog.querySelector('.setup-similar').classList.remove('hidden');
