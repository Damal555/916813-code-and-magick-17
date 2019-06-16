'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var amount = 4;
var wizards = [];

function getRandomValueInArr(parameter) {
  return parameter[Math.floor(Math.random() * parameter.length)];
}

function createRandomData() {

  for (var i = 0; i < amount; i++) {
    var wizardName = getRandomValueInArr(WIZARD_NAMES);
    var wizardLastname = getRandomValueInArr(WIZARD_LASTNAMES);
    var wizardCoatColor = getRandomValueInArr(WIZARD_COATCOLOR);
    var wizardEyesColor = getRandomValueInArr(WIZARD_EYESCOLORS);

    var similarWizard = {
      name: wizardName + ' ' + wizardLastname,
      coat: wizardCoatColor,
      eyes: wizardEyesColor
    };
    wizards[i] = similarWizard;
  }
  return wizards;
}
wizards = createRandomData();
function createDOMElements(i) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyes;
  return wizardElement;
}

function insertFragment() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < amount; i++) {
    fragment.appendChild(createDOMElements(i));
  }
  similarListElement.appendChild(fragment);
}
insertFragment();

userDialog.querySelector('.setup-similar').classList.remove('hidden');
