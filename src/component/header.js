import { APP_NAME } from '../constant/cons.js';
import { $ } from '../utils/selector.js';
import createNewRestaurantModal from '../web/modal/addRestaurantModal.js';
import modal from './modal.js';

function createHeader({ className, left, right, restaurantManager }) {
  const header = document.createElement('header');
  header.className = className;

  const leftElement = item[left]();
  const rightElement = item[right](restaurantManager);

  header.append(leftElement, rightElement);
  return header;
}

// REFACTOR: 앱 이름 상수로 분리
const item = {
  logo() {
    const h1 = document.createElement('h1');
    h1.className = 'gnb__title text-title';
    h1.textContent = APP_NAME;
    return h1;
  },

  add(restaurantManager) {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'gnb__button';
    button.setAttribute('aria-label', '음식점 추가');

    const img = document.createElement('img');

    img.src = './add-button.png';
    img.alt = '음식점 추가';

    button.appendChild(img);
    eventHandler.add(button, restaurantManager);

    return button;
  },
};

const eventHandler = {
  add(element, restaurantManager) {
    element.addEventListener('click', () => {
      const newRestaurantModalElement =
        createNewRestaurantModal(restaurantManager);
      const newRestaurantModal = modal.create(
        'modal--open',
        newRestaurantModalElement
      );
      document.body.append(newRestaurantModal);
    });
  },
};

export default createHeader;
