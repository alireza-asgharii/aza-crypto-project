const toFixed = (value, toF) => {
  let newValue;
  if (Number(value)) {
    newValue = value.toFixed(toF);
  } else {
    newValue = "-";
  }
  if (value < 0) {
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

// const getMyCoin = (data, id) => {
//   const filtered = data.filter((item) => item.id === id);
//   return filtered[0];
// };

const toLocaleS = (value) => {
  if (value) {
    return value.toLocaleString();
  } else {
    return "-";
  }
};

const splitWebsiteLink = (value) => {
  if (value) {
    const splited = value.split("/")[2];
    if (splited !== undefined) {
      if (splited.includes("www.")) {
        return value.split("/")[2].split("www.")[1];
      } else {
        return splited;
      }
    }
  }
};

const findMinMax = (arr, value) => {
  if (value === "min") {
    return Math.min.apply(null, arr).toLocaleString();
  } else if (value === "max") {
    return Math.max.apply(null, arr).toLocaleString();
  }
};

const findAllMinMax = (arr, value) => {
  const sort = arr.sort((a, b) => a[1] - b[1]);
  if (value === "max") {
    return sort[sort.length - 1];
  } else if (value === "min") {
    return sort[0];
  }
};

const changePercentage = (currentPrice, maxPrice) => {
  return ((currentPrice - maxPrice) / maxPrice) * 100;
};

const getTime = (time) => {
  const date = new Date(time).toUTCString();
  return date;
};

const splitTime = (time) => {
  const splited = time.split(" ");
  return `${splited[0]} ${splited[1]} ${splited[2]} ${splited[3]}`;
};

const checkEmpty = (value) => {
  if (value === null) {
    return "-";
  } else {
    return value;
  }
};

const checkStar = (arr, id) => {
  const find = arr.find((item) => item === id);
  return find;
};

export {
  toFixed,
  upDown,
  splitName,
  splitForLink,
  toLocaleS,
  splitWebsiteLink,
  findMinMax,
  findAllMinMax,
  changePercentage,
  getTime,
  splitTime,
  checkEmpty,
  checkStar,
};
