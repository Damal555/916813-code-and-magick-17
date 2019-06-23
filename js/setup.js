'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var setupCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var setupName = setup.querySelector('.setup-user-name');


var i = 0;
var flag = false;

var onPopupEscPress = function (evt) {
  if (!flag && evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

setupName.addEventListener('focus', function () {
  flag = true;
});

setupName.addEventListener('blur', function () {
  flag = false;
});

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var amount = 4;
var wizards = [];

function getRandomValueInArr(parameter) {
  return parameter[Math.floor(Math.random() * parameter.length)];
}

function createRandomData() {

  for (i = 0; i < amount; i++) {
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
    fragment.appendChild(createDOMElements(i));
  }
  similarListElement.appendChild(fragment);
}
insertFragment();

setup.querySelector('.setup-similar').classList.remove('hidden');

i = 0;
var changeColor = function (arr) {
  i++;
  if (i === arr.length) {
    i = 0;
  }
  return arr[i];
};
function changingWizard() {
  setupCoat.addEventListener('click', function () {
    setupCoat.style.fill = changeColor(WIZARD_COATCOLOR);
  });
  setupEyes.addEventListener('click', function () {
    setupEyes.style.fill = changeColor(WIZARD_EYESCOLORS);
  });
  setupFireball.addEventListener('click', function () {
    changeColor(WIZARD_FIREBALL, setupFireball);
    setupFireball.style.background = changeColor(WIZARD_FIREBALL);
  });
}
changingWizard();
