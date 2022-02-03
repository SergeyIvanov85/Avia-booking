import createElement from "./createElement.js";
import declOfNum from "./declOfNum.js";

const createCokpit = (titleText) => {
  const cokpit = createElement('div', {
    className: 'cockpit',
  });

  const title = createElement('h1', {
    className: 'cockpit-title',
    textContent: titleText,
  });

  const button = createElement('button', {
    className: 'cockpit-confirm',
    type: 'submit',
    textContent: 'Подтвердить',
  });

  cokpit.append(title, button);

  return cokpit;
};

const createExit = () => {
  const fuselage = createElement('div', {
    className: 'fuselage exit',
  });

  return fuselage;
};

const createBlockSeat = (n, count) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const fuselage = createElement('ol', {
    className: 'fuselage',
  });

  for (let i = n; i < count + n; i++) {
    const wrapperRow = createElement('li');
    const seats = createElement('ol', {
      className: 'seats',
    });

    const seatsRow = letters.map(letter => {
     
      const seat = createElement('li', {
        className: 'seat',
      });

      const wrapperCheck = createElement('label');

      const check = createElement('input', {
        name: 'seat',
        type: 'checkbox',
        value: `${i}${letter}`,
      });

      wrapperCheck.append(check);
      seat.append(wrapperCheck);
      return seat;
    });

    seats.append(...seatsRow);
    wrapperRow.append(seats);
    fuselage.append(wrapperRow);
  }

  return fuselage;
};

const createAirplane = (title, tourData) => {
  const scheme = tourData.scheme;
  const choisesSeat = createElement('form', {
    className: 'choises-seat',
  });

  const plane = createElement('fieldset', {
    className: 'plane',
    name: 'plane',
  });

  const cokpit = createCokpit(title);
  
  let n = 1;

  const elements = scheme.map((type) => {
    if (type === 'exit') {
      return createExit();
    }

    if (typeof type === 'number') {
      const blockSeat = createBlockSeat(n, type);

      n = n + type;

      return blockSeat;
    }
  });
  
  plane.append(cokpit, ...elements);
  choisesSeat.append(plane);

  return choisesSeat;

};


const airplane = (main, data, tourData) => {
  const title = `Выберете ${declOfNum(data.length, ['место','места','мест'])}`;


  main.append(createAirplane(title, tourData));
 
};


export default airplane;