const toFixed = (value, toF) => {
  let newValue;
  if (Number(value)) {
    newValue = value.toFixed(toF);
  } else {
    newValue = "-";
  }
  if (value < 0 && newValue === "-") {
    return Math.abs(newValue);
  } else {
    return newValue;
  }
};

const upDown = (value) => {
  if (value < 0) {
    return false;
  } else {
    return true;
  }
};

const splitName = (name) => {
  const spName = name.split(" ");
  let newName;
  if (spName.length >= 2) {
    newName = `${spName[0]} ${spName[1]}`;
  } else {
    newName = `${spName[0]}`;
  }
  return newName;
};

const splitForLink = (name) => {
  const splited = name.split(" ");
  const newNameLink = splited.join("-");
  return newNameLink;
};

export { toFixed, upDown, splitName, splitForLink };
