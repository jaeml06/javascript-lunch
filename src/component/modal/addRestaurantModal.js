import { createDropDown } from '../dropDown';
import createInput from '../input';
import createlabelWrapper from '../labelWrapper';
import createTextArea from '../textArea';
import modal from '../modal';
import createButton from '../button';
import { appController } from '../../web/AppControl';
import toast from '../toast/toast';
import { formIds } from '../../constant/appString';
import { KOREAN_CATEGORY, WALKING_TIME } from '../../constant/select';


function createNewRestaurantModal(addrestaurantCallback) {
  const container = render();
  const form = container.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRestaurant = formIds.reduce((restaurant, id) => {
      restaurant[id] = form.querySelector(`#${id}`).value;
      return restaurant;
    }, {});

    try {
      addrestaurantCallback(newRestaurant);
    } catch (e) {
      toast(e.message);
    }

  });
  return container;
}

function render() {
  const container = modal.createContainer();

  const modalTitle = document.createElement('h2');
  modalTitle.className = 'modal-title text-title';
  modalTitle.textContent = '새로운 음식점';

  const form = document.createElement('form');

  const categorySelect = createDropDown({
    id: 'category',
    options: Object.keys(KOREAN_CATEGORY),
    required: true,
    noneSelcteddefaultMessage: '선택해 주세요',
  });

  const distanceSelect = createDropDown({
    id: 'walkingTime',
    options: WALKING_TIME,
    required: true,
    noneSelcteddefaultMessage: '선택해 주세요',
  });

  const categorySelcterLabelWrapper = createlabelWrapper({
    className: 'form-item form-item--required',
    htmlFor: 'category',
    name: '카테고리',
    innerElement: categorySelect,
  });

  const nameLabelWrapper = createlabelWrapper({
    className: 'form-item form-item--required',
    htmlFor: 'name',
    name: '이름',
    innerElement: createInput({
      name: 'name',
      id: 'name',
      type: 'text',
      required: true,
    }),
  });

  const walkingTimeLabelWrapper = createlabelWrapper({
    className: 'form-item form-item--required',
    htmlFor: 'distance',
    name: '거리(도보 이동 시간)',
    innerElement: distanceSelect,
  });

  const textAreaLabelWrapper = createlabelWrapper({
    className: 'form-item',
    htmlFor: 'description',
    description: '메뉴 등 추가 정보를 입력해 주세요.',
    name: '설명',
    innerElement: createTextArea({
      name: 'description',
      id: 'description',
      cols: 30,
      rows: 5,
    }),
  });

  const linkLabelWrapper = createlabelWrapper({
    className: 'form-item',
    htmlFor: 'link',
    description: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    name: '참고 링크',
    innerElement: createInput({ name: 'link', id: 'link', type: 'text' }),
  });

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'button-container';

  const cancelButton = createButton({
    className: 'button button--secondary text-caption',
    eventType: 'click',
    name: '취소하기',
    callback: () => modal.remove('modal--open'),
  });

  const addButton = createButton({
    className: 'button button--primary text-caption',
    type: 'submit',
    eventType: 'submit',
    name: '추가하기',
  });

  buttonWrapper.append(cancelButton, addButton);

  form.append(
    categorySelcterLabelWrapper,
    nameLabelWrapper,
    walkingTimeLabelWrapper,
    textAreaLabelWrapper,
    linkLabelWrapper,
    buttonWrapper
  );

  container.append(modalTitle, form);

  return container;
}

export default createNewRestaurantModal;